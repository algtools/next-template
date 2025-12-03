# NPM Scripts Reference

Complete reference for all available pnpm scripts in this project.

## 📦 Development Scripts

### `pnpm dev`
Start Next.js development server with hot reload.
- Port: 3000 (default)
- Enables Cloudflare context in dev mode
- Auto-reloads on file changes

### `pnpm storybook`
Start Storybook development server.
- Port: 6006
- Live component preview
- Interactive documentation

## 🏗️ Build Scripts

### `pnpm build`
Build Next.js application for production.
- Optimizes bundles
- Generates static assets
- Required before deployment

### `pnpm build:storybook`
Build Storybook as static site.
- Generates production-ready Storybook
- Used by Chromatic for visual testing

### `pnpm start`
Start Next.js production server locally.
- Requires `pnpm build` first
- Serves optimized production build

### `pnpm preview`
Build and preview with OpenNext locally.
- Simulates Cloudflare Workers environment
- Useful for testing before deployment

## 🚀 Deployment Scripts

### `pnpm deploy`
Build and deploy to Cloudflare Workers.
- Builds with OpenNext
- Deploys to configured environment
- Used by CI/CD pipelines

### `pnpm cf-typegen`
Generate TypeScript types for Cloudflare bindings.
- Creates types for env.d.ts
- Useful for Cloudflare-specific APIs

## ✅ Quality Check Scripts

### `pnpm lint`
Run ESLint on the project.
- Checks for code issues
- Uses Next.js recommended rules
- Exit code 0 if no errors

### `pnpm lint:fix`
Run ESLint and auto-fix issues.
- Automatically fixes fixable issues
- Useful before committing

### `pnpm format`
Format code with Prettier.
- Formats all src files
- Uses Tailwind CSS plugin
- Writes changes to files

### `pnpm format:check`
Check code formatting without changing files.
- Exit code 0 if formatted correctly
- Used in CI/CD
- Does not modify files

### `pnpm type-check`
Run TypeScript compiler without emitting files.
- Checks for type errors
- Required before commit
- Used in CI/CD

### `pnpm test`
Run all unit tests once.
- Runs all tests in src/test
- Generates coverage report
- Exit code 0 if all pass

### `pnpm test:watch`
Run tests in watch mode.
- Re-runs tests on file changes
- Interactive mode
- Great for TDD

### `pnpm test:ui`
Run tests with Vitest UI.
- Visual test runner
- Shows test results in browser
- Port: 51204 (default)

### `pnpm check`
Run full build and type check.
- Builds application
- Runs type check
- Comprehensive validation

## 🔧 Setup Scripts

### `pnpm prepare`
Initialize Husky git hooks.
- Sets up pre-commit hooks
- Sets up commit-msg hooks
- Runs automatically after install

## 🎯 Pre-commit Scripts (Automatic)

These run automatically via git hooks:

### lint-staged
Runs on staged files only:
1. **For .js, .jsx, .ts, .tsx:**
   - `eslint --fix` - Fix linting issues
   - `prettier --write` - Format code
   - `vitest related --run` - Run related tests

2. **For .json, .css, .md:**
   - `prettier --write` - Format code

### commitlint
Validates commit messages:
- Enforces conventional commit format
- Max 100 characters
- Required format: `type(scope): subject`

## 📊 Script Combinations

### Full Quality Check
Run all checks before pushing:
```bash
pnpm lint && pnpm format:check && pnpm type-check && pnpm test
```

### Full Build Test
Test production build:
```bash
pnpm build && pnpm type-check && pnpm test
```

### Development Setup
Set up for local development:
```bash
pnpm install && pnpm prepare && pnpm dev
```

### Pre-deployment Check
Verify everything works:
```bash
pnpm lint && \
pnpm format:check && \
pnpm type-check && \
pnpm test && \
pnpm build && \
pnpm build:storybook
```

## 🚨 CI/CD Scripts

These are used in GitHub Actions:

### PR Checks
```bash
pnpm install --frozen-lockfile
pnpm format:check
pnpm lint
pnpm type-check
pnpm test
pnpm build
```

### Chromatic
```bash
pnpm install --frozen-lockfile
pnpm build:storybook
chromatic --project-token=XXX
```

### Deployment
```bash
pnpm install --frozen-lockfile
pnpm build
wrangler deploy
```

## 💡 Tips

### Speed up checks
Run checks in parallel:
```bash
pnpm lint & pnpm format:check & pnpm type-check & wait && pnpm test
```

### Watch mode for development
```bash
# Terminal 1
pnpm dev

# Terminal 2
pnpm test:watch

# Terminal 3
pnpm storybook
```

### Fix all issues at once
```bash
pnpm lint:fix && pnpm format
```

### Quick validation
```bash
pnpm check
```

## 🔄 Script Dependencies

Some scripts depend on others:

- `start` requires `build` first
- `preview` includes build
- `deploy` includes build
- `check` includes build and type-check

## 📝 Notes

- All scripts use **pnpm** (not npm)
- Most scripts fail fast (exit on first error)
- Some scripts support flags (e.g., `pnpm test -- --coverage`)
- CI/CD uses `--frozen-lockfile` to ensure consistency

## 🆘 Troubleshooting

### Script fails with module error
```bash
rm -rf node_modules
pnpm install
```

### Husky hooks not running
```bash
pnpm run prepare
chmod +x .husky/pre-commit .husky/commit-msg
```

### Tests fail unexpectedly
```bash
pnpm test -- --clearCache
pnpm test
```

### Build fails
```bash
rm -rf .next .open-next
pnpm build
```

---

**Need more info? Check package.json scripts section!**
