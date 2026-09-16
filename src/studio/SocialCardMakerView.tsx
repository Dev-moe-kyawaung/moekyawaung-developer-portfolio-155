import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, useWindowDimensions } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { copyToClipboard } from '../utils/clipboard';

interface SocialCardMakerViewProps {
  onShowToast: (msg: string) => void;
}

export const SocialCardMakerView: React.FC<SocialCardMakerViewProps> = ({ onShowToast }) => {
  const { width } = useWindowDimensions();
  const isMobile = width < 900;

  const [repoOwner, setRepoOwner] = useState('devforge-ai');
  const [repoName, setRepoName] = useState('nexusflow-saas');
  const [title, setTitle] = useState('NexusFlow SaaS Platform');
  const [tagline, setTagline] = useState('Enterprise workspace management with real-time AI collaboration');
  const [language, setLanguage] = useState('TypeScript');
  const [starCount, setStarCount] = useState('3.4k');
  const [forkCount, setForkCount] = useState('420');

  const [themeGradient, setThemeGradient] = useState<'cyber-cyan' | 'neon-violet' | 'emerald-forge' | 'midnight-slate'>('cyber-cyan');

  const getGradientColors = () => {
    switch (themeGradient) {
      case 'neon-violet':
        return { bg: '#170E28', border: '#8B5CF6', accent: '#C4B5FD', glow: 'rgba(139, 92, 246, 0.25)' };
      case 'emerald-forge':
        return { bg: '#0A1A14', border: '#10B981', accent: '#34D399', glow: 'rgba(16, 185, 129, 0.25)' };
      case 'midnight-slate':
        return { bg: '#0F172A', border: '#38BDF8', accent: '#94A3B8', glow: 'rgba(56, 189, 248, 0.25)' };
      case 'cyber-cyan':
      default:
        return { bg: '#0B1622', border: '#00F0FF', accent: '#00F0FF', glow: 'rgba(0, 240, 255, 0.25)' };
    }
  };

  const colors = getGradientColors();

  const handleCopyMarkdownImage = async () => {
    const md = `![${title}](https://opengraph.devforge.ai/${repoOwner}/${repoName}.png)`;
    await copyToClipboard(md);
    onShowToast('Social banner image tag copied!');
  };

  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <View style={styles.topBarLeft}>
          <Ionicons name="image" size={18} color="#00F0FF" style={{ marginRight: 8 }} />
          <Text style={styles.topBarTitle}>Social OG Image Card Maker (1280x640)</Text>
        </View>

        <TouchableOpacity style={styles.copyBtn} onPress={handleCopyMarkdownImage}>
          <Ionicons name="copy-outline" size={14} color="#00F0FF" style={{ marginRight: 6 }} />
          <Text style={styles.copyBtnText}>Copy OG Tag</Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.mainLayout, isMobile && styles.mainLayoutMobile]}>
        {/* Left: Card Controls */}
        <ScrollView style={[styles.leftPanel, isMobile && { width: '100%' }]} contentContainerStyle={{ padding: 18 }}>
          <Text style={styles.sectionHeader}>Repository Identity</Text>

          <Text style={styles.label}>Owner / Org Name</Text>
          <TextInput
            style={styles.input}
            value={repoOwner}
            onChangeText={setRepoOwner}
            placeholder="e.g. devforge-ai"
            placeholderTextColor="#64748B"
          />

          <Text style={styles.label}>Repository Slug</Text>
          <TextInput
            style={styles.input}
            value={repoName}
            onChangeText={setRepoName}
            placeholder="e.g. nexusflow-saas"
            placeholderTextColor="#64748B"
          />

          <Text style={styles.label}>Card Hero Headline</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={setTitle}
            placeholder="NexusFlow SaaS Platform"
            placeholderTextColor="#64748B"
          />

          <Text style={styles.label}>Subline Tagline</Text>
          <TextInput
            style={[styles.input, { height: 60 }]}
            multiline
            value={tagline}
            onChangeText={setTagline}
            placeholder="Tagline describing repository"
            placeholderTextColor="#64748B"
          />

          <Text style={[styles.sectionHeader, { marginTop: 14 }]}>Stats & Badges</Text>
          <View style={styles.statsRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.label}>Language</Text>
              <TextInput
                style={styles.input}
                value={language}
                onChangeText={setLanguage}
                placeholder="TypeScript"
                placeholderTextColor="#64748B"
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.label}>Stars</Text>
              <TextInput
                style={styles.input}
                value={starCount}
                onChangeText={setStarCount}
                placeholder="3.4k"
                placeholderTextColor="#64748B"
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.label}>Forks</Text>
              <TextInput
                style={styles.input}
                value={forkCount}
                onChangeText={setForkCount}
                placeholder="420"
                placeholderTextColor="#64748B"
              />
            </View>
          </View>

          <Text style={[styles.sectionHeader, { marginTop: 14 }]}>Card Aesthetic Theme</Text>
          <View style={styles.themesList}>
            {(['cyber-cyan', 'neon-violet', 'emerald-forge', 'midnight-slate'] as const).map(t => (
              <TouchableOpacity
                key={t}
                style={[styles.themeOption, themeGradient === t && styles.activeThemeOption]}
                onPress={() => setThemeGradient(t)}
              >
                <Text style={[styles.themeOptionText, themeGradient === t && styles.activeThemeOptionText]}>
                  {t.replace('-', ' ').toUpperCase()}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        {/* Right: Live Canvas Preview */}
        <View style={[styles.rightPanel, isMobile && { width: '100%' }]}>
          <View style={styles.canvasHeader}>
            <Text style={styles.canvasLabel}>Repository Social Preview (2:1 Ratio)</Text>
            <Text style={styles.aspectPill}>1280 × 640 Standard</Text>
          </View>

          <View style={styles.canvasContainer}>
            {/* The OG Banner Card */}
            <View style={[styles.socialCardCanvas, { backgroundColor: colors.bg, borderColor: colors.border, shadowColor: colors.border }]}>
              {/* Glow spots inside canvas */}
              <View style={[styles.glowSpot, { backgroundColor: colors.glow }]} />

              <View style={styles.cardInner}>
                {/* Top Row: Owner / Repo */}
                <View style={styles.cardHeaderRow}>
                  <View style={styles.ownerRow}>
                    <Ionicons name="logo-github" size={24} color="#F8FAFC" style={{ marginRight: 10 }} />
                    <Text style={styles.cardOwnerText}>{repoOwner} / <Text style={{ color: colors.accent, fontWeight: '800' }}>{repoName}</Text></Text>
                  </View>
                  <View style={styles.forgeBranding}>
                    <Ionicons name="sparkles" size={14} color={colors.accent} style={{ marginRight: 6 }} />
                    <Text style={[styles.forgeBrandingText, { color: colors.accent }]}>DevForge AI</Text>
                  </View>
                </View>

                {/* Main Headline */}
                <View style={styles.cardCenterBody}>
                  <Text style={styles.cardTitle}>{title}</Text>
                  <Text style={styles.cardTagline}>{tagline}</Text>
                </View>

                {/* Bottom Row: Stats & Platforms */}
                <View style={styles.cardFooterRow}>
                  <View style={styles.cardStatsGroup}>
                    <View style={styles.cardStatBadge}>
                      <Ionicons name="code-slash" size={14} color="#00F0FF" style={{ marginRight: 6 }} />
                      <Text style={styles.cardStatText}>{language}</Text>
                    </View>

                    <View style={styles.cardStatBadge}>
                      <Ionicons name="star" size={14} color="#F59E0B" style={{ marginRight: 6 }} />
                      <Text style={styles.cardStatText}>{starCount} stars</Text>
                    </View>

                    <View style={styles.cardStatBadge}>
                      <Ionicons name="git-branch" size={14} color="#94A3B8" style={{ marginRight: 6 }} />
                      <Text style={styles.cardStatText}>{forkCount} forks</Text>
                    </View>
                  </View>

                  <View style={styles.licenseBadge}>
                    <Text style={styles.licenseBadgeText}>MIT Open Source</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
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
  statsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  themesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  themeOption: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: '#131B2A',
    borderWidth: 1,
    borderColor: '#26334D',
  },
  activeThemeOption: {
    backgroundColor: '#1A2338',
    borderColor: '#00F0FF',
  },
  themeOptionText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#94A3B8',
  },
  activeThemeOptionText: {
    color: '#00F0FF',
  },
  rightPanel: {
    flex: 1,
    backgroundColor: '#090D14',
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  canvasHeader: {
    width: '100%',
    maxWidth: 640,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  canvasLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#94A3B8',
  },
  aspectPill: {
    fontSize: 11,
    fontFamily: 'monospace',
    color: '#64748B',
    backgroundColor: '#111726',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  canvasContainer: {
    width: '100%',
    maxWidth: 640,
  },
  socialCardCanvas: {
    borderRadius: 16,
    borderWidth: 2,
    padding: 28,
    minHeight: 320,
    position: 'relative',
    overflow: 'hidden',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 8,
  },
  glowSpot: {
    position: 'absolute',
    top: -50,
    right: -50,
    width: 250,
    height: 250,
    borderRadius: 125,
  },
  cardInner: {
    flex: 1,
    justifyContent: 'space-between',
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  ownerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardOwnerText: {
    fontSize: 16,
    color: '#94A3B8',
    fontFamily: 'monospace',
    fontWeight: '600',
  },
  forgeBranding: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
  },
  forgeBrandingText: {
    fontSize: 11,
    fontWeight: '800',
  },
  cardCenterBody: {
    marginBottom: 32,
  },
  cardTitle: {
    fontSize: 26,
    fontWeight: '900',
    color: '#F8FAFC',
    letterSpacing: -0.5,
    marginBottom: 8,
  },
  cardTagline: {
    fontSize: 14,
    color: '#CBD5E1',
    lineHeight: 22,
  },
  cardFooterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 12,
  },
  cardStatsGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  cardStatBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#1E293B',
  },
  cardStatText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#F1F5F9',
  },
  licenseBadge: {
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.4)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  licenseBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#10B981',
  },
});
