# 📚 Documentation Index

Welcome to the Next.js + Cloudflare Workers Template! This index will help you find the right documentation.

## 🚀 Quick Start

**First time here?** Start with these:

1. **[SETUP.md](SETUP.md)** - Initial setup instructions (5 min read)
2. **[CHECKLIST.md](CHECKLIST.md)** - Post-clone checklist (15 min)
3. **[README.md](README.md)** - Main documentation (10 min read)

## 📖 Complete Documentation

### Getting Started

| Document | Description | When to Read |
|----------|-------------|--------------|
| **[README.md](README.md)** | Main project documentation with features, setup, and usage | First thing to read |
| **[SETUP.md](SETUP.md)** | Quick setup guide after cloning | After cloning |
| **[CHECKLIST.md](CHECKLIST.md)** | Complete post-clone checklist with verification steps | During setup |

### Understanding the Template

| Document | Description | When to Read |
|----------|-------------|--------------|
| **[COMPLETION_REPORT.md](COMPLETION_REPORT.md)** | Complete summary of what's been configured | To understand what's included |
| **[TEMPLATE_SUMMARY.md](TEMPLATE_SUMMARY.md)** | Detailed implementation summary | For technical overview |
| **[WORKFLOW_DIAGRAM.md](WORKFLOW_DIAGRAM.md)** | Visual workflow diagrams and environment details | To understand the deployment flow |

### Development

| Document | Description | When to Read |
|----------|-------------|--------------|
| **[CONTRIBUTING.md](CONTRIBUTING.md)** | Contribution guidelines and development workflow | Before contributing |
| **[SCRIPTS_REFERENCE.md](SCRIPTS_REFERENCE.md)** | All available npm scripts explained | When running commands |
| **[.cursorrules](.cursorrules)** | AI agent development rules and best practices | During development |

### Infrastructure

| Document | Description | When to Read |
|----------|-------------|--------------|
| **[CLOUDFLARE_DOMAINS.md](CLOUDFLARE_DOMAINS.md)** | Custom domain setup and CNAME configuration | When setting up domains |

## 🎯 Find Information By Task

### I want to...

#### Set up the project for the first time
1. Read [SETUP.md](SETUP.md)
2. Follow [CHECKLIST.md](CHECKLIST.md)
3. Reference [README.md](README.md) for details

#### Understand the deployment workflow
1. Read [WORKFLOW_DIAGRAM.md](WORKFLOW_DIAGRAM.md)
2. Check [COMPLETION_REPORT.md](COMPLETION_REPORT.md) for details

#### Learn about available commands
1. Read [SCRIPTS_REFERENCE.md](SCRIPTS_REFERENCE.md)
2. Check `package.json` for full list

#### Contribute to the project
1. Read [CONTRIBUTING.md](CONTRIBUTING.md)
2. Follow [.cursorrules](.cursorrules) for best practices

#### Configure custom domains
1. Read [CLOUDFLARE_DOMAINS.md](CLOUDFLARE_DOMAINS.md)
2. Update `wrangler.jsonc` accordingly

#### Understand what's included
1. Read [COMPLETION_REPORT.md](COMPLETION_REPORT.md)
2. Check [TEMPLATE_SUMMARY.md](TEMPLATE_SUMMARY.md)

## 📊 Document Statistics

| Document | Lines | Purpose |
|----------|-------|---------|
| README.md | 358 | Main documentation |
| COMPLETION_REPORT.md | 469 | Implementation summary |
| WORKFLOW_DIAGRAM.md | 313 | Visual workflows |
| CLOUDFLARE_DOMAINS.md | 289 | Domain configuration |
| CHECKLIST.md | 287 | Setup checklist |
| CONTRIBUTING.md | 284 | Contribution guide |
| SCRIPTS_REFERENCE.md | 271 | Scripts documentation |
| TEMPLATE_SUMMARY.md | 229 | Technical summary |
| SETUP.md | 81 | Quick setup |
| **Total** | **2,581** | **Complete docs** |

## 🗂️ Configuration Files

