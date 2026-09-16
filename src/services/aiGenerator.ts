import { ReadmeBlock } from '../types';

interface GenerateOptions {
  projectName: string;
  tagline: string;
  techStack: string[];
  features: string[];
  authorName: string;
  license: string;
  includeEnvVars?: boolean;
  includeArchitecture?: boolean;
  includeRoadmap?: boolean;
}

export function generateCustomReadme(options: GenerateOptions): ReadmeBlock[] {
  const {
    projectName,
    tagline,
    techStack,
    features,
    authorName,
    license,
    includeEnvVars = true,
    includeArchitecture = true,
    includeRoadmap = true
  } = options;

  const primaryTech = techStack[0] || 'TypeScript';

  const blocks: ReadmeBlock[] = [
    {
      id: 'hero',
      title: 'Project Header & Badges',
      icon: 'cube',
      category: 'core',
      enabled: true,
      description: 'Project branding and status shields',
      content: `# ⚡ ${projectName}

> ${tagline}

[![License: ${license}](https://img.shields.io/badge/License-${encodeURIComponent(license)}-10B981?style=for-the-badge)](LICENSE)
[![Tech: ${primaryTech}](https://img.shields.io/badge/Built_With-${encodeURIComponent(primaryTech)}-00F0FF?style=for-the-badge)](https://github.com)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-8B5CF6?style=for-the-badge)](CONTRIBUTING.md)
[![Status: Production](https://img.shields.io/badge/Status-Active-brightgreen?style=for-the-badge)](https://github.com)`
    },
    {
      id: 'features',
      title: 'Key Features & Capabilities',
      icon: 'sparkles',
      category: 'core',
      enabled: true,
      description: 'Core benefits and standout features',
      content: `## 🌟 Key Features

${features.map(f => `- **⚡ ${f}**: Built with high reliability, strict type safety, and minimal latency.`).join('\n')}
- **🛡️ Battle-Tested Security**: Compliant with OWASP standards, role-based authorization, and sanitized inputs.
- **📈 Real-Time Telemetry**: Observability metrics, health check endpoints, and structured logging.`
    },
    {
      id: 'tech-stack',
      title: 'Tech Stack',
      icon: 'layers',
      category: 'technical',
      enabled: true,
      description: 'Languages, frameworks and libraries powering the repository',
      content: `## 🛠️ Tech Stack & Ecosystem

${techStack.map(tech => `- **${tech}** - Core runtime & engineering foundation`).join('\n')}

<p align="left">
${techStack.map(t => `  <img src="https://img.shields.io/badge/${encodeURIComponent(t)}-232E43?style=for-the-badge&logo=${encodeURIComponent(t.toLowerCase().replace('.', 'dot'))}&logoColor=00F0FF" />`).join('\n')}
</p>`
    }
  ];

  if (includeArchitecture) {
    blocks.push({
      id: 'architecture',
      title: 'System Architecture',
      icon: 'git-network',
      category: 'technical',
      enabled: true,
      description: 'High-level flow and component interaction',
      content: `## 🏛️ System Architecture

\`\`\`mermaid
flowchart TD
    User([User / Browser]) --> CDN[Edge CDN / DNS]
    CDN --> Gateway[API Gateway / Server Layer]
    Gateway --> Auth[Auth & RBAC Middleware]
    Auth --> AppEngine[${projectName} Engine]
    AppEngine --> DB[(Primary Database)]
    AppEngine --> Cache[(Redis Cache)]
\`\`\``
    });
  }

  blocks.push({
    id: 'quickstart',
    title: 'Installation & Quickstart',
    icon: 'terminal',
    category: 'technical',
    enabled: true,
    description: 'Step-by-step setup commands',
    content: `## 🚀 Getting Started

### 📋 Prerequisites
- **Runtime**: Node.js \`>= 20.0.0\` or appropriate runtime
- **Package Manager**: \`pnpm\` / \`npm\` / \`yarn\`

### 💻 Local Setup

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/${authorName.toLowerCase().replace(/\s+/g, '-')}/${projectName.toLowerCase().replace(/\s+/g, '-')}.git
   cd ${projectName.toLowerCase().replace(/\s+/g, '-')}
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   pnpm install
   \`\`\`

3. **Start local development server**
   \`\`\`bash
   pnpm dev
   \`\`\`

Visit \`http://localhost:3000\` in your browser to start developing.`
  });

  if (includeEnvVars) {
    blocks.push({
      id: 'env-vars',
      title: 'Environment Variables',
      icon: 'key',
      category: 'technical',
      enabled: true,
      description: 'Configuration options and secrets',
      content: `## 🔑 Environment Variables

Copy \`.env.example\` to \`.env.local\` and populate the values:

| Variable | Description | Required | Example |
|---|---|:---:|---|
| \`APP_URL\` | Base application endpoint | Yes | \`http://localhost:3000\` |
| \`DATABASE_URL\` | Database connection string | Yes | \`postgresql://user:pass@localhost:5432/app\` |
| \`API_KEY\` | Third-party provider access token | No | \`df_live_...\` |
| \`NODE_ENV\` | Runtime environment | No | \`development\` |`
    });
  }

  if (includeRoadmap) {
    blocks.push({
      id: 'roadmap',
      title: 'Roadmap & Milestones',
      icon: 'git-branch',
      category: 'docs',
      enabled: true,
      description: 'Upcoming features and development goals',
      content: `## 🗺️ Roadmap

- [x] Initial release & core architecture scaffolding
- [x] Automated CI/CD pipeline and unit test coverage
- [ ] Distributed cache synchronization
- [ ] Native mobile SDK companion
- [ ] Enterprise SSO (SAML/Okta) integration`
    });
  }

  blocks.push({
    id: 'license',
    title: 'License & Author',
    icon: 'shield-checkmark',
    category: 'meta',
    enabled: true,
    description: 'Legal terms and acknowledgments',
    content: `## 📜 License

Distributed under the **${license} License**. See \`LICENSE\` for full legal details.

---
Maintained with ⚡ by **${authorName}** and the open-source community.`
  });

  return blocks;
}

export function compileBlocksToMarkdown(blocks: ReadmeBlock[]): string {
  return blocks
    .filter(b => b.enabled)
    .map(b => b.content.trim())
    .join('\n\n---\n\n');
}
