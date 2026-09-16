import { FileNode } from '../types';

export interface FileTreePreset {
  id: string;
  name: string;
  description: string;
  rootNode: FileNode;
}

export const FILE_TREE_PRESETS: FileTreePreset[] = [
  {
    id: 'nextjs-15',
    name: 'Next.js 15 (App Router)',
    description: 'Modern App Router layout with server actions, components and lib',
    rootNode: {
      id: 'root',
      name: 'my-next-saas',
      type: 'folder',
      children: [
        {
          id: 'src',
          name: 'src',
          type: 'folder',
          children: [
            {
              id: 'app',
              name: 'app',
              type: 'folder',
              description: 'App router routes & layouts',
              children: [
                { id: 'f-layout', name: 'layout.tsx', type: 'file', description: 'Root layout with providers' },
                { id: 'f-page', name: 'page.tsx', type: 'file', description: 'Landing page entry' },
                { id: 'f-loading', name: 'loading.tsx', type: 'file', description: 'Streaming skeleton state' },
                { id: 'f-api', name: 'api', type: 'folder', children: [
                  { id: 'f-webhook', name: 'webhooks/route.ts', type: 'file', description: 'Stripe webhook listener' }
                ]},
                { id: 'f-dash', name: 'dashboard', type: 'folder', children: [
                  { id: 'f-dash-page', name: 'page.tsx', type: 'file', description: 'Protected user dashboard' }
                ]}
              ]
            },
            {
              id: 'components',
              name: 'components',
              type: 'folder',
              description: 'Reusable UI & feature components',
              children: [
                { id: 'c-ui', name: 'ui', type: 'folder', description: 'Button, Modal, Input, Badge' },
                { id: 'c-navbar', name: 'Navbar.tsx', type: 'file' },
                { id: 'c-hero', name: 'Hero.tsx', type: 'file' }
              ]
            },
            {
              id: 'lib',
              name: 'lib',
              type: 'folder',
              description: 'Prisma, Supabase & utility clients',
              children: [
                { id: 'l-prisma', name: 'prisma.ts', type: 'file' },
                { id: 'l-supabase', name: 'supabase.ts', type: 'file' },
                { id: 'l-utils', name: 'utils.ts', type: 'file' }
              ]
            }
          ]
        },
        { id: 'prisma-dir', name: 'prisma', type: 'folder', children: [
          { id: 'p-schema', name: 'schema.prisma', type: 'file', description: 'Database schema & migrations' }
        ]},
        { id: 'f-env', name: '.env.example', type: 'file', description: 'Environment variable templates' },
        { id: 'f-pkg', name: 'package.json', type: 'file' },
        { id: 'f-readme', name: 'README.md', type: 'file' }
      ]
    }
  },
  {
    id: 'clean-architecture',
    name: 'Clean Architecture / DDD',
    description: 'Separation of concerns: Domain, Application, Infrastructure, Presentation',
    rootNode: {
      id: 'root-ca',
      name: 'enterprise-core',
      type: 'folder',
      children: [
        {
          id: 'ca-src',
          name: 'src',
          type: 'folder',
          children: [
            {
              id: 'ca-domain',
              name: 'domain',
              type: 'folder',
              description: 'Core entities, value objects & business rules',
              children: [
                { id: 'ca-entities', name: 'entities', type: 'folder' },
                { id: 'ca-repo-interfaces', name: 'repositories', type: 'folder' },
                { id: 'ca-errors', name: 'errors', type: 'folder' }
              ]
            },
            {
              id: 'ca-application',
              name: 'application',
              type: 'folder',
              description: 'Use cases, commands, queries & DTOs',
              children: [
                { id: 'ca-usecases', name: 'use-cases', type: 'folder' },
                { id: 'ca-dtos', name: 'dtos', type: 'folder' }
              ]
            },
            {
              id: 'ca-infra',
              name: 'infrastructure',
              type: 'folder',
              description: 'Database, external APIs, queue adapters',
              children: [
                { id: 'ca-db', name: 'database', type: 'folder' },
                { id: 'ca-mailer', name: 'mailer', type: 'folder' }
              ]
            },
            {
              id: 'ca-presentation',
              name: 'presentation',
              type: 'folder',
              description: 'HTTP controllers, middlewares, GraphQL schemas',
              children: [
                { id: 'ca-controllers', name: 'controllers', type: 'folder' },
                { id: 'ca-middlewares', name: 'middlewares', type: 'folder' }
              ]
            }
          ]
        },
        { id: 'ca-tests', name: 'tests', type: 'folder', description: 'Unit, integration & contract specs' },
        { id: 'ca-docker', name: 'Dockerfile', type: 'file' }
      ]
    }
  },
  {
    id: 'react-native-expo',
    name: 'React Native & Expo SDK 52',
    description: 'Production Expo Router folder structure with screens, hooks and services',
    rootNode: {
      id: 'root-rn',
      name: 'pulsefit-mobile',
      type: 'folder',
      children: [
        {
          id: 'rn-app',
          name: 'app',
          type: 'folder',
          description: 'Expo Router file-based navigation',
          children: [
            { id: 'rn-tabs', name: '(tabs)', type: 'folder', children: [
              { id: 'rn-home', name: 'index.tsx', type: 'file' },
              { id: 'rn-stats', name: 'stats.tsx', type: 'file' },
              { id: 'rn-profile', name: 'profile.tsx', type: 'file' }
            ]},
            { id: 'rn-layout', name: '_layout.tsx', type: 'file', description: 'Global Providers & Navigation stack' },
            { id: 'rn-modal', name: 'modal.tsx', type: 'file' }
          ]
        },
        { id: 'rn-assets', name: 'assets', type: 'folder', description: 'Images, fonts & vector icons' },
        { id: 'rn-components', name: 'components', type: 'folder', description: 'Atomic UI blocks' },
        { id: 'rn-hooks', name: 'hooks', type: 'folder', description: 'Custom reactive hooks' },
        { id: 'rn-store', name: 'store', type: 'folder', description: 'Zustand persistent state' },
        { id: 'rn-app-json', name: 'app.json', type: 'file' },
        { id: 'rn-eas', name: 'eas.json', type: 'file', description: 'EAS build profiles' }
      ]
    }
  },
  {
    id: 'fastapi-ai',
    name: 'Python FastAPI AI Service',
    description: 'Asynchronous Python architecture for LLM pipelines and vector stores',
    rootNode: {
      id: 'root-fa',
      name: 'synapse-fastapi',
      type: 'folder',
      children: [
        {
          id: 'fa-app',
          name: 'app',
          type: 'folder',
          children: [
            { id: 'fa-api', name: 'api', type: 'folder', children: [
              { id: 'fa-v1', name: 'v1', type: 'folder', children: [
                { id: 'fa-chat', name: 'chat.py', type: 'file', description: 'Streaming LLM completion endpoints' },
                { id: 'fa-embeddings', name: 'embeddings.py', type: 'file' }
              ]}
            ]},
            { id: 'fa-core', name: 'core', type: 'folder', children: [
              { id: 'fa-config', name: 'config.py', type: 'file', description: 'Pydantic Settings & envs' },
              { id: 'fa-security', name: 'security.py', type: 'file' }
            ]},
            { id: 'fa-services', name: 'services', type: 'folder', children: [
              { id: 'fa-agent', name: 'agent_runner.py', type: 'file' },
              { id: 'fa-vectordb', name: 'vector_store.py', type: 'file' }
            ]},
            { id: 'fa-main', name: 'main.py', type: 'file', description: 'FastAPI app declaration' }
          ]
        },
        { id: 'fa-compose', name: 'docker-compose.yml', type: 'file', description: 'Postgres + Redis + Qdrant' },
        { id: 'fa-pyproject', name: 'pyproject.toml', type: 'file' }
      ]
    }
  }
];

export function renderFileTreeAscii(node: FileNode, prefix = '', isLast = true): string {
  let result = '';
  
  if (node.id !== 'root' && node.id !== 'root-ca' && node.id !== 'root-rn' && node.id !== 'root-fa') {
    const connector = isLast ? '└── ' : '├── ';
    const desc = node.description ? `  # ${node.description}` : '';
    result += `${prefix}${connector}${node.name}${desc}\n`;
  } else {
    result += `${node.name}/\n`;
  }

  if (node.children && node.children.length > 0) {
    const childPrefix = (node.id === 'root' || node.id.startsWith('root-')) 
      ? '' 
      : prefix + (isLast ? '    ' : '│   ');
      
    node.children.forEach((child, index) => {
      const childIsLast = index === node.children!.length - 1;
      result += renderFileTreeAscii(child, childPrefix, childIsLast);
    });
  }

  return result;
}
