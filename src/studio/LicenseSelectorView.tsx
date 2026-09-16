import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, useWindowDimensions } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { LICENSES } from '../data/licenses';
import { copyToClipboard, downloadFile } from '../utils/clipboard';

interface LicenseSelectorViewProps {
  onShowToast: (msg: string) => void;
}

export const LicenseSelectorView: React.FC<LicenseSelectorViewProps> = ({ onShowToast }) => {
  const { width } = useWindowDimensions();
  const isMobile = width < 900;

  const [selectedLicenseId, setSelectedLicenseId] = useState('mit');
  const [authorName, setAuthorName] = useState('DevForge Engineering');
  const [year, setYear] = useState('2026');

  // Permission filters
  const [needCommercial, setNeedCommercial] = useState(true);
  const [needCopyleft, setNeedCopyleft] = useState(false);

  const currentLicense = LICENSES.find(l => l.id === selectedLicenseId) || LICENSES[0];

  const fullLicenseText = currentLicense.templateText
    .replace('{YEAR}', year)
    .replace('{FULL_NAME}', authorName);

  const handleCopy = async () => {
    await copyToClipboard(fullLicenseText);
    onShowToast(`${currentLicense.spdxId} text copied to clipboard!`);
  };

  const handleDownload = () => {
    downloadFile('LICENSE', fullLicenseText, 'text/plain;charset=utf-8;');
    onShowToast('Downloaded LICENSE file');
  };

  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <View style={styles.topBarLeft}>
          <Ionicons name="ribbon" size={18} color="#EC4899" style={{ marginRight: 8 }} />
          <Text style={styles.topBarTitle}>License Selector & Rights Matrix</Text>
        </View>

        <View style={styles.topBarRight}>
          <TouchableOpacity style={styles.copyBtn} onPress={handleCopy}>
            <Ionicons name="copy-outline" size={14} color="#00F0FF" style={{ marginRight: 6 }} />
            <Text style={styles.copyBtnText}>Copy Text</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.downloadBtn} onPress={handleDownload}>
            <Ionicons name="download-outline" size={14} color="#090D14" style={{ marginRight: 6 }} />
            <Text style={styles.downloadBtnText}>Download LICENSE</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={[styles.mainLayout, isMobile && styles.mainLayoutMobile]}>
        {/* Left: License Cards & Customizer */}
        <ScrollView style={[styles.leftPanel, isMobile && { width: '100%' }]} contentContainerStyle={{ padding: 18 }}>
          <Text style={styles.sectionHeader}>Copyright Holder Details</Text>
          <Text style={styles.label}>Full Name / Organization</Text>
          <TextInput
            style={styles.input}
            value={authorName}
            onChangeText={setAuthorName}
            placeholder="e.g. Jane Doe or Acme Corp"
            placeholderTextColor="#64748B"
          />

          <Text style={styles.label}>Copyright Year</Text>
          <TextInput
            style={styles.input}
            value={year}
            onChangeText={setYear}
            placeholder="2026"
            placeholderTextColor="#64748B"
          />

          <Text style={[styles.sectionHeader, { marginTop: 14 }]}>Available Open-Source Licenses</Text>
          <View style={styles.licensesList}>
            {LICENSES.map(lic => {
              const isSelected = lic.id === selectedLicenseId;
              return (
                <TouchableOpacity
                  key={lic.id}
                  style={[styles.licCard, isSelected && styles.activeLicCard]}
                  onPress={() => setSelectedLicenseId(lic.id)}
                  activeOpacity={0.8}
                >
                  <View style={styles.licCardTop}>
                    <Text style={[styles.licName, isSelected && styles.activeLicName]}>{lic.name}</Text>
                    <View style={styles.spdxBadge}>
                      <Text style={styles.spdxText}>{lic.spdxId}</Text>
                    </View>
                  </View>
                  <Text style={styles.licSummary}>{lic.summary}</Text>

                  {/* Permissions mini pills */}
                  <View style={styles.pillsRow}>
                    <View style={styles.pillPerm}>
                      <Text style={styles.pillTextPerm}>Commercial Use</Text>
                    </View>
                    {lic.category === 'copyleft' ? (
                      <View style={styles.pillCopyleft}>
                        <Text style={styles.pillTextCopyleft}>Disclose Source</Text>
                      </View>
                    ) : (
                      <View style={styles.pillPerm}>
                        <Text style={styles.pillTextPerm}>Permissive</Text>
                      </View>
                    )}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>

        {/* Right: Rights Matrix & Full Text */}
        <View style={[styles.rightPanel, isMobile && { width: '100%' }]}>
          {/* Rights Matrix Header */}
          <View style={styles.rightsHeader}>
            <View style={styles.rightsColumn}>
              <Text style={[styles.rightsTitle, { color: '#10B981' }]}>Permissions</Text>
              {currentLicense.permissions.map((p, idx) => (
                <View key={idx} style={styles.rightItem}>
                  <Ionicons name="checkmark-circle" size={14} color="#10B981" style={{ marginRight: 6 }} />
                  <Text style={styles.rightItemText}>{p}</Text>
                </View>
              ))}
            </View>

            <View style={styles.rightsColumn}>
              <Text style={[styles.rightsTitle, { color: '#3B82F6' }]}>Conditions</Text>
              {currentLicense.conditions.length === 0 ? (
                <Text style={styles.noneText}>None</Text>
              ) : (
                currentLicense.conditions.map((c, idx) => (
                  <View key={idx} style={styles.rightItem}>
                    <Ionicons name="information-circle" size={14} color="#3B82F6" style={{ marginRight: 6 }} />
                    <Text style={styles.rightItemText}>{c}</Text>
                  </View>
                ))
              )}
            </View>

            <View style={styles.rightsColumn}>
              <Text style={[styles.rightsTitle, { color: '#EF4444' }]}>Limitations</Text>
              {currentLicense.limitations.map((l, idx) => (
                <View key={idx} style={styles.rightItem}>
                  <Ionicons name="close-circle" size={14} color="#EF4444" style={{ marginRight: 6 }} />
                  <Text style={styles.rightItemText}>{l}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Full License Code Box */}
          <ScrollView style={styles.licenseTextScroll} contentContainerStyle={{ padding: 18 }}>
            <Text style={styles.licenseBodyText}>{fullLicenseText}</Text>
          </ScrollView>
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
  topBarRight: {
    flexDirection: 'row',
    gap: 8,
  },
  copyBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#16233B',
    borderWidth: 1,
    borderColor: '#00F0FF',
    paddingHorizontal: 11,
    paddingVertical: 6,
    borderRadius: 7,
  },
  copyBtnText: {
    fontSize: 12.5,
    fontWeight: '700',
    color: '#00F0FF',
  },
  downloadBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#00F0FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 7,
  },
  downloadBtnText: {
    fontSize: 12.5,
    fontWeight: '800',
    color: '#090D14',
  },
  mainLayout: {
    flex: 1,
    flexDirection: 'row',
  },
  mainLayoutMobile: {
    flexDirection: 'column',
  },
  leftPanel: {
    width: 380,
    backgroundColor: '#0B0F17',
    borderRightWidth: 1,
    borderRightColor: '#1E293B',
  },
  sectionHeader: {
    fontSize: 12,
    fontWeight: '800',
    color: '#CBD5E1',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 8,
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
    marginBottom: 10,
  },
  licensesList: {
    gap: 10,
  },
  licCard: {
    backgroundColor: '#111726',
    borderWidth: 1.5,
    borderColor: '#1E293B',
    borderRadius: 10,
    padding: 14,
  },
  activeLicCard: {
    borderColor: '#00F0FF',
    backgroundColor: '#162238',
  },
  licCardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  licName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#F8FAFC',
  },
  activeLicName: {
    color: '#00F0FF',
  },
  spdxBadge: {
    backgroundColor: '#0D1420',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  spdxText: {
    fontSize: 11,
    fontFamily: 'monospace',
    color: '#94A3B8',
  },
  licSummary: {
    fontSize: 12,
    color: '#8A99AD',
    lineHeight: 17,
    marginBottom: 10,
  },
  pillsRow: {
    flexDirection: 'row',
    gap: 6,
  },
  pillPerm: {
    backgroundColor: 'rgba(16, 185, 129, 0.12)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  pillTextPerm: {
    fontSize: 10,
    fontWeight: '700',
    color: '#10B981',
  },
  pillCopyleft: {
    backgroundColor: 'rgba(59, 130, 246, 0.12)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  pillTextCopyleft: {
    fontSize: 10,
    fontWeight: '700',
    color: '#3B82F6',
  },
  rightPanel: {
    flex: 1,
    backgroundColor: '#090D14',
  },
  rightsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#111726',
    borderBottomWidth: 1,
    borderBottomColor: '#1E293B',
    padding: 16,
    flexWrap: 'wrap',
    gap: 12,
  },
  rightsColumn: {
    flex: 1,
    minWidth: 120,
  },
  rightsTitle: {
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    marginBottom: 8,
  },
  rightItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  rightItemText: {
    fontSize: 12,
    color: '#CBD5E1',
  },
  noneText: {
    fontSize: 12,
    color: '#64748B',
    fontStyle: 'italic',
  },
  licenseTextScroll: {
    flex: 1,
    backgroundColor: '#070A0F',
  },
  licenseBodyText: {
    fontFamily: 'monospace',
    fontSize: 12.5,
    lineHeight: 20,
    color: '#94A3B8',
  },
});
