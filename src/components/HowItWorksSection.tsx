import React from 'react';
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { HOW_IT_WORKS_STEPS } from '../data/landingData';

export const HowItWorksSection: React.FC = () => {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  return (
    <View style={styles.sectionContainer}>
      <View style={styles.sectionInner}>
        <View style={styles.headerBlock}>
          <View style={styles.stepPill}>
            <Text style={styles.stepPillText}>WORKFLOW</Text>
          </View>
          <Text style={styles.sectionTitle}>From Empty Repo to 5-Star Documentation</Text>
          <Text style={styles.sectionSubtitle}>
            Three streamlined steps engineered to eliminate doc-writing friction so you can focus on building features.
          </Text>
        </View>

        <View style={[styles.stepsContainer, isMobile && styles.stepsContainerMobile]}>
          {HOW_IT_WORKS_STEPS.map((step, idx) => (
            <View 
              key={idx} 
              style={[
                styles.stepCard, 
                isMobile ? styles.stepCardMobile : styles.stepCardDesktop
              ]}
            >
              <View style={styles.stepNumberRow}>
                <Text style={styles.stepNumber}>{step.step}</Text>
                <View style={styles.badgeWrapper}>
                  <Text style={styles.badgeText}>{step.badge}</Text>
                </View>
              </View>

              <Text style={styles.stepTitle}>{step.title}</Text>
              <Text style={styles.stepDesc}>{step.description}</Text>

              <View style={styles.codeSnippetBox}>
                <View style={styles.codeBoxHeader}>
                  <Ionicons name="terminal" size={12} color="#64748B" style={{ marginRight: 6 }} />
                  <Text style={styles.codeBoxLabel}>terminal</Text>
                </View>
                <Text style={styles.codeSnippetText}>{step.codeSnippet}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    backgroundColor: '#090D14',
    paddingVertical: 64,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#1E293B',
  },
  sectionInner: {
    maxWidth: 1120,
    width: '100%',
  },
  headerBlock: {
    alignItems: 'center',
    marginBottom: 44,
  },
  stepPill: {
    backgroundColor: 'rgba(139, 92, 246, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.3)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 999,
    marginBottom: 14,
  },
  stepPillText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#A78BFA',
    letterSpacing: 1,
  },
  sectionTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: '#F8FAFC',
    textAlign: 'center',
    letterSpacing: -0.6,
    marginBottom: 12,
  },
  sectionSubtitle: {
    fontSize: 15,
    color: '#94A3B8',
    textAlign: 'center',
    maxWidth: 640,
    lineHeight: 24,
  },
  stepsContainer: {
    flexDirection: 'row',
    gap: 20,
    justifyContent: 'space-between',
  },
  stepsContainerMobile: {
    flexDirection: 'column',
  },
  stepCard: {
    backgroundColor: '#111726',
    borderWidth: 1.5,
    borderColor: '#232E43',
    borderRadius: 14,
    padding: 24,
  },
  stepCardDesktop: {
    flex: 1,
  },
  stepCardMobile: {
    width: '100%',
  },
  stepNumberRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  stepNumber: {
    fontSize: 28,
    fontWeight: '900',
    color: '#00F0FF',
    fontFamily: 'monospace',
  },
  badgeWrapper: {
    backgroundColor: '#0D1420',
    borderWidth: 1,
    borderColor: '#24324B',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#94A3B8',
  },
  stepTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#F8FAFC',
    marginBottom: 8,
  },
  stepDesc: {
    fontSize: 13.5,
    lineHeight: 21,
    color: '#8A99AD',
    marginBottom: 18,
  },
  codeSnippetBox: {
    backgroundColor: '#080B10',
    borderWidth: 1,
    borderColor: '#1E293B',
    borderRadius: 8,
    padding: 12,
    marginTop: 'auto',
  },
  codeBoxHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  codeBoxLabel: {
    fontSize: 10,
    fontFamily: 'monospace',
    color: '#64748B',
    textTransform: 'uppercase',
  },
  codeSnippetText: {
    fontFamily: 'monospace',
    fontSize: 11.5,
    color: '#34D399',
    lineHeight: 18,
  },
});
