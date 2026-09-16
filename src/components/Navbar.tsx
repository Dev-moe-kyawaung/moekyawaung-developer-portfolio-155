import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, useWindowDimensions } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { ToolId } from '../types';

interface NavbarProps {
  currentView: 'landing' | 'studio';
  onNavigateLanding: () => void;
  onOpenStudio: (toolId?: ToolId) => void;
  onOpenSpecsModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigateLanding,
  onOpenStudio,
  onOpenSpecsModal,
}) => {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  return (
    <View style={styles.header}>
      {/* Brand */}
      <TouchableOpacity 
        style={styles.brandContainer}
        onPress={onNavigateLanding}
        activeOpacity={0.8}
      >
        <View style={styles.logoBadge}>
          <Ionicons name="sparkles" size={18} color="#00F0FF" />
        </View>
        <View style={styles.brandTextGroup}>
          <View style={styles.brandTitleRow}>
            <Text style={styles.brandName}>DevForge</Text>
            <Text style={styles.brandAi}>AI</Text>
          </View>
        </View>
        <View style={styles.versionTag}>
          <Text style={styles.versionText}>v2.5</Text>
        </View>
      </TouchableOpacity>

      {/* Nav Links (Desktop) */}
      {!isMobile && (
        <View style={styles.navLinks}>
          <TouchableOpacity 
            style={styles.navLink}
            onPress={onNavigateLanding}
          >
            <Text style={[styles.navLinkText, currentView === 'landing' && styles.activeNavLinkText]}>
              Platform
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.navLink}
            onPress={() => onOpenStudio('readme')}
          >
            <Text style={styles.navLinkText}>README Forge</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.navLink}
            onPress={() => onOpenStudio('profile')}
          >
            <Text style={styles.navLinkText}>Profile Studio</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.navLink}
            onPress={() => onOpenStudio('badges')}
          >
            <Text style={styles.navLinkText}>Badge Smith</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.navLink}
            onPress={onOpenSpecsModal}
          >
            <View style={styles.specsPill}>
              <Ionicons name="server-outline" size={13} color="#8B5CF6" style={{ marginRight: 4 }} />
              <Text style={styles.specsText}>Next.js / Cloudflare</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}

      {/* Action CTA */}
      <View style={styles.rightActions}>
        {currentView === 'studio' ? (
          <TouchableOpacity 
            style={styles.homeBtn}
            onPress={onNavigateLanding}
            activeOpacity={0.8}
          >
            <Ionicons name="home-outline" size={16} color="#94A3B8" style={{ marginRight: 6 }} />
            <Text style={styles.homeBtnText}>{isMobile ? 'Home' : 'Landing Page'}</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity 
            style={styles.specBtnMobile}
            onPress={onOpenSpecsModal}
            activeOpacity={0.8}
          >
            <Ionicons name="terminal-outline" size={16} color="#A78BFA" />
          </TouchableOpacity>
        )}

        <TouchableOpacity 
          style={styles.launchBtn}
          onPress={() => onOpenStudio('dashboard')}
          activeOpacity={0.85}
        >
          <Ionicons 
            name={currentView === 'studio' ? "grid" : "rocket"} 
            size={16} 
            color="#0B0F17" 
            style={{ marginRight: 6 }} 
          />
          <Text style={styles.launchBtnText}>
            {currentView === 'studio' ? 'Dashboard' : 'Launch Studio'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 64,
    backgroundColor: '#090D14',
    borderBottomWidth: 1,
    borderBottomColor: '#1E293B',
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 50,
  },
  brandContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoBadge: {
    width: 34,
    height: 34,
    borderRadius: 8,
    backgroundColor: '#0F1A2A',
    borderWidth: 1.5,
    borderColor: '#00F0FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    shadowColor: '#00F0FF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  brandTextGroup: {
    justifyContent: 'center',
  },
  brandTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  brandName: {
    fontSize: 19,
    fontWeight: '800',
    color: '#F8FAFC',
    letterSpacing: -0.5,
  },
  brandAi: {
    fontSize: 19,
    fontWeight: '900',
    color: '#00F0FF',
    marginLeft: 2,
  },
  versionTag: {
    backgroundColor: 'rgba(139, 92, 246, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.4)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    marginLeft: 8,
  },
  versionText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#A78BFA',
  },
  navLinks: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  navLink: {
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
  navLinkText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#94A3B8',
  },
  activeNavLinkText: {
    color: '#00F0FF',
    fontWeight: '600',
  },
  specsPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#161D2B',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#2D3748',
  },
  specsText: {
    fontSize: 12,
    color: '#C4B5FD',
    fontWeight: '600',
  },
  rightActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  homeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 8,
    backgroundColor: '#131B2A',
    borderWidth: 1,
    borderColor: '#26334D',
  },
  homeBtnText: {
    fontSize: 13,
    color: '#CBD5E1',
    fontWeight: '600',
  },
  specBtnMobile: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: '#161D2B',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#2D3748',
  },
  launchBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#00F0FF',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
    shadowColor: '#00F0FF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
  },
  launchBtnText: {
    fontSize: 13.5,
    fontWeight: '700',
    color: '#090D14',
  },
});
