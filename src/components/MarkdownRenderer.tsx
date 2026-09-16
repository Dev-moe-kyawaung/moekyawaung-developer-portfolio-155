import React from 'react';
import { View, Text, StyleSheet, Linking, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import Ionicons from '@expo/vector-icons/Ionicons';

interface MarkdownRendererProps {
  content: string;
  theme?: 'dark' | 'light';
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({
  content,
  theme = 'dark'
}) => {
  const isDark = theme === 'dark';

  const colors = {
    bg: isDark ? '#0D1117' : '#FFFFFF',
    text: isDark ? '#E6EDF3' : '#1F2328',
    textMuted: isDark ? '#8B949E' : '#656D76',
    border: isDark ? '#30363D' : '#D0D7DE',
    tableHeaderBg: isDark ? '#161B22' : '#F6F8FA',
    tableRowAlt: isDark ? '#11151C' : '#F9FAFB',
    codeBg: isDark ? '#161B22' : '#F6F8FA',
    codeBorder: isDark ? '#30363D' : '#D0D7DE',
    quoteBorder: isDark ? '#3B82F6' : '#0969DA',
    quoteBg: isDark ? 'rgba(59, 130, 246, 0.08)' : '#F0F6FC',
    link: isDark ? '#58A6FF' : '#0969DA',
    hr: isDark ? '#21262D' : '#D8DEE4',
    accentCyan: '#00F0FF',
  };

  // Parse lines into tokens
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];

  let inCodeBlock = false;
  let codeBuffer: string[] = [];
  let codeLanguage = '';

  let inTable = false;
  let tableRows: string[][] = [];

  const flushCodeBlock = (key: string) => {
    if (codeBuffer.length === 0 && !inCodeBlock) return;
    const codeText = codeBuffer.join('\n');
    elements.push(
      <View key={key} style={[styles.codeBlockContainer, { backgroundColor: colors.codeBg, borderColor: colors.codeBorder }]}>
        <View style={[styles.codeHeader, { borderBottomColor: colors.border }]}>
          <View style={styles.codeHeaderDots}>
            <View style={[styles.dot, { backgroundColor: '#FF5F56' }]} />
            <View style={[styles.dot, { backgroundColor: '#FFBD2E' }]} />
            <View style={[styles.dot, { backgroundColor: '#27C93F' }]} />
          </View>
          <Text style={[styles.codeLanguageText, { color: colors.textMuted }]}>
            {codeLanguage || 'terminal'}
          </Text>
        </View>
        <Text style={[styles.codeText, { color: isDark ? '#58A6FF' : '#24292F' }]}>
          {codeText}
        </Text>
      </View>
    );
    codeBuffer = [];
    codeLanguage = '';
    inCodeBlock = false;
  };

  const flushTable = (key: string) => {
    if (tableRows.length === 0) return;
    const headerRow = tableRows[0];
    const dataRows = tableRows.slice(1);

    elements.push(
      <View key={key} style={[styles.tableWrapper, { borderColor: colors.border }]}>
        {/* Header */}
        <View style={[styles.tableRow, { backgroundColor: colors.tableHeaderBg, borderBottomColor: colors.border }]}>
          {headerRow.map((cell, idx) => (
            <View key={`th-${idx}`} style={[styles.tableCell, { flex: 1, borderRightColor: colors.border }]}>
              <Text style={[styles.tableHeaderText, { color: colors.text }]}>{cell.trim()}</Text>
            </View>
          ))}
        </View>
        {/* Rows */}
        {dataRows.map((row, rIdx) => (
          <View 
            key={`tr-${rIdx}`} 
            style={[
              styles.tableRow, 
              { 
                backgroundColor: rIdx % 2 === 1 ? colors.tableRowAlt : colors.bg,
                borderBottomColor: rIdx === dataRows.length - 1 ? 'transparent' : colors.border
              }
            ]}
          >
            {row.map((cell, cIdx) => (
              <View key={`td-${cIdx}`} style={[styles.tableCell, { flex: 1, borderRightColor: colors.border }]}>
                {renderInlineFormattedText(cell.trim(), colors, isDark, `td-${rIdx}-${cIdx}`)}
              </View>
            ))}
          </View>
        ))}
      </View>
    );
    tableRows = [];
    inTable = false;
  };

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const line = rawLine.trim();

    // Check code fences ```
    if (line.startsWith('```')) {
      if (inCodeBlock) {
        flushCodeBlock(`code-fence-${i}`);
      } else {
        inCodeBlock = true;
        codeLanguage = line.replace('```', '').trim();
      }
      continue;
    }

    if (inCodeBlock) {
      codeBuffer.push(rawLine);
      continue;
    }

    // Check table rows
    if (line.startsWith('|') && line.endsWith('|')) {
      // Check if it's separator line |---|---|
      if (line.includes('---')) {
        // separator row, ignore content
        continue;
      }
      const cells = line.slice(1, -1).split('|');
      tableRows.push(cells);
      inTable = true;
      continue;
    } else if (inTable) {
      flushTable(`table-${i}`);
    }

    // Horizontal Rule
    if (line === '---' || line === '***' || line === '___') {
      elements.push(
        <View key={`hr-${i}`} style={[styles.hr, { backgroundColor: colors.hr }]} />
      );
      continue;
    }

    // Blank line
    if (line === '') {
      elements.push(<View key={`empty-${i}`} style={{ height: 8 }} />);
      continue;
    }

    // Headings
    if (line.startsWith('# ')) {
      elements.push(
        <View key={`h1-${i}`} style={[styles.headingContainer, styles.h1Container, { borderBottomColor: colors.border }]}>
          <Text style={[styles.h1, { color: colors.text }]}>
            {renderInlineSpans(line.substring(2), colors, isDark)}
          </Text>
        </View>
      );
      continue;
    }

    if (line.startsWith('## ')) {
      elements.push(
        <View key={`h2-${i}`} style={[styles.headingContainer, styles.h2Container, { borderBottomColor: colors.border }]}>
          <Text style={[styles.h2, { color: colors.text }]}>
            {renderInlineSpans(line.substring(3), colors, isDark)}
          </Text>
        </View>
      );
      continue;
    }

    if (line.startsWith('### ')) {
      elements.push(
        <Text key={`h3-${i}`} style={[styles.h3, { color: colors.text }]}>
          {renderInlineSpans(line.substring(4), colors, isDark)}
        </Text>
      );
      continue;
    }

    if (line.startsWith('#### ')) {
      elements.push(
        <Text key={`h4-${i}`} style={[styles.h4, { color: colors.text }]}>
          {renderInlineSpans(line.substring(5), colors, isDark)}
        </Text>
      );
      continue;
    }

    // Blockquote
    if (line.startsWith('>')) {
      const quoteText = line.replace(/^>\s*/, '');
      elements.push(
        <View key={`quote-${i}`} style={[styles.blockquote, { borderLeftColor: colors.quoteBorder, backgroundColor: colors.quoteBg }]}>
          <Text style={[styles.quoteText, { color: colors.textMuted }]}>
            {renderInlineSpans(quoteText, colors, isDark)}
          </Text>
        </View>
      );
      continue;
    }

    // Task Checklist items
    if (line.startsWith('- [ ] ') || line.startsWith('- [x] ') || line.startsWith('- [X] ')) {
      const isChecked = line.startsWith('- [x] ') || line.startsWith('- [X] ');
      const taskText = line.substring(6);
      elements.push(
        <View key={`task-${i}`} style={styles.taskItem}>
          <Ionicons 
            name={isChecked ? "checkbox" : "square-outline"} 
            size={18} 
            color={isChecked ? "#10B981" : colors.textMuted} 
            style={{ marginRight: 8, marginTop: 2 }}
          />
          <Text style={[styles.bodyText, { color: colors.text, textDecorationLine: isChecked ? 'line-through' : 'none', flex: 1 }]}>
            {renderInlineSpans(taskText, colors, isDark)}
          </Text>
        </View>
      );
      continue;
    }

    // Bullet list items
    if (line.startsWith('- ') || line.startsWith('* ')) {
      const itemText = line.substring(2);
      elements.push(
        <View key={`bullet-${i}`} style={styles.listItem}>
          <Text style={[styles.bulletDot, { color: colors.textMuted }]}>•</Text>
          <Text style={[styles.bodyText, { color: colors.text, flex: 1 }]}>
            {renderInlineSpans(itemText, colors, isDark)}
          </Text>
        </View>
      );
      continue;
    }

    // Badge strip / HTML image tag detection
    if (line.includes('<img src=') || line.includes('img.shields.io') || line.includes('readme-typing-svg')) {
      elements.push(
        <View key={`badge-row-${i}`} style={styles.badgeRow}>
          {extractBadges(rawLine, colors, isDark, i)}
        </View>
      );
      continue;
    }

    // Default regular paragraph
    elements.push(
      <Text key={`p-${i}`} style={[styles.bodyText, { color: colors.text }]}>
        {renderInlineSpans(line, colors, isDark)}
      </Text>
    );
  }

  // Flush remaining
  if (inCodeBlock) flushCodeBlock('trailing-code');
  if (inTable) flushTable('trailing-table');

  return (
    <View style={[styles.container, { backgroundColor: colors.bg, borderColor: colors.border }]}>
      {elements}
    </View>
  );
};

