import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, useWindowDimensions, ScrollView } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { MarkdownRenderer } from './MarkdownRenderer';
import { copyToClipboard } from '../utils/clipboard';

interface HeroSectionProps {
  onLaunchStudio: () => void;
  onExploreTemplates: () => void;
  onShowToast: (msg: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onLaunchStudio,
  onExploreTemplates,
  onShowToast,
}) => {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const isTablet = width < 1024;

  const [activeTab, setActiveTab] = useState<'preview' | 'raw' | 'architecture'>('preview');

  const sampleMarkdown = `# ⚡ NexusFlow SaaS

> Enterprise-grade workspace management platform with real-time AI collaboration, multi-tenant billing, and granular RBAC.

[![Next.js 15](https://img.shields.io/badge/Next.js-15.1-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-emerald?style=for-the-badge)](LICENSE)

## 🌟 Key Features
- **🚀 Server-Driven Architecture**: Next.js 15 App Router with dynamic streaming & RSCs.
- **🔐 Multi-Tenant Authentication**: Role-based access control via Supabase Auth.
- **💳 Recurring Billing**: Stripe Checkout, portal integration & usage metering.
- **⚡ Real-time Telemetry**: WebSocket event streaming with <15ms latency.`;

  const sampleRaw = sampleMarkdown;

  const sampleArchitecture = `flowchart TD
    Client[Web & Mobile Clients] --> Edge[Cloudflare Edge Gateway]
    Edge --> NextApp[Next.js 15 App Router]
    NextApp --> ServerActions[Server Actions & API Routes]
    ServerActions --> Auth[Supabase Auth Service]
    ServerActions --> DB[(PostgreSQL + Prisma)]
    ServerActions --> Cache[(Redis Cache Cluster)]
    ServerActions --> Stripe[Stripe Billing Webhooks]`;

  const handleCopy = async () => {
    const textToCopy = activeTab === 'architecture' ? sampleArchitecture : sampleMarkdown;
    await copyToClipboard(textToCopy);
    onShowToast('Copied to clipboard!');
  };

  return (
    <View style={styles.heroWrapper}>
      {/* Background glow effects */}
      <View style={styles.glowTop} />
      <View style={styles.glowBottom} />

      <View style={styles.contentContainer}>
        {/* Release Pill */}
        <View style={styles.pillBadge}>
          <View style={styles.pillDot} />
          <Text style={styles.pillText}>DEVFORGE 2.5: AI-POWERED CONTEXT-AWARE MARKDOWN ENGINE</Text>
          <Ionicons name="sparkles" size={13} color="#00F0FF" style={{ marginLeft: 6 }} />
        </View>

        {/* Main Title */}
        <Text style={[styles.mainHeadline, isMobile && styles.mainHeadlineMobile]}>
          Forge Flawless <Text style={styles.cyanGradientText}>Developer Assets</Text> with AI
        </Text>

        {/* Subtitle */}
        <Text style={[styles.subtitle, isMobile && styles.subtitleMobile]}>
          Transform your repositories into star magnets. Generate production-grade READMEs, GitHub profile studios, animated badge strips, directory trees, changelogs, and social cards in seconds.
        </Text>

        {/* Hero CTAs */}
        <View style={[styles.ctaRow, isMobile && styles.ctaRowMobile]}>
          <TouchableOpacity 
            style={styles.primaryCta}
            onPress={onLaunchStudio}
            activeOpacity={0.85}
          >
            <Ionicons name="rocket" size={18} color="#090D14" style={{ marginRight: 8 }} />
            <Text style={styles.primaryCtaText}>Launch Studio (Free)</Text>
            <Ionicons name="arrow-forward" size={16} color="#090D14" style={{ marginLeft: 6 }} />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.secondaryCta}
            onPress={onExploreTemplates}
            activeOpacity={0.8}
          >
            <Ionicons name="layers-outline" size={18} color="#00F0FF" style={{ marginRight: 8 }} />
            <Text style={styles.secondaryCtaText}>Explore 30+ Templates</Text>
          </TouchableOpacity>
        </View>

        {/* Quick Highlights Row */}
        <View style={styles.featuresPillsRow}>
          <View style={styles.miniPill}>
            <Ionicons name="checkmark-circle" size={14} color="#10B981" />
            <Text style={styles.miniPillText}>GitHub Flavored Markdown</Text>
          </View>
          <View style={styles.miniPill}>
            <Ionicons name="checkmark-circle" size={14} color="#10B981" />
            <Text style={styles.miniPillText}>8 Built-in Dev Tools</Text>
          </View>
          <View style={styles.miniPill}>
            <Ionicons name="checkmark-circle" size={14} color="#10B981" />
            <Text style={styles.miniPillText}>Zero Sign-Up Required</Text>
          </View>
        </View>

        {/* Interactive Live Preview Box */}
        <View style={styles.previewContainer}>
          {/* Header bar */}
          <View style={styles.previewHeader}>
            <View style={styles.windowDots}>
              <View style={[styles.windowDot, { backgroundColor: '#EF4444' }]} />
              <View style={[styles.windowDot, { backgroundColor: '#F59E0B' }]} />
              <View style={[styles.windowDot, { backgroundColor: '#10B981' }]} />
              <Text style={styles.previewTitle}>README.md — NexusFlow SaaS</Text>
            </View>

            {/* View Mode Tabs */}
            <View style={styles.tabsContainer}>
              <TouchableOpacity 
                style={[styles.tabBtn, activeTab === 'preview' && styles.activeTabBtn]}
                onPress={() => setActiveTab('preview')}
              >
                <Ionicons name="eye-outline" size={14} color={activeTab === 'preview' ? '#00F0FF' : '#94A3B8'} style={{ marginRight: 4 }} />
                <Text style={[styles.tabBtnText, activeTab === 'preview' && styles.activeTabBtnText]}>
                  GitHub Preview
                </Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.tabBtn, activeTab === 'raw' && styles.activeTabBtn]}
                onPress={() => setActiveTab('raw')}
              >
                <Ionicons name="code-slash" size={14} color={activeTab === 'raw' ? '#00F0FF' : '#94A3B8'} style={{ marginRight: 4 }} />
                <Text style={[styles.tabBtnText, activeTab === 'raw' && styles.activeTabBtnText]}>
                  Raw Markdown
                </Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.tabBtn, activeTab === 'architecture' && styles.activeTabBtn]}
                onPress={() => setActiveTab('architecture')}
              >
                <Ionicons name="git-network-outline" size={14} color={activeTab === 'architecture' ? '#00F0FF' : '#94A3B8'} style={{ marginRight: 4 }} />
                <Text style={[styles.tabBtnText, activeTab === 'architecture' && styles.activeTabBtnText]}>
                  Mermaid Spec
                </Text>
              </TouchableOpacity>
            </View>

            {/* Quick Copy Action */}
            <TouchableOpacity 
              style={styles.copyHeaderBtn}
              onPress={handleCopy}
              activeOpacity={0.7}
            >
              <Ionicons name="copy-outline" size={14} color="#00F0FF" style={{ marginRight: 6 }} />
              <Text style={styles.copyHeaderText}>Copy</Text>
            </TouchableOpacity>
          </View>

          {/* Body */}
          <View style={styles.previewBody}>
            {activeTab === 'preview' && (
              <MarkdownRenderer content={sampleMarkdown} theme="dark" />
            )}

            {activeTab === 'raw' && (
              <ScrollView horizontal={false} showsVerticalScrollIndicator={true} style={styles.rawScroller}>
                <Text style={styles.rawCodeText}>{sampleRaw}</Text>
              </ScrollView>
            )}

            {activeTab === 'architecture' && (
              <View style={styles.mermaidContainer}>
                <View style={styles.mermaidHeaderRow}>
                  <Ionicons name="git-network" size={16} color="#8B5CF6" style={{ marginRight: 6 }} />
                  <Text style={styles.mermaidHeaderText}>Mermaid.js High-Throughput System Architecture</Text>
                </View>
                <Text style={styles.mermaidCodeText}>{sampleArchitecture}</Text>
                <View style={styles.mermaidVisualPills}>
                  <View style={[styles.mermaidPill, { borderColor: '#00F0FF' }]}>
                    <Text style={[styles.mermaidPillText, { color: '#00F0FF' }]}>Cloudflare Gateway</Text>
                  </View>
                  <Ionicons name="arrow-forward" size={14} color="#64748B" />
                  <View style={[styles.mermaidPill, { borderColor: '#8B5CF6' }]}>
                    <Text style={[styles.mermaidPillText, { color: '#C4B5FD' }]}>Next.js 15 Server</Text>
                  </View>
                  <Ionicons name="arrow-forward" size={14} color="#64748B" />
                  <View style={[styles.mermaidPill, { borderColor: '#10B981' }]}>
                    <Text style={[styles.mermaidPillText, { color: '#10B981' }]}>PostgreSQL + Cache</Text>
                  </View>
                </View>
              </View>
            )}
          </View>

          {/* Footer of the preview */}
          <View style={styles.previewFooter}>
            <View style={styles.statusIndicatorGroup}>
              <View style={styles.greenPulseDot} />
              <Text style={styles.statusText}>AI Validator: 100% Syntax Valid • Shields.io Live</Text>
            </View>
            <TouchableOpacity 
              style={styles.openInBuilderBtn}
              onPress={onLaunchStudio}
              activeOpacity={0.8}
            >
              <Text style={styles.openInBuilderText}>Open in Studio to Edit</Text>
              <Ionicons name="arrow-forward" size={13} color="#00F0FF" style={{ marginLeft: 4 }} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  heroWrapper: {
    paddingVertical: 48,
    paddingHorizontal: 20,
    backgroundColor: '#0B0F17',
    position: 'relative',
    overflow: 'hidden',
    alignItems: 'center',
  },
  glowTop: {
    position: 'absolute',
    top: -120,
    left: '20%',
    width: 400,
    height: 400,
    borderRadius: 200,
    backgroundColor: 'rgba(0, 240, 255, 0.08)',
    transform: [{ scaleX: 1.5 }],
  },
  glowBottom: {
    position: 'absolute',
    top: 200,
    right: '10%',
    width: 450,
    height: 450,
    borderRadius: 225,
    backgroundColor: 'rgba(139, 92, 246, 0.07)',
    transform: [{ scaleX: 1.4 }],
  },
  contentContainer: {
    maxWidth: 1120,
    width: '100%',
    alignItems: 'center',
  },
  pillBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#121A28',
    borderColor: 'rgba(0, 240, 255, 0.35)',
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 999,
    marginBottom: 24,
    shadowColor: '#00F0FF',
    shadowOpacity: 0.15,
    shadowRadius: 10,
  },
  pillDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#00F0FF',
    marginRight: 8,
  },
  pillText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#00F0FF',
    letterSpacing: 0.8,
  },
  mainHeadline: {
    fontSize: 48,
    fontWeight: '900',
    color: '#F8FAFC',
    textAlign: 'center',
    letterSpacing: -1.2,
    lineHeight: 56,
    marginBottom: 18,
    maxWidth: 900,
  },
  mainHeadlineMobile: {
    fontSize: 32,
    lineHeight: 38,
    letterSpacing: -0.6,
  },
  cyanGradientText: {
    color: '#00F0FF',
  },
  subtitle: {
    fontSize: 17,
    lineHeight: 27,
    color: '#94A3B8',
    textAlign: 'center',
    maxWidth: 760,
    marginBottom: 32,
  },
  subtitleMobile: {
    fontSize: 15,
    lineHeight: 23,
    marginBottom: 24,
  },
  ctaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginBottom: 26,
  },
  ctaRowMobile: {
    flexDirection: 'column',
    width: '100%',
    maxWidth: 320,
  },
  primaryCta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00F0FF',
    paddingHorizontal: 22,
    paddingVertical: 14,
    borderRadius: 10,
    shadowColor: '#00F0FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 6,
  },
  primaryCtaText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#090D14',
  },
  secondaryCta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#131B2A',
    borderColor: '#26334D',
    borderWidth: 1.5,
    paddingHorizontal: 20,
    paddingVertical: 13,
    borderRadius: 10,
  },
  secondaryCtaText: {
    fontSize: 14.5,
    fontWeight: '700',
    color: '#E2E8F0',
  },
  featuresPillsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 16,
    marginBottom: 36,
  },
  miniPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  miniPillText: {
    fontSize: 13,
    color: '#94A3B8',
    fontWeight: '500',
  },
  previewContainer: {
    width: '100%',
    backgroundColor: '#0D1117',
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#26334D',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.5,
    shadowRadius: 24,
    elevation: 10,
  },
  previewHeader: {
    backgroundColor: '#161B22',
    borderBottomWidth: 1,
    borderBottomColor: '#30363D',
    paddingHorizontal: 16,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 10,
  },
  windowDots: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  windowDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  previewTitle: {
    marginLeft: 10,
    color: '#8B949E',
    fontSize: 12,
    fontFamily: 'monospace',
    fontWeight: '600',
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#0D1117',
    borderRadius: 8,
    padding: 3,
    borderWidth: 1,
    borderColor: '#30363D',
  },
  tabBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
  },
  activeTabBtn: {
    backgroundColor: '#1F2937',
  },
  tabBtnText: {
    fontSize: 12,
    color: '#94A3B8',
    fontWeight: '600',
  },
  activeTabBtnText: {
    color: '#00F0FF',
  },
  copyHeaderBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E293B',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#334155',
  },
  copyHeaderText: {
    fontSize: 12,
    color: '#00F0FF',
    fontWeight: '700',
  },
  previewBody: {
    padding: 16,
    minHeight: 280,
  },
  rawScroller: {
    backgroundColor: '#090D14',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#1E293B',
    maxHeight: 400,
  },
  rawCodeText: {
    fontFamily: 'monospace',
    fontSize: 12.5,
    lineHeight: 20,
    color: '#58A6FF',
  },
  mermaidContainer: {
    backgroundColor: '#090D14',
    padding: 18,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#2D3748',
  },
  mermaidHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  mermaidHeaderText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#C4B5FD',
  },
  mermaidCodeText: {
    fontFamily: 'monospace',
    fontSize: 12,
    color: '#94A3B8',
    lineHeight: 18,
    backgroundColor: '#0F172A',
    padding: 12,
    borderRadius: 6,
    marginBottom: 16,
  },
  mermaidVisualPills: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 10,
    paddingVertical: 10,
  },
  mermaidPill: {
    backgroundColor: '#131D2E',
    borderWidth: 1.5,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 8,
  },
  mermaidPillText: {
    fontSize: 12,
    fontWeight: '700',
  },
  previewFooter: {
    backgroundColor: '#161B22',
    borderTopWidth: 1,
    borderTopColor: '#30363D',
    paddingHorizontal: 16,
    paddingVertical: 9,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 8,
  },
  statusIndicatorGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  greenPulseDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#10B981',
    marginRight: 8,
  },
  statusText: {
    fontSize: 12,
    color: '#8B949E',
    fontWeight: '500',
  },
  openInBuilderBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  openInBuilderText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#00F0FF',
  },
});
