import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, useWindowDimensions } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { FILE_TREE_PRESETS, renderFileTreeAscii, FileTreePreset } from '../data/fileTreePresets';
import { FileNode } from '../types';
import { copyToClipboard } from '../utils/clipboard';

interface FileTreeArchitectViewProps {
  onShowToast: (msg: string) => void;
}

export const FileTreeArchitectView: React.FC<FileTreeArchitectViewProps> = ({ onShowToast }) => {
  const { width } = useWindowDimensions();
  const isMobile = width < 900;

  const [selectedPresetId, setSelectedPresetId] = useState(FILE_TREE_PRESETS[0].id);
  const [rootNode, setRootNode] = useState<FileNode>(FILE_TREE_PRESETS[0].rootNode);
  const [newEntryName, setNewEntryName] = useState('features/auth.ts');
  const [newEntryDesc, setNewEntryDesc] = useState('User session authentication handler');

  const currentPreset = FILE_TREE_PRESETS.find(p => p.id === selectedPresetId) || FILE_TREE_PRESETS[0];
  const asciiResult = renderFileTreeAscii(rootNode);

  const handleSelectPreset = (preset: FileTreePreset) => {
    setSelectedPresetId(preset.id);
    setRootNode(preset.rootNode);
    onShowToast(`Loaded ${preset.name} tree structure`);
  };

  const handleAddFile = () => {
    if (!newEntryName.trim()) {
      onShowToast('Please provide a file name');
      return;
    }

    const newNode: FileNode = {
      id: `node-${Date.now()}`,
      name: newEntryName.trim(),
      type: newEntryName.includes('.') ? 'file' : 'folder',
      description: newEntryDesc.trim() || undefined,
    };

    setRootNode(prev => ({
      ...prev,
      children: [...(prev.children || []), newNode]
    }));

    setNewEntryName('');
    setNewEntryDesc('');
    onShowToast('Added node to tree');
  };

  const handleCopyAscii = async () => {
    await copyToClipboard(asciiResult);
    onShowToast('ASCII file tree copied to clipboard!');
  };

  const handleCopyMarkdown = async () => {
    const md = '```text\n' + asciiResult + '```';
    await copyToClipboard(md);
    onShowToast('Markdown code block copied!');
  };

  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <View style={styles.topBarLeft}>
          <Ionicons name="folder-open" size={18} color="#F59E0B" style={{ marginRight: 8 }} />
          <Text style={styles.topBarTitle}>File Tree Architect</Text>
        </View>

        <View style={styles.topBarRight}>
          <TouchableOpacity style={styles.copyBtn} onPress={handleCopyAscii}>
            <Ionicons name="copy-outline" size={14} color="#00F0FF" style={{ marginRight: 6 }} />
            <Text style={styles.copyBtnText}>Copy ASCII</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.copyMdBtn} onPress={handleCopyMarkdown}>
            <Ionicons name="code-slash" size={14} color="#090D14" style={{ marginRight: 6 }} />
            <Text style={styles.copyMdBtnText}>Copy Markdown Block</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={[styles.mainLayout, isMobile && styles.mainLayoutMobile]}>
        {/* Left: Presets & Controls */}
        <ScrollView style={[styles.leftPanel, isMobile && { width: '100%' }]} contentContainerStyle={{ padding: 18 }}>
          <Text style={styles.sectionHeader}>Architecture Presets</Text>
          <View style={styles.presetsList}>
            {FILE_TREE_PRESETS.map(preset => {
              const isSelected = preset.id === selectedPresetId;
              return (
                <TouchableOpacity
                  key={preset.id}
                  style={[styles.presetCard, isSelected && styles.activePresetCard]}
                  onPress={() => handleSelectPreset(preset)}
                  activeOpacity={0.8}
                >
                  <View style={styles.presetTopRow}>
                    <Text style={[styles.presetName, isSelected && styles.activePresetName]}>{preset.name}</Text>
                    {isSelected && <Ionicons name="checkmark-circle" size={16} color="#00F0FF" />}
                  </View>
                  <Text style={styles.presetDesc}>{preset.description}</Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <Text style={[styles.sectionHeader, { marginTop: 24 }]}>Add Custom Node</Text>
          <Text style={styles.label}>File or Folder Path</Text>
          <TextInput
            style={styles.input}
            value={newEntryName}
            onChangeText={setNewEntryName}
            placeholder="e.g. services/cache.ts"
            placeholderTextColor="#64748B"
          />

          <Text style={styles.label}>Inline Annotation / Description</Text>
          <TextInput
            style={styles.input}
            value={newEntryDesc}
            onChangeText={setNewEntryDesc}
            placeholder="e.g. Distributed Redis connection"
            placeholderTextColor="#64748B"
          />

          <TouchableOpacity style={styles.addBtn} onPress={handleAddFile} activeOpacity={0.85}>
            <Ionicons name="add" size={16} color="#090D14" style={{ marginRight: 6 }} />
            <Text style={styles.addBtnText}>Insert into Directory Tree</Text>
          </TouchableOpacity>
        </ScrollView>

        {/* Right: Rendered ASCII Output */}
        <View style={[styles.rightPanel, isMobile && { width: '100%' }]}>
          <View style={styles.outputHeader}>
            <View style={styles.outputDots}>
              <View style={[styles.dot, { backgroundColor: '#EF4444' }]} />
              <View style={[styles.dot, { backgroundColor: '#F59E0B' }]} />
              <View style={[styles.dot, { backgroundColor: '#10B981' }]} />
              <Text style={styles.outputTitle}>{rootNode.name} — Directory Hierarchy</Text>
            </View>
            <View style={styles.cleanPill}>
              <Text style={styles.cleanText}>Standard Unicode</Text>
            </View>
          </View>

          <ScrollView style={styles.asciiScroll} contentContainerStyle={{ padding: 18 }}>
            <Text style={styles.asciiText}>{asciiResult}</Text>
          </ScrollView>
        </View>
      </View>
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
    paddingHorizontal: 18,
  },
  topBarLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  topBarTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#F8FAFC',
  },
  topBarRight: {
    flexDirection: 'row',
    gap: 8,
  },
  copyBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#16233B',
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
  copyMdBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#00F0FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 7,
  },
  copyMdBtnText: {
    fontSize: 12.5,
    fontWeight: '800',
    color: '#090D14',
  },
  mainLayout: {
    flex: 1,
    flexDirection: 'row',
  },
  mainLayoutMobile: {
    flexDirection: 'column',
  },
  leftPanel: {
    width: 360,
    backgroundColor: '#0B0F17',
    borderRightWidth: 1,
    borderRightColor: '#1E293B',
  },
  sectionHeader: {
    fontSize: 12,
    fontWeight: '800',
    color: '#CBD5E1',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 12,
  },
  presetsList: {
    gap: 8,
  },
  presetCard: {
    backgroundColor: '#111726',
    borderWidth: 1.5,
    borderColor: '#1E293B',
    borderRadius: 10,
    padding: 12,
  },
  activePresetCard: {
    borderColor: '#00F0FF',
    backgroundColor: '#162238',
  },
  presetTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  presetName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#F8FAFC',
  },
  activePresetName: {
    color: '#00F0FF',
  },
  presetDesc: {
    fontSize: 12,
    color: '#8A99AD',
    lineHeight: 17,
  },
  label: {
    fontSize: 11.5,
    fontWeight: '600',
    color: '#94A3B8',
    marginBottom: 4,
  },
  input: {
    backgroundColor: '#131B2A',
    borderWidth: 1,
    borderColor: '#26334D',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    color: '#F8FAFC',
    fontSize: 13,
    marginBottom: 12,
  },
  addBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00F0FF',
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 4,
  },
  addBtnText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#090D14',
  },
  rightPanel: {
    flex: 1,
    backgroundColor: '#090D14',
  },
  outputHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#111726',
    borderBottomWidth: 1,
    borderBottomColor: '#1E293B',
  },
  outputDots: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dot: {
    width: 9,
    height: 9,
    borderRadius: 4.5,
  },
  outputTitle: {
    fontSize: 12,
    fontFamily: 'monospace',
    color: '#94A3B8',
    marginLeft: 10,
  },
  cleanPill: {
    backgroundColor: 'rgba(16, 185, 129, 0.12)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  cleanText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#10B981',
  },
  asciiScroll: {
    flex: 1,
    backgroundColor: '#070A0F',
  },
  asciiText: {
    fontFamily: 'monospace',
    fontSize: 13,
    lineHeight: 22,
    color: '#38BDF8',
  },
});
