import { ReadmeTemplate } from '../types';

export const README_TEMPLATES: ReadmeTemplate[] = [
  {
    id: 'nextjs-saas',
    title: 'Modern Next.js 15+ SaaS',
    subtitle: 'App Router, Tailwind CSS, Supabase Auth & Stripe Billing',
    category: 'fullstack',
    stars: 3420,
    tags: ['Next.js 15', 'TypeScript', 'Tailwind', 'Supabase', 'Stripe'],
    recommendedFor: ['SaaS Builders', 'Full-stack Devs', 'Startups'],
    description: 'A production-grade documentation blueprint for modern React & Next.js SaaS applications with authentication, server actions, and subscriptions.',
    blocks: [
      {
        id: 'hero',
        title: 'Project Header & Badges',
        icon: 'cube',
        category: 'core',
        enabled: true,
        description: 'Repository title, hero banner, tagline and status shields',
        content: `# ⚡ NexusFlow SaaS

> Enterprise-grade workspace management platform with real-time AI collaboration, multi-tenant billing, and granular RBAC.

[![Next.js 15](https://img.shields.io/badge/Next.js-15.1-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-emerald?style=for-the-badge)](LICENSE)
[![CI/CD Status](https://img.shields.io/badge/build-passing-brightgreen?style=for-the-badge)](actions)`
      },
      {
        id: 'overview',
        title: 'Overview & Highlights',
        icon: 'sparkles',
        category: 'core',
        enabled: true,
        description: 'Key value propositions and architectural overview',
        content: `## 🌟 Overview

NexusFlow gives engineering teams a high-velocity dashboard to manage micro-services, track deployment metrics, and automate incident responses with context-aware AI agents.

### ✨ Key Features
- **🚀 Server-Driven Architecture**: Next.js 15 App Router with dynamic streaming & React Server Components.
- **🔐 Multi-Tenant Authentication**: Role-based access control (Admin, Member, Viewer) via Supabase Auth.
- **💳 Recurring Billing**: Zero-friction Stripe Checkout, portal integration & usage metering.
- **⚡ Real-time Telemetry**: WebSocket event streaming with <15ms latency.
- **🎨 Modern Dark UI**: Polished Tailwind CSS components with accessible ARIA standards.`
      },
      {
        id: 'tech-stack',
        title: 'Tech Stack Matrix',
        icon: 'layers',
        category: 'technical',
        enabled: true,
        description: 'Frontend, backend, database and DevOps technologies',
        content: `## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Framework** | Next.js 15 (App Router) | SSR, SSG, Server Actions |
| **Language** | TypeScript 5.6 | Strict type-safety across stack |
| **Styling** | Tailwind CSS & Lucide Icons | Responsive modern dark UI |
| **Database** | PostgreSQL + Prisma ORM | Relational data & type-safe queries |
| **Auth** | Supabase Auth & JWT | Multi-factor & Social OAuth |
| **Payments** | Stripe API & Webhooks | Subscriptions & usage tiers |
| **Testing** | Vitest & Playwright | Unit, integration & E2E suites |`
      },
      {
        id: 'quickstart',
        title: 'Prerequisites & Quickstart',
        icon: 'terminal',
        category: 'technical',
        enabled: true,
        description: 'Step-by-step setup and local development guide',
        content: `## 🚀 Getting Started

### 📋 Prerequisites
- **Node.js**: \`>= 20.10.0\`
- **pnpm**: \`>= 9.0.0\`
- **Docker**: For local PostgreSQL and Redis containers

### 💻 Installation

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/your-org/nexusflow-saas.git
   cd nexusflow-saas
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   pnpm install
   \`\`\`

3. **Configure Environment Variables**
   \`\`\`bash
   cp .env.example .env.local
   # Fill in Supabase and Stripe keys
   \`\`\`

4. **Initialize Database**
   \`\`\`bash
   pnpm prisma migrate dev
   pnpm prisma db seed
   \`\`\`

5. **Start Development Server**
   \`\`\`bash
   pnpm dev
   \`\`\`
   Open [http://localhost:3000](http://localhost:3000) to view the application.`
      },
      {
        id: 'env-vars',
        title: 'Environment Variables',
        icon: 'key',
        category: 'technical',
        enabled: true,
        description: 'Required secrets, endpoints and token configurations',
        content: `## 🔑 Environment Configuration

| Variable | Description | Required | Default |
|---|---|:---:|---|
| \`DATABASE_URL\` | PostgreSQL connection URI | Yes | \`postgresql://...\` |
| \`NEXT_PUBLIC_SUPABASE_URL\` | Supabase API endpoint | Yes | \`https://xyz.supabase.co\` |
| \`NEXT_PUBLIC_SUPABASE_ANON_KEY\`| Supabase Anonymous Key | Yes | \`sb_anon_...\` |
| \`STRIPE_SECRET_KEY\` | Stripe Secret API Key | Yes | \`sk_test_...\` |
| \`STRIPE_WEBHOOK_SECRET\` | Stripe Webhook verification | Yes | \`whsec_...\` |
| \`NEXTAUTH_SECRET\` | Session encryption secret | Yes | \`openssl rand -hex 32\` |`
      },
      {
        id: 'contributing',
        title: 'Contributing & Roadmap',
        icon: 'git-branch',
        category: 'docs',
        enabled: true,
        description: 'Contribution guidelines, PR etiquette and future milestones',
        content: `## 🤝 Contributing

Contributions make open-source vibrant! Please follow these steps:

1. Fork the Project (\`git checkout -b feature/AmazingFeature\`)
2. Commit your Changes with Conventional Commits (\`git commit -m 'feat: add metrics export'\`)
3. Push to the Branch (\`git push origin feature/AmazingFeature\`)
4. Open a Pull Request

## 🗺️ Roadmap
- [x] v1.0: Core dashboard, authentication & Stripe tiering
- [x] v1.1: Webhook delivery system & audit logs
- [ ] v1.2: AI-driven anomaly detection
- [ ] v2.0: Multi-cloud Kubernetes provider integration`
      },
      {
        id: 'license',
        title: 'License & Credits',
        icon: 'shield-checkmark',
        category: 'meta',
        enabled: true,
        description: 'License terms, maintainers and stargazers',
        content: `## 📜 License

Distributed under the **MIT License**. See \`LICENSE\` for more information.

---
Crafted with ⚡ by the **NexusFlow Core Team**. Star ⭐ this repo if you find it helpful!`
      }
    ]
  },
  {
    id: 'python-ai-service',
    title: 'Python AI Agent & FastAPI',
    subtitle: 'LangChain, PyTorch, Vector Search, Celery & Docker',
    category: 'ai-ml',
    stars: 2890,
    tags: ['Python 3.12', 'FastAPI', 'LangChain', 'Docker', 'Qdrant'],
    recommendedFor: ['AI Engineers', 'Data Scientists', 'Backend Devs'],
    description: 'Documentation template for AI pipelines, LLM agent runners, vector embeddings, and production async APIs.',
    blocks: [
      {
        id: 'hero',
        title: 'Header & Badges',
        icon: 'cube',
        category: 'core',
        enabled: true,
        description: 'AI model tags, inference throughput and license',
        content: `# 🧠 SynapseAgent

> High-throughput distributed AI agent engine with dynamic vector recall, streaming token responses, and tool-use orchestration.

[![Python](https://img.shields.io/badge/Python-3.12-3776AB?style=for-the-badge&logo=python)](https://python.org)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.115-009688?style=for-the-badge&logo=fastapi)](https://fastapi.tiangolo.com)
[![Docker](https://img.shields.io/badge/Docker-Enabled-2496ED?style=for-the-badge&logo=docker)](https://docker.com)
[![Qdrant](https://img.shields.io/badge/VectorDB-Qdrant-red?style=for-the-badge)](https://qdrant.tech)
[![License: Apache 2.0](https://img.shields.io/badge/License-Apache_2.0-blue?style=for-the-badge)](LICENSE)`
      },
      {
        id: 'overview',
        title: 'Architecture & Features',
        icon: 'sparkles',
        category: 'core',
        enabled: true,
        description: 'Agent loop, reasoning pipeline, and embeddings',
        content: `## ⚡ Features

- **🤖 Autonomous Multi-Step Reasoning**: ReAct prompt loops with memory persistence.
- **🔍 Sub-10ms Vector Search**: Integrated with Qdrant vector database for semantic recall.
- **🌊 SSE Token Streaming**: Server-Sent Events output for low-latency frontend streaming.
- **🛡️ Guardrails & Safety Filters**: Real-time hallucination checks & prompt injection mitigation.
- **📊 OpenTelemetry Tracing**: Trace tokens, latency, and cost per request out of the box.`
      },
      {
        id: 'quickstart',
        title: 'Installation & Docker Run',
        icon: 'terminal',
        category: 'technical',
        enabled: true,
        description: 'Poetry setup and docker compose deployment',
        content: `## 🛠️ Quickstart

\`\`\`bash
# 1. Clone the repo
git clone https://github.com/synapse-ai/synapse-agent.git
cd synapse-agent

# 2. Setup environment with uv / poetry
curl -LsSf https://astral.sh/uv/install.sh | sh
uv venv && source .venv/bin/activate
uv pip install -r pyproject.toml

# 3. Launch Vector DB & Worker services
docker compose up -d qdrant redis

# 4. Run API Server
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
\`\`\`

API documentation available at \`http://localhost:8000/docs\` (Swagger UI).`
      },
      {
        id: 'api-reference',
        title: 'API Endpoints',
        icon: 'code-slash',
        category: 'technical',
        enabled: true,
        description: 'REST and streaming endpoints specification',
        content: `## 📡 API Reference

### \`POST /v1/chat/completions\`
Generates an agentic completion with optional tool calls.

\`\`\`json
// Request
{
  "prompt": "Analyze latest quarter revenue trends for SKU-8842",
  "stream": true,
  "tools": ["sql_database", "calculator"]
}
\`\`\`

\`\`\`json
// Response
{
  "status": "completed",
  "tokens_generated": 412,
  "latency_ms": 184,
  "result": "Revenue increased by 14.2% YoY..."
}
\`\`\``
      },
      {
        id: 'license',
        title: 'License',
        icon: 'shield-checkmark',
        category: 'meta',
        enabled: true,
        description: 'Apache 2.0 terms',
        content: `## 📄 License
Licensed under Apache License 2.0. Copyright (c) 2026 Synapse Labs.`
      }
    ]
  },
  {
    id: 'react-native-mobile',
    title: 'Cross-Platform React Native App',
    subtitle: 'Expo SDK 52, TypeScript, NativeWind, Zustand & Reanimated',
    category: 'mobile',
    stars: 2150,
    tags: ['React Native', 'Expo', 'TypeScript', 'iOS', 'Android'],
    recommendedFor: ['Mobile Developers', 'Cross-Platform Teams'],
    description: 'Complete documentation for mobile apps including iOS & Android build setup, deep linking, EAS build scripts, and local testing.',
    blocks: [
      {
        id: 'hero',
        title: 'Mobile Header & Store Badges',
        icon: 'cube',
        category: 'core',
        enabled: true,
        description: 'App overview, store status, and supported platforms',
        content: `# 📱 PulseFit Mobile

> Next-generation biometric workout companion with offline sync, haptic audio cues, and Apple Health & Google Fit sync.

[![Expo SDK](https://img.shields.io/badge/Expo_SDK-52.0-black?style=for-the-badge&logo=expo)](https://expo.dev)
[![React Native](https://img.shields.io/badge/React_Native-0.76-61DAFB?style=for-the-badge&logo=react)](https://reactnative.dev)
[![iOS](https://img.shields.io/badge/iOS-17.0+-silver?style=for-the-badge&logo=apple)](https://apple.com)
[![Android](https://img.shields.io/badge/Android-14+-3DDC84?style=for-the-badge&logo=android)](https://android.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)`
      },
      {
        id: 'overview',
        title: 'Screens & Features',
        icon: 'sparkles',
        category: 'core',
        enabled: true,
        description: 'Mobile UX highlights, offline first, native modules',
        content: `## 📱 Features

- **Offline-First Synchronization**: Built on WatermelonDB & SQLite for seamless offline workout logging.
- **Interactive Graphs**: Smooth 60fps charting via React Native Skia & Reanimated 3.
- **HealthKit & Health Connect**: Bi-directional heart rate, VO2 max, and active calories sync.
- **Deep Linking**: Universally handles \`pulsefit://session/:id\` links with Expo Router.
- **Micro-Haptics**: Tactile feedback on rest timers and interval milestones.`
      },
      {
        id: 'quickstart',
        title: 'Run with Expo Go',
        icon: 'terminal',
        category: 'technical',
        enabled: true,
        description: 'Quick start guide for simulators and physical devices',
        content: `## 🏃‍♂️ Getting Started

\`\`\`bash
# Install dependencies
npm install

# Start local bundler
npx expo start

# Run on iOS simulator
npx expo run:ios

# Run on Android emulator
npx expo run:android
\`\`\`

Scan the QR code with **Expo Go** on your physical phone to test instantly.`
      },
      {
        id: 'build-pipeline',
        title: 'EAS Build & Store Release',
        icon: 'cube',
        category: 'technical',
        enabled: true,
        description: 'EAS cloud build commands for testflight and internal testing',
        content: `## 📦 Production Builds

We use **Expo Application Services (EAS)** for reproducible cloud builds:

\`\`\`bash
# Build for iOS TestFlight
eas build --platform ios --profile production

# Build for Android Play Store (.aab)
eas build --platform android --profile production
\`\`\``
      }
    ]
  },
  {
    id: 'rust-cli-tool',
    title: 'High-Performance Rust CLI',
    subtitle: 'Clap v4, Tokio Async, Cross-Platform Binaries & Cargo',
    category: 'cli',
    stars: 4890,
    tags: ['Rust', 'Cargo', 'Clap', 'CLI', 'Tokio'],
    recommendedFor: ['Systems Devs', 'DevOps', 'CLI Authors'],
    description: 'Documentation for native command-line utilities, installation via brew/cargo/curl, and terminal GIF demo.',
    blocks: [
      {
        id: 'hero',
        title: 'CLI Header & Install One-Liner',
        icon: 'cube',
        category: 'core',
        enabled: true,
        description: 'Terminal banner, crates.io badge, cargo install guide',
        content: `# 🦀 BoltScan

> Blazing-fast multithreaded network security & port scanner written in Rust. 10x faster than traditional tools.

[![Crates.io](https://img.shields.io/crates/v/boltscan?style=for-the-badge&logo=rust)](https://crates.io)
[![Downloads](https://img.shields.io/crates/d/boltscan?style=for-the-badge)](https://crates.io)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)`
      },
      {
        id: 'installation',
        title: 'Installation Matrix',
        icon: 'download',
        category: 'technical',
        enabled: true,
        description: 'Homebrew, Cargo, Arch Linux AUR, and pre-compiled binaries',
        content: `## 📦 Installation

### Via Cargo
\`\`\`bash
cargo install boltscan
\`\`\`

### Via Homebrew (macOS / Linux)
\`\`\`bash
brew install boltscan-cli/tap/boltscan
\`\`\`

### Shell One-Liner (Pre-compiled Binary)
\`\`\`bash
curl -proto '=https' --tlsv1.2 -sSf https://boltscan.dev/install.sh | sh
\`\`\``
      },
      {
        id: 'usage',
        title: 'Command Line Usage',
        icon: 'terminal',
        category: 'technical',
        enabled: true,
        description: 'Options, flags, subcommands and output formatting',
        content: `## 💻 Usage

\`\`\`bash
# Quick scan with 1,000 parallel workers
boltscan scan target.internal --top-ports 1000 --threads 64

# Export results as JSON
boltscan scan 192.168.1.0/24 -o results.json --format json

# Watch mode with alerts
boltscan monitor --interval 60s --webhook https://alert.endpoint/
\`\`\``
      }
    ]
  },
  {
    id: 'typescript-library',
    title: 'TypeScript / NPM Package',
    subtitle: 'Dual CJS/ESM, Tsup, Vitest, TypeDoc & Zero Dependencies',
    category: 'library',
    stars: 1850,
    tags: ['TypeScript', 'NPM', 'ESM', 'Vitest', 'Zero-Dep'],
    recommendedFor: ['Open Source Maintainers', 'Package Authors'],
    description: 'Polished package documentation with dual bundle support, tree-shaking guarantees, bundle size badges, and code snippets.',
    blocks: [
      {
        id: 'hero',
        title: 'Package Header & Bundle Size',
        icon: 'cube',
        category: 'core',
        enabled: true,
        description: 'NPM version, bundlephobia size, tree-shaking badge',
        content: `# 📦 nano-cache

> Tiny (< 1.2 KB), high-performance in-memory LRU & TTL cache for Node.js, browsers, and edge runtimes. Dual ESM & CJS.

[![npm version](https://img.shields.io/npm/v/nano-cache.svg?style=for-the-badge&color=CB3837&logo=npm)](https://npmjs.com/package/nano-cache)
[![bundle size](https://img.shields.io/bundlephobia/minzip/nano-cache?style=for-the-badge&color=10B981)](https://bundlephobia.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178C6?style=for-the-badge&logo=typescript)](https://typescriptlang.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)`
      },
      {
        id: 'quickstart',
        title: 'Install & Code Examples',
        icon: 'code-slash',
        category: 'technical',
        enabled: true,
        description: 'Installation commands and quick TypeScript code snippet',
        content: `## ⚡ Quickstart

\`\`\`bash
npm install nano-cache
# or pnpm
pnpm add nano-cache
\`\`\`

\`\`\`typescript
import { createCache } from 'nano-cache';

const cache = createCache<string, UserProfile>({
  maxItems: 5000,
  ttlMs: 60 * 1000, // 1 minute eviction
});

cache.set('user:42', { name: 'Alex Rivera', role: 'Maintainer' });
const user = cache.get('user:42');
\`\`\``
      }
    ]
  },
  {
    id: 'github-profile-template',
    title: 'Developer GitHub Profile',
    subtitle: 'Typing Header, Tech Badges, Stats & Dynamic Repo Showcase',
    category: 'profile',
    stars: 6200,
    tags: ['GitHub Profile', 'Markdown', 'Badges', 'Stats', 'Bio'],
    recommendedFor: ['Students', 'Job Seekers', 'Freelancers', 'Engineers'],
    description: 'Transform your GitHub profile into a captivating developer portfolio with animated headers, live stats, and tech stack grids.',
    blocks: [
      {
        id: 'profile-hero',
        title: 'Hero & Typing Headline',
        icon: 'person',
        category: 'core',
        enabled: true,
        description: 'Personal greeting and dynamically typing title',
        content: `# Hi there! 👋 I'm **Devin Vance**

<h3 align="left">Senior Full-Stack Engineer & Open Source Architect</h3>

<p align="left">
  <img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&weight=600&size=20&pause=1000&color=00F0FF&vCenter=true&random=false&width=500&lines=Building+scalable+distributed+systems;Crafting+developer-first+tools;Obsessed+with+performance+%26+DX;Contributing+to+OSS+ecosystems" alt="Typing SVG" />
</p>`
      },
      {
        id: 'about-me',
        title: 'About Me & Status',
        icon: 'document-text',
        category: 'core',
        enabled: true,
        description: 'Current projects, what you are learning, how to reach you',
        content: `## 🔭 About Me

- 🔭 I’m currently architecting high-throughput cloud runtimes at **ScaleForge**
- 🌱 I’m currently diving deep into **Rust WASM & distributed consensus protocols**
- 💬 Ask me about **Next.js, TypeScript, PostgreSQL, and system design**
- ⚡ Fun fact: I drink approximately 4 cold brews before committing to \`main\`
- 📫 Connect with me: [LinkedIn](https://linkedin.com) • [X / Twitter](https://twitter.com) • [Personal Blog](https://devinvance.io)`
      },
      {
        id: 'tech-grid',
        title: 'Tech Stack Badges',
        icon: 'grid',
        category: 'technical',
        enabled: true,
        description: 'Badges representing languages, frameworks, cloud & tools',
        content: `## 🛠️ Tech Stack & Toolbelt

### Languages & Frameworks
<p align="left">
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white" />
  <img src="https://img.shields.io/badge/Rust-000000?style=for-the-badge&logo=rust&logoColor=white" />
</p>

### Cloud & DevOps
<p align="left">
  <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" />
  <img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" />
  <img src="https://img.shields.io/badge/AWS-232F3E?style=for-the-badge&logo=amazonwebservices&logoColor=white" />
  <img src="https://img.shields.io/badge/Cloudflare-F38020?style=for-the-badge&logo=cloudflare&logoColor=white" />
</p>`
      },
      {
        id: 'github-stats',
        title: 'GitHub Stats & Streak Cards',
        icon: 'sparkles',
        category: 'technical',
        enabled: true,
        description: 'Live GitHub commits, PRs, stars and streak widgets',
        content: `## 📊 GitHub Analytics

<p align="left">
  <img src="https://github-readme-stats.vercel.app/api?username=torvalds&show_icons=true&theme=tokyonight&hide_border=true&count_private=true" alt="GitHub Stats" width="48%" />
  <img src="https://github-readme-streak-stats.herokuapp.com/?user=torvalds&theme=tokyonight&hide_border=true" alt="GitHub Streak" width="48%" />
</p>`
      }
    ]
  }
];
