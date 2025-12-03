# Next.js + Cloudflare Workers Template

A production-ready Next.js template for building full-stack web applications deployed to Cloudflare Workers, powered by AI agents and best practices.

## 🚀 Features

- ⚡ **Next.js 16** - App Router with Server Components
- 🔥 **Cloudflare Workers** - Edge deployment via OpenNext
- 🧪 **Vitest** - Fast unit testing with React Testing Library
- 📖 **Storybook** - Component development and documentation
- 🎨 **Chromatic** - Visual regression testing
- 🐛 **Sentry** - Error tracking and performance monitoring
- 🔄 **Semantic Release** - Automated versioning and releases
- ✅ **Pre-commit Hooks** - Lint, format, type-check, and test
- 🎯 **Conventional Commits** - Enforced with commitlint
- 🤖 **GitHub Actions** - Complete CI/CD pipeline
- 💅 **Tailwind CSS** - Utility-first styling
- 🔒 **TypeScript** - Full type safety

## 📋 Prerequisites

- **Node.js** 20+
- **pnpm** 9+
- **Git**
- **Cloudflare Account** with Workers enabled
- **GitHub Repository** with Actions enabled

## 🛠️ Setup

### 1. Clone and Install

```bash
# Clone the repository
git clone <your-repo-url>
cd <your-repo-name>

# Install dependencies
pnpm install

# Initialize Husky hooks
pnpm run prepare
```

### 2. Environment Variables

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

Required environment variables:

```env
# Sentry
SENTRY_DSN=<your-sentry-dsn>
SENTRY_ORG=<your-sentry-org>
SENTRY_PROJECT=<your-sentry-project>
SENTRY_AUTH_TOKEN=<your-sentry-auth-token>
NEXT_PUBLIC_SENTRY_DSN=<your-sentry-dsn>

# Cloudflare
CLOUDFLARE_API_TOKEN=<your-cloudflare-api-token>
CLOUDFLARE_ACCOUNT_ID=<your-cloudflare-account-id>

# Chromatic
CHROMATIC_PROJECT_TOKEN=<your-chromatic-token>
```

### 3. GitHub Secrets

Add the following secrets to your GitHub repository:

```
CLOUDFLARE_API_TOKEN - Cloudflare API token with Workers edit permissions
CLOUDFLARE_ACCOUNT_ID - Your Cloudflare account ID
CHROMATIC_PROJECT_TOKEN - Chromatic project token
SENTRY_AUTH_TOKEN - Sentry auth token for uploading source maps
SENTRY_ORG - Sentry organization slug
SENTRY_PROJECT - Sentry project name
```

### 4. Configure Chromatic

Update `chromatic.config.js` with your project ID:

```javascript
module.exports = {
	projectId: 'YOUR_PROJECT_ID',
	buildScriptName: 'build:storybook',
};
```

## 📚 Development

### Available Scripts

```bash
# Development
pnpm dev                 # Start Next.js dev server
pnpm storybook          # Start Storybook on port 6006

# Building
pnpm build              # Build Next.js application
pnpm build:storybook    # Build Storybook

# Testing
pnpm test               # Run unit tests
pnpm test:watch         # Run tests in watch mode
pnpm test:ui            # Run tests with UI

# Code Quality
pnpm lint               # Run ESLint
pnpm lint:fix           # Fix ESLint errors
pnpm format             # Format code with Prettier
pnpm format:check       # Check code formatting
pnpm type-check         # Run TypeScript compiler

# Deployment
pnpm preview            # Preview production build locally
pnpm deploy             # Deploy to Cloudflare Workers
```

### Pre-commit Checks

All commits are automatically checked for:

1. ✅ **ESLint** - Code linting
2. ✅ **Prettier** - Code formatting
3. ✅ **TypeScript** - Type checking
4. ✅ **Vitest** - Related tests
5. ✅ **Commitlint** - Conventional commit format

**Commits will fail if any check doesn't pass!**

### Commit Message Format

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <subject>

# Types: feat, fix, docs, style, refactor, perf, test, build, ci, chore, revert
# Max length: 100 characters

# Examples:
feat(auth): add JWT token validation
fix(api): resolve race condition in user fetch
docs(readme): update setup instructions
```

## 🔄 Workflow

### Branch Strategy: `pr → dev → main`

```
feature branch → PR to dev → merge to dev → PR to main → merge to main
                     ↓                ↓              ↓
              Preview Deploy    RC Release   Stable Release
                (ephemeral)     (1.0.0-rc.1)    (1.0.0)
