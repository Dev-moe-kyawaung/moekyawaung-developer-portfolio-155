import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, useWindowDimensions } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { ChangelogEntry } from '../types';
import { copyToClipboard } from '../utils/clipboard';

interface ChangelogViewProps {
  onShowToast: (msg: string) => void;
}

export const ChangelogView: React.FC<ChangelogViewProps> = ({ onShowToast }) => {
  const { width } = useWindowDimensions();
  const isMobile = width < 900;

  const [version, setVersion] = useState('2.5.0');
  const [releaseTagline, setReleaseTagline] = useState('AI-Powered Markdown Generation & Shields Engine');
  const [releaseDate, setReleaseDate] = useState('2026-09-15');

  // New item inputs
  const [entryType, setEntryType] = useState<ChangelogEntry['type']>('feat');
  const [entryTitle, setEntryTitle] = useState('');
  const [entryPr, setEntryPr] = useState('#142');

  const [entries, setEntries] = useState<ChangelogEntry[]>([
    { id: '1', type: 'feat', title: 'Context-aware block generator with multi-framework detection', pr: '#142', author: '@devforge-bot' },
    { id: '2', type: 'feat', title: 'Shields.io Badge Smith with 60+ logos and custom tray exporter', pr: '#145', author: '@alex-rivera' },
    { id: '3', type: 'perf', title: 'Reduce live preview parse latency by 68% using memoized AST tokens', pr: '#149', author: '@core-team' },
    { id: '4', type: 'fix', title: 'Sanitize markdown tables with nested pipe characters', pr: '#153', author: '@contributor' },
    { id: '5', type: 'breaking', title: 'Migrate CLI command flags to Clap v4 syntax structure', pr: '#156', author: '@lead-dev' },
  ]);

  const handleAddEntry = () => {
    if (!entryTitle.trim()) {
      onShowToast('Please provide a change description');
      return;
    }

    const newEntry: ChangelogEntry = {
      id: `entry-${Date.now()}`,
      type: entryType,
      title: entryTitle.trim(),
      pr: entryPr.trim() || undefined,
      author: '@you',
    };

    setEntries([newEntry, ...entries]);
    setEntryTitle('');
    onShowToast('Added release entry');
  };

  const handleRemoveEntry = (id: string) => {
    setEntries(entries.filter(e => e.id !== id));
    onShowToast('Entry removed');
  };

  // Compile to standard Keep a Changelog format
  const featEntries = entries.filter(e => e.type === 'feat');
  const fixEntries = entries.filter(e => e.type === 'fix');
  const perfEntries = entries.filter(e => e.type === 'perf');
  const breakingEntries = entries.filter(e => e.type === 'breaking');

  let compiledChangelog = `# Changelog

All notable changes to this project will be documented in this file.
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [${version}] - ${releaseDate}

> ${releaseTagline}
`;

  if (breakingEntries.length > 0) {
    compiledChangelog += `\n### 💥 Breaking Changes\n`;
    breakingEntries.forEach(e => {
      compiledChangelog += `- **BREAKING**: ${e.title} (${e.pr || ''})\n`;
    });
  }

  if (featEntries.length > 0) {
    compiledChangelog += `\n### 🚀 Features & Enhancements\n`;
    featEntries.forEach(e => {
      compiledChangelog += `- ${e.title} (${e.pr || ''})\n`;
    });
  }

  if (perfEntries.length > 0) {
    compiledChangelog += `\n### ⚡ Performance Improvements\n`;
    perfEntries.forEach(e => {
      compiledChangelog += `- ${e.title} (${e.pr || ''})\n`;
    });
  }

  if (fixEntries.length > 0) {
    compiledChangelog += `\n### 🐛 Bug Fixes\n`;
    fixEntries.forEach(e => {
      compiledChangelog += `- ${e.title} (${e.pr || ''})\n`;
    });
  }

  const handleCopy = async () => {
    await copyToClipboard(compiledChangelog);
    onShowToast('CHANGELOG.md copied to clipboard!');
  };

  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <View style={styles.topBarLeft}>
          <Ionicons name="git-commit" size={18} color="#3B82F6" style={{ marginRight: 8 }} />
          <Text style={styles.topBarTitle}>Changelog & Release Notes</Text>
        </View>

        <TouchableOpacity style={styles.copyBtn} onPress={handleCopy}>
          <Ionicons name="copy-outline" size={14} color="#00F0FF" style={{ marginRight: 6 }} />
          <Text style={styles.copyBtnText}>Copy CHANGELOG.md</Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.mainLayout, isMobile && styles.mainLayoutMobile]}>
        {/* Left: Input Form */}
        <ScrollView style={[styles.leftPanel, isMobile && { width: '100%' }]} contentContainerStyle={{ padding: 18 }}>
          <Text style={styles.sectionHeader}>Release Metadata</Text>

          <View style={styles.versionRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.label}>Version Tag</Text>
              <TextInput
                style={styles.input}
                value={version}
                onChangeText={setVersion}
                placeholder="e.g. 2.5.0"
                placeholderTextColor="#64748B"
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.label}>Release Date</Text>
              <TextInput
                style={styles.input}
                value={releaseDate}
                onChangeText={setReleaseDate}
                placeholder="YYYY-MM-DD"
                placeholderTextColor="#64748B"
              />
            </View>
          </View>

          <Text style={styles.label}>Release Highlights / Tagline</Text>
          <TextInput
            style={styles.input}
            value={releaseTagline}
            onChangeText={setReleaseTagline}
            placeholder="e.g. Major UI revamp and edge support"
            placeholderTextColor="#64748B"
          />

          <Text style={[styles.sectionHeader, { marginTop: 14 }]}>Add Conventional Commit</Text>
          <Text style={styles.label}>Category</Text>
          <View style={styles.typesRow}>
            {(['feat', 'fix', 'perf', 'breaking'] as const).map(t => (
              <TouchableOpacity
                key={t}
                style={[styles.typeBtn, entryType === t && styles.activeTypeBtn]}
                onPress={() => setEntryType(t)}
              >
                <Text style={[styles.typeBtnText, entryType === t && styles.activeTypeBtnText]}>
                  {t.toUpperCase()}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.input}
            value={entryTitle}
            onChangeText={setEntryTitle}
            placeholder="e.g. add streaming SSE endpoint for chats"
            placeholderTextColor="#64748B"
          />

          <Text style={styles.label}>Pull Request / Issue Ref</Text>
          <TextInput
            style={styles.input}
            value={entryPr}
            onChangeText={setEntryPr}
            placeholder="#142"
            placeholderTextColor="#64748B"
          />

          <TouchableOpacity style={styles.addBtn} onPress={handleAddEntry} activeOpacity={0.85}>
            <Ionicons name="add" size={16} color="#090D14" style={{ marginRight: 6 }} />
            <Text style={styles.addBtnText}>Append Release Note</Text>
          </TouchableOpacity>

          {/* Current Entries List */}
          <Text style={[styles.sectionHeader, { marginTop: 22 }]}>Current Entries ({entries.length})</Text>
          <View style={styles.entriesList}>
            {entries.map(e => (
              <View key={e.id} style={styles.entryCard}>
                <View style={styles.entryInfo}>
                  <View style={styles.entryHeaderRow}>
                    <View style={[styles.typeBadge, { 
                      borderColor: e.type === 'breaking' ? '#EF4444' : e.type === 'feat' ? '#10B981' : e.type === 'perf' ? '#F59E0B' : '#3B82F6'
                    }]}>
                      <Text style={[styles.typeBadgeText, {
                        color: e.type === 'breaking' ? '#EF4444' : e.type === 'feat' ? '#10B981' : e.type === 'perf' ? '#F59E0B' : '#3B82F6'
                      }]}>{e.type.toUpperCase()}</Text>
                    </View>
                    {e.pr && <Text style={styles.entryPrText}>{e.pr}</Text>}
                  </View>
                  <Text style={styles.entryTitleText}>{e.title}</Text>
                </View>
                <TouchableOpacity onPress={() => handleRemoveEntry(e.id)} style={styles.removeBtn}>
                  <Ionicons name="trash-outline" size={14} color="#EF4444" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </ScrollView>

        {/* Right: Rendered Markdown Output */}
        <View style={[styles.rightPanel, isMobile && { width: '100%' }]}>
          <View style={styles.outputHeader}>
            <Ionicons name="document-text" size={16} color="#3B82F6" style={{ marginRight: 6 }} />
            <Text style={styles.outputTitle}>CHANGELOG.md Preview</Text>
          </View>

          <ScrollView style={styles.codeScroll} contentContainerStyle={{ padding: 18 }}>
            <Text style={styles.codeText}>{compiledChangelog}</Text>
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
  mainLayout: {
    flex: 1,
    flexDirection: 'row',
  },
  mainLayoutMobile: {
    flexDirection: 'column',
  },
  leftPanel: {
    width: 380,
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
    marginBottom: 8,
  },
  versionRow: {
    flexDirection: 'row',
    gap: 10,
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
    marginBottom: 10,
  },
  typesRow: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 10,
  },
  typeBtn: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: '#131B2A',
    borderWidth: 1,
    borderColor: '#26334D',
  },
  activeTypeBtn: {
    backgroundColor: '#1A2338',
    borderColor: '#00F0FF',
  },
  typeBtnText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#94A3B8',
  },
  activeTypeBtnText: {
    color: '#00F0FF',
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
  entriesList: {
    gap: 8,
  },
  entryCard: {
    backgroundColor: '#111726',
    borderWidth: 1,
    borderColor: '#1E293B',
    borderRadius: 8,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  entryInfo: {
    flex: 1,
    paddingRight: 8,
  },
  entryHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  typeBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 1,
    backgroundColor: '#0B0F17',
  },
  typeBadgeText: {
    fontSize: 9.5,
    fontWeight: '800',
  },
  entryPrText: {
    fontSize: 11,
    color: '#64748B',
    fontFamily: 'monospace',
  },
  entryTitleText: {
    fontSize: 12.5,
    color: '#CBD5E1',
    lineHeight: 17,
  },
  removeBtn: {
    padding: 4,
  },
  rightPanel: {
    flex: 1,
    backgroundColor: '#090D14',
  },
  outputHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#111726',
    borderBottomWidth: 1,
    borderBottomColor: '#1E293B',
  },
  outputTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#F8FAFC',
  },
  codeScroll: {
    flex: 1,
    backgroundColor: '#070A0F',
  },
  codeText: {
    fontFamily: 'monospace',
    fontSize: 13,
    lineHeight: 21,
    color: '#E2E8F0',
  },
});
