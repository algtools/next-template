# Complete Workflow Diagram

## 🔄 Full Development & Deployment Flow

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         DEVELOPMENT WORKFLOW                            │
└─────────────────────────────────────────────────────────────────────────┘

┌──────────────┐
│ Developer    │
│ Local Setup  │
└──────┬───────┘
       │
       ▼
┌──────────────────────────────┐
│ 1. Create Feature Branch     │  git checkout -b feat/feature-name
│    from dev                  │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│ 2. Make Changes              │  Code, write tests, add stories
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│ 3. Commit (Pre-commit Hooks) │
├──────────────────────────────┤
│ ✓ ESLint --fix              │  Automatic
│ ✓ Prettier --write           │  Automatic
│ ✓ Vitest related tests       │  Automatic
│ ✓ Commitlint                 │  Automatic
└──────────────┬───────────────┘
               │
               │ [All checks pass]
               ▼
┌──────────────────────────────┐
│ 4. Push to Remote            │  git push origin feat/feature-name
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│ 5. Create Pull Request       │  PR to dev branch
│    to dev                    │
└──────────────┬───────────────┘
               │
               ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                          PR CHECKS WORKFLOW                             │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ┌─────────────────┐      ┌─────────────────┐      ┌───────────────┐  │
│  │ Quality Checks  │      │   Actionlint    │      │   Chromatic   │  │
│  ├─────────────────┤      ├─────────────────┤      ├───────────────┤  │
│  │ • Prettier      │      │ • Validate      │      │ • Visual      │  │
│  │ • ESLint        │      │   workflows     │      │   regression  │  │
│  │ • Type Check    │      │ • Syntax check  │      │ • Snapshot    │  │
│  │ • Unit Tests    │      └─────────────────┘      │   compare     │  │
│  │ • Build         │                               │ • Against dev │  │
│  └─────────────────┘                               └───────────────┘  │
│           │                       │                         │          │
│           └───────────────────────┴─────────────────────────┘          │
│                                   │                                    │
│                              [All Pass]                                │
│                                   ▼                                    │
│           ┌────────────────────────────────────────────┐              │
│           │        PR PREVIEW DEPLOYMENT               │              │
│           ├────────────────────────────────────────────┤              │
│           │ 1. Build Next.js app                       │              │
│           │ 2. Deploy to Cloudflare Workers            │              │
│           │    Name: preview-{PR#}-{app}               │              │
│           │    URL: {app}-{PR#}.workers.dev            │              │
│           │ 3. Create GitHub Deployment                │              │
│           │ 4. Comment URL on PR                       │              │
│           └────────────────────────────────────────────┘              │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
               │
               │ [Review & Approve]
               ▼
┌──────────────────────────────┐
│ 6. Merge PR to dev          │
└──────────────┬───────────────┘
               │
               ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                      DEV DEPLOY & RELEASE WORKFLOW                      │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  Step 1: Semantic Release (RC)                                         │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │ • Analyze commits (conventional commits)                         │  │
│  │ • Determine version bump (major/minor/patch)                     │  │
│  │ • Generate RC version: 1.0.0-rc.1, 1.0.0-rc.2, etc.             │  │
│  │ • Update package.json                                            │  │
│  │ • Generate CHANGELOG.md                                          │  │
│  │ • Create Git tag                                                 │  │
│  │ • Create GitHub Pre-release                                      │  │
│  └──────────────────────────────────────────────────────────────────┘  │
│                                   │                                     │
│                                   ▼                                     │
│  Step 2: Build & Deploy                                                │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │ • Build Next.js with RC version                                  │  │
│  │ • Deploy to Cloudflare Workers                                   │  │
│  │   Name: dev-{app}                                                │  │
│  │   URL: dev-{app}.workers.dev                                     │  │
│  │   Custom: {app}.algenium.dev                                     │  │
│  │ • Create GitHub Deployment (dev environment)                     │  │
│  │ • Upload source maps to Sentry                                   │  │
│  │ • Create Sentry release with RC version                          │  │
│  └──────────────────────────────────────────────────────────────────┘  │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
               │
               │ [Test in dev environment]
               │ [Create PR to main when ready]
               ▼
┌──────────────────────────────┐
│ 7. Create PR: dev → main    │
└──────────────┬───────────────┘
               │
               ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                        PR CHECKS (again)                                │
│  • Quality Checks                                                       │
│  • Actionlint                                                           │
│  • Build verification                                                   │
└─────────────────────────────────────────────────────────────────────────┘
               │
               │ [Review & Approve]
               ▼
┌──────────────────────────────┐
│ 8. Merge PR to main         │
└──────────────┬───────────────┘
               │
               ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                    MAIN DEPLOY & RELEASE WORKFLOW                       │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  Step 1: Semantic Release (Stable)                                     │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │ • Promote RC to stable version                                   │  │
│  │ • Generate stable version: 1.0.0, 1.1.0, 2.0.0, etc.            │  │
│  │ • Update package.json                                            │  │
│  │ • Update CHANGELOG.md                                            │  │
│  │ • Create Git tag                                                 │  │
│  │ • Create GitHub Release (full release)                           │  │
│  └──────────────────────────────────────────────────────────────────┘  │
│                                   │                                     │
│                                   ▼                                     │
│  Step 2: Build & Deploy to Production                                  │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │ • Build Next.js with stable version                              │  │
│  │ • Deploy to Cloudflare Workers                                   │  │
│  │   Name: {app}                                                    │  │
│  │   URL: {app}.workers.dev                                         │  │
│  │   Custom: {app}.example.com or {app}.algenium.app               │  │
│  │ • Create GitHub Deployment (production environment)              │  │
│  │ • Upload source maps to Sentry                                   │  │
│  │ • Create Sentry release with stable version                      │  │
│  └──────────────────────────────────────────────────────────────────┘  │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
               │
               ▼
┌──────────────────────────────┐
│ 🎉 PRODUCTION DEPLOYED!     │
│    Version 1.0.0 Live       │
└─────────────────────────────┘


┌─────────────────────────────────────────────────────────────────────────┐
│                         PR CLEANUP WORKFLOW                             │
│                     (Runs when PR is closed)                            │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │ 1. Delete Cloudflare Worker                                      │  │
│  │    wrangler delete preview-{PR#}-{app}                           │  │
│  │                                                                   │  │
│  │ 2. Mark GitHub Deployments as inactive                           │  │
│  │    Update deployment status to "inactive"                        │  │
│  │                                                                   │  │
│  │ 3. Delete GitHub Environment                                     │  │
│  │    Remove preview-pr-{PR#} environment                           │  │
│  │                                                                   │  │
│  │ 4. Comment cleanup status on PR                                  │  │
│  └──────────────────────────────────────────────────────────────────┘  │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

## 🌍 Environment Summary

```
┌─────────────────────────────────────────────────────────────────────────┐
│                            ENVIRONMENTS                                 │
├─────────────┬───────────┬───────────────────┬──────────────────────────┤
│ Environment │ Branch    │ Version           │ URL Pattern              │
├─────────────┼───────────┼───────────────────┼──────────────────────────┤
│ Preview     │ PR→dev    │ PR #              │ {app}-{PR#}.workers.dev  │
│ (Ephemeral) │           │                   │ {app}-{PR#}.algenium.dev │
├─────────────┼───────────┼───────────────────┼──────────────────────────┤
│ Development │ dev       │ 1.0.0-rc.1        │ dev-{app}.workers.dev    │
│ (Staging)   │           │ 1.0.0-rc.2        │ {app}.algenium.dev       │
├─────────────┼───────────┼───────────────────┼──────────────────────────┤
│ Production  │ main      │ 1.0.0             │ {app}.workers.dev        │
│             │           │ 1.1.0             │ {app}.example.com        │
│             │           │ 2.0.0             │ {app}.algenium.app       │
└─────────────┴───────────┴───────────────────┴──────────────────────────┘
```

## 📋 Version Progression Example

```
1. Feature PR #42 to dev
   ↓
   Preview: PR #42 (ephemeral)
   URL: my-app-42.algenium.dev

2. Merge to dev
   ↓
   Dev: 0.1.0-rc.1 (first RC)
   URL: my-app.algenium.dev

3. Another feature PR #43 to dev
   ↓
   Preview: PR #43 (ephemeral)

4. Merge to dev
   ↓
   Dev: 0.1.0-rc.2 (incremented RC)
   URL: my-app.algenium.dev

5. PR dev → main (merge)
   ↓
   Production: 0.1.0 (stable)
   URL: my-app.example.com

6. Bug fix PR #44 to dev
   ↓
   Preview: PR #44

7. Merge to dev
   ↓
   Dev: 0.1.1-rc.1 (patch RC)

8. PR dev → main (merge)
   ↓
   Production: 0.1.1 (patch)

9. New feature PR #45 to dev
   ↓
   Dev: 0.2.0-rc.1 (minor RC)

10. PR dev → main (merge)
    ↓
    Production: 0.2.0 (minor)
```

## 🔐 Quality Gates

Every merge must pass:

```
┌─────────────────────────────────────────────┐
│          QUALITY GATE CHECKLIST             │
├─────────────────────────────────────────────┤
│ ☑ ESLint                    (zero errors)   │
│ ☑ Prettier                  (formatted)     │
│ ☑ TypeScript                (no errors)     │
│ ☑ Unit Tests                (all pass)      │
│ ☑ Build                     (succeeds)      │
│ ☑ Actionlint                (valid)         │
│ ☑ Chromatic (dev PRs)       (approved)      │
│ ☑ Conventional Commit       (format)        │
└─────────────────────────────────────────────┘
```

## 🎯 Deployment Targets

```
┌──────────────────────────────────────────────────────────┐
│                   DEPLOYMENT MATRIX                      │
├─────────────┬──────────────┬─────────────────────────────┤
│ Trigger     │ Environment  │ Actions                     │
├─────────────┼──────────────┼─────────────────────────────┤
│ PR Open     │ Preview      │ • Deploy ephemeral          │
│ PR Sync     │              │ • Comment URL               │
│ PR Reopen   │              │ • Create deployment         │
├─────────────┼──────────────┼─────────────────────────────┤
│ PR Close    │ Preview      │ • Delete worker             │
│             │              │ • Mark deployment inactive  │
│             │              │ • Delete environment        │
├─────────────┼──────────────┼─────────────────────────────┤
│ Push to dev │ Development  │ • Create RC version         │
│             │              │ • Deploy to dev             │
│             │              │ • Pre-release on GitHub     │
│             │              │ • Sentry release            │
├─────────────┼──────────────┼─────────────────────────────┤
│ Push to main│ Production   │ • Create stable version     │
│             │              │ • Deploy to production      │
│             │              │ • Release on GitHub         │
│             │              │ • Sentry release            │
└─────────────┴──────────────┴─────────────────────────────┘
```

---

**This is the complete workflow for your Next.js template!**
