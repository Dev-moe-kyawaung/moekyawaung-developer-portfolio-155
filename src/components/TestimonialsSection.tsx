import React from 'react';
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import { Image } from 'expo-image';
import Ionicons from '@expo/vector-icons/Ionicons';
import { TESTIMONIALS } from '../data/landingData';

export const TestimonialsSection: React.FC = () => {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  return (
    <View style={styles.sectionContainer}>
      <View style={styles.sectionInner}>
        <View style={styles.headerBlock}>
          <View style={styles.pillBadge}>
            <Text style={styles.pillText}>DEVELOPER PRAISE</Text>
          </View>
          <Text style={styles.sectionTitle}>Loved by Builders & Maintainers</Text>
          <Text style={styles.sectionSubtitle}>
            Engineers around the world rely on DevForge AI to power the first impression of their repositories.
          </Text>
        </View>

        <View style={[styles.grid, isMobile && styles.gridMobile]}>
          {TESTIMONIALS.map((t, idx) => (
            <View key={idx} style={[styles.card, isMobile ? styles.cardMobile : styles.cardDesktop]}>
              <View style={styles.starsRow}>
                {[...Array(t.stars)].map((_, sIdx) => (
                  <Ionicons key={sIdx} name="star" size={16} color="#F59E0B" style={{ marginRight: 2 }} />
                ))}
              </View>

              <Text style={styles.quoteText}>"{t.quote}"</Text>

              <View style={styles.authorRow}>
                <Image source={{ uri: t.avatar }} style={styles.avatar} contentFit="cover" />
                <View style={styles.authorInfo}>
                  <Text style={styles.authorName}>{t.name}</Text>
                  <Text style={styles.authorRole}>{t.role} • {t.company}</Text>
                </View>
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
    marginBottom: 44,
  },
  pillBadge: {
    backgroundColor: 'rgba(245, 158, 11, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.3)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 999,
    marginBottom: 14,
  },
  pillText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#F59E0B',
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
  grid: {
    flexDirection: 'row',
    gap: 20,
    justifyContent: 'space-between',
  },
  gridMobile: {
    flexDirection: 'column',
  },
  card: {
    backgroundColor: '#111726',
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#1E293B',
    padding: 24,
    justifyContent: 'space-between',
  },
  cardDesktop: {
    flex: 1,
  },
  cardMobile: {
    width: '100%',
  },
  starsRow: {
    flexDirection: 'row',
    marginBottom: 14,
  },
  quoteText: {
    fontSize: 14,
    lineHeight: 22,
    color: '#CBD5E1',
    fontStyle: 'italic',
    marginBottom: 20,
  },
  authorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: '#1A2333',
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 1.5,
    borderColor: '#00F0FF',
  },
  authorInfo: {
    justifyContent: 'center',
  },
  authorName: {
    fontSize: 14.5,
    fontWeight: '700',
    color: '#F8FAFC',
  },
  authorRole: {
    fontSize: 12,
    color: '#8A99AD',
    marginTop: 2,
  },
});
