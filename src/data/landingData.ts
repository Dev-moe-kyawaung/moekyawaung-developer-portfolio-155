export const STATS = [
  { label: 'READMEs Generated', value: '185,000+', change: '+24% this month' },
  { label: 'GitHub Stars Boosted', value: '42,800+', change: '3.4x average increase' },
  { label: 'Developer Satisfaction', value: '99.4%', change: 'Based on 14k+ reviews' },
  { label: 'AI Generation Latency', value: '< 250ms', change: 'Edge token inference' }
];

export const HOW_IT_WORKS_STEPS = [
  {
    step: '01',
    title: 'Select Tech Stack & Persona',
    badge: 'Zero Configuration',
    description: 'Choose your programming framework or paste your GitHub repository URL. DevForge automatically detects dependencies, packages, and architecture patterns.',
    codeSnippet: 'npx devforge-ai@latest init\n// Detected: Next.js 15, TypeScript, Tailwind, Prisma'
  },
  {
    step: '02',
    title: 'Customize with Modular Blocks & AI',
    badge: 'Context-Aware AI',
    description: 'Drag, reorder, and toggle block components: Hero Banners, Dynamic Shields.io Badges, Mermaid Architecture Diagrams, Env Tables, and Step-by-Step Installers.',
    codeSnippet: 'DevForge.forge({\n  blocks: ["hero", "badges", "architecture", "env_vars"],\n  tone: "concise-senior-engineer"\n})'
  },
  {
    step: '03',
    title: 'Instant Live Preview & GitHub Sync',
    badge: 'GitHub Flavored Markdown',
    description: 'Review rendered output in GitHub Dark or Light mode. Copy raw markdown with a single keystroke, download assets, or push directly to your repository.',
    codeSnippet: 'git commit -m "docs: forge enterprise README with DevForge AI"\ngit push origin main'
  }
];

export const COMPARISON_FEATURES = [
  {
    feature: 'Context-Aware AI Suggestions',
    devforge: 'Yes (Detects frameworks & best practices)',
    manual: 'No (Slow, manual writing)',
    genericAi: 'Limited (Generic text with markdown bugs)',
    staticGens: 'No (Static text strings)'
  },
  {
    feature: 'Live GitHub-Flavored Markdown Preview',
    devforge: 'Real-time dual theme preview',
    manual: 'Requires separate plugin / previewer',
    genericAi: 'Unrendered text walls',
    staticGens: 'Partial styling only'
  },
  {
    feature: 'Comprehensive Developer Asset Suite',
    devforge: '8 Core Tools (Profile, Badges, Trees, Licenses, OG Cards)',
    manual: 'Scattered across 10 different bookmark sites',
    genericAi: 'Only outputs raw text',
    staticGens: 'README only'
  },
  {
    feature: 'ASCII Tree & Diagram Generation',
    devforge: 'Interactive Tree Architect with stack presets',
    manual: 'Tedious character-by-character alignment',
    genericAi: 'Often generates misaligned Unicode',
    staticGens: 'Not supported'
  },
  {
    feature: 'Interactive Shields.io Badge Smith',
    devforge: '60+ Logos, live colors, tray collector',
    manual: 'Manually copy-pasting URL parameters',
    genericAi: 'Broken URLs and invalid logo slugs',
    staticGens: 'Hardcoded presets only'
  },
  {
    feature: 'License & Legal Matrix Wizard',
    devforge: 'Interactive rights selector + copyright injection',
    manual: 'Must find template on choosealicense.com',
    genericAi: 'Incomplete legal boilerplate',
    staticGens: 'Static text snippets'
  }
];

export const TESTIMONIALS = [
  {
    name: 'Elena Rostova',
    role: 'Principal Staff Engineer',
    company: 'HyperScale Systems',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    stars: 5,
    quote: 'DevForge AI completely upgraded our open source projects. Our flagship repo received over 1,200 new stars in the first week after replacing our old boring docs with a DevForge README and architecture diagram.'
  },
  {
    name: 'Marcus Chen',
    role: 'Founder & OSS Maintainer',
    company: 'TurboCache Labs',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    stars: 5,
    quote: 'The Badge Smith and File Tree Architect alone saved me hours on every microservice we spin up. The dark aesthetic and keyboard shortcuts feel like a tool made by developers who actually ship.'
  },
  {
    name: 'Sarah Lindqvist',
    role: 'Developer Relations Lead',
    company: 'Aether Cloud',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    stars: 5,
    quote: 'Our engineering onboarding time dropped significantly because new hires now get crystal clear repo structures, exact environment variable tables, and copy-paste run commands.'
  }
];

export const FAQ_ITEMS = [
  {
    question: 'What is DevForge AI and who is it built for?',
    answer: 'DevForge AI is an all-in-one developer productivity platform designed specifically for software engineers, open-source maintainers, startups, and tech writers. It provides context-aware AI tools to forge production-grade READMEs, GitHub Profile portfolios, custom Shields.io badge strips, ASCII directory trees, release notes, license files, and social OG preview images.'
  },
  {
    question: 'Is my repository code or private intellectual property secure?',
    answer: 'Yes, 100%. DevForge AI operates on a client-first security model. We do not store your proprietary code or tokens on unauthorized servers. When generating markdown or configuring env tables, templates are processed with local privacy-preserving standards.'
  },
  {
    question: 'How is DevForge AI different from asking ChatGPT or Claude?',
    answer: 'Generic LLMs often hallucinate broken markdown URLs, outdated badges, invalid shields.io parameters, and misaligned file trees. DevForge combines AI reasoning with strict structural validation, real shields.io logo catalogs, live GitHub Flavored Markdown rendering, and an interactive block system where you can reorder sections visually.'
  },
  {
    question: 'Can I export the assets to my local machine or CI/CD?',
    answer: 'Absolutely. You can copy raw markdown with one click, download `.md` files directly, export ASCII trees, copy pre-formatted pull request templates, and export complete project packages.'
  },
  {
    question: 'Does DevForge AI support fullstack, mobile, and systems languages?',
    answer: 'Yes! We have native presets and templates for Next.js 15, React, React Native / Expo, Node.js, Python (FastAPI/PyTorch), Go microservices, Rust CLI tools, TypeScript libraries, and personal GitHub profiles.'
  },
  {
    question: 'Is there a cost to use DevForge AI?',
    answer: 'The core DevForge AI web and mobile studio is free to use with all 8 core developer tools, live previews, and template libraries. Optional team collaboration and enterprise cloud sync features are available for engineering organizations.'
  }
];
