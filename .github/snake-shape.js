#!/usr/bin/env node
/*
 * Redraws the cells of a Platane/snk snake SVG in a different shape.
 *
 * snk has no shape option - only palette, color_snake and color_dots - but its
 * SVG is simple: one <rect class="c ..."> per day, colored and "eaten" by CSS
 * animations on `fill`, plus four <rect class="s ..."> snake segments that move
 * by CSS transform. Any shape that keeps the class keeps the animation, so this
 * runs as one extra workflow step between snk and the push to `output`.
 *
 *   node snake-shape.js in.svg out.svg <variant> [contourColor indexColor]
 *
 *   squares    unchanged
 *   dots       round cells, round snake
 *   graduated  dot size follows the day's contribution level (proportional symbols)
 *   peaks      active days become spot-height triangles, empty days tiny dots
 *   rings      each active day is a tiny summit: one contour ring per level,
 *              the snake eats the center dot and the rings stay
 *   terrain    contour lines drawn from the contribution levels themselves
 *              (busy weeks become hills), days as small dots on top
 *   relief     terrain plus blurred elevation tints underneath (relief map)
 */

const fs = require('fs');

const CELL = 12;
const CELL_RE = /<rect class="(c[^"]*)" x="(-?\d+(?:\.\d+)?)" y="(-?\d+(?:\.\d+)?)" rx="2" ry="2"\/>/g;
const SEG_RE = /<rect class="(s [^"]*)" x="([\d.]+)" y="([\d.]+)" width="([\d.]+)" height="([\d.]+)" rx="[\d.]+" ry="[\d.]+"\/>/g;

