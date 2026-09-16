import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ScrollView, useWindowDimensions } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { copyToClipboard } from '../utils/clipboard';

interface ArchitectureModalProps {
  visible: boolean;
  onClose: () => void;
  onShowToast: (msg: string) => void;
}

export const ArchitectureModal: React.FC<ArchitectureModalProps> = ({
  visible,
  onClose,
  onShowToast,
}) => {
  const { width, height } = useWindowDimensions();
  const isMobile = width < 768;

  const [activeTab, setActiveTab] = useState<'schema' | 'env' | 'structure' | 'setup'>('schema');

  const prismaSchema = `// prisma/schema.prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

enum Role {
  USER
  PRO_DEVELOPER
  MAINTAINER
  ENTERPRISE_ADMIN
}

enum ToolType {
  README
  PROFILE
  BADGES
  FILETREE
  LICENSE
  CHANGELOG
  SOCIAL_CARD
  ARCHITECTURE
}

model User {
  id            String         @id @default(cuid())
  clerkId       String?        @unique
  githubId      String?        @unique
  email         String         @unique
  name          String?
  avatarUrl     String?
  role          Role           @default(USER)
  projects      Project[]
  favorites     FavoriteItem[]
  createdAt     DateTime       @default(now())
  updatedAt     DateTime       @updatedAt

  @@index([email])
}

model Project {
  id          String    @id @default(cuid())
  userId      String
  user        User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  title       String
  description String?
  toolType    ToolType
  content     String    @db.Text
  configJson  Json?
  isPublic    Boolean   @default(false)
  forkCount   Int       @default(0)
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt

  @@index([userId, toolType])
}

model Template {
  id          String    @id @default(cuid())
  slug        String    @unique
  title       String
  category    String
  tags        String[]
  starsCount  Int       @default(0)
  blocksJson  Json
  isFeatured  Boolean   @default(false)
  createdAt   DateTime  @default(now())
}

model FavoriteItem {
  id        String   @id @default(cuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  itemId    String
  itemType  String
  createdAt DateTime @default(now())

  @@unique([userId, itemId, itemType])
}`;

  const envExample = `# .env.example
# ========================================================
# DEVFORGE AI PRODUCTION ENVIRONMENT CONFIGURATION
# ========================================================

# App Runtime
NODE_ENV="production"
NEXT_PUBLIC_APP_URL="https://devforge.ai"

# Database Connection (Neon PostgreSQL / Supabase)
DATABASE_URL="postgresql://forge_user:StrongPassword2026@ep-cool-fog-12345.us-east-2.aws.neon.tech/devforge_prod?sslmode=require"

# Authentication (Clerk or Auth.js)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_live_YOUR_CLERK_PUBLISHABLE_KEY"
CLERK_SECRET_KEY="sk_live_YOUR_CLERK_SECRET_KEY"
CLERK_WEBHOOK_SECRET="whsec_YOUR_CLERK_WEBHOOK_SECRET"

# Optional Auth.js (NextAuth v5) Fallback
AUTH_SECRET="f9b4c0e3a67d51289cf21e3381a7b45812903746"
GITHUB_ID="gh_client_id_devforge"
GITHUB_SECRET="gh_client_secret_prod"

# AI Inference Providers (OpenAI & Anthropic)
OPENAI_API_KEY="sk-proj-YOUR_OPENAI_API_KEY"
ANTHROPIC_API_KEY="sk-ant-api03-YOUR_ANTHROPIC_KEY"
AI_MODEL_PREFERENCE="gpt-4o-mini"

# Cloudflare Pages & R2 Asset Storage (OG Images & SVGs)
CLOUDFLARE_ACCOUNT_ID="your_cloudflare_account_id"
CLOUDFLARE_R2_ACCESS_KEY_ID="r2_access_key"
CLOUDFLARE_R2_SECRET_ACCESS_KEY="r2_secret_key"
CLOUDFLARE_R2_BUCKET_NAME="devforge-assets"

# Rate Limiting (Upstash Redis)
UPSTASH_REDIS_REST_URL="https://your-upstash-redis.upstash.io"
UPSTASH_REDIS_REST_TOKEN="your_upstash_redis_token"`;

  const folderStructure = `devforge-ai/
├── src/
│   ├── app/                               # Next.js 15 App Router
│   │   ├── (auth)/                        # Clerk / Auth.js sign-in & sign-up
│   │   │   ├── sign-in/[[...sign-in]]/
│   │   │   └── sign-up/[[...sign-up]]/
│   │   ├── (dashboard)/                   # Protected Studio Routes
│   │   │   ├── dashboard/page.tsx
│   │   │   ├── readme-forge/page.tsx
│   │   │   ├── profile-studio/page.tsx
│   │   │   ├── badge-smith/page.tsx
│   │   │   ├── file-tree/page.tsx
│   │   │   ├── license-matrix/page.tsx
│   │   │   ├── changelog-writer/page.tsx
│   │   │   └── og-social-card/page.tsx
│   │   ├── api/                           # API Routes & Server Actions
│   │   │   ├── ai/generate/route.ts       # LLM streaming completion
│   │   │   ├── badges/shields/route.ts    # Shields.io proxy & cache
│   │   │   ├── og/image/route.tsx         # @vercel/og dynamic image generator
│   │   │   └── projects/route.ts          # CRUD for saved projects
│   │   ├── layout.tsx                     # Root HTML & Providers
│   │   └── page.tsx                       # High-conversion Landing Page
│   ├── components/
│   │   ├── ui/                            # shadcn/ui primitives
│   │   │   ├── button.tsx, modal.tsx, badge.tsx, tabs.tsx
│   │   ├── builders/                      # Specialized builder components
│   │   │   ├── ReadmeBlockList.tsx
│   │   │   ├── LiveGfmViewer.tsx
│   │   │   ├── TechBadgePicker.tsx
│   │   │   └── AsciiTreeEditor.tsx
│   │   └── landing/                       # Landing sections
│   ├── lib/
│   │   ├── prisma.ts                      # Prisma singleton client
│   │   ├── ai-engine.ts                   # Context-aware markdown prompt templates
│   │   ├── gfm-parser.ts                  # Remark/Rehype GitHub Flavored Markdown
│   │   └── utils.ts                       # Tailwind merge & helpers
│   ├── hooks/
│   │   └── useStudioStore.ts              # Zustand client state
│   └── types/
│       └── index.ts                       # TypeScript interfaces
├── prisma/
│   ├── schema.prisma                      # Multi-tenant DB schema
│   └── migrations/
├── public/
│   ├── icons/                             # Tech brand SVGs
│   └── og-preview.png
├── .env.example                           # Verified secrets template
├── package.json
├── tailwind.config.ts
└── tsconfig.json`;

  const setupInstructions = `# DEVFORGE AI SETUP & CLOUDFLARE PAGES DEPLOYMENT GUIDE

### 1. Clone & Install Dependencies
\`\`\`bash
git clone https://github.com/your-org/devforge-ai.git
cd devforge-ai
pnpm install
\`\`\`

### 2. Configure Environment Secrets
\`\`\`bash
cp .env.example .env.local
# Update DATABASE_URL with your PostgreSQL connection string
# Update OPENAI_API_KEY with your key
\`\`\`

### 3. Initialize Prisma Database & Run Migrations
\`\`\`bash
pnpm prisma generate
pnpm prisma migrate deploy
pnpm prisma db seed
\`\`\`

### 4. Start Local Development Server
\`\`\`bash
pnpm dev
# Server running at http://localhost:3000
\`\`\`

### 5. Deploy to Cloudflare Pages via Next-on-Pages
DevForge AI is 100% compatible with Cloudflare Pages Edge Runtime:

\`\`\`bash
# Build Cloudflare Pages bundle
pnpm dlx @cloudflare/next-on-pages

# Deploy using Wrangler CLI
npx wrangler pages deploy .vercel/output/static --project-name=devforge-ai
\`\`\`

### 6. Production Health Checks & Security Verification
- [x] Zero-trust environment variable encryption
- [x] OWASP headers (CSP, X-Frame-Options, HSTS)
- [x] Rate limiting configured on \`/api/ai/*\` routes (60 req/min)
- [x] Automated Prisma connection pooling with Neon serverless driver`;

  const handleCopyCurrent = async () => {
    let content = '';
    switch (activeTab) {
      case 'schema': content = prismaSchema; break;
      case 'env': content = envExample; break;
      case 'structure': content = folderStructure; break;
      case 'setup': content = setupInstructions; break;
    }
    await copyToClipboard(content);
    onShowToast('Copied to clipboard!');
  };

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={[styles.modalCard, { maxHeight: height * 0.9, width: isMobile ? '95%' : 900 }]}>
          {/* Header */}
          <View style={styles.modalHeader}>
            <View style={styles.modalTitleRow}>
              <View style={styles.iconBox}>
                <Ionicons name="server" size={18} color="#00F0FF" />
              </View>
              <View>
                <Text style={styles.modalTitle}>Architecture & Engineering Deliverables</Text>
                <Text style={styles.modalSubtitle}>Prisma Schema • .env.example • Next.js 15 & Cloudflare</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
              <Ionicons name="close" size={20} color="#94A3B8" />
            </TouchableOpacity>
          </View>

          {/* Navigation Tabs */}
          <View style={styles.tabsRow}>
            <TouchableOpacity 
              style={[styles.tabBtn, activeTab === 'schema' && styles.activeTabBtn]}
              onPress={() => setActiveTab('schema')}
            >
              <Ionicons name="cube-outline" size={14} color={activeTab === 'schema' ? '#00F0FF' : '#94A3B8'} style={{ marginRight: 6 }} />
              <Text style={[styles.tabBtnText, activeTab === 'schema' && styles.activeTabBtnText]}>
                Prisma Schema
              </Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.tabBtn, activeTab === 'env' && styles.activeTabBtn]}
              onPress={() => setActiveTab('env')}
            >
              <Ionicons name="key-outline" size={14} color={activeTab === 'env' ? '#00F0FF' : '#94A3B8'} style={{ marginRight: 6 }} />
              <Text style={[styles.tabBtnText, activeTab === 'env' && styles.activeTabBtnText]}>
                .env.example
              </Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.tabBtn, activeTab === 'structure' && styles.activeTabBtn]}
              onPress={() => setActiveTab('structure')}
            >
              <Ionicons name="folder-outline" size={14} color={activeTab === 'structure' ? '#00F0FF' : '#94A3B8'} style={{ marginRight: 6 }} />
              <Text style={[styles.tabBtnText, activeTab === 'structure' && styles.activeTabBtnText]}>
                Folder Structure
              </Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.tabBtn, activeTab === 'setup' && styles.activeTabBtn]}
              onPress={() => setActiveTab('setup')}
            >
              <Ionicons name="terminal-outline" size={14} color={activeTab === 'setup' ? '#00F0FF' : '#94A3B8'} style={{ marginRight: 6 }} />
              <Text style={[styles.tabBtnText, activeTab === 'setup' && styles.activeTabBtnText]}>
                Setup & Deploy
              </Text>
            </TouchableOpacity>
          </View>

          {/* Action Toolbar */}
          <View style={styles.toolbar}>
            <Text style={styles.fileLabel}>
              {activeTab === 'schema' && 'prisma/schema.prisma'}
              {activeTab === 'env' && '.env.example'}
              {activeTab === 'structure' && 'Project Tree (Next.js 15 App Router)'}
              {activeTab === 'setup' && 'SETUP_AND_DEPLOY.md'}
            </Text>

            <TouchableOpacity style={styles.copyBtn} onPress={handleCopyCurrent}>
              <Ionicons name="copy-outline" size={14} color="#00F0FF" style={{ marginRight: 6 }} />
              <Text style={styles.copyBtnText}>Copy Snippet</Text>
            </TouchableOpacity>
          </View>

          {/* Content Code Area */}
          <ScrollView style={styles.codeScroll}>
            <Text style={styles.codeContent}>
              {activeTab === 'schema' && prismaSchema}
              {activeTab === 'env' && envExample}
              {activeTab === 'structure' && folderStructure}
              {activeTab === 'setup' && setupInstructions}
            </Text>
          </ScrollView>

          {/* Footer */}
          <View style={styles.modalFooter}>
            <View style={styles.readyBadge}>
              <Ionicons name="checkmark-done" size={14} color="#10B981" style={{ marginRight: 6 }} />
              <Text style={styles.readyText}>Verified Cloudflare Pages & Next.js 15 Spec</Text>
            </View>
            <TouchableOpacity style={styles.doneBtn} onPress={onClose}>
              <Text style={styles.doneBtnText}>Close Window</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  modalCard: {
    backgroundColor: '#0F172A',
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#26334D',
    overflow: 'hidden',
    shadowColor: '#00F0FF',
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 12,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#1E293B',
    backgroundColor: '#111A2E',
  },
  modalTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconBox: {
    width: 38,
    height: 38,
    borderRadius: 8,
    backgroundColor: 'rgba(0, 240, 255, 0.1)',
    borderWidth: 1,
    borderColor: '#00F0FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#F8FAFC',
  },
  modalSubtitle: {
    fontSize: 12,
    color: '#94A3B8',
    marginTop: 2,
  },
  closeBtn: {
    padding: 6,
    borderRadius: 6,
    backgroundColor: '#162238',
  },
  tabsRow: {
    flexDirection: 'row',
    backgroundColor: '#090D14',
    paddingHorizontal: 16,
    paddingTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#1E293B',
    gap: 8,
  },
  tabBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTabBtn: {
    backgroundColor: '#131B2A',
    borderBottomColor: '#00F0FF',
  },
  tabBtnText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#94A3B8',
  },
  activeTabBtnText: {
    color: '#00F0FF',
  },
  toolbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#131B2A',
    borderBottomWidth: 1,
    borderBottomColor: '#1E293B',
  },
  fileLabel: {
    fontSize: 12,
    fontFamily: 'monospace',
    color: '#A78BFA',
    fontWeight: '700',
  },
  copyBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E293B',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#334155',
  },
  copyBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#00F0FF',
  },
  codeScroll: {
    padding: 16,
    backgroundColor: '#0A0E17',
    maxHeight: 460,
  },
  codeContent: {
    fontFamily: 'monospace',
    fontSize: 12.5,
    lineHeight: 19,
    color: '#E2E8F0',
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 14,
    borderTopWidth: 1,
    borderTopColor: '#1E293B',
    backgroundColor: '#111A2E',
  },
  readyBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  readyText: {
    fontSize: 12,
    color: '#10B981',
    fontWeight: '600',
  },
  doneBtn: {
    backgroundColor: '#1E293B',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#334155',
  },
  doneBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#F8FAFC',
  },
});
