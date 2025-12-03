# Post-Clone Setup Checklist

Use this checklist after cloning this template to set up your new project.

## 📋 Initial Setup

### 1. Install Dependencies
```bash
pnpm install
pnpm run prepare
```
- [ ] Dependencies installed
- [ ] Git hooks initialized

### 2. Project Configuration

#### Update package.json
- [ ] Change `name` to your project name
- [ ] Update `description`
- [ ] Remove or update `cloudflare` section if needed

#### Update Chromatic
- [ ] Create Chromatic project at https://chromatic.com
- [ ] Update `chromatic.config.js` with your project ID

#### Update Wrangler
- [ ] Update `wrangler.jsonc` with your worker name
- [ ] Update worker names in GitHub Actions workflows:
  - `.github/workflows/pr-preview.yml` (line ~60)
  - `.github/workflows/dev-deploy.yml` (line ~104)
  - `.github/workflows/main-deploy.yml` (line ~104)

### 3. Environment Variables

#### Local Development (.env.local)
```bash
cp .env.example .env.local
```

Fill in the following:
- [ ] `SENTRY_DSN`
- [ ] `SENTRY_ORG`
- [ ] `SENTRY_PROJECT`
- [ ] `SENTRY_AUTH_TOKEN`
- [ ] `NEXT_PUBLIC_SENTRY_DSN`
- [ ] `CLOUDFLARE_API_TOKEN`
- [ ] `CLOUDFLARE_ACCOUNT_ID`
- [ ] `CHROMATIC_PROJECT_TOKEN`

#### GitHub Secrets
Go to: `Settings > Secrets and variables > Actions > New repository secret`

Add these secrets:
- [ ] `CLOUDFLARE_API_TOKEN`
- [ ] `CLOUDFLARE_ACCOUNT_ID`
- [ ] `CHROMATIC_PROJECT_TOKEN`
- [ ] `SENTRY_AUTH_TOKEN`
- [ ] `SENTRY_ORG`
- [ ] `SENTRY_PROJECT`

### 4. Sentry Setup
- [ ] Create Sentry account at https://sentry.io
- [ ] Create new project for your app
- [ ] Get DSN from project settings
- [ ] Create auth token with `project:releases` and `project:write` permissions
- [ ] Update environment variables with Sentry credentials

### 5. Cloudflare Setup
- [ ] Sign up for Cloudflare account
- [ ] Enable Workers on your account
- [ ] Create API token with Workers edit permissions:
  - Go to: https://dash.cloudflare.com/profile/api-tokens
  - Create token with "Edit Cloudflare Workers" template
- [ ] Get Account ID from Workers dashboard

### 6. Git Repository Setup

#### Create dev branch
```bash
git checkout -b dev
git push -u origin dev
```
- [ ] Dev branch created and pushed

#### Branch Protection Rules

**For `dev` branch:**
- [ ] Require pull request reviews before merging
- [ ] Require status checks to pass:
  - Quality Checks
  - Actionlint
  - Chromatic Visual Tests
- [ ] Require branches to be up to date before merging
- [ ] Do not allow bypassing the above settings

**For `main` branch:**
- [ ] Require pull request reviews before merging
- [ ] Require status checks to pass:
  - Quality Checks
  - Actionlint
- [ ] Require branches to be up to date before merging
- [ ] Limit who can push to matching branches (optional)

### 7. Cloudflare Custom Domains (Optional)

If using custom domains, configure CNAME records in Cloudflare DNS:

**Production:**
- [ ] CNAME: `<app-name>.<custom-domain>` → `<app-name>.<org>.workers.dev`

**Development:**
- [ ] CNAME: `<app-name>.<org>.algenium.dev` → `dev-<app-name>.<org>.workers.dev`

**Preview (Wildcard):**
- [ ] CNAME: `*.algenium.dev` → `<org>.workers.dev`

See [CLOUDFLARE_DOMAINS.md](CLOUDFLARE_DOMAINS.md) for detailed instructions.

### 8. GitHub Actions

