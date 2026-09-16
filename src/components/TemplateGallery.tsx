import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, useWindowDimensions } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { README_TEMPLATES } from '../data/templates';
import { TemplateCategory, ReadmeTemplate } from '../types';

interface TemplateGalleryProps {
  onSelectTemplate: (template: ReadmeTemplate) => void;
}

export const TemplateGallery: React.FC<TemplateGalleryProps> = ({ onSelectTemplate }) => {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const isTablet = width < 1024;

  const [selectedCategory, setSelectedCategory] = useState<TemplateCategory>('all');

  const categories: { label: string; value: TemplateCategory }[] = [
    { label: 'All Stacks', value: 'all' },
    { label: 'Full-Stack / Next.js', value: 'fullstack' },
    { label: 'AI & Python', value: 'ai-ml' },
    { label: 'Mobile / React Native', value: 'mobile' },
    { label: 'CLI Tools', value: 'cli' },
    { label: 'Libraries & NPM', value: 'library' },
    { label: 'GitHub Profiles', value: 'profile' },
  ];

  const filteredTemplates = selectedCategory === 'all'
    ? README_TEMPLATES
    : README_TEMPLATES.filter(t => t.category === selectedCategory);

  const getCardWidth = () => {
    if (isMobile) return '100%';
    if (isTablet) return '48%';
    return '31.5%';
  };

  return (
    <View style={styles.sectionContainer}>
      <View style={styles.sectionInner}>
        <View style={styles.headerBlock}>
          <View style={styles.pillBadge}>
            <Text style={styles.pillText}>PRODUCTION TEMPLATES</Text>
          </View>
          <Text style={styles.sectionTitle}>Curated Stacks for Modern Developers</Text>
          <Text style={styles.sectionSubtitle}>
            Battle-tested blueprints tailored for Next.js, Python AI, React Native, Rust, and OSS libraries.
          </Text>
        </View>

        {/* Category Filters */}
        <View style={styles.filtersRow}>
          {categories.map(cat => (
            <TouchableOpacity
              key={cat.value}
              style={[
                styles.filterBtn,
                selectedCategory === cat.value && styles.activeFilterBtn
              ]}
              onPress={() => setSelectedCategory(cat.value)}
              activeOpacity={0.7}
            >
              <Text 
                style={[
                  styles.filterBtnText, 
                  selectedCategory === cat.value && styles.activeFilterBtnText
                ]}
              >
                {cat.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Templates Grid */}
        <View style={styles.grid}>
          {filteredTemplates.map(template => (
            <View key={template.id} style={[styles.templateCard, { width: getCardWidth() }]}>
              <View style={styles.templateHeader}>
                <View style={styles.categoryTag}>
                  <Text style={styles.categoryTagText}>{template.category.toUpperCase()}</Text>
                </View>
                <View style={styles.starsPill}>
                  <Ionicons name="star" size={13} color="#F59E0B" style={{ marginRight: 4 }} />
                  <Text style={styles.starsText}>{template.stars.toLocaleString()}</Text>
                </View>
              </View>

              <Text style={styles.templateTitle}>{template.title}</Text>
              <Text style={styles.templateSubtitle}>{template.subtitle}</Text>
              <Text style={styles.templateDesc}>{template.description}</Text>

              {/* Tags */}
              <View style={styles.tagsRow}>
                {template.tags.map((tag, tIdx) => (
                  <View key={tIdx} style={styles.tagPill}>
                    <Text style={styles.tagText}>{tag}</Text>
                  </View>
                ))}
              </View>

              {/* Card CTA */}
              <TouchableOpacity
                style={styles.loadTemplateBtn}
                onPress={() => onSelectTemplate(template)}
                activeOpacity={0.8}
              >
                <Text style={styles.loadTemplateText}>Load in README Studio</Text>
                <Ionicons name="sparkles" size={14} color="#00F0FF" style={{ marginLeft: 6 }} />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    backgroundColor: '#0B0F17',
    paddingVertical: 64,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  sectionInner: {
    maxWidth: 1120,
    width: '100%',
  },
  headerBlock: {
    alignItems: 'center',
    marginBottom: 36,
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
    maxWidth: 640,
    lineHeight: 24,
  },
  filtersRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 36,
  },
  filterBtn: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#111726',
    borderWidth: 1,
    borderColor: '#1E293B',
  },
  activeFilterBtn: {
    backgroundColor: '#1E2A44',
    borderColor: '#00F0FF',
  },
  filterBtnText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#94A3B8',
  },
  activeFilterBtnText: {
    color: '#00F0FF',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    justifyContent: 'space-between',
  },
  templateCard: {
    backgroundColor: '#111726',
    borderWidth: 1.5,
    borderColor: '#1E293B',
    borderRadius: 14,
    padding: 20,
    justifyContent: 'space-between',
    minHeight: 280,
  },
  templateHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryTag: {
    backgroundColor: 'rgba(139, 92, 246, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.3)',
  },
  categoryTagText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#C4B5FD',
  },
  starsPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0A0E17',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#26334D',
  },
  starsText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#F59E0B',
  },
  templateTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#F8FAFC',
    marginBottom: 4,
  },
  templateSubtitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#00F0FF',
    marginBottom: 8,
  },
  templateDesc: {
    fontSize: 13,
    lineHeight: 19,
    color: '#94A3B8',
    marginBottom: 14,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 18,
  },
  tagPill: {
    backgroundColor: '#161F33',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#253450',
  },
  tagText: {
    fontSize: 11,
    color: '#8BA0BD',
    fontWeight: '500',
  },
  loadTemplateBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#142033',
    borderWidth: 1,
    borderColor: '#00F0FF',
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 'auto',
  },
  loadTemplateText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#00F0FF',
  },
});
