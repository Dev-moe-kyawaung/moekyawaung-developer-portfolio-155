import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { FAQ_ITEMS } from '../data/landingData';

export const FaqSection: React.FC = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const toggleItem = (idx: number) => {
    setExpandedIndex(expandedIndex === idx ? null : idx);
  };

  return (
    <View style={styles.sectionContainer}>
      <View style={styles.sectionInner}>
        <View style={styles.headerBlock}>
          <View style={styles.pillBadge}>
            <Text style={styles.pillText}>COMMON QUESTIONS</Text>
          </View>
          <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
          <Text style={styles.sectionSubtitle}>
            Have questions about privacy, license generation, or using DevForge with your private repositories?
          </Text>
        </View>

        <View style={styles.faqList}>
          {FAQ_ITEMS.map((item, idx) => {
            const isExpanded = expandedIndex === idx;
            return (
              <View key={idx} style={[styles.faqCard, isExpanded && styles.expandedFaqCard]}>
                <TouchableOpacity
                  style={styles.faqHeader}
                  onPress={() => toggleItem(idx)}
                  activeOpacity={0.8}
                >
                  <Text style={[styles.questionText, isExpanded && styles.activeQuestionText]}>
                    {item.question}
                  </Text>
                  <View style={[styles.iconCircle, isExpanded && styles.activeIconCircle]}>
                    <Ionicons 
                      name={isExpanded ? "chevron-up" : "chevron-down"} 
                      size={16} 
                      color={isExpanded ? "#00F0FF" : "#94A3B8"} 
                    />
                  </View>
                </TouchableOpacity>

                {isExpanded && (
                  <View style={styles.faqBody}>
                    <Text style={styles.answerText}>{item.answer}</Text>
                  </View>
                )}
              </View>
            );
          })}
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
    borderColor: '#1E293B',
  },
  sectionInner: {
    maxWidth: 860,
    width: '100%',
  },
  headerBlock: {
    alignItems: 'center',
    marginBottom: 44,
  },
  pillBadge: {
    backgroundColor: 'rgba(0, 240, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(0, 240, 255, 0.3)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 999,
    marginBottom: 14,
  },
  pillText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#00F0FF',
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
    lineHeight: 24,
  },
  faqList: {
    gap: 12,
  },
  faqCard: {
    backgroundColor: '#111726',
    borderWidth: 1.5,
    borderColor: '#1E293B',
    borderRadius: 12,
    overflow: 'hidden',
  },
  expandedFaqCard: {
    borderColor: 'rgba(0, 240, 255, 0.4)',
  },
  faqHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 18,
  },
  questionText: {
    fontSize: 15.5,
    fontWeight: '700',
    color: '#F8FAFC',
    flex: 1,
    paddingRight: 14,
  },
  activeQuestionText: {
    color: '#00F0FF',
  },
  iconCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#1A2333',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeIconCircle: {
    backgroundColor: 'rgba(0, 240, 255, 0.15)',
  },
  faqBody: {
    paddingHorizontal: 18,
    paddingBottom: 18,
    borderTopWidth: 1,
    borderTopColor: '#1A2333',
    paddingTop: 14,
  },
  answerText: {
    fontSize: 14,
    lineHeight: 23,
    color: '#94A3B8',
  },
});
