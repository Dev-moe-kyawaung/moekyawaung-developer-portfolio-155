import React from 'react';
import { View, Text, StyleSheet, ScrollView, useWindowDimensions } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { COMPARISON_FEATURES } from '../data/landingData';

export const ComparisonSection: React.FC = () => {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  return (
    <View style={styles.sectionContainer}>
      <View style={styles.sectionInner}>
        <View style={styles.headerBlock}>
          <View style={styles.pillBadge}>
            <Text style={styles.pillText}>FEATURE COMPARISON</Text>
          </View>
          <Text style={styles.sectionTitle}>Why Top Developers Choose DevForge AI</Text>
          <Text style={styles.sectionSubtitle}>
            How DevForge AI outclasses manual markdown writing, generic LLM prompts, and static generators.
          </Text>
        </View>

        {/* Scrollable table container */}
        <ScrollView horizontal={isMobile} showsHorizontalScrollIndicator={true} style={styles.scrollWrapper}>
          <View style={[styles.tableContainer, { minWidth: isMobile ? 700 : '100%' }]}>
            {/* Header Row */}
            <View style={styles.tableHeaderRow}>
              <View style={[styles.colHeader, { flex: 2 }]}>
                <Text style={styles.colHeaderText}>Platform Capability</Text>
              </View>
              <View style={[styles.colHeader, styles.highlightColHeader, { flex: 2.2 }]}>
                <Ionicons name="sparkles" size={14} color="#00F0FF" style={{ marginRight: 6 }} />
                <Text style={[styles.colHeaderText, { color: '#00F0FF', fontWeight: '800' }]}>DevForge AI</Text>
              </View>
              <View style={[styles.colHeader, { flex: 1.8 }]}>
                <Text style={styles.colHeaderText}>Manual Markdown</Text>
              </View>
              <View style={[styles.colHeader, { flex: 1.8 }]}>
                <Text style={styles.colHeaderText}>Generic LLMs</Text>
              </View>
              <View style={[styles.colHeader, { flex: 1.8 }]}>
                <Text style={styles.colHeaderText}>Static Generators</Text>
              </View>
            </View>

            {/* Data Rows */}
            {COMPARISON_FEATURES.map((row, idx) => (
              <View 
                key={idx} 
                style={[
                  styles.tableDataRow,
                  idx % 2 === 1 && styles.tableDataRowAlt,
                  idx === COMPARISON_FEATURES.length - 1 && styles.lastRow
                ]}
              >
                <View style={[styles.cell, { flex: 2 }]}>
                  <Text style={styles.featureNameText}>{row.feature}</Text>
                </View>

                {/* DevForge AI (Highlighted) */}
                <View style={[styles.cell, styles.highlightCell, { flex: 2.2 }]}>
                  <Ionicons name="checkmark-circle" size={16} color="#10B981" style={{ marginRight: 6 }} />
                  <Text style={styles.devforgeCellText}>{row.devforge}</Text>
                </View>

                <View style={[styles.cell, { flex: 1.8 }]}>
                  <Text style={styles.otherCellText}>{row.manual}</Text>
                </View>

                <View style={[styles.cell, { flex: 1.8 }]}>
                  <Text style={styles.otherCellText}>{row.genericAi}</Text>
                </View>

                <View style={[styles.cell, { flex: 1.8 }]}>
                  <Text style={styles.otherCellText}>{row.staticGens}</Text>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
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
  pillBadge: {
    backgroundColor: 'rgba(16, 185, 129, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.3)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 999,
    marginBottom: 14,
  },
  pillText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#10B981',
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
    maxWidth: 680,
    lineHeight: 24,
  },
  scrollWrapper: {
    width: '100%',
  },
  tableContainer: {
    backgroundColor: '#111726',
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#1E293B',
    overflow: 'hidden',
  },
  tableHeaderRow: {
    flexDirection: 'row',
    backgroundColor: '#161F33',
    borderBottomWidth: 1.5,
    borderBottomColor: '#253450',
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  colHeader: {
    justifyContent: 'center',
  },
  highlightColHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 240, 255, 0.08)',
    paddingHorizontal: 8,
    borderRadius: 6,
  },
  colHeaderText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#CBD5E1',
  },
  tableDataRow: {
    flexDirection: 'row',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1E293B',
    alignItems: 'center',
  },
  tableDataRowAlt: {
    backgroundColor: '#0F1522',
  },
  lastRow: {
    borderBottomWidth: 0,
  },
  cell: {
    paddingRight: 10,
  },
  highlightCell: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 240, 255, 0.04)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  featureNameText: {
    fontSize: 13.5,
    fontWeight: '700',
    color: '#F1F5F9',
  },
  devforgeCellText: {
    fontSize: 12.5,
    fontWeight: '700',
    color: '#E2E8F0',
    flex: 1,
  },
  otherCellText: {
    fontSize: 12.5,
    color: '#64748B',
    lineHeight: 18,
  },
});
