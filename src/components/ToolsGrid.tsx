import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, useWindowDimensions } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { ToolId } from '../types';

interface ToolsGridProps {
  onSelectTool: (toolId: ToolId) => void;
}

export const TOOLS_LIST = [
  {
    id: 'readme' as ToolId,
    title: 'README Forge',
    subtitle: 'Block-Based AI Engine',
    desc: 'Assemble production-ready markdown with 30+ reusable blocks, dynamic tech stacks, and live GitHub-styled preview.',
    icon: 'document-text',
    color: '#00F0FF',
    badge: 'Flagship',
  },
  {
    id: 'profile' as ToolId,
    title: 'GitHub Profile Studio',
    subtitle: 'Dynamic Portfolio Builder',
    desc: 'Interactive bio generator with typing headers, streak counters, top languages widgets, and trophy badges.',
    icon: 'person',
    color: '#8B5CF6',
    badge: 'Popular',
  },
  {
    id: 'badges' as ToolId,
    title: 'Badge Smith',
    subtitle: 'Custom Shields.io Engine',
    desc: 'Craft custom shields.io badges with 60+ official tech logos, custom hex palettes, styles, and tray export.',
    icon: 'shield-checkmark',
    color: '#10B981',
    badge: 'Essential',
  },
  {
    id: 'filetree' as ToolId,
    title: 'File Tree Architect',
    subtitle: 'ASCII & Unicode Visualizer',
    desc: 'Generate clean directory hierarchies with pre-configured Next.js, Clean Arch, React Native, and FastAPI templates.',
    icon: 'folder-open',
    color: '#F59E0B',
    badge: 'Precision',
  },
  {
    id: 'license' as ToolId,
    title: 'License Selector',
    subtitle: 'Interactive Rights Matrix',
    desc: 'Choose the right open-source license (MIT, Apache, GPL, BSD, MPL) with copyright year and author substitution.',
    icon: 'ribbon',
    color: '#EC4899',
    badge: 'Legal',
  },
  {
    id: 'changelog' as ToolId,
    title: 'Changelog Generator',
    subtitle: 'Conventional Commits',
    desc: 'Summarize release notes with semantic versioning bumps, emojis, and categorized changes (feat, fix, breaking, perf).',
    icon: 'git-commit',
    color: '#3B82F6',
    badge: 'Releases',
  },
  {
    id: 'socialcard' as ToolId,
    title: 'Social OG Card Maker',
    subtitle: 'Repo Banner Designer',
    desc: 'Design eye-catching 1280x640 repository social preview cards with gradient backgrounds, star badges, and branding.',
    icon: 'image',
    color: '#00F0FF',
    badge: 'Marketing',
  },
  {
    id: 'architecture' as ToolId,
    title: 'DocSprint & Architecture',
    subtitle: 'Mermaid Diagrams & Specs',
    desc: 'Generate Mermaid.js flowcharts, environment variable markdown tables, and API endpoint reference sheets.',
    icon: 'git-network',
    color: '#A78BFA',
    badge: 'System Spec',
  },
];

export const ToolsGrid: React.FC<ToolsGridProps> = ({ onSelectTool }) => {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const isTablet = width < 1024;

  const getColWidth = () => {
    if (isMobile) return '100%';
    if (isTablet) return '48%';
    return '23.5%';
  };

  return (
    <View style={styles.sectionContainer}>
      <View style={styles.sectionInner}>
        {/* Section Header */}
        <View style={styles.headerBlock}>
          <View style={styles.categoryPill}>
            <Text style={styles.categoryPillText}>THE DEVELOPER TOOLBELT</Text>
          </View>
          <Text style={styles.sectionTitle}>Everything You Need to Ship Stellar Repositories</Text>
          <Text style={styles.sectionSubtitle}>
            Eight purpose-built developer utilities designed to make your documentation as rigorous and impressive as your code.
          </Text>
        </View>

        {/* Tools Grid */}
        <View style={styles.grid}>
          {TOOLS_LIST.map((tool) => (
            <TouchableOpacity
              key={tool.id}
              style={[styles.toolCard, { width: getColWidth() }]}
              onPress={() => onSelectTool(tool.id)}
              activeOpacity={0.8}
            >
              <View style={styles.cardTopRow}>
                <View style={[styles.iconBox, { borderColor: tool.color, backgroundColor: `${tool.color}15` }]}>
                  <Ionicons name={tool.icon as any} size={22} color={tool.color} />
                </View>
                <View style={[styles.toolBadge, { borderColor: `${tool.color}50` }]}>
                  <Text style={[styles.toolBadgeText, { color: tool.color }]}>{tool.badge}</Text>
                </View>
              </View>

              <Text style={styles.toolTitle}>{tool.title}</Text>
              <Text style={styles.toolSubtitle}>{tool.subtitle}</Text>
              <Text style={styles.toolDesc}>{tool.desc}</Text>

              <View style={styles.cardFooter}>
                <Text style={[styles.launchText, { color: tool.color }]}>Launch Tool</Text>
                <Ionicons name="arrow-forward" size={14} color={tool.color} />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    backgroundColor: '#0B0F17',
    paddingVertical: 64,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  sectionInner: {
    maxWidth: 1120,
    width: '100%',
  },
  headerBlock: {
    alignItems: 'center',
    marginBottom: 44,
  },
  categoryPill: {
    backgroundColor: 'rgba(0, 240, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(0, 240, 255, 0.3)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 999,
    marginBottom: 14,
  },
  categoryPillText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#00F0FF',
    letterSpacing: 1,
  },
  sectionTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: '#F8FAFC',
    textAlign: 'center',
    letterSpacing: -0.6,
    marginBottom: 12,
  },
  sectionSubtitle: {
    fontSize: 15,
    color: '#94A3B8',
    textAlign: 'center',
    maxWidth: 680,
    lineHeight: 24,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    justifyContent: 'space-between',
  },
  toolCard: {
    backgroundColor: '#111726',
    borderWidth: 1.5,
    borderColor: '#1E293B',
    borderRadius: 14,
    padding: 20,
    justifyContent: 'space-between',
    minHeight: 240,
  },
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 10,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  toolBadge: {
    backgroundColor: '#090D14',
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  toolBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  toolTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#F8FAFC',
    marginBottom: 4,
  },
  toolSubtitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#94A3B8',
    marginBottom: 8,
  },
  toolDesc: {
    fontSize: 13,
    lineHeight: 19,
    color: '#64748B',
    marginBottom: 16,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 'auto',
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#1A2333',
  },
  launchText: {
    fontSize: 13,
    fontWeight: '700',
  },
});
