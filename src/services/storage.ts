import AsyncStorage from '@react-native-async-storage/async-storage';
import { ProjectRecord } from '../types';

const PROJECTS_KEY = '@devforge_projects_v1';
const FAVORITES_KEY = '@devforge_favorites_v1';

export async function loadSavedProjects(): Promise<ProjectRecord[]> {
  try {
    const data = await AsyncStorage.getItem(PROJECTS_KEY);
    if (!data) return getDefaultProjects();
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : getDefaultProjects();
  } catch (e) {
    console.warn('Failed to load projects from storage:', e);
    return getDefaultProjects();
  }
}

export async function saveProject(project: ProjectRecord): Promise<void> {
  try {
    const current = await loadSavedProjects();
    const index = current.findIndex(p => p.id === project.id);
    let updated: ProjectRecord[];
    if (index >= 0) {
      updated = [...current];
      updated[index] = { ...project, updatedAt: new Date().toISOString() };
    } else {
      updated = [{ ...project, updatedAt: new Date().toISOString() }, ...current];
    }
    await AsyncStorage.setItem(PROJECTS_KEY, JSON.stringify(updated));
  } catch (e) {
    console.warn('Failed to save project:', e);
  }
}

export async function deleteProject(id: string): Promise<ProjectRecord[]> {
  try {
    const current = await loadSavedProjects();
    const updated = current.filter(p => p.id !== id);
    await AsyncStorage.setItem(PROJECTS_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.warn('Failed to delete project:', e);
    return [];
  }
}

function getDefaultProjects(): ProjectRecord[] {
  return [
    {
      id: 'demo-nextjs',
      title: 'NexusFlow SaaS Documentation',
      toolType: 'readme',
      updatedAt: new Date().toISOString(),
      summary: 'Production Next.js 15 README with auth and Stripe',
      content: '# ⚡ NexusFlow SaaS\n\nProduction-ready workspace management platform...'
    },
    {
      id: 'demo-profile',
      title: 'Devin Vance GitHub Portfolio',
      toolType: 'profile',
      updatedAt: new Date(Date.now() - 3600000 * 24).toISOString(),
      summary: 'Animated typing bio, top tech badges, and GitHub stats',
      content: '# Hi there! 👋 I am Devin Vance...'
    },
    {
      id: 'demo-tree',
      title: 'App Router Architecture Tree',
      toolType: 'filetree',
      updatedAt: new Date(Date.now() - 3600000 * 48).toISOString(),
      summary: 'ASCII directory structure for Clean Next.js project',
      content: 'my-next-saas/\n├── src/\n│   ├── app/\n...'
    }
  ];
}