// Helper: extract shield badges or custom images
function extractBadges(line: string, colors: any, isDark: boolean, lineIdx: number) {
  const badgeRegex = /\[!\[(.*?)\]\((https:\/\/img\.shields\.io\/[^\s)]+)\)\]\((.*?)\)|!\[(.*?)\]\((https:\/\/img\.shields\.io\/[^\s)]+)\)|src="([^"]+)"/g;
  let match;
  const badges: React.ReactNode[] = [];
  let count = 0;

  while ((match = badgeRegex.exec(line)) !== null) {
    count++;
    const imgUrl = match[2] || match[5] || match[6];
    const alt = match[1] || match[4] || 'badge';
    const link = match[3];

    if (imgUrl) {
      const isTypingSvg = imgUrl.includes('readme-typing-svg');
      const isStatsCard = imgUrl.includes('github-readme-stats') || imgUrl.includes('streak-stats');

      badges.push(
        <TouchableOpacity 
          key={`badge-${lineIdx}-${count}`}
          activeOpacity={link ? 0.7 : 1}
          onPress={() => link && Linking.openURL(link).catch(() => {})}
          style={[styles.badgeTouchable, isStatsCard && styles.statsCardBadge]}
        >
          <Image
            source={{ uri: imgUrl }}
            style={[
              styles.badgeImage,
              isTypingSvg && { height: 28, width: 340 },
              isStatsCard && { height: 140, width: 280, borderRadius: 8 }
            ]}
            contentFit="contain"
          />
        </TouchableOpacity>
      );
    }
  }

  if (badges.length > 0) {
    return badges;
  }

  // Fallback to normal text rendering
  return (
    <Text style={[styles.bodyText, { color: colors.text }]}>
      {renderInlineSpans(line, colors, isDark)}
    </Text>
  );
}

