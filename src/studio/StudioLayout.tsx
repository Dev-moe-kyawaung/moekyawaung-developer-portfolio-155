import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, useWindowDimensions, ScrollView } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { ToolId } from '../types';

interface StudioLayoutProps {
  activeTool: ToolId;
  onSelectTool: (toolId: ToolId) => void;
  onBackToLanding: () => void;
  children: React.ReactNode;
}

export const StudioLayout: React.FC<StudioLayoutProps> = ({
  activeTool,
  onSelectTool,
  onBackToLanding,
  children,
}) => {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  const toolsNav = [
    { id: 'dashboard' as ToolId, label: 'Control Center', icon: 'grid', color: '#94A3B8' },
    { id: 'readme' as ToolId, label: 'README Forge', icon: 'document-text', color: '#00F0FF' },
    { id: 'profile' as ToolId, label: 'Profile Studio', icon: 'person', color: '#8B5CF6' },
    { id: 'badges' as ToolId, label: 'Badge Smith', icon: 'shield-checkmark', color: '#10B981' },
    { id: 'filetree' as ToolId, label: 'File Tree', icon: 'folder-open', color: '#F59E0B' },
    { id: 'license' as ToolId, label: 'License Selector', icon: 'ribbon', color: '#EC4899' },
    { id: 'changelog' as ToolId, label: 'Changelog', icon: 'git-commit', color: '#3B82F6' },
    { id: 'socialcard' as ToolId, label: 'OG Social Card', icon: 'image', color: '#00F0FF' },
    { id: 'architecture' as ToolId, label: 'DocSprint & Specs', icon: 'git-network', color: '#A78BFA' },
  ];

  return (
    <View style={styles.layoutContainer}>
      {/* Sidebar for Desktop */}
      {!isMobile && (
        <View style={styles.sidebar}>
          <View style={styles.sidebarHeader}>
            <TouchableOpacity style={styles.backBtn} onPress={onBackToLanding} activeOpacity={0.8}>
              <Ionicons name="arrow-back" size={14} color="#94A3B8" style={{ marginRight: 6 }} />
              <Text style={styles.backBtnText}>Landing Page</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.navScroll}>
            <Text style={styles.groupHeading}>Developer Studio</Text>
            {toolsNav.map(item => {
              const isActive = item.id === activeTool;
              return (
                <TouchableOpacity
                  key={item.id}
                  style={[styles.navLink, isActive && styles.activeNavLink]}
                  onPress={() => onSelectTool(item.id)}
                  activeOpacity={0.7}
                >
                  <Ionicons 
                    name={item.icon as any} 
                    size={17} 
                    color={isActive ? item.color : '#64748B'} 
                    style={{ marginRight: 10 }} 
                  />
                  <Text style={[styles.navLinkText, isActive && styles.activeNavLinkText]}>
                    {item.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          {/* Sidebar Footer */}
          <View style={styles.sidebarFooter}>
            <View style={styles.statusIndicator}>
              <View style={styles.greenDot} />
              <Text style={styles.statusLabel}>DevForge AI Engine Active</Text>
            </View>
          </View>
        </View>
      )}

      {/* Main Studio View Area */}
      <View style={styles.mainContent}>
        {/* Mobile Horizontal Tool Scroller */}
        {isMobile && (
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.mobileNavStrip}>
            {toolsNav.map(item => {
              const isActive = item.id === activeTool;
              return (
                <TouchableOpacity
                  key={item.id}
                  style={[styles.mobileTab, isActive && styles.activeMobileTab]}
                  onPress={() => onSelectTool(item.id)}
                >
                  <Ionicons name={item.icon as any} size={14} color={isActive ? item.color : '#64748B'} style={{ marginRight: 4 }} />
                  <Text style={[styles.mobileTabText, isActive && styles.activeMobileTabText]}>
                    {item.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        )}

        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  layoutContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#090D14',
  },
  sidebar: {
    width: 240,
    backgroundColor: '#0B0F17',
    borderRightWidth: 1,
    borderRightColor: '#1E293B',
    paddingVertical: 14,
    justifyContent: 'space-between',
  },
  sidebarHeader: {
    paddingHorizontal: 14,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#1E293B',
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#111726',
    borderWidth: 1,
    borderColor: '#26334D',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
  },
  backBtnText: {
    fontSize: 12,
    color: '#94A3B8',
    fontWeight: '600',
  },
  navScroll: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 14,
  },
  groupHeading: {
    fontSize: 11,
    fontWeight: '800',
    color: '#475569',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    paddingHorizontal: 8,
    marginBottom: 8,
  },
  navLink: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 9,
    borderRadius: 8,
    marginBottom: 4,
  },
  activeNavLink: {
    backgroundColor: '#131D2E',
    borderWidth: 1,
    borderColor: '#1E293B',
  },
  navLinkText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#94A3B8',
  },
  activeNavLinkText: {
    color: '#F8FAFC',
    fontWeight: '700',
  },
  sidebarFooter: {
    paddingHorizontal: 14,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#1E293B',
  },
  statusIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  greenDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#10B981',
    marginRight: 6,
  },
  statusLabel: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '500',
  },
  mainContent: {
    flex: 1,
    backgroundColor: '#090D14',
  },
  mobileNavStrip: {
    backgroundColor: '#0D131F',
    borderBottomWidth: 1,
    borderBottomColor: '#1E293B',
    paddingHorizontal: 10,
    paddingVertical: 8,
    maxHeight: 48,
  },
  mobileTab: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#111726',
    borderWidth: 1,
    borderColor: '#1E293B',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
    marginRight: 8,
  },
  activeMobileTab: {
    borderColor: '#00F0FF',
    backgroundColor: '#162238',
  },
  mobileTabText: {
    fontSize: 11.5,
    fontWeight: '600',
    color: '#94A3B8',
  },
  activeMobileTabText: {
    color: '#00F0FF',
  },
});
