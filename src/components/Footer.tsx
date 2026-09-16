import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, useWindowDimensions, Linking } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { ToolId } from '../types';

interface FooterProps {
  onSelectTool: (toolId: ToolId) => void;
  onOpenSpecsModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTool, onOpenSpecsModal }) => {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  return (
    <View style={styles.footerContainer}>
      <View style={styles.footerInner}>
        {/* Brand column */}
        <View style={[styles.brandCol, isMobile && { marginBottom: 32 }]}>
          <View style={styles.brandTitleRow}>
            <View style={styles.logoBadge}>
              <Ionicons name="sparkles" size={16} color="#00F0FF" />
            </View>
            <Text style={styles.brandName}>DevForge</Text>
            <Text style={styles.brandAi}>AI</Text>
          </View>
          <Text style={styles.brandDesc}>
            The AI-powered developer asset platform for building stellar READMEs, profile portfolios, shields, and release notes.
          </Text>
          <View style={styles.statusPill}>
            <View style={styles.greenDot} />
            <Text style={styles.statusText}>All Systems Operational • 2026</Text>
          </View>
        </View>

        {/* Links columns */}
        <View style={[styles.linksRow, isMobile && styles.linksRowMobile]}>
          <View style={styles.col}>
            <Text style={styles.colTitle}>Asset Tools</Text>
            <TouchableOpacity onPress={() => onSelectTool('readme')} style={styles.linkItem}>
              <Text style={styles.linkText}>README Forge</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onSelectTool('profile')} style={styles.linkItem}>
              <Text style={styles.linkText}>Profile Studio</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onSelectTool('badges')} style={styles.linkItem}>
              <Text style={styles.linkText}>Badge Smith</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onSelectTool('filetree')} style={styles.linkItem}>
              <Text style={styles.linkText}>File Tree Architect</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.col}>
            <Text style={styles.colTitle}>Generators</Text>
            <TouchableOpacity onPress={() => onSelectTool('license')} style={styles.linkItem}>
              <Text style={styles.linkText}>License Selector</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onSelectTool('changelog')} style={styles.linkItem}>
              <Text style={styles.linkText}>Changelog Writer</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onSelectTool('socialcard')} style={styles.linkItem}>
              <Text style={styles.linkText}>OG Social Card</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onSelectTool('architecture')} style={styles.linkItem}>
              <Text style={styles.linkText}>DocSprint & Spec</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.col}>
            <Text style={styles.colTitle}>Architecture</Text>
            <TouchableOpacity onPress={onOpenSpecsModal} style={styles.linkItem}>
              <Text style={[styles.linkText, { color: '#00F0FF' }]}>Next.js 15 & Prisma Spec</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onOpenSpecsModal} style={styles.linkItem}>
              <Text style={styles.linkText}>Cloudflare Pages Deploy</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onOpenSpecsModal} style={styles.linkItem}>
              <Text style={styles.linkText}>.env.example & DB Schema</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onOpenSpecsModal} style={styles.linkItem}>
              <Text style={styles.linkText}>Folder Structure</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Bottom bar */}
      <View style={styles.bottomBar}>
        <Text style={styles.bottomBarText}>
          © 2026 DevForge AI Platform. MIT Licensed Open Product. Built for high-velocity software engineers.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    backgroundColor: '#070A0F',
    borderTopWidth: 1,
    borderTopColor: '#1E293B',
    paddingTop: 56,
    paddingBottom: 28,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  footerInner: {
    maxWidth: 1120,
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  brandCol: {
    maxWidth: 340,
  },
  brandTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  logoBadge: {
    width: 28,
    height: 28,
    borderRadius: 7,
    backgroundColor: '#0F1A2A',
    borderWidth: 1,
    borderColor: '#00F0FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  brandName: {
    fontSize: 18,
    fontWeight: '800',
    color: '#F8FAFC',
  },
  brandAi: {
    fontSize: 18,
    fontWeight: '900',
    color: '#00F0FF',
    marginLeft: 2,
  },
  brandDesc: {
    fontSize: 13,
    lineHeight: 20,
    color: '#8A99AD',
    marginBottom: 16,
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0E1624',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#1F2C42',
    alignSelf: 'flex-start',
  },
  greenDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: '#10B981',
    marginRight: 8,
  },
  statusText: {
    fontSize: 11,
    color: '#94A3B8',
    fontWeight: '600',
  },
  linksRow: {
    flexDirection: 'row',
    gap: 48,
  },
  linksRowMobile: {
    flexDirection: 'column',
    gap: 24,
    width: '100%',
  },
  col: {
    minWidth: 140,
  },
  colTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#F8FAFC',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 14,
  },
  linkItem: {
    paddingVertical: 6,
  },
  linkText: {
    fontSize: 13,
    color: '#8A99AD',
  },
  bottomBar: {
    maxWidth: 1120,
    width: '100%',
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopColor: '#162030',
    alignItems: 'center',
  },
  bottomBarText: {
    fontSize: 12,
    color: '#64748B',
    textAlign: 'center',
  },
});
