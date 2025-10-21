#!/bin/bash

# Empire Compliance Dashboard - Complete Repository Setup Script
# This script creates the entire project structure with all necessary files

echo "🚀 Creating Empire Compliance Dashboard Repository..."

# Create project directory
PROJECT_NAME="compliance-dashboard"
mkdir -p $PROJECT_NAME
cd $PROJECT_NAME

# Create directory structure
echo "📁 Creating directory structure..."
mkdir -p .github/workflows
mkdir -p public
mkdir -p src/components
mkdir -p src/lib
mkdir -p src/types

# ============================================
# Root Configuration Files
# ============================================

echo "📝 Creating configuration files..."

# package.json
cat > package.json << 'EOF'
{
  "name": "compliance-dashboard",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview"
  },
  "dependencies": {
    "@supabase/supabase-js": "^2.39.0",
    "diff": "^5.1.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.21.0"
  },
  "devDependencies": {
    "@types/diff": "^5.0.9",
    "@types/react": "^18.2.43",
    "@types/react-dom": "^18.2.17",
    "@typescript-eslint/eslint-plugin": "^6.14.0",
    "@typescript-eslint/parser": "^6.14.0",
    "@vitejs/plugin-react": "^4.2.1",
    "autoprefixer": "^10.4.16",
    "eslint": "^8.55.0",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-react-refresh": "^0.4.5",
    "postcss": "^8.4.32",
    "tailwindcss": "^3.4.0",
    "typescript": "^5.2.2",
    "vite": "^5.0.8"
  }
}
EOF

# .gitignore
cat > .gitignore << 'EOF'
# Dependencies
node_modules/
.pnpm-store/

# Build output
dist/
dist-ssr/
*.local

# Environment variables
.env
.env.local
.env.production

# Editor
.vscode/
.idea/
*.swp
*.swo
*~

# OS
.DS_Store
Thumbs.db

# Logs
logs/
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*

# Testing
coverage/
EOF

# .env.example
cat > .env.example << 'EOF'
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
EOF

# index.html
cat > index.html << 'EOF'
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>📋</text></svg>" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Empire Compliance Monitor</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
EOF

# vite.config.ts
cat > vite.config.ts << 'EOF'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
EOF

# tsconfig.json
cat > tsconfig.json << 'EOF'
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
EOF

# tsconfig.node.json
cat > tsconfig.node.json << 'EOF'
{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true
  },
  "include": ["vite.config.ts"]
}
EOF

# tailwind.config.js
cat > tailwind.config.js << 'EOF'
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
EOF

# postcss.config.js
cat > postcss.config.js << 'EOF'
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
EOF

# README.md
cat > README.md << 'EOF'
# Empire Compliance Monitor

Automated regulatory compliance tracking system that monitors regulation changes weekly and alerts assigned users.

## 🚀 Features

- Weekly automated scanning of regulations
- Change detection with content comparison
- Email notifications to assigned users
- Clean UI for viewing updates
- Side-by-side and unified diff views

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: TailwindCSS
- **Backend**: Supabase (PostgreSQL)
- **Automation**: n8n
- **Deployment**: Cloudflare Pages

## 📦 Quick Start

```bash
# Install dependencies
npm install

# Create .env file
cp .env.example .env
# Add your Supabase credentials to .env

# Run development server
npm run dev
```

## 🌐 Deployment

### Deploy to Cloudflare Pages

1. Push this repository to GitHub
2. Go to Cloudflare Pages dashboard
3. Connect your GitHub repository
4. Configure build settings:
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Node version: 18
5. Add environment variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

## 📝 Environment Variables

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 🏗️ Project Structure

```
compliance-dashboard/
├── src/
│   ├── components/      # React components
│   ├── lib/            # Supabase client
│   ├── types/          # TypeScript types
│   ├── App.tsx         # Main app component
│   ├── main.tsx        # Entry point
│   └── index.css       # Global styles
├── public/             # Static assets
└── ...config files
```

## 📄 License

MIT License - Empire Automations © 2025
EOF

# ============================================
# GitHub Actions Workflow
# ============================================

cat > .github/workflows/deploy.yml << 'EOF'
name: Deploy to Cloudflare Pages

on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      deployments: write
    name: Deploy to Cloudflare Pages
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build
        env:
          VITE_SUPABASE_URL: ${{ secrets.VITE_SUPABASE_URL }}
          VITE_SUPABASE_ANON_KEY: ${{ secrets.VITE_SUPABASE_ANON_KEY }}

      - name: Publish to Cloudflare Pages
        uses: cloudflare/pages-action@v1
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          projectName: compliance-dashboard
          directory: dist
          gitHubToken: ${{ secrets.GITHUB_TOKEN }}
          branch: main
EOF

# ============================================
# Source Files
# ============================================

# src/index.css
cat > src/index.css << 'EOF'
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}
EOF

# src/types/index.ts
cat > src/types/index.ts << 'EOF'
export interface Update {
  change_id: string;
  regulation_id: string;
  regulation_title: string;
  regulation_url: string;
  detected_at: string;
  reviewed: boolean;
}

export interface ChangeDetail {
  regulation_title: string;
  regulation_url: string;
  detected_at: string;
  old_content: string;
  new_content: string;
}
EOF

# src/lib/supabase.ts
cat > src/lib/supabase.ts << 'EOF'
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
EOF

# src/main.tsx
cat > src/main.tsx << 'EOF'
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
EOF

# src/App.tsx
cat > src/App.tsx << 'EOF'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import UpdatesList from './components/UpdatesList';
import UpdateDetail from './components/UpdateDetail';

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<UpdatesList />} />
          <Route path="/change/:changeId" element={<UpdateDetail />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
EOF

# src/components/LoadingSpinner.tsx
cat > src/components/LoadingSpinner.tsx << 'EOF'
export default function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center h-64">
      <div className="relative">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-8 w-8 rounded-full bg-blue-100"></div>
        </div>
      </div>
    </div>
  );
}
EOF

# src/components/Layout.tsx - Part 1
cat > src/components/Layout.tsx << 'EOF'
import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                Empire Compliance Monitor
              </h1>
              <p className="text-blue-100 text-sm mt-1">
                Weekly Regulation Change Tracker
              </p>
            </div>
            <div className="hidden sm:flex items-center space-x-4">
              <div className="text-right">
                <p className="text-xs text-blue-200">Last Scan</p>
                <p className="text-sm font-semibold">
                  {new Date().toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-sm text-gray-600">
            © {new Date().getFullYear()} Empire Automations. Powered by automated compliance monitoring.
          </p>
        </div>
      </footer>
    </div>
  );
}
EOF

echo "✅ Repository structure created successfully!"
echo ""
echo "📦 Next steps:"
echo "1. cd $PROJECT_NAME"
echo "2. Copy .env.example to .env and add your Supabase credentials"
echo "3. npm install"
echo "4. npm run dev"
echo ""
echo "🚀 To push to GitHub:"
echo "git init"
echo "git add ."
echo "git commit -m 'Initial commit'"
echo "git remote add origin YOUR_GITHUB_REPO_URL"
echo "git push -u origin main"