```

### Environments

| Environment | Branch | URL Pattern | Version | Chromatic |
|------------|--------|-------------|---------|-----------|
| Preview | PR → dev | `<app>-<pr>.workers.dev` | PR number | ✅ Tested |
| Dev | dev | `dev-<app>.workers.dev` | RC (1.0.0-rc.1) | ✅ Baseline |
| Production | main | `<app>.workers.dev` | Stable (1.0.0) | - |

### Deployment Flow

#### 1. Create PR to `dev`
- ✅ All quality checks run (lint, prettier, type-check, test, actionlint)
- 🎨 Chromatic visual tests run (against dev baseline)
- 🚀 Ephemeral preview deployment created
- 💬 PR comment with preview URL

#### 2. Merge to `dev`
- 🏷️ Semantic-release creates RC version (e.g., `1.0.0-rc.1`)
- 🚀 Deployment to dev environment
- 📦 GitHub pre-release created
- 🐛 Sentry release with source maps

#### 3. Create PR to `main`
- ✅ All quality checks run
- 📋 Review RC version in dev

#### 4. Merge to `main`
- 🏷️ Semantic-release creates stable version (e.g., `1.0.0`)
- 🚀 Deployment to production
- 📦 GitHub release created
- 🐛 Sentry release with source maps

#### 5. PR Cleanup
- 🧹 Preview deployment deleted
- 📝 Cleanup comment on PR

## 🧪 Testing

### Unit Tests with Vitest

```bash
# Run all tests
pnpm test

# Watch mode
pnpm test:watch

# UI mode
pnpm test:ui

# Coverage
pnpm test -- --coverage
```

### Visual Tests with Chromatic

Chromatic automatically runs on PRs to `dev`:

1. Takes snapshots of all Storybook stories
2. Compares against `dev` baseline
3. Reports visual changes in PR
4. Requires approval before merge

## 🎨 Storybook

Create stories for your components:

```typescript
// src/components/Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta = {
	title: 'Components/Button',
	component: Button,
	tags: ['autodocs'],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {
		children: 'Button',
		variant: 'primary',
	},
};
```

Run Storybook locally:

```bash
pnpm storybook
```

## 🐛 Error Tracking

Sentry is configured for:

- **Error tracking** - Automatic error capture
- **Performance monitoring** - Core Web Vitals
- **Session replay** - User session recordings
- **Release tracking** - Errors tagged with versions
- **Source maps** - Readable stack traces

Sentry is initialized in:
- `sentry.client.config.ts` - Client-side
- `sentry.server.config.ts` - Server-side
- `sentry.edge.config.ts` - Edge runtime

## 🔧 Configuration Files

| File | Purpose |
|------|---------|
| `.cursorrules` | AI agent development rules |
| `.cursor/mcp.json` | MCP servers configuration |
| `.releaserc.js` | Semantic-release config |
| `commitlint.config.js` | Commit message rules |
| `.prettierrc` | Prettier formatting |
| `vitest.config.ts` | Vitest test runner |
| `.storybook/` | Storybook configuration |
| `chromatic.config.js` | Chromatic settings |
| `wrangler.jsonc` | Cloudflare Workers config |
| `next.config.js` | Next.js + Sentry config |

## 📖 Best Practices

### Next.js on Cloudflare Workers

1. **Prefer Server Components** - Use Client Components only when needed
2. **Edge runtime limitations** - Some Node.js APIs are not available
3. **Environment variables** - Use `getCloudflareContext()` for runtime access
4. **Bundle size** - Keep client-side JavaScript minimal

### Code Quality

- **Never commit** without green checks
- **Use conventional commits** - Max 100 characters
- **Write tests** for new features
- **Document components** in Storybook
- **Review Chromatic changes** before merging

### Performance

- Use `next/image` for images
- Use `next/font` for fonts
- Dynamic imports for large components
- Optimize Core Web Vitals (target: Lighthouse 90+)

## 🚨 Troubleshooting

### Pre-commit hooks not running

```bash
pnpm run prepare
chmod +x .husky/pre-commit .husky/commit-msg
```

### Tests failing

```bash
# Clear cache and retry
pnpm test -- --clearCache
pnpm test
```

### Deployment failing

1. Check GitHub Secrets are set correctly
2. Verify Cloudflare API token has Workers permissions
3. Check Cloudflare account ID is correct
4. Review GitHub Actions logs

### Sentry not tracking errors

1. Verify `NEXT_PUBLIC_SENTRY_DSN` is set
2. Check Sentry project exists
3. Verify auth token has upload permissions
4. Check source maps are being uploaded in CI

## 📝 License

MIT

## 🤝 Contributing

1. Create a feature branch from `dev`
2. Make your changes with conventional commits
3. Ensure all checks pass
4. Create PR to `dev`
5. Wait for Chromatic approval
6. Merge after approval

---

**Built with ❤️ for the Algenium Team**