#### Verify workflows are enabled
- [ ] Go to `Actions` tab in GitHub
- [ ] Check that workflows are enabled
- [ ] Verify no permission issues

#### Test the workflows
- [ ] Create a feature branch
- [ ] Make a small change
- [ ] Commit with conventional commit message
- [ ] Push and create PR to `dev`
- [ ] Verify all checks run successfully
- [ ] Verify preview deployment is created
- [ ] Check Chromatic visual tests

### 9. Verify Pre-commit Hooks

Test that hooks are working:
```bash
# Make a small change
echo "test" >> README.md

# Try to commit (should trigger hooks)
git add README.md
git commit -m "test: verify hooks"

# Should run: lint, prettier, type-check, test, commitlint
```

Expected behavior:
- [ ] ESLint runs and checks code
- [ ] Prettier formats code
- [ ] TypeScript checks types
- [ ] Vitest runs related tests
- [ ] Commitlint validates message

### 10. Documentation Updates

Update project-specific documentation:
- [ ] Update README.md with project details
- [ ] Add project-specific setup instructions
- [ ] Update API documentation if needed
- [ ] Add architecture diagrams if needed

## 🧪 Verification Tests

Run these commands to verify everything works:

```bash
# Install dependencies
pnpm install

# Run all checks
pnpm run lint
pnpm run format:check
pnpm run type-check
pnpm run test

# Build application
pnpm run build

# Build Storybook
pnpm run build:storybook

# Start dev server (optional)
pnpm dev

# Start Storybook (optional)
pnpm storybook
```

Checklist:
- [ ] `pnpm install` succeeds
- [ ] `pnpm run lint` passes
- [ ] `pnpm run format:check` passes
- [ ] `pnpm run type-check` passes
- [ ] `pnpm run test` passes
- [ ] `pnpm run build` succeeds
- [ ] `pnpm run build:storybook` succeeds

## 🚀 First Deployment

### Deploy to Dev

1. Create a feature branch:
   ```bash
   git checkout -b feat/initial-setup
   ```

2. Make initial changes:
   ```bash
   # Update package.json, README, etc.
   git add .
   git commit -m "feat: initial project setup"
   ```

3. Push and create PR to dev:
   ```bash
   git push -u origin feat/initial-setup
   ```

4. Create PR on GitHub
   - [ ] All checks pass
   - [ ] Chromatic visual tests run
   - [ ] Preview deployment created

5. Merge PR to dev
   - [ ] Semantic-release creates RC version (0.1.0-rc.1)
   - [ ] Dev deployment succeeds
   - [ ] GitHub pre-release created
   - [ ] Sentry release created

### Deploy to Production

1. Create PR from dev to main
   - [ ] All checks pass
   - [ ] Review RC version in dev environment

2. Merge PR to main
   - [ ] Semantic-release creates stable version (0.1.0)
   - [ ] Production deployment succeeds
   - [ ] GitHub release created
   - [ ] Sentry release created

## 🎉 Done!

Your project is now fully set up and ready for development!

## 📚 Next Steps

- Read [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines
- Review [.cursorrules](.cursorrules) for development best practices
- Check [README.md](README.md) for usage documentation
- See [CLOUDFLARE_DOMAINS.md](CLOUDFLARE_DOMAINS.md) for domain setup

## 🆘 Troubleshooting

If you encounter issues:

1. **Dependencies fail to install:**
   - Verify Node.js 20+ is installed
   - Clear cache: `pnpm store prune`
   - Delete `node_modules` and retry

2. **Pre-commit hooks not running:**
   ```bash
   pnpm run prepare
   chmod +x .husky/pre-commit .husky/commit-msg
   ```

3. **GitHub Actions failing:**
   - Check all secrets are set correctly
   - Verify tokens have correct permissions
   - Review workflow logs for errors

4. **Chromatic not working:**
   - Verify project ID is correct
   - Check token is valid
   - Ensure Storybook builds locally

5. **Deployment failing:**
   - Verify Cloudflare credentials
   - Check worker name is unique
   - Review Wrangler configuration

---

**Need help? Check existing documentation or open an issue!**
