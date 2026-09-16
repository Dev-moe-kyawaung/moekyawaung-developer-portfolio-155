export type ToolId = 
  | 'dashboard'
  | 'readme' 
  | 'profile' 
  | 'badges' 
  | 'filetree' 
  | 'license' 
  | 'changelog' 
  | 'socialcard' 
  | 'architecture';

export type TemplateCategory = 
  | 'all'
  | 'fullstack' 
  | 'frontend' 
  | 'backend' 
  | 'ai-ml' 
  | 'mobile' 
  | 'cli' 
  | 'library' 
  | 'profile';

export interface ReadmeBlock {
  id: string;
  title: string;
  icon: string;
  category: 'core' | 'technical' | 'docs' | 'meta';
  enabled: boolean;
  content: string;
  description: string;
}

export interface ReadmeTemplate {
  id: string;
  title: string;
  subtitle: string;
  category: TemplateCategory;
  stars: number;
  tags: string[];
  description: string;
  recommendedFor: string[];
  blocks: ReadmeBlock[];
}

export interface BadgeItem {
  id: string;
  label: string;
  message: string;
  color: string;
  logo: string;
  logoColor?: string;
  style: 'flat' | 'flat-square' | 'for-the-badge' | 'plastic' | 'social';
  category: 'languages' | 'frameworks' | 'backend' | 'cloud' | 'status' | 'custom';
}

export interface FileNode {
  id: string;
  name: string;
  type: 'file' | 'folder';
  description?: string;
  children?: FileNode[];
}

export interface LicenseInfo {
  id: string;
  spdxId: string;
  name: string;
  category: 'permissive' | 'copyleft' | 'public-domain';
  summary: string;
  permissions: string[];
  conditions: string[];
  limitations: string[];
  templateText: string;
}

export interface ChangelogEntry {
  id: string;
  type: 'feat' | 'fix' | 'perf' | 'breaking' | 'docs' | 'chore';
  title: string;
  pr?: string;
  author?: string;
}

export interface ChangelogRelease {
  version: string;
  date: string;
  tagline: string;
  entries: ChangelogEntry[];
}

export interface ProfileConfig {
  name: string;
  username: string;
  role: string;
  bio: string;
  typingTexts: string[];
  location: string;
  company: string;
  statsTheme: 'tokyonight' | 'radical' | 'github_dark' | 'dracula' | 'cyberpunk';
  showStats: boolean;
  showStreak: boolean;
  showTopLangs: boolean;
  techBadges: string[];
  socials: {
    github?: string;
    twitter?: string;
    linkedin?: string;
    website?: string;
    email?: string;
  };
  workingOn: string;
  learning: string;
  collaborateOn: string;
  funFact: string;
}

export interface SocialCardConfig {
  title: string;
  subtitle: string;
  repoOwner: string;
  repoName: string;
  theme: 'cyber-cyan' | 'neon-violet' | 'emerald-forge' | 'midnight-slate' | 'amber-blaze';
  starCount: number;
  forkCount: number;
  license: string;
  language: string;
  tags: string[];
}

export interface ProjectRecord {
  id: string;
  title: string;
  toolType: ToolId;
  updatedAt: string;
  content: string;
  summary: string;
}
