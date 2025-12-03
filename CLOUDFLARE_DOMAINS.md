# Cloudflare Workers Custom Domain Setup

## Domain Architecture

This template uses a multi-environment deployment strategy with custom domains via CNAME records pointing to Cloudflare Workers.

## Workers Naming Convention

### Production (main branch)
```
Worker Name: <app-name>
Default URL: <app-name>.<org>.workers.dev
```

### Development (dev branch)
```
Worker Name: dev-<app-name>
Default URL: dev-<app-name>.<org>.workers.dev
```

### Preview (PR to dev)
```
Worker Name: preview-<pr-number>-<app-name>
Default URL: preview-<pr-number>-<app-name>.<org>.workers.dev
```

## Custom Domain Setup

### 1. Production Domain

**Primary Domain:**
```
Custom Domain: <app-name>.<custom_domain>
CNAME → <app-name>.<org>.workers.dev
```

**Alternative Domain:**
```
Custom Domain: <app-name>.<org>.algenium.app
CNAME → <app-name>.<org>.workers.dev
```

### 2. Development Domain

```
Custom Domain: <app-name>.<org>.algenium.dev
CNAME → dev-<app-name>.<org>.workers.dev
```

### 3. Preview Domains

```
Custom Domain: <app-name>-<pr-number>.<org>.algenium.dev
CNAME → preview-<pr-number>-<app-name>.<org>.workers.dev
```

## Cloudflare DNS Configuration

Add these CNAME records in your Cloudflare DNS dashboard:

### For Production
```
Type: CNAME
Name: <app-name>
Target: <app-name>.<org>.workers.dev
Proxy status: Proxied (orange cloud)
```

### For Development
```
Type: CNAME
Name: <app-name>.<org>.algenium.dev
Target: dev-<app-name>.<org>.workers.dev
Proxy status: Proxied (orange cloud)
```

### For Preview (Wildcard)
```
Type: CNAME
Name: *.algenium.dev
Target: <org>.workers.dev
Proxy status: Proxied (orange cloud)
```

**Note:** The wildcard CNAME allows automatic routing for all preview deployments.

## Wrangler Configuration

Update `wrangler.jsonc` with environment-specific routes:

```jsonc
{
  "$schema": "node_modules/wrangler/config-schema.json",
  "name": "<app-name>",
  "main": ".open-next/worker.js",
  "compatibility_date": "2025-10-08",
  "compatibility_flags": ["nodejs_compat", "global_fetch_strictly_public"],
  "assets": {
    "binding": "ASSETS",
    "directory": ".open-next/assets"
  },
  "observability": {
    "enabled": true
  },
  "upload_source_maps": true,
  
  // Environment-specific configurations
  "env": {
    "production": {
      "name": "<app-name>",
      "routes": [
        {
          "pattern": "<app-name>.<custom_domain>",
          "custom_domain": true
        },
        {
          "pattern": "<app-name>.<org>.algenium.app",
          "custom_domain": true
        }
      ]
    },
    "dev": {
      "name": "dev-<app-name>",
      "routes": [
        {
          "pattern": "<app-name>.<org>.algenium.dev",
          "custom_domain": true
        }
      ]
    },
    "preview": {
      "name": "preview-<pr-number>-<app-name>",
      "routes": [
        {
          "pattern": "<app-name>-<pr-number>.<org>.algenium.dev",
          "custom_domain": true
        }
      ]
    }
  }
}
```

## How It Works

### 1. Single Worker, Multiple Versions
- Each environment (production, dev, preview) is a **separate Worker deployment**
- Workers run different versions of your code
- CNAME records route traffic to the correct Worker

### 2. Automatic Routing
- Cloudflare automatically routes based on the requested domain
- No additional configuration needed after initial DNS setup
- Workers can be deployed independently

### 3. GitHub Actions Integration
The workflows handle deployment to the correct environment:

**PR Preview Deploy:**
```bash
wrangler deploy \
  --name "preview-${PR_NUMBER}-${APP_NAME}" \
  --env preview \
  --var ENVIRONMENT:preview \
  --var PR_NUMBER:${PR_NUMBER}
```

**Dev Deploy:**
```bash
wrangler deploy \
  --name "dev-${APP_NAME}" \
  --env dev \
  --var ENVIRONMENT:dev \
  --var VERSION:${VERSION}
```

**Production Deploy:**
```bash
wrangler deploy \
  --name "${APP_NAME}" \
  --env production \
  --var ENVIRONMENT:production \
  --var VERSION:${VERSION}
```

## Domain Examples

Replace placeholders with your actual values:

| Placeholder | Example |
|------------|---------|
| `<app-name>` | `my-app` |
| `<org>` | `acme` |
| `<custom_domain>` | `example.com` |
| `<pr-number>` | `42` |

**Resulting URLs:**

| Environment | URL |
|------------|-----|
| Production | `my-app.example.com` or `my-app.acme.algenium.app` |
| Development | `my-app.acme.algenium.dev` |
| Preview PR #42 | `my-app-42.acme.algenium.dev` |

## Custom Domain Management

### Adding a Custom Domain via Wrangler

```bash
# Add custom domain to production worker
wrangler domains add <app-name>.<custom_domain> --env production

# Add custom domain to dev worker
wrangler domains add <app-name>.<org>.algenium.dev --env dev
```

### Verifying Custom Domain

```bash
# List all custom domains for a worker
wrangler domains list --env production
```

## SSL/TLS

Cloudflare automatically provisions SSL certificates for:
- Workers.dev subdomains
- Custom domains (when proxied)

**Recommended Settings:**
- SSL/TLS encryption mode: **Full (strict)**
- Always Use HTTPS: **Enabled**
- Automatic HTTPS Rewrites: **Enabled**

## Troubleshooting

### Domain not resolving
1. Check CNAME records are correct in Cloudflare DNS
2. Verify Proxy status is enabled (orange cloud)
3. Wait 5-10 minutes for DNS propagation
4. Use `dig` or `nslookup` to verify DNS:
   ```bash
   dig <app-name>.<custom_domain>
   ```

### Worker not receiving traffic
1. Verify Worker is deployed: `wrangler deployments list`
2. Check Worker routes in Cloudflare dashboard
3. Verify custom domain is added to Worker

### SSL/TLS errors
1. Check SSL/TLS mode is set to "Full (strict)"
2. Verify origin certificate is valid
3. Check Always Use HTTPS is enabled

## Cost Considerations

Each Worker counts towards your Cloudflare Workers quota:
- **Free Plan:** 100,000 requests/day across all Workers
- **Paid Plan:** $5/month for 10M requests + $0.50/million additional

**Cost Optimization:**
- Preview deployments are ephemeral (deleted after PR close)
- Only active environments consume quota
- Consider Worker limits when having multiple preview PRs

## Security

### Environment Variables
Never commit sensitive data. Use Wrangler secrets:

```bash
# Set secrets for each environment
wrangler secret put SECRET_NAME --env production
wrangler secret put SECRET_NAME --env dev
```

### Access Control
Configure Cloudflare Access for non-production environments:
- Restrict dev environment to internal IPs
- Add authentication to preview deployments
- Use Cloudflare Access for team-only access

---

**Note:** This setup requires a Cloudflare account with:
- Workers enabled
- DNS management for custom domains
- Custom domains quota (included in paid plans, limited on free)