// ".c.c5{fill:var(--c4);animation-name:c5}" -> { c5: 4 }
function levelsByAnimation(svg) {
  const map = {};
  const re = /\.c\.(c[0-9a-z]+)\{fill:var\(--c(\d)\)/g;
  let m = re.exec(svg);
  while (m !== null) {
    map[m[1]] = Number(m[2]);
    m = re.exec(svg);
  }
  return map;
}

function readCells(svg) {
  const levels = levelsByAnimation(svg);
  const cells = [];
  const re = new RegExp(CELL_RE.source, 'g');
  let m = re.exec(svg);
  while (m !== null) {
    const parts = m[1].split(' ');
    let level = 0;
    if (parts.length > 1) {
      level = levels[parts[1]] || 0;
    }
    cells.push({ cls: m[1], x: Number(m[2]), y: Number(m[3]), level: level });
    m = re.exec(svg);
  }
  return cells;
}

function roundSnake(svg) {
  return svg.replace(SEG_RE, (all, cls, x, y, w, h) => {
    const r = Number(w) / 2;
    return `<rect class="${cls}" x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" ry="${r}"/>`;
  });
}

function circle(cls, cx, cy, r, noStroke) {
  const style = noStroke ? ' style="stroke:none"' : '';
  return `<circle class="${cls}" cx="${cx}" cy="${cy}" r="${r}"${style}/>`;
}

// marching squares over a sampled field; one path per level
function contourPaths(x0, y0, w, h, step, f, levels) {
  const nx = Math.ceil(w / step) + 1;
  const ny = Math.ceil(h / step) + 1;
  const v = new Float64Array(nx * ny);
  for (let j = 0; j < ny; j++) {
    for (let i = 0; i < nx; i++) {
      v[j * nx + i] = f(x0 + i * step, y0 + j * step);
    }
  }
  const out = [];
  for (const lv of levels) {
    let d = '';
    const seg = (p, q) => {
      d += `M${p[0].toFixed(1)} ${p[1].toFixed(1)}L${q[0].toFixed(1)} ${q[1].toFixed(1)}`;
    };
    for (let j = 0; j < ny - 1; j++) {
      for (let i = 0; i < nx - 1; i++) {
        const a = v[j * nx + i];
        const b = v[j * nx + i + 1];
        const c = v[(j + 1) * nx + i + 1];
        const e = v[(j + 1) * nx + i];
        let idx = 0;
        if (a > lv) idx += 8;
        if (b > lv) idx += 4;
        if (c > lv) idx += 2;
        if (e > lv) idx += 1;
        if (idx === 0 || idx === 15) continue;
        const x = x0 + i * step;
        const y = y0 + j * step;
        const top = [x + (step * (lv - a)) / (b - a), y];
        const right = [x + step, y + (step * (lv - b)) / (c - b)];
        const bottom = [x + (step * (lv - e)) / (c - e), y + step];
        const left = [x, y + (step * (lv - a)) / (e - a)];
        switch (idx) {
          case 1: case 14: seg(left, bottom); break;
          case 2: case 13: seg(bottom, right); break;
          case 3: case 12: seg(left, right); break;
          case 4: case 11: seg(top, right); break;
          case 6: case 9: seg(top, bottom); break;
          case 7: case 8: seg(left, top); break;
          case 5: seg(top, right); seg(left, bottom); break;
          case 10: seg(left, top); seg(bottom, right); break;
        }
      }
    }
    out.push(d);
  }
  return out;
}

function terrainLayer(cells, contourColor, indexColor, tints) {
  const active = cells.filter((c) => c.level > 0);
  if (active.length === 0) return '';
  const sigma = 13;
  const f = (px, py) => {
    let s = 0;
    for (const c of active) {
      const dx = px - (c.x + CELL / 2);
      const dy = py - (c.y + CELL / 2);
      s += c.level * Math.exp(-(dx * dx + dy * dy) / (2 * sigma * sigma));
    }
    return s;
  };
  let maxX = 0;
  let maxY = 0;
  for (const c of cells) {
    if (c.x > maxX) maxX = c.x;
    if (c.y > maxY) maxY = c.y;
  }
  const x0 = -10;
  const y0 = -10;
  const w = maxX + CELL + 20;
  const h = maxY + CELL + 20;
  let peak = 0;
  for (let y = y0; y <= y0 + h; y += 4) {
    for (let x = x0; x <= x0 + w; x += 4) {
      const v = f(x, y);
      if (v > peak) peak = v;
    }
  }
  const levels = [];
  for (let k = 1; k <= 9; k++) levels.push((peak * k) / 10);
  const paths = contourPaths(x0, y0, w, h, 3, f, levels);
  let g = '';
  if (tints) {
    g += '<defs><filter id="relief" x="-20%" y="-60%" width="140%" height="220%"><feGaussianBlur stdDeviation="7"/></filter></defs>';
    g += '<g filter="url(#relief)">';
    for (const c of active) {
      const tint = tints[Math.min(c.level, tints.length) - 1];
      g += `<circle cx="${c.x + CELL / 2}" cy="${c.y + CELL / 2}" r="10" fill="${tint}" fill-opacity="0.75"/>`;
    }
    g += '</g>';
  }
  g += '<g fill="none" stroke-linecap="round">';
  paths.forEach((d, k) => {
    if (!d) return;
    const isIndex = (k + 1) % 3 === 0;
    const color = isIndex ? indexColor : contourColor;
    const width = isIndex ? 1.3 : 0.7;
    g += `<path d="${d}" stroke="${color}" stroke-width="${width}"/>`;
  });
  g += '</g>';
  return g;
}

function shape(svg, variant, opts) {
  opts = opts || {};
  const contourColor = opts.contour || '#c9a47a';
  const indexColor = opts.index || '#94693d';
  if (variant === 'squares') return svg;
  if (variant === 'dots') {
    const re = new RegExp(CELL_RE.source, 'g');
    const out = svg.replace(re, (all, cls, x, y) => `<rect class="${cls}" x="${x}" y="${y}" rx="6" ry="6"/>`);
    return roundSnake(out);
  }
  const cells = readCells(svg);
  const byKey = {};
  for (const c of cells) byKey[c.x + ',' + c.y] = c;
  const re = new RegExp(CELL_RE.source, 'g');
  const at = (xs, ys) => byKey[xs + ',' + ys];
  let out;
  if (variant === 'peaks') {
    out = svg.replace(re, (all, cls, xs, ys) => {
      const c = at(xs, ys);
      const x = Number(xs);
      const y = Number(ys);
      if (!c || c.level === 0) return circle(cls, x + 6, y + 6, 1.6, true);
      return `<path class="${cls}" d="M${x + 6} ${y + 0.5}L${x + 12.5} ${y + 11.5}L${x - 0.5} ${y + 11.5}Z"/>`;
    });
  } else if (variant === 'graduated') {
    const radius = [1.2, 2.6, 3.7, 4.8, 6];
    out = svg.replace(re, (all, cls, xs, ys) => {
      const c = at(xs, ys);
      const level = c ? c.level : 0;
      return circle(cls, Number(xs) + 6, Number(ys) + 6, radius[level], true);
    });
  } else if (variant === 'rings') {
    out = svg.replace(re, (all, cls, xs, ys) => {
      const c = at(xs, ys);
      const cx = Number(xs) + 6;
      const cy = Number(ys) + 6;
      if (!c || c.level === 0) return circle(cls, cx, cy, 1.1, true);
      let g = '';
      for (let j = 0; j < c.level; j++) {
        const color = j === c.level - 1 ? indexColor : contourColor;
        g += `<circle cx="${cx}" cy="${cy}" r="${(3.6 + j * 1.3).toFixed(1)}" fill="none" stroke="${color}" stroke-width="0.8"/>`;
      }
      return g + circle(cls, cx, cy, 2.2, true);
    });
  } else if (variant === 'terrain' || variant === 'relief') {
    out = svg.replace(re, (all, cls, xs, ys) => {
      const c = at(xs, ys);
      const x = Number(xs);
      const y = Number(ys);
      if (!c || c.level === 0) return circle(cls, x + 6, y + 6, 1.2, true);
      return circle(cls, x + 6, y + 6, variant === 'relief' ? 2.6 : 3.4, true);
    });
    const tints = variant === 'relief' ? opts.tints : null;
    const layer = terrainLayer(cells, contourColor, indexColor, tints);
    out = out.replace('</style>', '</style>' + layer);
  } else {
    throw new Error('unknown variant ' + variant);
  }
  return roundSnake(out);
}

module.exports = { shape };

if (require.main === module) {
  const args = process.argv.slice(2);
  if (args.length < 3) {
    console.error('usage: node snake-shape.js in.svg out.svg <squares|dots|graduated|peaks|rings|terrain|relief> [contourColor indexColor]');
    process.exit(1);
  }
  const src = fs.readFileSync(args[0], 'utf8');
  // Fail loudly if snk ever changes its markup: a silent no-op would publish
  // plain squares, and the old snake on the output branch is the better fallback.
  const found = readCells(src);
  if (found.length < 300) {
    console.error('snake-shape: found ' + found.length + ' day cells (expected ~371); snk output format changed');
    process.exit(1);
  }
  const out = shape(src, args[2], { contour: args[3], index: args[4] });
  if (args[2] !== 'squares' && out === src) {
    console.error('snake-shape: nothing was redrawn');
    process.exit(1);
  }
  fs.writeFileSync(args[1], out);
  console.log('snake-shape: ' + args[2] + ', ' + found.length + ' cells, ' + found.filter((c) => c.level > 0).length + ' active');
}
