import React, { useState, useCallback } from 'react';
import { View, StyleSheet, ScrollView, Text, TouchableOpacity, useWindowDimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import Ionicons from '@expo/vector-icons/Ionicons';

import { ToolId, ReadmeTemplate } from './src/types';
import { README_TEMPLATES } from './src/data/templates';
import { Navbar } from './src/components/Navbar';
import { HeroSection } from './src/components/HeroSection';
import { StatsSection } from './src/components/StatsSection';
import { ToolsGrid } from './src/components/ToolsGrid';
import { HowItWorksSection } from './src/components/HowItWorksSection';
import { TemplateGallery } from './src/components/TemplateGallery';
import { ComparisonSection } from './src/components/ComparisonSection';
import { TestimonialsSection } from './src/components/TestimonialsSection';
import { FaqSection } from './src/components/FaqSection';
import { Footer } from './src/components/Footer';
import { Toast } from './src/components/Toast';
import { ArchitectureModal } from './src/components/ArchitectureModal';

import { StudioLayout } from './src/studio/StudioLayout';
import { DashboardView } from './src/studio/DashboardView';
import { ReadmeBuilderView } from './src/studio/ReadmeBuilderView';
import { ProfileStudioView } from './src/studio/ProfileStudioView';
import { BadgeSmithView } from './src/studio/BadgeSmithView';
import { FileTreeArchitectView } from './src/studio/FileTreeArchitectView';
import { LicenseSelectorView } from './src/studio/LicenseSelectorView';
import { ChangelogView } from './src/studio/ChangelogView';
import { SocialCardMakerView } from './src/studio/SocialCardMakerView';
import { DocSprintView } from './src/studio/DocSprintView';

export default function App() {
  const [fontsLoaded] = useFonts({
    ...Ionicons.font,
  });

  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  const [currentView, setCurrentView] = useState<'landing' | 'studio'>('landing');
  const [activeTool, setActiveTool] = useState<ToolId>('dashboard');
  const [activeTemplate, setActiveTemplate] = useState<ReadmeTemplate | undefined>(undefined);
  const [specsModalVisible, setSpecsModalVisible] = useState(false);

  // Toast feedback state
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'info' | 'warning'>('success');
  const [toastVisible, setToastVisible] = useState(false);

  const showToast = useCallback((msg: string, type: 'success' | 'info' | 'warning' = 'success') => {
    setToastMessage(msg);
    setToastType(type);
    setToastVisible(true);
    setTimeout(() => {
      setToastVisible(false);
    }, 2800);
  }, []);

  const handleLaunchStudio = (toolId: ToolId = 'dashboard') => {
    setActiveTool(toolId);
    setCurrentView('studio');
  };

  const handleSelectTemplate = (template: ReadmeTemplate) => {
    setActiveTemplate(template);
    setActiveTool('readme');
    setCurrentView('studio');
    showToast(`Loaded ${template.title} into README Forge`);
  };

  const handleQuickAiForge = (prompt: string, techStack: string) => {
    setActiveTool('readme');
    setCurrentView('studio');
    showToast(`⚡ AI generated asset suite for ${prompt}`);
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
        <StatusBar style="light" backgroundColor="#090D14" />

        {/* Global Sticky Navbar */}
        <Navbar
          currentView={currentView}
          onNavigateLanding={() => setCurrentView('landing')}
          onOpenStudio={(toolId) => handleLaunchStudio(toolId || 'dashboard')}
          onOpenSpecsModal={() => setSpecsModalVisible(true)}
        />

        {/* View Switcher */}
        {currentView === 'landing' ? (
          <ScrollView 
            style={styles.landingScroller} 
            showsVerticalScrollIndicator={true}
          >
            {/* Hero Section */}
            <HeroSection
              onLaunchStudio={() => handleLaunchStudio('readme')}
              onExploreTemplates={() => {
                showToast('Explore our curated stacks below');
              }}
              onShowToast={showToast}
            />

            {/* Live Stats */}
            <StatsSection />

            {/* 8 Core Developer Tools Grid */}
            <ToolsGrid
              onSelectTool={(toolId) => handleLaunchStudio(toolId)}
            />

            {/* 3-Step Interactive Timeline */}
            <HowItWorksSection />

            {/* Filterable Template Showcase */}
            <TemplateGallery
              onSelectTemplate={handleSelectTemplate}
            />

            {/* Feature Comparison Matrix */}
            <ComparisonSection />

            {/* Community Reviews & Testimonials */}
            <TestimonialsSection />

            {/* Expandable FAQs */}
            <FaqSection />

            {/* Final Call to Action */}
            <View style={styles.finalCtaSection}>
              <View style={styles.finalCtaInner}>
                <View style={styles.ctaPill}>
                  <Ionicons name="sparkles" size={12} color="#00F0FF" style={{ marginRight: 4 }} />
                  <Text style={styles.ctaPillText}>FREE DEVELOPER ACCESS</Text>
                </View>
                <Text style={styles.ctaTitle}>Ready to Forge Star-Worthy Repositories?</Text>
                <Text style={styles.ctaSubtitle}>
                  Join thousands of software engineers, open-source maintainers, and startup teams creating polished developer assets in seconds.
                </Text>
                <TouchableOpacity
                  style={styles.ctaLaunchBtn}
                  onPress={() => handleLaunchStudio('dashboard')}
                  activeOpacity={0.85}
                >
                  <Ionicons name="rocket" size={18} color="#090D14" style={{ marginRight: 8 }} />
                  <Text style={styles.ctaLaunchBtnText}>Launch DevForge Studio Free</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Footer */}
            <Footer
              onSelectTool={(toolId) => handleLaunchStudio(toolId)}
              onOpenSpecsModal={() => setSpecsModalVisible(true)}
            />
          </ScrollView>
        ) : (
          <StudioLayout
            activeTool={activeTool}
            onSelectTool={(toolId) => setActiveTool(toolId)}
            onBackToLanding={() => setCurrentView('landing')}
          >
            {activeTool === 'dashboard' && (
              <DashboardView
                onSelectTool={(toolId) => setActiveTool(toolId)}
                onQuickAiForge={handleQuickAiForge}
                onShowToast={showToast}
              />
            )}

            {activeTool === 'readme' && (
              <ReadmeBuilderView
                initialTemplate={activeTemplate}
                onShowToast={showToast}
              />
            )}

            {activeTool === 'profile' && (
              <ProfileStudioView
                onShowToast={showToast}
              />
            )}

            {activeTool === 'badges' && (
              <BadgeSmithView
                onShowToast={showToast}
              />
            )}

            {activeTool === 'filetree' && (
              <FileTreeArchitectView
                onShowToast={showToast}
              />
            )}

            {activeTool === 'license' && (
              <LicenseSelectorView
                onShowToast={showToast}
              />
            )}

            {activeTool === 'changelog' && (
              <ChangelogView
                onShowToast={showToast}
              />
            )}

            {activeTool === 'socialcard' && (
              <SocialCardMakerView
                onShowToast={showToast}
              />
            )}

            {activeTool === 'architecture' && (
              <DocSprintView
                onShowToast={showToast}
              />
            )}
          </StudioLayout>
        )}

        {/* Full Deliverables & Architecture Modal (Next.js 15, Prisma, .env, Cloudflare) */}
        <ArchitectureModal
          visible={specsModalVisible}
          onClose={() => setSpecsModalVisible(false)}
          onShowToast={showToast}
        />

        {/* Global Toast Notification */}
        <Toast
          message={toastMessage}
          type={toastType}
          visible={toastVisible}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#090D14',
  },
  landingScroller: {
    flex: 1,
    backgroundColor: '#090D14',
  },
  finalCtaSection: {
    backgroundColor: '#0B111D',
    borderTopWidth: 1,
    borderTopColor: '#1E293B',
    paddingVertical: 72,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  finalCtaInner: {
    maxWidth: 720,
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#111726',
    borderWidth: 1.5,
    borderColor: 'rgba(0, 240, 255, 0.35)',
    borderRadius: 20,
    padding: 36,
    shadowColor: '#00F0FF',
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 8,
  },
  ctaPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 240, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(0, 240, 255, 0.3)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    marginBottom: 16,
  },
  ctaPillText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#00F0FF',
    letterSpacing: 1,
  },
  ctaTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: '#F8FAFC',
    textAlign: 'center',
    letterSpacing: -0.5,
    marginBottom: 12,
  },
  ctaSubtitle: {
    fontSize: 14.5,
    lineHeight: 23,
    color: '#94A3B8',
    textAlign: 'center',
    marginBottom: 24,
  },
  ctaLaunchBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#00F0FF',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 10,
    shadowColor: '#00F0FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 6,
  },
  ctaLaunchBtnText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#090D14',
  },
});
