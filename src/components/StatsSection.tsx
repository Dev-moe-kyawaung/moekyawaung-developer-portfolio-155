import React from 'react';
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import { STATS } from '../data/landingData';

export const StatsSection: React.FC = () => {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  return (
    <View style={styles.statsContainer}>
      <View style={styles.statsInner}>
        {STATS.map((item, idx) => (
          <View 
            key={idx} 
            style={[
              styles.statCard, 
              isMobile ? styles.statCardMobile : styles.statCardDesktop,
              idx < STATS.length - 1 && !isMobile && styles.statDivider
            ]}
          >
            <Text style={styles.statValue}>{item.value}</Text>
            <Text style={styles.statLabel}>{item.label}</Text>
            <View style={styles.changeBadge}>
              <Text style={styles.changeText}>{item.change}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  statsContainer: {
    backgroundColor: '#090D14',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#1E293B',
    paddingVertical: 32,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  statsInner: {
    maxWidth: 1120,
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statCard: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  statCardDesktop: {
    flex: 1,
    paddingHorizontal: 16,
  },
  statCardMobile: {
    width: '50%',
    paddingHorizontal: 8,
    marginVertical: 10,
  },
  statDivider: {
    borderRightWidth: 1,
    borderRightColor: '#1E293B',
  },
  statValue: {
    fontSize: 32,
    fontWeight: '900',
    color: '#F8FAFC',
    letterSpacing: -0.5,
  },
  statLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#94A3B8',
    marginTop: 4,
    textAlign: 'center',
  },
  changeBadge: {
    marginTop: 6,
    backgroundColor: 'rgba(16, 185, 129, 0.12)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.3)',
  },
  changeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#10B981',
  },
});
