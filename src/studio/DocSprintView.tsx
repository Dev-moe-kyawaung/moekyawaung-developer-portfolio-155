import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, useWindowDimensions } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { copyToClipboard } from '../utils/clipboard';

interface DocSprintViewProps {
  onShowToast: (msg: string) => void;
}

export const DocSprintView: React.FC<DocSprintViewProps> = ({ onShowToast }) => {
  const { width } = useWindowDimensions();
  const isMobile = width < 900;

  const [activeTab, setActiveTab] = useState<'mermaid' | 'env' | 'endpoints'>('mermaid');

  // Mermaid state
  const [mermaidType, setMermaidType] = useState<'flowchart' | 'sequence' | 'er'>('flowchart');
  const flowchartCode = `flowchart TD
    Client[Web & Mobile Clients] --> Gateway[API Gateway / Edge Proxy]
    Gateway --> AuthFilter[Auth & JWT Verification]
    AuthFilter --> Microservices[Core Microservices Cluster]
    Microservices --> PrimaryDB[(PostgreSQL Database)]
    Microservices --> RedisCache[(Redis Cache)]
    Microservices --> TaskQueue[(Celery / RabbitMQ Worker)]`;

  const sequenceCode = `sequenceDiagram
    autonumber
    actor User
    participant Client as Frontend Client
    participant API as DevForge API Gateway
    participant LLM as AI Inference Engine
    participant DB as Neon PostgreSQL

    User->>Client: Click "Generate README"
    Client->>API: POST /api/ai/generate (Repo Context)
    API->>LLM: Stream completion tokens
    LLM-->>API: SSE Token chunks
    API-->>Client: Streamed Markdown AST
    Client->>DB: Save project draft record
    Client-->>User: Live GitHub preview rendered`;

  const erCode = `erDiagram
    USER ||--o{ PROJECT : owns
    USER ||--o{ FAVORITE : stars
    PROJECT ||--o{ ASSET_BLOCK : contains
    USER {
        string id PK
        string email
        string clerkId
        datetime createdAt
    }
    PROJECT {
        string id PK
        string userId FK
        string title
        string toolType
        text content
    }`;

  // Env vars state
  const envTableMarkdown = `## 🔑 Environment Configuration

| Variable | Description | Required | Default |
|---|---|:---:|---|
| \`DATABASE_URL\` | Neon PostgreSQL connection URI | Yes | \`postgresql://...\` |
| \`CLERK_SECRET_KEY\` | Clerk Auth secret API key | Yes | \`sk_live_...\` |
| \`OPENAI_API_KEY\` | OpenAI LLM generation key | Yes | \`sk-proj-...\` |
| \`NEXT_PUBLIC_APP_URL\` | Canonical production domain | Yes | \`https://devforge.ai\` |
| \`UPSTASH_REDIS_URL\` | Distributed rate limiting URL | No | \`https://upstash.io\` |`;

  // Endpoints state
  const endpointsMarkdown = `## 📡 API Endpoints Reference

| Method | Endpoint | Description | Auth Required |
|---|---|---|:---:|
| \`POST\` | \`/api/ai/generate\` | Stream context-aware Markdown | Bearer Token |
| \`GET\` | \`/api/badges/shields\` | Generate cached Shields.io URL | Public |
| \`GET\` | \`/api/projects\` | Fetch authenticated user drafts | Session Cookie |
| \`POST\` | \`/api/projects\` | Save new developer asset draft | Session Cookie |
| \`DELETE\`| \`/api/projects/:id\` | Remove saved draft from storage | Session Cookie |`;

  const getCurrentSnippet = () => {
    if (activeTab === 'mermaid') {
      if (mermaidType === 'flowchart') return flowchartCode;
      if (mermaidType === 'sequence') return sequenceCode;
      return erCode;
    }
    if (activeTab === 'env') return envTableMarkdown;
    return endpointsMarkdown;
  };

  const handleCopy = async () => {
    await copyToClipboard(getCurrentSnippet());
    onShowToast('Copied specification snippet to clipboard!');
  };

  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <View style={styles.topBarLeft}>
          <Ionicons name="git-network" size={18} color="#A78BFA" style={{ marginRight: 8 }} />
          <Text style={styles.topBarTitle}>DocSprint & Architecture Generator</Text>
        </View>

        <TouchableOpacity style={styles.copyBtn} onPress={handleCopy}>
          <Ionicons name="copy-outline" size={14} color="#00F0FF" style={{ marginRight: 6 }} />
          <Text style={styles.copyBtnText}>Copy Snippet</Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.mainLayout, isMobile && styles.mainLayoutMobile]}>
        {/* Left: Tab Selectors */}
        <View style={[styles.leftNav, isMobile && { width: '100%' }]}>
          <Text style={styles.sectionHeader}>Document Specs</Text>

          <TouchableOpacity
            style={[styles.navItem, activeTab === 'mermaid' && styles.activeNavItem]}
            onPress={() => setActiveTab('mermaid')}
          >
            <Ionicons name="git-network" size={16} color={activeTab === 'mermaid' ? '#00F0FF' : '#94A3B8'} style={{ marginRight: 8 }} />
            <Text style={[styles.navItemText, activeTab === 'mermaid' && styles.activeNavItemText]}>
              Mermaid System Diagrams
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.navItem, activeTab === 'env' && styles.activeNavItem]}
            onPress={() => setActiveTab('env')}
          >
            <Ionicons name="key" size={16} color={activeTab === 'env' ? '#00F0FF' : '#94A3B8'} style={{ marginRight: 8 }} />
            <Text style={[styles.navItemText, activeTab === 'env' && styles.activeNavItemText]}>
              Environment Variables Table
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.navItem, activeTab === 'endpoints' && styles.activeNavItem]}
            onPress={() => setActiveTab('endpoints')}
          >
            <Ionicons name="code-slash" size={16} color={activeTab === 'endpoints' ? '#00F0FF' : '#94A3B8'} style={{ marginRight: 8 }} />
            <Text style={[styles.navItemText, activeTab === 'endpoints' && styles.activeNavItemText]}>
              API Endpoints Table
            </Text>
          </TouchableOpacity>

          {activeTab === 'mermaid' && (
            <View style={styles.mermaidSubTypes}>
              <Text style={styles.subHeader}>Diagram Type</Text>
              {(['flowchart', 'sequence', 'er'] as const).map(m => (
                <TouchableOpacity
                  key={m}
                  style={[styles.subTypeBtn, mermaidType === m && styles.activeSubTypeBtn]}
                  onPress={() => setMermaidType(m)}
                >
                  <Text style={[styles.subTypeText, mermaidType === m && styles.activeSubTypeText]}>
                    {m.toUpperCase()} Diagram
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Right: Code Area */}
        <View style={[styles.rightCode, isMobile && { width: '100%' }]}>
          <View style={styles.codeHeader}>
            <View style={styles.headerDots}>
              <View style={[styles.dot, { backgroundColor: '#EF4444' }]} />
              <View style={[styles.dot, { backgroundColor: '#F59E0B' }]} />
              <View style={[styles.dot, { backgroundColor: '#10B981' }]} />
              <Text style={styles.headerFileName}>
                {activeTab === 'mermaid' ? `diagram.${mermaidType}.mmd` : activeTab === 'env' ? 'ENV_VARS.md' : 'API_REFERENCE.md'}
              </Text>
            </View>
          </View>

          <ScrollView style={styles.codeScroller} contentContainerStyle={{ padding: 18 }}>
            <Text style={styles.codeBlock}>{getCurrentSnippet()}</Text>
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
  mainLayout: {
    flex: 1,
    flexDirection: 'row',
  },
  mainLayoutMobile: {
    flexDirection: 'column',
  },
  leftNav: {
    width: 320,
    backgroundColor: '#0B0F17',
    borderRightWidth: 1,
    borderRightColor: '#1E293B',
    padding: 16,
  },
  sectionHeader: {
    fontSize: 12,
    fontWeight: '800',
    color: '#CBD5E1',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 12,
  },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#111726',
    borderWidth: 1,
    borderColor: '#1E293B',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 8,
  },
  activeNavItem: {
    backgroundColor: '#162238',
    borderColor: '#00F0FF',
  },
  navItemText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#94A3B8',
  },
  activeNavItemText: {
    color: '#00F0FF',
  },
  mermaidSubTypes: {
    marginTop: 20,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#1E293B',
  },
  subHeader: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748B',
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  subTypeBtn: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: '#131B2A',
    marginBottom: 6,
  },
  activeSubTypeBtn: {
    backgroundColor: 'rgba(0, 240, 255, 0.15)',
    borderWidth: 1,
    borderColor: '#00F0FF',
  },
  subTypeText: {
    fontSize: 11.5,
    color: '#94A3B8',
    fontWeight: '600',
  },
  activeSubTypeText: {
    color: '#00F0FF',
  },
  rightCode: {
    flex: 1,
    backgroundColor: '#090D14',
  },
  codeHeader: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#111726',
    borderBottomWidth: 1,
    borderBottomColor: '#1E293B',
  },
  headerDots: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dot: {
    width: 9,
    height: 9,
    borderRadius: 4.5,
  },
  headerFileName: {
    marginLeft: 8,
    fontFamily: 'monospace',
    fontSize: 12,
    color: '#94A3B8',
  },
  codeScroller: {
    flex: 1,
    backgroundColor: '#070A0F',
  },
  codeBlock: {
    fontFamily: 'monospace',
    fontSize: 13,
    lineHeight: 21,
    color: '#38BDF8',
  },
});