function renderInlineFormattedText(text: string, colors: any, isDark: boolean, key: string) {
  return (
    <Text key={key} style={[styles.bodyText, { color: colors.text }]}>
      {renderInlineSpans(text, colors, isDark)}
    </Text>
  );
}

function renderInlineSpans(text: string, colors: any, isDark: boolean) {
  // Regex to match bold **text**, inline `code`, and [link](url)
  const regex = /(\*\*.*?\*\*|`.*?`|\[.*?\]\(.*?\))/g;
  const parts = text.split(regex);

  return parts.map((part, idx) => {
    if (!part) return null;

    // Bold **
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <Text key={idx} style={{ fontWeight: '700', color: colors.text }}>
          {part.slice(2, -2)}
        </Text>
      );
    }

    // Inline `code`
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <Text key={idx} style={[styles.inlineCode, { backgroundColor: colors.codeBg, color: isDark ? '#00F0FF' : '#0969DA', borderColor: colors.codeBorder }]}>
          {' ' + part.slice(1, -1) + ' '}
        </Text>
      );
    }

    // Link [label](url)
    const linkMatch = part.match(/^\[(.*?)\]\((.*?)\)$/);
    if (linkMatch) {
      const [, label, url] = linkMatch;
      return (
        <Text 
          key={idx} 
          style={[styles.linkText, { color: colors.link }]}
          onPress={() => Linking.openURL(url).catch(() => {})}
        >
          {label}
        </Text>
      );
    }

    return <Text key={idx}>{part}</Text>;
  });
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
  },
  headingContainer: {
    paddingBottom: 8,
    borderBottomWidth: 1,
    marginTop: 18,
    marginBottom: 12,
  },
  h1Container: {
    marginTop: 4,
  },
  h2Container: {
    marginTop: 20,
  },
  h1: {
    fontSize: 26,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  h2: {
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  h3: {
    fontSize: 16,
    fontWeight: '700',
    marginTop: 14,
    marginBottom: 6,
  },
  h4: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 10,
    marginBottom: 4,
  },
  bodyText: {
    fontSize: 14,
    lineHeight: 22,
    marginVertical: 4,
  },
  inlineCode: {
    fontFamily: 'monospace',
    fontSize: 12,
    borderRadius: 4,
    borderWidth: 1,
    paddingHorizontal: 4,
    paddingVertical: 1,
  },
  linkText: {
    textDecorationLine: 'underline',
    fontWeight: '500',
  },
  blockquote: {
    borderLeftWidth: 4,
    paddingLeft: 14,
    paddingVertical: 8,
    marginVertical: 10,
    borderRadius: 4,
  },
  quoteText: {
    fontSize: 14,
    fontStyle: 'italic',
    lineHeight: 22,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 3,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 3,
  },
  bulletDot: {
    fontSize: 18,
    lineHeight: 22,
    marginRight: 8,
  },
  hr: {
    height: 1,
    marginVertical: 18,
    width: '100%',
  },
  codeBlockContainer: {
    borderRadius: 8,
    borderWidth: 1,
    marginVertical: 12,
    overflow: 'hidden',
  },
  codeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderBottomWidth: 1,
    backgroundColor: 'rgba(0,0,0,0.25)',
  },
  codeHeaderDots: {
    flexDirection: 'row',
    gap: 6,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  codeLanguageText: {
    fontSize: 11,
    fontFamily: 'monospace',
    textTransform: 'lowercase',
  },
  codeText: {
    fontFamily: 'monospace',
    fontSize: 12.5,
    lineHeight: 19,
    padding: 12,
  },
  tableWrapper: {
    borderRadius: 8,
    borderWidth: 1,
    marginVertical: 12,
    overflow: 'hidden',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
  },
  tableCell: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRightWidth: 1,
  },
  tableHeaderText: {
    fontWeight: '700',
    fontSize: 13,
  },
  badgeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginVertical: 8,
    alignItems: 'center',
  },
  badgeTouchable: {
    marginVertical: 2,
  },
  badgeImage: {
    height: 28,
    minWidth: 90,
  },
  statsCardBadge: {
    marginRight: 10,
    marginBottom: 8,
  }
});
