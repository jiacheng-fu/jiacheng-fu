<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/jiacheng-fu/jiacheng-fu/main/assets/header.svg" />
  <img src="https://raw.githubusercontent.com/jiacheng-fu/jiacheng-fu/main/assets/header-light.svg" width="100%" alt="Brian Fu — Software Engineer" />
</picture>

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/jiacheng-fu/jiacheng-fu/main/assets/sec-about.svg" />
  <img src="https://raw.githubusercontent.com/jiacheng-fu/jiacheng-fu/main/assets/sec-about-light.svg" width="100%" alt="01 — About" />
</picture>

CS student at **Texas A&M** in Austin, TX — B.S. December 2027 (3.87 GPA, math minor). I build and ship full-stack products end to end, work on **application security** for a production multi-tenant SaaS platform, and spent a summer writing an **LLVM compiler backend** for a vector DSP.

**Live:** [brianfu.vercel.app](https://brianfu.vercel.app) · [Axle](https://d1j3m9qdbgs5ik.cloudfront.net)

```console
$ security --summary
  50+ production vulnerabilities remediated   access-control, injection, race conditions
  13-stage pre-push verification pipeline     negative RLS probes, regression suites
  cross-tenant authorization gap closed       proven by reverse-reproduction
```

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/jiacheng-fu/jiacheng-fu/main/assets/sec-stack.svg" />
  <img src="https://raw.githubusercontent.com/jiacheng-fu/jiacheng-fu/main/assets/sec-stack-light.svg" width="100%" alt="02 — Stack" />
</picture>

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/jiacheng-fu/jiacheng-fu/main/assets/stack.svg" />
  <img src="https://raw.githubusercontent.com/jiacheng-fu/jiacheng-fu/main/assets/stack-light.svg" width="100%" alt="Languages, frontend, backend, security, tooling" />
</picture>

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/jiacheng-fu/jiacheng-fu/main/assets/sec-projects.svg" />
  <img src="https://raw.githubusercontent.com/jiacheng-fu/jiacheng-fu/main/assets/sec-projects-light.svg" width="100%" alt="03 — Projects" />
</picture>

|  | project | what it is |
|---|---|---|
| `▸` | **[Axle](https://github.com/jiacheng-fu/axle)** — [live ↗](https://d1j3m9qdbgs5ik.cloudfront.net) | AI-powered used-car search — plain English in, ranked real listings out. LLM pipeline with schema sanitization, fuzzy alias matching, two-tier model routing. Deployed serverless: FastAPI on Lambda behind API Gateway, React on CloudFront/S3, DynamoDB cache with native TTL holding it inside a 1,000-call/month budget.<br/><sub>`React` `FastAPI` `AWS Lambda` `DynamoDB` `API Gateway` `PostgreSQL`</sub> |
| `▸` | **[personal-website](https://github.com/jiacheng-fu/personal-website)** — [live ↗](https://brianfu.vercel.app) | Generative portfolio — a hand-written WebGL fragment shader (domain-warped fBm) that warps toward your cursor, with spring-driven scroll-linked reveals.<br/><sub>`TypeScript` `React` `WebGL` `GLSL`</sub> |
| `▸` | **[project-horizon](https://github.com/jiacheng-fu/project-horizon)** | Narrative exploration game, solo since 2023 — dialogue engine with typewriter text synced to voiceover audio and branching choices that gate progression.<br/><sub>`C#` `Unity`</sub> |
| `▸` | **[CarStatus](https://github.com/jiacheng-fu/CarStatus)** | CLI that pulls a BMW's live odometer, fuel/battery, and location via the Smartcar API.<br/><sub>`Node.js` `REST`</sub> |
| `▸` | **[wild-west-party-game](https://github.com/jiacheng-fu/wild-west-party-game)** | Live-multiplayer party game built in 24h at HowdyHack 2024 — I built the frontend.<br/><sub>`TypeScript` `Next.js`</sub> |

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/jiacheng-fu/jiacheng-fu/main/assets/sec-architecture.svg" />
  <img src="https://raw.githubusercontent.com/jiacheng-fu/jiacheng-fu/main/assets/sec-architecture-light.svg" width="100%" alt="04 — Architecture" />
</picture>

How **Axle** turns a plain-English question into ranked listings — and stays inside a 1,000-call/month model budget.

```mermaid
flowchart LR
    Q["Plain-English<br/>query"] --> CDN["React<br/>CloudFront / S3"]
    CDN --> GW["API Gateway"]
    GW --> API["FastAPI<br/>on Lambda"]

    API --> CACHE{"Multi-tier cache<br/>memory / disk / DynamoDB TTL"}
    CACHE -->|hit| RANK["Ranked listings"]
    CACHE -->|miss| SAN["Schema<br/>sanitization"]

    SAN --> ALIAS["40-entry alias map<br/>+ fuzzy matching"]
    ALIAS --> ROUTE{"Two-tier<br/>model routing"}

    ROUTE -->|routine parse| SMALL["Cheap model"]
    ROUTE -->|ambiguous| LARGE["Capable model"]

    SMALL --> RELAX["10-level constraint<br/>relaxation + scoring"]
    LARGE --> RELAX
    RELAX --> RANK
    RANK --> CDN
```

Two things hold the budget: repeat questions never reach a model, and only genuinely ambiguous ones reach the expensive one. The relaxation ladder is why a query with no exact match still returns ranked results instead of an empty page.

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/jiacheng-fu/jiacheng-fu/main/assets/sec-activity.svg" />
  <img src="https://raw.githubusercontent.com/jiacheng-fu/jiacheng-fu/main/assets/sec-activity-light.svg" width="100%" alt="05 — Activity" />
</picture>

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/jiacheng-fu/jiacheng-fu/output/github-snake-dark.svg?v=6" />
  <img src="https://raw.githubusercontent.com/jiacheng-fu/jiacheng-fu/output/github-snake.svg?v=6" width="100%" alt="contribution snake" />
</picture>

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/jiacheng-fu/jiacheng-fu/main/assets/sec-contact.svg" />
  <img src="https://raw.githubusercontent.com/jiacheng-fu/jiacheng-fu/main/assets/sec-contact-light.svg" width="100%" alt="06 — Contact" />
</picture>

<table><tr>
<td><a href="https://linkedin.com/in/jiachengfu"><picture><source media="(prefers-color-scheme: dark)" srcset="https://img.shields.io/badge/LINKEDIN-0b0f14?style=for-the-badge&logo=linkedin&logoColor=00b8ff&labelColor=0b0f14" /><img src="https://img.shields.io/badge/LINKEDIN-f6f8fa?style=for-the-badge&logo=linkedin&logoColor=0969da&labelColor=f6f8fa" alt="LinkedIn" /></picture></a></td>
<td><a href="mailto:brian.fu123321@gmail.com"><picture><source media="(prefers-color-scheme: dark)" srcset="https://img.shields.io/badge/EMAIL-0b0f14?style=for-the-badge&logo=maildotru&logoColor=ff7b72&labelColor=0b0f14" /><img src="https://img.shields.io/badge/EMAIL-f6f8fa?style=for-the-badge&logo=maildotru&logoColor=cf222e&labelColor=f6f8fa" alt="Email" /></picture></a></td>
<td><a href="https://github.com/jiacheng-fu"><picture><source media="(prefers-color-scheme: dark)" srcset="https://img.shields.io/badge/GITHUB-0b0f14?style=for-the-badge&logo=github&logoColor=00ff9f&labelColor=0b0f14" /><img src="https://img.shields.io/badge/GITHUB-f6f8fa?style=for-the-badge&logo=github&logoColor=00875f&labelColor=f6f8fa" alt="GitHub" /></picture></a></td>
</tr></table>

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/jiacheng-fu/jiacheng-fu/main/assets/footer.svg" />
  <img src="https://raw.githubusercontent.com/jiacheng-fu/jiacheng-fu/main/assets/footer-light.svg" width="100%" alt="" />
</picture>
