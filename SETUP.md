# Setup Instructions

## Initial Setup

After cloning this template, run:

```bash
# Install dependencies with pnpm
pnpm install

# Initialize git hooks
pnpm run prepare
```

## Configuration Required

### 1. Update Chromatic Project ID

Edit `chromatic.config.js` and replace `PROJECT_ID` with your Chromatic project ID.

### 2. Configure Environment Variables

Copy `.env.example` to `.env.local` and fill in all values.

### 3. Setup GitHub Secrets

Go to your repository Settings > Secrets and variables > Actions, and add:

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`
- `CHROMATIC_PROJECT_TOKEN`
- `SENTRY_AUTH_TOKEN`
- `SENTRY_ORG`
- `SENTRY_PROJECT`

### 4. Create dev branch

```bash
git checkout -b dev
git push -u origin dev
```

### 5. Configure Branch Protection (Optional but Recommended)

**For `dev` branch:**
- Require pull request reviews
- Require status checks to pass (PR Checks workflow)
- Require Chromatic approval

**For `main` branch:**
- Require pull request reviews
- Require status checks to pass
- Only allow merges from `dev`

## First Deployment

Once setup is complete:

1. Create a feature branch from `dev`
2. Make changes and commit with conventional commits
3. Push and create PR to `dev`
4. Review Chromatic changes
5. Merge to `dev` - This will create your first RC release
6. When ready, create PR from `dev` to `main`
7. Merge to `main` - This will create your first production release

## Verification Checklist

- [ ] pnpm install runs without errors
- [ ] All tests pass (`pnpm test`)
- [ ] Storybook builds (`pnpm build:storybook`)
- [ ] Next.js builds (`pnpm build`)
- [ ] Pre-commit hooks are working
- [ ] GitHub Actions workflows are enabled
- [ ] Chromatic project is configured
- [ ] Sentry project is configured
- [ ] Cloudflare Workers account is ready

---

For detailed documentation, see [README.md](README.md)
