import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, useWindowDimensions } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { copyToClipboard } from '../utils/clipboard';
import { MarkdownRenderer } from '../components/MarkdownRenderer';

interface ProfileStudioViewProps {
  onShowToast: (msg: string) => void;
}

export const ProfileStudioView: React.FC<ProfileStudioViewProps> = ({ onShowToast }) => {
  const { width } = useWindowDimensions();
  const isMobile = width < 900;

  const [username, setUsername] = useState('devinvance');
  const [fullName, setFullName] = useState('Devin Vance');
  const [headline, setHeadline] = useState('Senior Full-Stack Engineer & Open Source Architect');
  const [typingLine1, setTypingLine1] = useState('Building scalable distributed systems');
  const [typingLine2, setTypingLine2] = useState('Crafting developer-first tools');
  const [typingLine3, setTypingLine3] = useState('Obsessed with performance & DX');
  
  const [currentWork, setCurrentWork] = useState('ScaleForge High-Throughput Cloud');
  const [learningTech, setLearningTech] = useState('Rust WASM & distributed consensus');
  const [statsTheme, setStatsTheme] = useState<'tokyonight' | 'radical' | 'github_dark' | 'dracula'>('tokyonight');
  const [showStreak, setShowStreak] = useState(true);
  const [showLanguages, setShowLanguages] = useState(true);

  // Selected badges
  const [selectedBadges, setSelectedBadges] = useState<string[]>([
    'TypeScript', 'Next.js', 'React', 'Node.js', 'Python', 'Rust', 'Docker', 'PostgreSQL'
  ]);

  const allBadges = [
    { name: 'TypeScript', color: '3178C6', logo: 'typescript' },
    { name: 'Next.js', color: '000000', logo: 'nextdotjs' },
    { name: 'React', color: '61DAFB', logo: 'react' },
    { name: 'Node.js', color: '339933', logo: 'nodedotjs' },
    { name: 'Python', color: '3776AB', logo: 'python' },
    { name: 'Rust', color: '000000', logo: 'rust' },
    { name: 'Go', color: '00ADD8', logo: 'go' },
    { name: 'Docker', color: '2496ED', logo: 'docker' },
    { name: 'PostgreSQL', color: '4169E1', logo: 'postgresql' },
    { name: 'Kubernetes', color: '326CE5', logo: 'kubernetes' },
    { name: 'TailwindCSS', color: '06B6D4', logo: 'tailwindcss' },
    { name: 'GraphQL', color: 'E10098', logo: 'graphql' },
    { name: 'AWS', color: '232F3E', logo: 'amazonwebservices' },
    { name: 'Cloudflare', color: 'F38020', logo: 'cloudflare' },
  ];

  const toggleBadge = (badgeName: string) => {
    if (selectedBadges.includes(badgeName)) {
      setSelectedBadges(prev => prev.filter(b => b !== badgeName));
    } else {
      setSelectedBadges(prev => [...prev, badgeName]);
    }
  };

  // Compile full profile README markdown
  const typingSvgLines = [typingLine1, typingLine2, typingLine3].map(encodeURIComponent).join(';');
  const typingUrl = `https://readme-typing-svg.herokuapp.com?font=Fira+Code&weight=600&size=20&pause=1000&color=00F0FF&vCenter=true&random=false&width=500&lines=${typingSvgLines}`;

  const compiledProfile = `# Hi there! 👋 I'm **${fullName}**

<h3 align="left">${headline}</h3>

<p align="left">
  <img src="${typingUrl}" alt="Typing SVG" />
</p>

## 🔭 About Me
- 🔭 I’m currently architecting **${currentWork}**
- 🌱 I’m currently diving deep into **${learningTech}**
- 💬 Ask me about **Full-Stack Development, Distributed Systems, and Architecture**
- 📫 Connect with me: [GitHub](https://github.com/${username}) • [LinkedIn](https://linkedin.com) • [X / Twitter](https://twitter.com)

## 🛠️ Tech Stack & Ecosystem
<p align="left">
${selectedBadges.map(b => {
  const item = allBadges.find(x => x.name === b);
  const color = item ? item.color : '232E43';
  const logo = item ? item.logo : b.toLowerCase();
  return `  <img src="https://img.shields.io/badge/${encodeURIComponent(b)}-${color}?style=for-the-badge&logo=${logo}&logoColor=white" />`;
}).join('\n')}
</p>

## 📊 GitHub Analytics
<p align="left">
  <img src="https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&theme=${statsTheme}&hide_border=true&count_private=true" alt="GitHub Stats" width="48%" />
  ${showStreak ? `<img src="https://github-readme-streak-stats.herokuapp.com/?user=${username}&theme=${statsTheme}&hide_border=true" alt="GitHub Streak" width="48%" />` : ''}
</p>
${showLanguages ? `\n<p align="left">\n  <img src="https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&layout=compact&theme=${statsTheme}&hide_border=true" alt="Top Languages" width="48%" />\n</p>` : ''}`;

  const handleCopy = async () => {
    await copyToClipboard(compiledProfile);
    onShowToast('Profile README copied to clipboard!');
  };

  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <View style={styles.topBarTitleRow}>
          <Ionicons name="person" size={18} color="#8B5CF6" style={{ marginRight: 8 }} />
          <Text style={styles.topBarTitle}>GitHub Profile Studio</Text>
        </View>

        <TouchableOpacity 
          style={styles.copyBtn}
          onPress={handleCopy}
          activeOpacity={0.8}
        >
          <Ionicons name="copy-outline" size={14} color="#00F0FF" style={{ marginRight: 6 }} />
          <Text style={styles.copyBtnText}>Copy Profile README</Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.mainLayout, isMobile && styles.mainLayoutMobile]}>
        {/* Form Controls */}
        <ScrollView style={[styles.formPanel, isMobile && { width: '100%' }]} contentContainerStyle={{ padding: 18 }}>
          <Text style={styles.sectionHeader}>Profile Identity</Text>

          <Text style={styles.label}>GitHub Username</Text>
          <TextInput
            style={styles.input}
            value={username}
            onChangeText={setUsername}
            placeholder="e.g. torvalds"
            placeholderTextColor="#64748B"
          />

          <Text style={styles.label}>Display Full Name</Text>
          <TextInput
            style={styles.input}
            value={fullName}
            onChangeText={setFullName}
            placeholder="e.g. Devin Vance"
            placeholderTextColor="#64748B"
          />

          <Text style={styles.label}>Headline Tagline</Text>
          <TextInput
            style={styles.input}
            value={headline}
            onChangeText={setHeadline}
            placeholder="e.g. Senior Full-Stack Engineer"
            placeholderTextColor="#64748B"
          />

          <Text style={styles.sectionHeader}>Animated Typing Bio Lines</Text>
          <TextInput
            style={styles.input}
            value={typingLine1}
            onChangeText={setTypingLine1}
            placeholder="Typing line 1"
            placeholderTextColor="#64748B"
          />
          <TextInput
            style={styles.input}
            value={typingLine2}
            onChangeText={setTypingLine2}
            placeholder="Typing line 2"
            placeholderTextColor="#64748B"
          />
          <TextInput
            style={styles.input}
            value={typingLine3}
            onChangeText={setTypingLine3}
            placeholder="Typing line 3"
            placeholderTextColor="#64748B"
          />

          <Text style={styles.sectionHeader}>Tech Stack Badges</Text>
          <View style={styles.badgesWrap}>
            {allBadges.map(b => {
              const active = selectedBadges.includes(b.name);
              return (
                <TouchableOpacity
                  key={b.name}
                  style={[styles.badgeToggle, active && styles.activeBadgeToggle]}
                  onPress={() => toggleBadge(b.name)}
                  activeOpacity={0.7}
                >
                  <Text style={[styles.badgeToggleText, active && styles.activeBadgeToggleText]}>
                    {b.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <Text style={styles.sectionHeader}>Analytics & Cards</Text>
          <Text style={styles.label}>Card Color Theme</Text>
          <View style={styles.themeSelectorRow}>
            {(['tokyonight', 'radical', 'github_dark', 'dracula'] as const).map(t => (
              <TouchableOpacity
                key={t}
                style={[styles.themeOptionBtn, statsTheme === t && styles.activeThemeOptionBtn]}
                onPress={() => setStatsTheme(t)}
              >
                <Text style={[styles.themeOptionText, statsTheme === t && styles.activeThemeOptionText]}>
                  {t}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.toggleRow}>
            <Text style={styles.toggleLabel}>Show Streak Stats Card</Text>
            <TouchableOpacity 
              style={[styles.switchBtn, showStreak && styles.switchBtnActive]} 
              onPress={() => setShowStreak(!showStreak)}
            >
              <Text style={styles.switchBtnText}>{showStreak ? 'ON' : 'OFF'}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.toggleRow}>
            <Text style={styles.toggleLabel}>Show Top Languages Card</Text>
            <TouchableOpacity 
              style={[styles.switchBtn, showLanguages && styles.switchBtnActive]} 
              onPress={() => setShowLanguages(!showLanguages)}
            >
              <Text style={styles.switchBtnText}>{showLanguages ? 'ON' : 'OFF'}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        {/* Live GitHub Profile Preview */}
        <ScrollView style={[styles.previewPanel, isMobile && { width: '100%' }]} contentContainerStyle={{ padding: 20 }}>
          <View style={styles.previewTopHeader}>
            <Ionicons name="logo-github" size={18} color="#F8FAFC" style={{ marginRight: 6 }} />
            <Text style={styles.previewTopTitle}>github.com/{username}/{username}/README.md</Text>
          </View>

          <MarkdownRenderer content={compiledProfile} theme="dark" />
        </ScrollView>
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
  topBarTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  topBarTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#F8FAFC',
  },
  copyBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#162238',
    borderWidth: 1,
    borderColor: '#00F0FF',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 7,
  },
  copyBtnText: {
    fontSize: 12.5,
    fontWeight: '700',
    color: '#00F0FF',
  },
  mainLayout: {
    flex: 1,
    flexDirection: 'row',
  },
  mainLayoutMobile: {
    flexDirection: 'column',
  },
  formPanel: {
    width: 380,
    backgroundColor: '#0B0F17',
    borderRightWidth: 1,
    borderRightColor: '#1E293B',
  },
  sectionHeader: {
    fontSize: 12,
    fontWeight: '800',
    color: '#A78BFA',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginTop: 14,
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
  badgesWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 12,
  },
  badgeToggle: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
    backgroundColor: '#131B2A',
    borderWidth: 1,
    borderColor: '#26334D',
  },
  activeBadgeToggle: {
    backgroundColor: '#1A2338',
    borderColor: '#00F0FF',
  },
  badgeToggleText: {
    fontSize: 12,
    color: '#94A3B8',
    fontWeight: '600',
  },
  activeBadgeToggleText: {
    color: '#00F0FF',
  },
  themeSelectorRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 14,
  },
  themeOptionBtn: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
    backgroundColor: '#131B2A',
    borderWidth: 1,
    borderColor: '#26334D',
  },
  activeThemeOptionBtn: {
    borderColor: '#00F0FF',
    backgroundColor: '#162238',
  },
  themeOptionText: {
    fontSize: 11,
    color: '#94A3B8',
    fontWeight: '600',
  },
  activeThemeOptionText: {
    color: '#00F0FF',
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#162030',
  },
  toggleLabel: {
    fontSize: 12.5,
    color: '#CBD5E1',
    fontWeight: '500',
  },
  switchBtn: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    backgroundColor: '#26334D',
  },
  switchBtnActive: {
    backgroundColor: '#10B981',
  },
  switchBtnText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#F8FAFC',
  },
  previewPanel: {
    flex: 1,
    backgroundColor: '#090D14',
  },
  previewTopHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
    backgroundColor: '#111726',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#1E293B',
  },
  previewTopTitle: {
    fontSize: 12,
    fontFamily: 'monospace',
    color: '#94A3B8',
    fontWeight: '600',
  },
});
