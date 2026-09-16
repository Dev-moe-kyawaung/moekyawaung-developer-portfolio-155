import { BadgeItem } from '../types';

export const POPULAR_BADGES: BadgeItem[] = [
  // Languages
  { id: 'ts', label: 'TypeScript', message: '5.6', color: '3178C6', logo: 'typescript', logoColor: 'white', style: 'for-the-badge', category: 'languages' },
  { id: 'js', label: 'JavaScript', message: 'ES2024', color: 'F7DF1E', logo: 'javascript', logoColor: 'black', style: 'for-the-badge', category: 'languages' },
  { id: 'python', label: 'Python', message: '3.12+', color: '3776AB', logo: 'python', logoColor: 'white', style: 'for-the-badge', category: 'languages' },
  { id: 'rust', label: 'Rust', message: '1.81', color: '000000', logo: 'rust', logoColor: 'white', style: 'for-the-badge', category: 'languages' },
  { id: 'go', label: 'Go', message: '1.23', color: '00ADD8', logo: 'go', logoColor: 'white', style: 'for-the-badge', category: 'languages' },
  { id: 'kotlin', label: 'Kotlin', message: '2.0', color: '7F52FF', logo: 'kotlin', logoColor: 'white', style: 'for-the-badge', category: 'languages' },
  { id: 'swift', label: 'Swift', message: '6.0', color: 'F05138', logo: 'swift', logoColor: 'white', style: 'for-the-badge', category: 'languages' },
  { id: 'cpp', label: 'C++', message: '20', color: '00599C', logo: 'cplusplus', logoColor: 'white', style: 'for-the-badge', category: 'languages' },

  // Frameworks
  { id: 'react', label: 'React', message: '19', color: '61DAFB', logo: 'react', logoColor: 'black', style: 'for-the-badge', category: 'frameworks' },
  { id: 'nextjs', label: 'Next.js', message: '15', color: '000000', logo: 'nextdotjs', logoColor: 'white', style: 'for-the-badge', category: 'frameworks' },
  { id: 'react-native', label: 'React Native', message: '0.76', color: '61DAFB', logo: 'react', logoColor: 'black', style: 'for-the-badge', category: 'frameworks' },
  { id: 'expo', label: 'Expo', message: 'SDK 52', color: '000020', logo: 'expo', logoColor: 'white', style: 'for-the-badge', category: 'frameworks' },
  { id: 'tailwind', label: 'Tailwind CSS', message: '3.4', color: '06B6D4', logo: 'tailwindcss', logoColor: 'white', style: 'for-the-badge', category: 'frameworks' },
  { id: 'vue', label: 'Vue.js', message: '3.5', color: '4FC08D', logo: 'vuedotjs', logoColor: 'white', style: 'for-the-badge', category: 'frameworks' },
  { id: 'svelte', label: 'SvelteKit', message: '2.0', color: 'FF3E00', logo: 'svelte', logoColor: 'white', style: 'for-the-badge', category: 'frameworks' },

  // Backend & DB
  { id: 'nodejs', label: 'Node.js', message: '22 LTS', color: '339933', logo: 'nodedotjs', logoColor: 'white', style: 'for-the-badge', category: 'backend' },
  { id: 'fastapi', label: 'FastAPI', message: '0.115', color: '009688', logo: 'fastapi', logoColor: 'white', style: 'for-the-badge', category: 'backend' },
  { id: 'postgres', label: 'PostgreSQL', message: '16', color: '4169E1', logo: 'postgresql', logoColor: 'white', style: 'for-the-badge', category: 'backend' },
  { id: 'supabase', label: 'Supabase', message: 'v2', color: '3ECF8E', logo: 'supabase', logoColor: 'white', style: 'for-the-badge', category: 'backend' },
  { id: 'redis', label: 'Redis', message: '7.4', color: 'DC382D', logo: 'redis', logoColor: 'white', style: 'for-the-badge', category: 'backend' },
  { id: 'prisma', label: 'Prisma', message: '5.20', color: '2D3748', logo: 'prisma', logoColor: 'white', style: 'for-the-badge', category: 'backend' },
  { id: 'graphql', label: 'GraphQL', message: 'Ready', color: 'E10098', logo: 'graphql', logoColor: 'white', style: 'for-the-badge', category: 'backend' },

  // Cloud & DevOps
  { id: 'docker', label: 'Docker', message: 'Container', color: '2496ED', logo: 'docker', logoColor: 'white', style: 'for-the-badge', category: 'cloud' },
  { id: 'kubernetes', label: 'Kubernetes', message: '1.31', color: '326CE5', logo: 'kubernetes', logoColor: 'white', style: 'for-the-badge', category: 'cloud' },
  { id: 'cloudflare', label: 'Cloudflare', message: 'Workers', color: 'F38020', logo: 'cloudflare', logoColor: 'white', style: 'for-the-badge', category: 'cloud' },
  { id: 'aws', label: 'AWS', message: 'Cloud', color: '232F3E', logo: 'amazonwebservices', logoColor: 'white', style: 'for-the-badge', category: 'cloud' },
  { id: 'vercel', label: 'Vercel', message: 'Deployed', color: '000000', logo: 'vercel', logoColor: 'white', style: 'for-the-badge', category: 'cloud' },
  { id: 'github-actions', label: 'CI/CD', message: 'Passing', color: '2088FF', logo: 'githubactions', logoColor: 'white', style: 'for-the-badge', category: 'cloud' },

  // Status & Meta
  { id: 'license-mit', label: 'License', message: 'MIT', color: '10B981', logo: '', style: 'for-the-badge', category: 'status' },
  { id: 'prs-welcome', label: 'PRs', message: 'Welcome', color: '8B5CF6', logo: 'gitpullrequest', logoColor: 'white', style: 'for-the-badge', category: 'status' },
  { id: 'stars', label: 'GitHub', message: '⭐ Star', color: '00F0FF', logo: 'github', logoColor: 'black', style: 'for-the-badge', category: 'status' },
  { id: 'maintenance', label: 'Maintained', message: 'Yes (2026)', color: '10B981', logo: '', style: 'for-the-badge', category: 'status' }
];

export function generateBadgeUrl(badge: BadgeItem): string {
  const labelPart = badge.label ? `${encodeURIComponent(badge.label)}-` : '';
  const messagePart = encodeURIComponent(badge.message);
  const colorPart = encodeURIComponent(badge.color);
  let url = `https://img.shields.io/badge/${labelPart}${messagePart}-${colorPart}?style=${badge.style}`;
  if (badge.logo) {
    url += `&logo=${encodeURIComponent(badge.logo)}`;
  }
  if (badge.logoColor) {
    url += `&logoColor=${encodeURIComponent(badge.logoColor)}`;
  }
  return url;
}

export function generateBadgeMarkdown(badge: BadgeItem, linkUrl?: string): string {
  const badgeUrl = generateBadgeUrl(badge);
  const alt = `${badge.label} ${badge.message}`.trim();
  if (linkUrl) {
    return `[![${alt}](${badgeUrl})](${linkUrl})`;
  }
  return `![${alt}](${badgeUrl})`;
}
