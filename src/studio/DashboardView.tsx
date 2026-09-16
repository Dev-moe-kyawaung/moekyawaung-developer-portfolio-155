import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, useWindowDimensions } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { ToolId, ProjectRecord } from '../types';
import { loadSavedProjects, deleteProject } from '../services/storage';
import { TOOLS_LIST } from '../components/ToolsGrid';

interface DashboardViewProps {
  onSelectTool: (toolId: ToolId) => void;
  onQuickAiForge: (prompt: string, techStack: string) => void;
  onShowToast: (msg: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  onSelectTool,
  onQuickAiForge,
  onShowToast,
}) => {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  const [projects, setProjects] = useState<ProjectRecord[]>([]);
  const [quickPrompt, setQuickPrompt] = useState('NexusFlow - AI Workspace Platform');
  const [quickStack, setQuickStack] = useState('Next.js 15, TypeScript, Supabase, Tailwind, Stripe');

  useEffect(() => {
    loadSavedProjects().then(setProjects);
  }, []);

  const handleDelete = async (id: string) => {
    const updated = await deleteProject(id);
    setProjects(updated);
    onShowToast('Project removed');
  };

  const handleRunAiForge = () => {
    if (!quickPrompt.trim()) {
      onShowToast('Please enter a project name');
      return;
    }
    onQuickAiForge(quickPrompt, quickStack);
  };

  return (
    <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.contentContainer}>
      {/* Welcome Banner */}
      <View style={styles.bannerCard}>
        <View style={styles.bannerLeft}>
          <View style={styles.statusPill}>
            <View style={styles.pulseDot} />
            <Text style={styles.statusText}>DevForge Studio v2.5 Ready</Text>
          </View>
          <Text style={styles.bannerTitle}>Developer Control Center</Text>
          <Text style={styles.bannerSubtitle}>
            Generate, customize, and export all your repository assets in one unified developer workspace.
          </Text>
        </View>

        {/* Quick AI Forge Box */}
        <View style={[styles.quickForgeBox, isMobile && { width: '100%', marginTop: 18 }]}>
          <View style={styles.forgeBoxHeader}>
            <Ionicons name="sparkles" size={16} color="#00F0FF" style={{ marginRight: 6 }} />
            <Text style={styles.forgeBoxTitle}>Quick AI Forge</Text>
          </View>

          <Text style={styles.inputLabel}>Repository Name / Description</Text>
          <TextInput
            style={styles.textInput}
            value={quickPrompt}
            onChangeText={setQuickPrompt}
            placeholder="e.g. Acme API - Fast Redis Cache"
            placeholderTextColor="#64748B"
          />

          <Text style={styles.inputLabel}>Primary Tech Stack</Text>
          <TextInput
            style={styles.textInput}
            value={quickStack}
            onChangeText={setQuickStack}
            placeholder="e.g. Rust, Tokio, Cargo"
            placeholderTextColor="#64748B"
          />

          <TouchableOpacity 
            style={styles.forgeBtn}
            onPress={handleRunAiForge}
            activeOpacity={0.85}
          >
            <Ionicons name="flash" size={16} color="#090D14" style={{ marginRight: 6 }} />
            <Text style={styles.forgeBtnText}>Generate Complete Asset Suite</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Tools Quick Launcher Grid */}
      <View style={styles.sectionBlock}>
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionHeading}>Asset Builder Tools</Text>
          <Text style={styles.sectionCount}>8 Available</Text>
        </View>

        <View style={styles.toolsRow}>
          {TOOLS_LIST.map((tool) => (
            <TouchableOpacity
              key={tool.id}
              style={[styles.toolCard, isMobile ? { width: '100%' } : { width: '23.5%' }]}
              onPress={() => onSelectTool(tool.id)}
              activeOpacity={0.8}
            >
              <View style={[styles.iconWrapper, { borderColor: tool.color, backgroundColor: `${tool.color}15` }]}>
                <Ionicons name={tool.icon as any} size={20} color={tool.color} />
              </View>
              <Text style={styles.toolName}>{tool.title}</Text>
              <Text style={styles.toolSub}>{tool.subtitle}</Text>
              <View style={styles.toolActionRow}>
                <Text style={[styles.toolLaunchLabel, { color: tool.color }]}>Open</Text>
                <Ionicons name="chevron-forward" size={14} color={tool.color} />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Recent Projects List */}
      <View style={styles.sectionBlock}>
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionHeading}>Saved Projects & Drafts</Text>
          <Text style={styles.sectionCount}>{projects.length} Saved in Local State</Text>
        </View>

        {projects.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="document-text-outline" size={36} color="#64748B" />
            <Text style={styles.emptyTitle}>No saved drafts yet</Text>
            <Text style={styles.emptySub}>Launch README Forge or Profile Studio to create your first draft.</Text>
          </View>
        ) : (
          <View style={styles.projectsList}>
            {projects.map((proj) => (
              <View key={proj.id} style={styles.projectCard}>
                <View style={styles.projectInfo}>
                  <View style={styles.projectTitleRow}>
                    <Text style={styles.projectTitle}>{proj.title}</Text>
                    <View style={styles.toolTypeBadge}>
                      <Text style={styles.toolTypeText}>{proj.toolType.toUpperCase()}</Text>
                    </View>
                  </View>
                  <Text style={styles.projectSummary}>{proj.summary}</Text>
                  <Text style={styles.projectTime}>
                    Last edited: {new Date(proj.updatedAt).toLocaleDateString()} at {new Date(proj.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </Text>
                </View>

                <View style={styles.projectActions}>
                  <TouchableOpacity
                    style={styles.openProjectBtn}
                    onPress={() => onSelectTool(proj.toolType)}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.openProjectText}>Edit</Text>
                    <Ionicons name="arrow-forward" size={14} color="#00F0FF" />
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.deleteProjectBtn}
                    onPress={() => handleDelete(proj.id)}
                    activeOpacity={0.7}
                  >
                    <Ionicons name="trash-outline" size={16} color="#EF4444" />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: '#090D14',
  },
  contentContainer: {
    padding: 24,
    maxWidth: 1200,
    width: '100%',
    alignSelf: 'center',
  },
  bannerCard: {
    backgroundColor: '#111726',
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#1E293B',
    padding: 24,
    marginBottom: 32,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bannerLeft: {
    maxWidth: 520,
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 240, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(0, 240, 255, 0.3)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  pulseDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#00F0FF',
    marginRight: 8,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#00F0FF',
  },
  bannerTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: '#F8FAFC',
    letterSpacing: -0.5,
    marginBottom: 8,
  },
  bannerSubtitle: {
    fontSize: 14,
    lineHeight: 22,
    color: '#94A3B8',
  },
  quickForgeBox: {
    backgroundColor: '#0D131F',
    borderWidth: 1,
    borderColor: '#26334D',
    borderRadius: 12,
    padding: 18,
    width: 440,
  },
  forgeBoxHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  forgeBoxTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#00F0FF',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  inputLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#94A3B8',
    marginBottom: 4,
  },
  textInput: {
    backgroundColor: '#161F30',
    borderWidth: 1,
    borderColor: '#2D3D58',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 13,
    color: '#F8FAFC',
    marginBottom: 10,
  },
  forgeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00F0FF',
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 4,
  },
  forgeBtnText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#090D14',
  },
  sectionBlock: {
    marginBottom: 32,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionHeading: {
    fontSize: 18,
    fontWeight: '800',
    color: '#F8FAFC',
  },
  sectionCount: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B',
  },
  toolsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 14,
  },
  toolCard: {
    backgroundColor: '#111726',
    borderWidth: 1.5,
    borderColor: '#1E293B',
    borderRadius: 12,
    padding: 16,
    justifyContent: 'space-between',
    minHeight: 140,
  },
  iconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  toolName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#F8FAFC',
    marginBottom: 2,
  },
  toolSub: {
    fontSize: 11.5,
    color: '#64748B',
    marginBottom: 12,
  },
  toolActionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 'auto',
  },
  toolLaunchLabel: {
    fontSize: 12,
    fontWeight: '700',
  },
  projectsList: {
    gap: 12,
  },
  projectCard: {
    backgroundColor: '#111726',
    borderWidth: 1.5,
    borderColor: '#1E293B',
    borderRadius: 12,
    padding: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 12,
  },
  projectInfo: {
    flex: 1,
    minWidth: 260,
  },
  projectTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 4,
  },
  projectTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#F8FAFC',
  },
  toolTypeBadge: {
    backgroundColor: '#162238',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#26334D',
  },
  toolTypeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#00F0FF',
  },
  projectSummary: {
    fontSize: 13,
    color: '#94A3B8',
    marginBottom: 6,
  },
  projectTime: {
    fontSize: 11,
    color: '#64748B',
  },
  projectActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  openProjectBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#16233B',
    borderWidth: 1,
    borderColor: '#00F0FF',
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 6,
    gap: 6,
  },
  openProjectText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#00F0FF',
  },
  deleteProjectBtn: {
    padding: 8,
    borderRadius: 6,
    backgroundColor: '#1C1622',
    borderWidth: 1,
    borderColor: '#3B1F2B',
  },
  emptyState: {
    backgroundColor: '#111726',
    borderWidth: 1,
    borderColor: '#1E293B',
    borderRadius: 12,
    padding: 36,
    alignItems: 'center',
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#F8FAFC',
    marginTop: 10,
  },
  emptySub: {
    fontSize: 13,
    color: '#64748B',
    marginTop: 4,
    textAlign: 'center',
  },
});