### Application Config
- `next.config.js` - Next.js + Sentry configuration
- `wrangler.jsonc` - Cloudflare Workers configuration
- `open-next.config.ts` - OpenNext configuration
- `tsconfig.json` - TypeScript configuration

### Quality Tools
- `eslint.config.mjs` - ESLint rules
- `.prettierrc` - Prettier configuration
- `commitlint.config.js` - Commit message rules
- `vitest.config.ts` - Test configuration

### CI/CD
- `.github/workflows/` - GitHub Actions workflows
  - `pr-checks.yml` - Quality checks
  - `pr-preview.yml` - Preview deployments
  - `pr-cleanup.yml` - Cleanup on PR close
  - `dev-deploy.yml` - Dev deployment + RC release
  - `main-deploy.yml` - Production deployment + release

### Tooling
- `.cursor/mcp.json` - MCP servers for AI
- `.cursorrules` - AI development rules
- `.releaserc.js` - Semantic-release config
- `chromatic.config.js` - Chromatic config

### Storybook
- `.storybook/main.ts` - Storybook configuration
- `.storybook/preview.ts` - Preview configuration

### Git Hooks
- `.husky/pre-commit` - Pre-commit checks
- `.husky/commit-msg` - Commit message validation

### Sentry
- `sentry.client.config.ts` - Client-side error tracking
- `sentry.server.config.ts` - Server-side error tracking
- `sentry.edge.config.ts` - Edge runtime error tracking

## 🎓 Learning Path

### Beginner
1. **[README.md](README.md)** - Understand what the template does
2. **[SETUP.md](SETUP.md)** - Set up your environment
3. **[SCRIPTS_REFERENCE.md](SCRIPTS_REFERENCE.md)** - Learn available commands
4. **[CONTRIBUTING.md](CONTRIBUTING.md)** - Start contributing

### Intermediate
1. **[WORKFLOW_DIAGRAM.md](WORKFLOW_DIAGRAM.md)** - Understand deployment flow
2. **[.cursorrules](.cursorrules)** - Learn best practices
3. **[CLOUDFLARE_DOMAINS.md](CLOUDFLARE_DOMAINS.md)** - Configure domains

### Advanced
1. **[COMPLETION_REPORT.md](COMPLETION_REPORT.md)** - Full implementation details
2. **[TEMPLATE_SUMMARY.md](TEMPLATE_SUMMARY.md)** - Technical architecture
3. GitHub Actions workflows - Customize CI/CD

## 🆘 Troubleshooting

Look for troubleshooting sections in:
- [README.md](README.md#-troubleshooting)
- [CHECKLIST.md](CHECKLIST.md#-troubleshooting)
- [CLOUDFLARE_DOMAINS.md](CLOUDFLARE_DOMAINS.md#troubleshooting)
- [SCRIPTS_REFERENCE.md](SCRIPTS_REFERENCE.md#-troubleshooting)

## 💡 Tips

- 📌 **Bookmark this page** for quick reference
- 🔖 **Use Ctrl+F** to search within documents
- 📝 **Check CHECKLIST.md** for verification steps
- 🎯 **Follow CONTRIBUTING.md** for best practices
- 🚀 **Start with README.md** if unsure

## 🔗 External Resources

- **Next.js:** https://nextjs.org/docs
- **Cloudflare Workers:** https://developers.cloudflare.com/workers/
- **Vitest:** https://vitest.dev/
- **Storybook:** https://storybook.js.org/
- **Chromatic:** https://www.chromatic.com/docs/
- **Sentry:** https://docs.sentry.io/
- **Semantic Release:** https://semantic-release.gitbook.io/
- **Conventional Commits:** https://www.conventionalcommits.org/

## 📧 Need Help?

1. **Check documentation** - Use this index to find relevant docs
2. **Search existing issues** - Someone might have had the same problem
3. **Open a discussion** - Ask questions in GitHub Discussions
4. **Create an issue** - Report bugs or request features

---

**Happy Coding! 🎉**

*Last Updated: $(date)*
