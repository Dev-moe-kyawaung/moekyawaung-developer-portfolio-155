import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, useWindowDimensions } from 'react-native';
import { Image } from 'expo-image';
import Ionicons from '@expo/vector-icons/Ionicons';
import { BadgeItem } from '../types';
import { POPULAR_BADGES, generateBadgeUrl, generateBadgeMarkdown } from '../data/badges';
import { copyToClipboard } from '../utils/clipboard';

interface BadgeSmithViewProps {
  onShowToast: (msg: string) => void;
}

export const BadgeSmithView: React.FC<BadgeSmithViewProps> = ({ onShowToast }) => {
  const { width } = useWindowDimensions();
  const isMobile = width < 900;

  // Custom Badge fields
  const [label, setLabel] = useState('Framework');
  const [message, setMessage] = useState('Next.js 15');
  const [color, setColor] = useState('00F0FF');
  const [style, setStyle] = useState<'flat' | 'flat-square' | 'for-the-badge' | 'plastic' | 'social'>('for-the-badge');
  const [logo, setLogo] = useState('nextdotjs');
  const [logoColor, setLogoColor] = useState('white');
  const [searchFilter, setSearchFilter] = useState('');

  // Selected badges tray
  const [tray, setTray] = useState<BadgeItem[]>([
    POPULAR_BADGES[0], // TypeScript
    POPULAR_BADGES[9], // Next.js
    POPULAR_BADGES[12], // Tailwind
    POPULAR_BADGES[21], // Docker
    POPULAR_BADGES[27], // License MIT
  ]);

  const customBadge: BadgeItem = {
    id: 'custom',
    label,
    message,
    color: color.replace('#', ''),
    logo,
    logoColor,
    style,
    category: 'custom',
  };

  const previewUrl = generateBadgeUrl(customBadge);

  const addToTray = (badge: BadgeItem) => {
    if (!tray.some(b => b.id === badge.id && b.label === badge.label && b.message === badge.message)) {
      setTray([...tray, { ...badge, id: `item-${Date.now()}` }]);
      onShowToast(`Added ${badge.label || badge.message} to tray`);
    } else {
      onShowToast('Already in tray');
    }
  };

  const removeFromTray = (id: string) => {
    setTray(tray.filter(b => b.id !== id));
    onShowToast('Removed from tray');
  };

  const copyCustomMarkdown = async () => {
    const md = generateBadgeMarkdown(customBadge);
    await copyToClipboard(md);
    onShowToast('Custom badge markdown copied!');
  };

  const copyTrayMarkdown = async () => {
    const mdStrip = tray.map(b => generateBadgeMarkdown(b)).join('\n');
    await copyToClipboard(mdStrip);
    onShowToast('Full badge strip markdown copied!');
  };

  const filteredBadges = POPULAR_BADGES.filter(b => 
    b.label.toLowerCase().includes(searchFilter.toLowerCase()) ||
    b.message.toLowerCase().includes(searchFilter.toLowerCase()) ||
    b.category.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const colorPresets = [
    { name: 'Cyan', hex: '00F0FF' },
    { name: 'Violet', hex: '8B5CF6' },
    { name: 'Emerald', hex: '10B981' },
    { name: 'Amber', hex: 'F59E0B' },
    { name: 'Rose', hex: 'F43F5E' },
    { name: 'Blue', hex: '3B82F6' },
    { name: 'Dark', hex: '181E2A' },
  ];

  return (
    <View style={styles.container}>
      {/* Top Header */}
      <View style={styles.topBar}>
        <View style={styles.topBarLeft}>
          <Ionicons name="shield-checkmark" size={18} color="#10B981" style={{ marginRight: 8 }} />
          <Text style={styles.topBarTitle}>Badge Smith (Shields.io Engine)</Text>
        </View>

        <TouchableOpacity 
          style={styles.trayCopyBtn}
          onPress={copyTrayMarkdown}
          activeOpacity={0.8}
        >
          <Ionicons name="copy-outline" size={14} color="#00F0FF" style={{ marginRight: 6 }} />
          <Text style={styles.trayCopyText}>Copy Entire Tray ({tray.length})</Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.mainBody, isMobile && styles.mainBodyMobile]}>
        {/* Left: Customizer */}
        <ScrollView style={[styles.leftForm, isMobile && { width: '100%' }]} contentContainerStyle={{ padding: 18 }}>
          <Text style={styles.sectionHeading}>Badge Designer</Text>

          {/* Live Badge Preview Card */}
          <View style={styles.previewBox}>
            <Text style={styles.previewBoxLabel}>Live Preview</Text>
            <View style={styles.badgeWrapper}>
              <Image source={{ uri: previewUrl }} style={styles.renderedBadge} contentFit="contain" />
            </View>
            <View style={styles.badgeActionsRow}>
              <TouchableOpacity style={styles.actionBtn} onPress={copyCustomMarkdown}>
                <Ionicons name="copy-outline" size={13} color="#00F0FF" style={{ marginRight: 4 }} />
                <Text style={styles.actionBtnText}>Copy Markdown</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionBtn} onPress={() => addToTray(customBadge)}>
                <Ionicons name="add" size={15} color="#10B981" style={{ marginRight: 4 }} />
                <Text style={[styles.actionBtnText, { color: '#10B981' }]}>Add to Tray</Text>
              </TouchableOpacity>
            </View>
          </View>

          <Text style={styles.label}>Left Label (Optional)</Text>
          <TextInput
            style={styles.input}
            value={label}
            onChangeText={setLabel}
            placeholder="e.g. Next.js or Build"
            placeholderTextColor="#64748B"
          />

          <Text style={styles.label}>Right Message</Text>
          <TextInput
            style={styles.input}
            value={message}
            onChangeText={setMessage}
            placeholder="e.g. 15.0 or passing"
            placeholderTextColor="#64748B"
          />

          <Text style={styles.label}>Badge Color (Hex)</Text>
          <View style={styles.colorInputRow}>
            <TextInput
              style={[styles.input, { flex: 1, marginBottom: 0 }]}
              value={color}
              onChangeText={setColor}
              placeholder="00F0FF"
              placeholderTextColor="#64748B"
            />
            <View style={[styles.colorPreviewSquare, { backgroundColor: `#${color.replace('#', '')}` }]} />
          </View>

          {/* Color Presets */}
          <View style={styles.colorPresetsRow}>
            {colorPresets.map(cp => (
              <TouchableOpacity
                key={cp.hex}
                style={[styles.presetDot, { backgroundColor: `#${cp.hex}` }, color === cp.hex && styles.activePresetDot]}
                onPress={() => setColor(cp.hex)}
              />
            ))}
          </View>

          <Text style={styles.label}>SimpleIcons Logo Slug</Text>
          <TextInput
            style={styles.input}
            value={logo}
            onChangeText={setLogo}
            placeholder="e.g. react, nextdotjs, typescript"
            placeholderTextColor="#64748B"
          />

          <Text style={styles.label}>Badge Style</Text>
          <View style={styles.stylesWrap}>
            {(['for-the-badge', 'flat', 'flat-square', 'plastic'] as const).map(s => (
              <TouchableOpacity
                key={s}
                style={[styles.styleBtn, style === s && styles.activeStyleBtn]}
                onPress={() => setStyle(s)}
              >
                <Text style={[styles.styleBtnText, style === s && styles.activeStyleBtnText]}>{s}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        {/* Right: Badge Library & Tray */}
        <View style={[styles.rightContent, isMobile && { width: '100%' }]}>
          {/* Active Tray Section */}
          <View style={styles.traySection}>
            <View style={styles.trayHeader}>
              <View style={styles.trayTitleRow}>
                <Ionicons name="layers" size={16} color="#00F0FF" style={{ marginRight: 6 }} />
                <Text style={styles.trayTitle}>Repository Badge Tray ({tray.length})</Text>
              </View>
              <Text style={styles.traySub}>These badges will be exported in your README strip</Text>
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={true} style={styles.trayStripScroll}>
              <View style={styles.trayBadgesRow}>
                {tray.map(item => {
                  const url = generateBadgeUrl(item);
                  return (
                    <View key={item.id} style={styles.trayBadgeItem}>
                      <Image source={{ uri: url }} style={styles.trayBadgeImg} contentFit="contain" />
                      <TouchableOpacity 
                        style={styles.removeBadgeBtn}
                        onPress={() => removeFromTray(item.id)}
                      >
                        <Ionicons name="close" size={12} color="#EF4444" />
                      </TouchableOpacity>
                    </View>
                  );
                })}
              </View>
            </ScrollView>
          </View>

          {/* Preset Catalog */}
          <View style={styles.catalogSection}>
            <View style={styles.catalogHeader}>
              <Text style={styles.catalogTitle}>Popular Developer Shields</Text>
              <TextInput
                style={styles.searchCatalogInput}
                value={searchFilter}
                onChangeText={setSearchFilter}
                placeholder="Search badges (e.g. React, Docker, Python)..."
                placeholderTextColor="#64748B"
              />
            </View>

            <ScrollView style={styles.catalogGridScroll}>
              <View style={styles.catalogGrid}>
                {filteredBadges.map(item => {
                  const url = generateBadgeUrl(item);
                  return (
                    <View key={item.id} style={styles.catalogCard}>
                      <Image source={{ uri: url }} style={styles.catalogImg} contentFit="contain" />
                      <TouchableOpacity 
                        style={styles.addCatalogBtn}
                        onPress={() => addToTray(item)}
                        activeOpacity={0.7}
                      >
                        <Ionicons name="add-circle" size={18} color="#00F0FF" />
                        <Text style={styles.addCatalogText}>Add</Text>
                      </TouchableOpacity>
                    </View>
                  );
                })}
              </View>
            </ScrollView>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#090D14',
  },
  topBar: {
    height: 56,
    backgroundColor: '#0D131F',
    borderBottomWidth: 1,
    borderBottomColor: '#1E293B',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
  },
  topBarLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  topBarTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#F8FAFC',
  },
  trayCopyBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#16233B',
    borderWidth: 1,
    borderColor: '#00F0FF',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 7,
  },
  trayCopyText: {
    fontSize: 12.5,
    fontWeight: '700',
    color: '#00F0FF',
  },
  mainBody: {
    flex: 1,
    flexDirection: 'row',
  },
  mainBodyMobile: {
    flexDirection: 'column',
  },
  leftForm: {
    width: 360,
    backgroundColor: '#0B0F17',
    borderRightWidth: 1,
    borderRightColor: '#1E293B',
  },
  sectionHeading: {
    fontSize: 12,
    fontWeight: '800',
    color: '#CBD5E1',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 14,
  },
  previewBox: {
    backgroundColor: '#111726',
    borderWidth: 1.5,
    borderColor: '#232E43',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 18,
  },
  previewBoxLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748B',
    textTransform: 'uppercase',
    marginBottom: 10,
  },
  badgeWrapper: {
    minHeight: 38,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  renderedBadge: {
    height: 32,
    width: 220,
  },
  badgeActionsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#162238',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#26334D',
  },
  actionBtnText: {
    fontSize: 11.5,
    fontWeight: '700',
    color: '#CBD5E1',
  },
  label: {
    fontSize: 11.5,
    fontWeight: '600',
    color: '#94A3B8',
    marginBottom: 4,
  },
  input: {
    backgroundColor: '#131B2A',
    borderWidth: 1,
    borderColor: '#26334D',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    color: '#F8FAFC',
    fontSize: 13,
    marginBottom: 12,
  },
  colorInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  colorPreviewSquare: {
    width: 36,
    height: 36,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#334155',
  },
  colorPresetsRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 14,
  },
  presetDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  activePresetDot: {
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  stylesWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 14,
  },
  styleBtn: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: '#131B2A',
    borderWidth: 1,
    borderColor: '#26334D',
  },
  activeStyleBtn: {
    backgroundColor: '#1A2338',
    borderColor: '#00F0FF',
  },
  styleBtnText: {
    fontSize: 11.5,
    fontWeight: '600',
    color: '#94A3B8',
  },
  activeStyleBtnText: {
    color: '#00F0FF',
  },
  rightContent: {
    flex: 1,
    backgroundColor: '#090D14',
  },
  traySection: {
    backgroundColor: '#0D131F',
    borderBottomWidth: 1,
    borderBottomColor: '#1E293B',
    padding: 16,
  },
  trayHeader: {
    marginBottom: 10,
  },
  trayTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  trayTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#F8FAFC',
  },
  traySub: {
    fontSize: 11,
    color: '#64748B',
  },
  trayStripScroll: {
    paddingVertical: 6,
  },
  trayBadgesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  trayBadgeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#111726',
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#26334D',
  },
  trayBadgeImg: {
    height: 26,
    width: 120,
    marginRight: 6,
  },
  removeBadgeBtn: {
    padding: 3,
  },
  catalogSection: {
    flex: 1,
    padding: 16,
  },
  catalogHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
    flexWrap: 'wrap',
    gap: 10,
  },
  catalogTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#F8FAFC',
  },
  searchCatalogInput: {
    backgroundColor: '#131B2A',
    borderWidth: 1,
    borderColor: '#26334D',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    fontSize: 12,
    color: '#F8FAFC',
    minWidth: 260,
  },
  catalogGridScroll: {
    flex: 1,
  },
  catalogGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  catalogCard: {
    backgroundColor: '#111726',
    borderWidth: 1,
    borderColor: '#1E293B',
    borderRadius: 8,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 220,
  },
  catalogImg: {
    height: 26,
    width: 120,
  },
  addCatalogBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderRadius: 6,
    backgroundColor: '#162238',
  },
  addCatalogText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#00F0FF',
  },
});
