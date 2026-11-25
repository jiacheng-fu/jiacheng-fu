<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/jiacheng-fu/jiacheng-fu/main/assets/topo/header.svg" />
  <img src="https://raw.githubusercontent.com/jiacheng-fu/jiacheng-fu/main/assets/topo/header-light.svg" width="100%" alt="Brian Fu — Software Engineer" />
</picture>

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/jiacheng-fu/jiacheng-fu/main/assets/topo/sec-about.svg" />
  <img src="https://raw.githubusercontent.com/jiacheng-fu/jiacheng-fu/main/assets/topo/sec-about-light.svg" width="100%" alt="01 — About" />
</picture>

CS student at **Texas A&M** in Austin, TX — B.S. December 2027 (3.87 GPA, math minor). I build and ship full-stack products end to end, work on **application security** for a production multi-tenant SaaS platform, and spent a summer writing an **LLVM compiler backend** for a vector DSP.

**Live:** [brianfu.vercel.app](https://brianfu.vercel.app) · [Axle](https://d1j3m9qdbgs5ik.cloudfront.net)

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/jiacheng-fu/jiacheng-fu/main/assets/topo/stats.svg" />
  <img src="https://raw.githubusercontent.com/jiacheng-fu/jiacheng-fu/main/assets/topo/stats-light.svg" width="100%" alt="50+ production vulnerabilities remediated; 13-stage pre-push verification pipeline; cross-tenant authorization gap closed" />
</picture>

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/jiacheng-fu/jiacheng-fu/main/assets/topo/sec-stack.svg" />
  <img src="https://raw.githubusercontent.com/jiacheng-fu/jiacheng-fu/main/assets/topo/sec-stack-light.svg" width="100%" alt="02 — Stack" />
</picture>

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/jiacheng-fu/jiacheng-fu/main/assets/topo/stack.svg" />
  <img src="https://raw.githubusercontent.com/jiacheng-fu/jiacheng-fu/main/assets/topo/stack-light.svg" width="100%" alt="Languages, frontend, backend, security, tooling" />
</picture>

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/jiacheng-fu/jiacheng-fu/main/assets/topo/sec-projects.svg" />
  <img src="https://raw.githubusercontent.com/jiacheng-fu/jiacheng-fu/main/assets/topo/sec-projects-light.svg" width="100%" alt="03 — Projects" />
</picture>

<a href="https://github.com/jiacheng-fu/axle">
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/jiacheng-fu/jiacheng-fu/main/assets/topo/proj-axle.svg" />
  <img src="https://raw.githubusercontent.com/jiacheng-fu/jiacheng-fu/main/assets/topo/proj-axle-light.svg" width="100%" alt="Axle: Plain English in, ranked real listings out. An LLM pipeline with two-tier model routing, held inside a 1,000-call/month budget." />
</picture>
</a>

<a href="https://github.com/jiacheng-fu/personal-website">
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/jiacheng-fu/jiacheng-fu/main/assets/topo/proj-site.svg" />
  <img src="https://raw.githubusercontent.com/jiacheng-fu/jiacheng-fu/main/assets/topo/proj-site-light.svg" width="100%" alt="personal-website: A portfolio site built around an interactive 3D keyboard." />
</picture>
</a>

<a href="https://github.com/jiacheng-fu/project-horizon">
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/jiacheng-fu/jiacheng-fu/main/assets/topo/proj-horizon.svg" />
  <img src="https://raw.githubusercontent.com/jiacheng-fu/jiacheng-fu/main/assets/topo/proj-horizon-light.svg" width="100%" alt="Project Horizon: Narrative exploration game, built solo. Typewriter dialogue synced to voiceover, with branching choices that gate progression." />
</picture>
</a>

<a href="https://github.com/jiacheng-fu/CarStatus">
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/jiacheng-fu/jiacheng-fu/main/assets/topo/proj-car.svg" />
  <img src="https://raw.githubusercontent.com/jiacheng-fu/jiacheng-fu/main/assets/topo/proj-car-light.svg" width="100%" alt="CarStatus: Reads a BMW's live odometer, fuel, battery and location through the Smartcar API." />
</picture>
</a>

<a href="https://github.com/jiacheng-fu/wild-west-party-game">
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/jiacheng-fu/jiacheng-fu/main/assets/topo/proj-west.svg" />
  <img src="https://raw.githubusercontent.com/jiacheng-fu/jiacheng-fu/main/assets/topo/proj-west-light.svg" width="100%" alt="Wild West Party Game: Live multiplayer party game built in 24 hours. I built the frontend." />
</picture>
</a>

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/jiacheng-fu/jiacheng-fu/main/assets/topo/sec-architecture.svg" />
  <img src="https://raw.githubusercontent.com/jiacheng-fu/jiacheng-fu/main/assets/topo/sec-architecture-light.svg" width="100%" alt="04 — Architecture" />
</picture>

How **Axle** turns a plain-English question into ranked listings — and stays inside a 1,000-call/month model budget.

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/jiacheng-fu/jiacheng-fu/main/assets/topo/arch-map.svg" />
  <img src="https://raw.githubusercontent.com/jiacheng-fu/jiacheng-fu/main/assets/topo/arch-map-light.svg" width="100%" alt="Trail map of an Axle request: plain-English query, React on CloudFront/S3, API Gateway, FastAPI on Lambda, then a multi-tier cache. A cache hit goes straight to ranked listings with no model call. A miss goes through schema sanitization, a 40-entry alias map with fuzzy matching and two-tier model routing (cheap model for routine parses, capable model when ambiguous), then 10-level constraint relaxation and scoring to ranked listings, which return to the React client." />
</picture>

Two things hold the budget: repeat questions never reach a model, and only genuinely ambiguous ones reach the expensive one. The relaxation ladder is why a query with no exact match still returns ranked results instead of an empty page.

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/jiacheng-fu/jiacheng-fu/main/assets/topo/sec-activity.svg" />
  <img src="https://raw.githubusercontent.com/jiacheng-fu/jiacheng-fu/main/assets/topo/sec-activity-light.svg" width="100%" alt="05 — Activity" />
</picture>

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/jiacheng-fu/jiacheng-fu/output/github-snake-dark.svg?v=7" />
  <img src="https://raw.githubusercontent.com/jiacheng-fu/jiacheng-fu/output/github-snake.svg?v=7" width="100%" alt="contribution snake" />
</picture>

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/jiacheng-fu/jiacheng-fu/main/assets/topo/sec-contact.svg" />
  <img src="https://raw.githubusercontent.com/jiacheng-fu/jiacheng-fu/main/assets/topo/sec-contact-light.svg" width="100%" alt="06 — Contact" />
</picture>

<a href="https://linkedin.com/in/jiachengfu"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/jiacheng-fu/jiacheng-fu/main/assets/topo/sign-linkedin.svg" /><img src="https://raw.githubusercontent.com/jiacheng-fu/jiacheng-fu/main/assets/topo/sign-linkedin-light.svg" width="204" alt="LinkedIn" /></picture></a> <a href="mailto:brian.fu123321@gmail.com"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/jiacheng-fu/jiacheng-fu/main/assets/topo/sign-email.svg" /><img src="https://raw.githubusercontent.com/jiacheng-fu/jiacheng-fu/main/assets/topo/sign-email-light.svg" width="204" alt="Email" /></picture></a> <a href="https://github.com/jiacheng-fu"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/jiacheng-fu/jiacheng-fu/main/assets/topo/sign-github.svg" /><img src="https://raw.githubusercontent.com/jiacheng-fu/jiacheng-fu/main/assets/topo/sign-github-light.svg" width="204" alt="GitHub" /></picture></a>
