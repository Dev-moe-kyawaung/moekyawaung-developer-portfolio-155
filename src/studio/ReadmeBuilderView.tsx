import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, useWindowDimensions, Modal } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { ReadmeBlock, ReadmeTemplate } from '../types';
import { README_TEMPLATES } from '../data/templates';
import { MarkdownRenderer } from '../components/MarkdownRenderer';
import { compileBlocksToMarkdown, generateCustomReadme } from '../services/aiGenerator';
import { copyToClipboard, downloadFile } from '../utils/clipboard';
import { saveProject } from '../services/storage';

interface ReadmeBuilderViewProps {
  initialTemplate?: ReadmeTemplate;
  onShowToast: (msg: string) => void;
}

export const ReadmeBuilderView: React.FC<ReadmeBuilderViewProps> = ({
  initialTemplate,
  onShowToast,
}) => {
  const { width } = useWindowDimensions();
  const isMobile = width < 900;

  const defaultTemplate = initialTemplate || README_TEMPLATES[0];

  const [blocks, setBlocks] = useState<ReadmeBlock[]>(defaultTemplate.blocks);
  const [activeBlockId, setActiveBlockId] = useState<string>(defaultTemplate.blocks[0]?.id || 'hero');
  const [previewMode, setPreviewMode] = useState<'preview' | 'split' | 'raw'>('preview');
  const [previewTheme, setPreviewTheme] = useState<'dark' | 'light'>('dark');
  const [projectName, setProjectName] = useState('NexusFlow SaaS');
  const [projectTagline, setProjectTagline] = useState('Enterprise workspace management with AI');
  
  // AI Modal state
  const [aiModalVisible, setAiModalVisible] = useState(false);
  const [aiTechInput, setAiTechInput] = useState('Next.js 15, TypeScript, Tailwind, Supabase');
  const [aiFeaturesInput, setAiFeaturesInput] = useState('Server actions, Stripe billing, Real-time telemetry, Dark mode');

  const currentBlock = blocks.find(b => b.id === activeBlockId) || blocks[0];
  const compiledMarkdown = compileBlocksToMarkdown(blocks);

  // Toggle block enabled
  const toggleBlock = (id: string) => {
    setBlocks(prev => prev.map(b => b.id === id ? { ...b, enabled: !b.enabled } : b));
    onShowToast('Block visibility toggled');
  };

  // Update block content
  const updateBlockContent = (text: string) => {
    setBlocks(prev => prev.map(b => b.id === activeBlockId ? { ...b, content: text } : b));
  };

  // Reorder block up
  const moveBlockUp = (index: number) => {
    if (index === 0) return;
    const next = [...blocks];
    const temp = next[index - 1];
    next[index - 1] = next[index];
    next[index] = temp;
    setBlocks(next);
  };

  // Reorder block down
  const moveBlockDown = (index: number) => {
    if (index === blocks.length - 1) return;
    const next = [...blocks];
    const temp = next[index + 1];
    next[index + 1] = next[index];
    next[index] = temp;
    setBlocks(next);
  };

  // Switch template
  const loadTemplate = (tmpl: ReadmeTemplate) => {
    setBlocks(tmpl.blocks);
    setActiveBlockId(tmpl.blocks[0]?.id || 'hero');
    setProjectName(tmpl.title);
    setProjectTagline(tmpl.subtitle);
    onShowToast(`Loaded ${tmpl.title} template`);
  };

  // Run AI Regeneration
  const handleAiRegenerate = () => {
    const techArray = aiTechInput.split(',').map(s => s.trim()).filter(Boolean);
    const featuresArray = aiFeaturesInput.split(',').map(s => s.trim()).filter(Boolean);

    const generated = generateCustomReadme({
      projectName: projectName || 'MyProject',
      tagline: projectTagline || 'Built with DevForge AI',
      techStack: techArray.length > 0 ? techArray : ['TypeScript', 'Next.js'],
      features: featuresArray.length > 0 ? featuresArray : ['High Performance', 'Type-Safe'],
      authorName: 'Engineering Team',
      license: 'MIT',
      includeArchitecture: true,
      includeEnvVars: true,
      includeRoadmap: true,
    });

    setBlocks(generated);
    setActiveBlockId(generated[0]?.id || 'hero');
    setAiModalVisible(false);
    onShowToast('✨ Generated AI README blocks successfully!');
  };

  // Save Project
  const handleSaveProject = async () => {
    await saveProject({
      id: `proj-${Date.now()}`,
      title: projectName,
      toolType: 'readme',
      updatedAt: new Date().toISOString(),
      summary: projectTagline,
      content: compiledMarkdown,
    });
    onShowToast('Project saved to drafts!');
  };

  // Copy raw markdown
  const handleCopyMarkdown = async () => {
    await copyToClipboard(compiledMarkdown);
    onShowToast('README.md copied to clipboard!');
  };

  // Download markdown
  const handleDownload = () => {
    const filename = `${projectName.toLowerCase().replace(/\s+/g, '-')}-README.md`;
    downloadFile(filename, compiledMarkdown);
    onShowToast(`Downloaded ${filename}`);
  };

  return (
    <View style={styles.container}>
      {/* Top Action Header */}
      <View style={styles.topBar}>
        <View style={styles.topBarLeft}>
          <View style={styles.titleGroup}>
            <TextInput
              style={styles.projectNameInput}
              value={projectName}
              onChangeText={setProjectName}
              placeholder="Project Name"
              placeholderTextColor="#64748B"
            />
            <Text style={styles.taglineSub}>README.md Studio Engine</Text>
          </View>
        </View>

        {/* View Toggle & Theme Switch */}
        <View style={styles.centerToggles}>
          <View style={styles.viewModeGroup}>
            <TouchableOpacity 
              style={[styles.modeBtn, previewMode === 'preview' && styles.activeModeBtn]}
              onPress={() => setPreviewMode('preview')}
            >
              <Ionicons name="eye" size={14} color={previewMode === 'preview' ? '#00F0FF' : '#94A3B8'} />
              <Text style={[styles.modeBtnText, previewMode === 'preview' && styles.activeModeBtnText]}>Preview</Text>
            </TouchableOpacity>

            {!isMobile && (
              <TouchableOpacity 
                style={[styles.modeBtn, previewMode === 'split' && styles.activeModeBtn]}
                onPress={() => setPreviewMode('split')}
              >
                <Ionicons name="duplicate-outline" size={14} color={previewMode === 'split' ? '#00F0FF' : '#94A3B8'} />
                <Text style={[styles.modeBtnText, previewMode === 'split' && styles.activeModeBtnText]}>Split</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity 
              style={[styles.modeBtn, previewMode === 'raw' && styles.activeModeBtn]}
              onPress={() => setPreviewMode('raw')}
            >
              <Ionicons name="code-slash" size={14} color={previewMode === 'raw' ? '#00F0FF' : '#94A3B8'} />
              <Text style={[styles.modeBtnText, previewMode === 'raw' && styles.activeModeBtnText]}>Raw</Text>
            </TouchableOpacity>
          </View>

          {/* Theme switcher for preview */}
          <TouchableOpacity 
            style={styles.themeToggleBtn}
            onPress={() => setPreviewTheme(previewTheme === 'dark' ? 'light' : 'dark')}
            activeOpacity={0.7}
          >
            <Ionicons name={previewTheme === 'dark' ? "moon" : "sunny"} size={14} color={previewTheme === 'dark' ? '#00F0FF' : '#F59E0B'} />
            <Text style={styles.themeToggleText}>{previewTheme === 'dark' ? 'GH Dark' : 'GH Light'}</Text>
          </TouchableOpacity>
        </View>

        {/* Action Buttons */}
        <View style={styles.topBarRight}>
          <TouchableOpacity 
            style={styles.aiButton}
            onPress={() => setAiModalVisible(true)}
            activeOpacity={0.8}
          >
            <Ionicons name="sparkles" size={14} color="#00F0FF" style={{ marginRight: 6 }} />
            <Text style={styles.aiButtonText}>AI Assistant</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.saveBtn}
            onPress={handleSaveProject}
            activeOpacity={0.8}
          >
            <Ionicons name="bookmark-outline" size={14} color="#94A3B8" />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.copyBtn}
            onPress={handleCopyMarkdown}
            activeOpacity={0.8}
          >
            <Ionicons name="copy-outline" size={14} color="#00F0FF" style={{ marginRight: 6 }} />
            <Text style={styles.copyBtnText}>Copy .md</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.downloadBtn}
            onPress={handleDownload}
            activeOpacity={0.8}
          >
            <Ionicons name="download-outline" size={14} color="#090D14" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Main Workspace Body */}
      <View style={[styles.mainBody, isMobile && styles.mainBodyMobile]}>
        {/* Left: Section Blocks Manager */}
        <View style={[styles.blocksSidebar, isMobile && { width: '100%', maxHeight: 220 }]}>
          <View style={styles.sidebarHeader}>
            <Text style={styles.sidebarTitle}>Document Blocks</Text>
            <Text style={styles.blocksCount}>{blocks.filter(b => b.enabled).length}/{blocks.length} active</Text>
          </View>

          {/* Template Quick Dropdown Pills */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.templatePillsScroll}>
            {README_TEMPLATES.map(t => (
              <TouchableOpacity
                key={t.id}
                style={[styles.tmplPill, defaultTemplate.id === t.id && styles.activeTmplPill]}
                onPress={() => loadTemplate(t)}
              >
                <Text style={styles.tmplPillText}>{t.title.split(' ')[0]}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Block items list */}
          <ScrollView style={styles.blocksList}>
            {blocks.map((block, idx) => {
              const isSelected = block.id === activeBlockId;
              return (
                <View 
                  key={block.id}
                  style={[
                    styles.blockCard,
                    isSelected && styles.activeBlockCard,
                    !block.enabled && styles.disabledBlockCard
                  ]}
                >
                  <TouchableOpacity
                    style={styles.blockInfoArea}
                    onPress={() => setActiveBlockId(block.id)}
                    activeOpacity={0.7}
                  >
                    <Ionicons 
                      name={block.icon as any} 
                      size={16} 
                      color={block.enabled ? (isSelected ? '#00F0FF' : '#94A3B8') : '#475569'} 
                      style={{ marginRight: 8 }}
                    />
                    <Text 
                      style={[
                        styles.blockTitleText, 
                        isSelected && styles.activeBlockTitleText,
                        !block.enabled && { color: '#64748B', textDecorationLine: 'line-through' }
                      ]}
                      numberOfLines={1}
                    >
                      {block.title}
                    </Text>
                  </TouchableOpacity>

                  {/* Reorder and Toggle actions */}
                  <View style={styles.blockControls}>
                    <TouchableOpacity 
                      onPress={() => moveBlockUp(idx)} 
                      disabled={idx === 0}
                      style={styles.orderBtn}
                    >
                      <Ionicons name="chevron-up" size={14} color={idx === 0 ? '#334155' : '#94A3B8'} />
                    </TouchableOpacity>
                    <TouchableOpacity 
                      onPress={() => moveBlockDown(idx)} 
                      disabled={idx === blocks.length - 1}
                      style={styles.orderBtn}
                    >
                      <Ionicons name="chevron-down" size={14} color={idx === blocks.length - 1 ? '#334155' : '#94A3B8'} />
                    </TouchableOpacity>
                    <TouchableOpacity 
                      onPress={() => toggleBlock(block.id)}
                      style={styles.toggleBtn}
                    >
                      <Ionicons 
                        name={block.enabled ? "eye" : "eye-off"} 
                        size={15} 
                        color={block.enabled ? "#10B981" : "#64748B"} 
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })}
          </ScrollView>
        </View>

        {/* Center: Active Block Editor (Visible in Split or when Raw/Preview not full) */}
        {previewMode !== 'preview' && (
          <View style={[styles.editorArea, isMobile && { width: '100%' }]}>
            <View style={styles.editorHeader}>
              <View style={styles.blockActiveTitleRow}>
                <Ionicons name={currentBlock?.icon as any} size={16} color="#00F0FF" style={{ marginRight: 6 }} />
                <Text style={styles.activeBlockName}>{currentBlock?.title}</Text>
              </View>
              <Text style={styles.editorHint}>{currentBlock?.description}</Text>
            </View>

            {/* Markdown Text Area */}
            <TextInput
              style={styles.markdownEditorInput}
              multiline
              textAlignVertical="top"
              value={currentBlock?.content || ''}
              onChangeText={updateBlockContent}
              placeholder="Type your markdown content here..."
              placeholderTextColor="#64748B"
            />
          </View>
        )}

        {/* Right / Main: Preview Panel */}
        {(previewMode === 'preview' || previewMode === 'split') && (
          <ScrollView 
            style={[styles.previewArea, isMobile && { width: '100%' }]}
            contentContainerStyle={{ padding: 16 }}
          >
            <MarkdownRenderer content={compiledMarkdown} theme={previewTheme} />
          </ScrollView>
        )}

        {/* Raw View */}
        {previewMode === 'raw' && (
          <ScrollView 
            style={[styles.rawArea, isMobile && { width: '100%' }]}
            contentContainerStyle={{ padding: 16 }}
          >
            <Text style={styles.rawOutputText}>{compiledMarkdown}</Text>
          </ScrollView>
        )}
      </View>

      {/* AI Assistant Modal */}
      <Modal
        visible={aiModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setAiModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <View style={styles.aiModalTitleRow}>
                <Ionicons name="sparkles" size={18} color="#00F0FF" style={{ marginRight: 8 }} />
                <Text style={styles.modalTitle}>AI Section & Document Generator</Text>
              </View>
              <TouchableOpacity onPress={() => setAiModalVisible(false)}>
                <Ionicons name="close" size={20} color="#94A3B8" />
              </TouchableOpacity>
            </View>

            <Text style={styles.modalDesc}>
              Provide your repository details and DevForge AI will generate context-aware architecture blocks, badges, and install instructions.
            </Text>

            <Text style={styles.modalLabel}>Repository Tagline</Text>
            <TextInput
              style={styles.modalInput}
              value={projectTagline}
              onChangeText={setProjectTagline}
              placeholder="e.g. High-throughput distributed message queue"
              placeholderTextColor="#64748B"
            />

            <Text style={styles.modalLabel}>Technologies & Frameworks</Text>
            <TextInput
              style={styles.modalInput}
              value={aiTechInput}
              onChangeText={setAiTechInput}
              placeholder="e.g. Next.js 15, Rust, Docker, PostgreSQL"
              placeholderTextColor="#64748B"
            />

            <Text style={styles.modalLabel}>Key Features (Comma-separated)</Text>
            <TextInput
              style={[styles.modalInput, { height: 70 }]}
              multiline
              value={aiFeaturesInput}
              onChangeText={setAiFeaturesInput}
              placeholder="e.g. Zero-copy serialization, Automated failover, Real-time telemetry"
              placeholderTextColor="#64748B"
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={styles.modalCancelBtn}
                onPress={() => setAiModalVisible(false)}
              >
                <Text style={styles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.modalConfirmBtn}
                onPress={handleAiRegenerate}
              >
                <Ionicons name="flash" size={15} color="#090D14" style={{ marginRight: 6 }} />
                <Text style={styles.modalConfirmText}>Generate Asset Suite</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#090D14',
  },
  topBar: {
    height: 56,
    backgroundColor: '#0D131F',
    borderBottomWidth: 1,
    borderBottomColor: '#1E293B',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    flexWrap: 'wrap',
    gap: 8,
  },
  topBarLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleGroup: {
    justifyContent: 'center',
  },
  projectNameInput: {
    fontSize: 15,
    fontWeight: '800',
    color: '#F8FAFC',
    padding: 0,
    minWidth: 160,
  },
  taglineSub: {
    fontSize: 11,
    color: '#64748B',
  },
  centerToggles: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  viewModeGroup: {
    flexDirection: 'row',
    backgroundColor: '#111726',
    borderRadius: 8,
    padding: 3,
    borderWidth: 1,
    borderColor: '#232E43',
  },
  modeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 6,
    gap: 4,
  },
  activeModeBtn: {
    backgroundColor: '#1A2338',
  },
  modeBtnText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#94A3B8',
  },
  activeModeBtnText: {
    color: '#00F0FF',
  },
  themeToggleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#111726',
    borderWidth: 1,
    borderColor: '#232E43',
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 8,
    gap: 5,
  },
  themeToggleText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#CBD5E1',
  },
  topBarRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  aiButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#172238',
    borderWidth: 1,
    borderColor: 'rgba(0, 240, 255, 0.4)',
    paddingHorizontal: 11,
    paddingVertical: 6,
    borderRadius: 7,
  },
  aiButtonText: {
    fontSize: 12.5,
    fontWeight: '700',
    color: '#00F0FF',
  },
  saveBtn: {
    padding: 7,
    borderRadius: 7,
    backgroundColor: '#162033',
    borderWidth: 1,
    borderColor: '#232E43',
  },
  copyBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#162033',
    borderWidth: 1,
    borderColor: '#00F0FF',
    paddingHorizontal: 11,
    paddingVertical: 6,
    borderRadius: 7,
  },
  copyBtnText: {
    fontSize: 12.5,
    fontWeight: '700',
    color: '#00F0FF',
  },
  downloadBtn: {
    backgroundColor: '#00F0FF',
    padding: 7,
    borderRadius: 7,
  },
  mainBody: {
    flex: 1,
    flexDirection: 'row',
  },
  mainBodyMobile: {
    flexDirection: 'column',
  },
  blocksSidebar: {
    width: 280,
    backgroundColor: '#0B0F17',
    borderRightWidth: 1,
    borderRightColor: '#1E293B',
    padding: 12,
  },
  sidebarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  sidebarTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: '#CBD5E1',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  blocksCount: {
    fontSize: 11,
    color: '#10B981',
    fontWeight: '700',
  },
  templatePillsScroll: {
    maxHeight: 34,
    marginBottom: 10,
  },
  tmplPill: {
    backgroundColor: '#131B2A',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginRight: 6,
    borderWidth: 1,
    borderColor: '#232E43',
  },
  activeTmplPill: {
    borderColor: '#00F0FF',
  },
  tmplPillText: {
    fontSize: 11,
    color: '#94A3B8',
    fontWeight: '600',
  },
  blocksList: {
    flex: 1,
  },
  blockCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#111726',
    borderWidth: 1,
    borderColor: '#1E293B',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 6,
  },
  activeBlockCard: {
    borderColor: '#00F0FF',
    backgroundColor: '#162238',
  },
  disabledBlockCard: {
    opacity: 0.5,
  },
  blockInfoArea: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingRight: 6,
  },
  blockTitleText: {
    fontSize: 12.5,
    fontWeight: '600',
    color: '#E2E8F0',
  },
  activeBlockTitleText: {
    color: '#00F0FF',
    fontWeight: '700',
  },
  blockControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  orderBtn: {
    padding: 2,
  },
  toggleBtn: {
    padding: 3,
  },
  editorArea: {
    flex: 1,
    backgroundColor: '#0E131F',
    borderRightWidth: 1,
    borderRightColor: '#1E293B',
    padding: 14,
  },
  editorHeader: {
    marginBottom: 10,
  },
  blockActiveTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  activeBlockName: {
    fontSize: 14,
    fontWeight: '800',
    color: '#F8FAFC',
  },
  editorHint: {
    fontSize: 11,
    color: '#64748B',
  },
  markdownEditorInput: {
    flex: 1,
    backgroundColor: '#090D14',
    borderWidth: 1,
    borderColor: '#232E43',
    borderRadius: 8,
    padding: 14,
    color: '#F8FAFC',
    fontSize: 13,
    lineHeight: 20,
    fontFamily: 'monospace',
  },
  previewArea: {
    flex: 1.2,
    backgroundColor: '#090D14',
  },
  rawArea: {
    flex: 1.2,
    backgroundColor: '#080B10',
  },
  rawOutputText: {
    fontFamily: 'monospace',
    fontSize: 12,
    lineHeight: 18,
    color: '#58A6FF',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.75)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  modalContent: {
    backgroundColor: '#0F172A',
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#26334D',
    width: '100%',
    maxWidth: 520,
    padding: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  aiModalTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#F8FAFC',
  },
  modalDesc: {
    fontSize: 13,
    color: '#94A3B8',
    lineHeight: 19,
    marginBottom: 16,
  },
  modalLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#CBD5E1',
    marginBottom: 4,
  },
  modalInput: {
    backgroundColor: '#161F30',
    borderWidth: 1,
    borderColor: '#2E3E58',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    color: '#F8FAFC',
    fontSize: 13,
    marginBottom: 12,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
    marginTop: 8,
  },
  modalCancelBtn: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 6,
    backgroundColor: '#162238',
  },
  modalCancelText: {
    fontSize: 13,
    color: '#94A3B8',
    fontWeight: '600',
  },
  modalConfirmBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#00F0FF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  modalConfirmText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#090D14',
  },
});
