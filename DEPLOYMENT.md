# MOBOUI Production Deployment Guide

This guide provides comprehensive instructions for deploying MOBOUI to production environments.

## Table of Contents

- [Pre-Deployment Checklist](#pre-deployment-checklist)
- [Environment Setup](#environment-setup)
- [Deploying to Vercel](#deploying-to-vercel)
- [Deploying to Other Platforms](#deploying-to-other-platforms)
- [Database Configuration](#database-configuration)
- [Security Configuration](#security-configuration)
- [Performance Optimization](#performance-optimization)
- [Monitoring & Logging](#monitoring--logging)
- [Scaling & Infrastructure](#scaling--infrastructure)
- [Troubleshooting](#troubleshooting)
- [Rollback Procedures](#rollback-procedures)

## Pre-Deployment Checklist

### Code Quality

- [ ] All tests passing: `npm run test`
- [ ] No TypeScript errors: `npm run type-check`
- [ ] No linting errors: `npm run lint`
- [ ] Code formatted: `npm run format`
- [ ] No console warnings or errors
- [ ] Security vulnerabilities checked: `npm audit`

### Functionality

- [ ] All features tested locally
- [ ] Authentication flow works (Email, GitHub, Google)
- [ ] File uploads functional
- [ ] Database queries optimized
- [ ] Search functionality working
- [ ] Dark/light mode toggle works
- [ ] Mobile responsive tested
- [ ] Accessibility check passed

### Documentation

- [ ] README.md updated
- [ ] Environment variables documented
- [ ] API endpoints documented
- [ ] Database schema documented
- [ ] Deployment steps documented
- [ ] Troubleshooting guide updated

### Performance

- [ ] Bundle size checked
- [ ] Images optimized
- [ ] API calls optimized
- [ ] Database queries indexed
- [ ] Caching strategy implemented
- [ ] Lighthouse score > 90

### Security

- [ ] No hardcoded secrets in code
- [ ] Sensitive keys in environment variables
- [ ] CORS properly configured
- [ ] Input validation implemented
- [ ] SQL injection protection enabled
- [ ] XSS protection enabled
- [ ] CSRF tokens implemented
- [ ] Rate limiting configured

## Environment Setup

### 1. Production Environment Variables

Create `.env.production`:

```bash
# Copy from template
cp .env.example .env.production
```

Configure for production:

```env
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://yourdomain.com
NEXT_PUBLIC_API_URL=https://yourdomain.com/api

# Supabase Production Project
NEXT_PUBLIC_SUPABASE_URL=https://your-prod-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=prod-anon-key
SUPABASE_SERVICE_ROLE_KEY=prod-service-role-key

# Additional production settings
NEXT_PUBLIC_ENABLE_ANALYTICS=true
NEXT_PUBLIC_DEV_MODE=false

# Security
NEXT_PUBLIC_CORS_ORIGINS=https://yourdomain.com

# Optional: Analytics, Monitoring
SENTRY_AUTH_TOKEN=your-sentry-token
NEXT_PUBLIC_GA_ID=G-XXXXX
```

### 2. Build for Production

```bash
# Test production build locally
npm run build
npm start

# Visit http://localhost:3000 and test
```

## Deploying to Vercel

### Option 1: Via GitHub (Recommended)

**1. Push to GitHub**

```bash
git push origin main
```

**2. Connect to Vercel**

- Visit [vercel.com](https://vercel.com)
- Click "New Project"
- Import your GitHub repository
- Select root directory
- Click "Deploy"

**3. Configure Environment Variables**

In Vercel Dashboard:

```
Settings > Environment Variables
```

Add all variables from `.env.production`:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-prod-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=prod-anon-key
SUPABASE_SERVICE_ROLE_KEY=prod-service-role-key
```

**4. Deploy**

```
Deployments > Deploy Now
```

### Option 2: Via CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel --prod

# Follow prompts and configure environment variables
```

## Deploying to Other Platforms

### Netlify

```bash
# Connect GitHub repository
# At https://app.netlify.com/start

# Build command: npm run build
# Publish directory: .next
# (requires Next.js on Netlify)
```

**Environment Variables**: Site settings > Build & deploy > Environment

### Railway

```bash
# Create railway.json
cat > railway.json << EOF
{
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "npm start",
    "restartPolicyMaxRetries": 5
  }
}
EOF

# Push to Railway
railway up
```

### Docker Deployment

```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy files
COPY package*.json ./
COPY . .

# Install & build
RUN npm ci
RUN npm run build

# Expose port
EXPOSE 3000

# Start
CMD ["npm", "start"]
```

```bash
# Build image
docker build -t moboui:latest .

# Run locally
docker run -p 3000:3000 moboui:latest

# Push to registry
docker tag moboui:latest your-registry/moboui:latest
docker push your-registry/moboui:latest
```

## Database Configuration

### 1. Supabase Production Project

**Create Production Project**

1. Go to [supabase.com](https://supabase.com)
2. Create new project
3. Choose region (close to users)
4. Set strong password
5. Wait for provisioning

**Execute Schema**

```bash
# 1. Get schema file
cat supabase-schema.sql

# 2. In Supabase Dashboard:
# SQL Editor > New Query > Paste schema

# 3. Run query
```

**Enable RLS (Row Level Security)**

```sql
-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE components ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;
-- ... other tables
```

**Create Indexes for Performance**

```sql
-- User queries
CREATE INDEX idx_profiles_user_id ON profiles(id);
CREATE INDEX idx_favorites_user_id ON favorites(user_id);

-- Search queries
CREATE INDEX idx_components_name ON components USING GIN(to_tsvector('english', name));
CREATE INDEX idx_components_description ON components USING GIN(to_tsvector('english', description));

-- Activity tracking
CREATE INDEX idx_activity_logs_user_id ON activity_logs(user_id);
CREATE INDEX idx_activity_logs_created_at ON activity_logs(created_at DESC);
```

### 2. Backup & Recovery

**Enable Automated Backups**

In Supabase Dashboard:
- Settings > Backups
- Enable daily backups
- Set retention to 30 days

**Manual Backup**

```bash
# Export database
pg_dump "postgresql://user:password@host/dbname" > backup.sql

# Import database
psql "postgresql://user:password@newhost/dbname" < backup.sql
```

### 3. Connection Pooling

In Supabase Dashboard:
- Settings > Database
- Connection pooling > Enable
- Select "Supabase session mode" or "Transaction mode"

## Security Configuration

### 1. CORS Setup

```typescript
// next.config.ts
const nextConfig = {
  headers: async () => {
    return [
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: 'https://yourdomain.com',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, PUT, DELETE, OPTIONS',
          },
        ],
      },
    ];
  },
};
```

### 2. Environment Security

```bash
# Never commit secrets
echo ".env.production" >> .gitignore
echo ".env.*.local" >> .gitignore

# Use environment variable encryption
# (Provided by Vercel, Railway, etc.)
```

### 3. Supabase Security

**Row Level Security Policies**

```sql
-- Example: Users can only view their own profile
CREATE POLICY "Users can view own profile"
ON profiles FOR SELECT
TO authenticated
USING (auth.uid() = id);

-- Users can only update their own profile
CREATE POLICY "Users can update own profile"
ON profiles FOR UPDATE
TO authenticated
USING (auth.uid() = id);
```

### 4. API Rate Limiting

```typescript
// lib/rateLimit.ts
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(100, '1 h'),
});

export async function checkRateLimit(identifier: string) {
  const { success } = await ratelimit.limit(identifier);
  return success;
}
```

### 5. HTTPS & Certificates

- Vercel: Automatic SSL certificate
- Custom domain: Auto-renewing via Let's Encrypt
- API: Always use HTTPS

## Performance Optimization

### 1. Next.js Optimization

```typescript
// next.config.ts
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
  // Compression
  compress: true,

  // Image optimization
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },

  // Headers
  headers: async () => [
    {
      source: '/:path*',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable',
        },
      ],
    },
  ],

  // Redirects
  redirects: async () => [
    {
      source: '/old-page',
      destination: '/new-page',
      permanent: true,
    },
  ],
};

module.exports = withBundleAnalyzer(nextConfig);
```

### 2. Database Query Optimization

```typescript
// Avoid N+1 queries
// ❌ Bad
const components = await getComponents();
const details = await Promise.all(
  components.map(c => getComponentDetails(c.id))
);

// ✅ Good
const components = await getComponentsWithDetails();
```

### 3. Caching Strategy

```typescript
// Supabase queries
const { data, error } = await supabase
  .from('components')
  .select('*')
  .cache('force-cache', { revalidate: 3600 });

// ISR (Incremental Static Regeneration)
export const revalidate = 3600; // Revalidate every hour
```

### 4. CDN Configuration

- Vercel: Automatic global CDN
- Custom: Use Cloudflare or AWS CloudFront
- Cache images and static assets

## Monitoring & Logging

### 1. Error Tracking (Sentry)

```typescript
// lib/sentry.ts
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 1.0,
});
```

### 2. Analytics

```typescript
// lib/analytics.ts
import { GoogleAnalytics } from '@next/analytics';

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <GoogleAnalytics />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

### 3. Logging

```typescript
// lib/logger.ts
export const log = {
  info: (msg: string, data?: any) => console.log(`[INFO] ${msg}`, data),
  error: (msg: string, error?: any) => console.error(`[ERROR] ${msg}`, error),
  warn: (msg: string, data?: any) => console.warn(`[WARN] ${msg}`, data),
};
```

### 4. Health Checks

```typescript
// app/api/health/route.ts
export async function GET() {
  try {
    // Check database
    const { data } = await supabase.from('profiles').select('count');
    
    return Response.json({
      status: 'healthy',
      timestamp: new Date(),
      database: 'connected',
    });
  } catch (error) {
    return Response.json({
      status: 'unhealthy',
      error: error.message,
    }, { status: 500 });
  }
}
```

## Scaling & Infrastructure

### 1. Database Scaling

- **Connection pooling** enabled
- **Indexes** on frequently queried columns
- **Read replicas** for heavy read workloads
- **Partitioning** for large tables

### 2. Application Scaling

- **Auto-scaling** on Vercel (automatic)
- **Load balancing** for multi-region
- **Edge functions** for low-latency
- **Caching** at multiple layers

### 3. Media & Storage Scaling

- **CDN** for static assets
- **Compression** for images
- **Lazy loading** for images
- **Supabase Storage** for file uploads

## Troubleshooting

### Deployment Fails

1. **Check build logs**: Vercel Dashboard > Deployments > Logs
2. **Verify environment variables**: Settings > Environment Variables
3. **Test locally**: `npm run build && npm start`
4. **Check dependencies**: `npm install` latest versions

### Performance Issues

1. **Check Lighthouse**: `npm run build && npm start`
2. **Analyze bundle**: `ANALYZE=true npm run build`
3. **Monitor database**: Supabase Dashboard > Database
4. **Check API response times**: Browser DevTools > Network

### Database Connection Fails

1. **Verify credentials**: Settings > API
2. **Check IP whitelist**: Settings > Database
3. **Test connection**: Use Supabase SQL Editor
4. **Check firewall**: Ensure port 5432 is open

### Authentication Issues

1. **Verify OAuth URLs**: Supabase Dashboard > Authentication
2. **Check credentials**: GitHub/Google console
3. **Test locally**: Ensure `.env.local` has correct keys
4. **Clear cookies**: Browser > DevTools > Application

## Rollback Procedures

### Revert Deployment

**Vercel**

```
Deployments > Select previous deployment > Redeploy
```

**Git-based**

```bash
git revert <commit-hash>
git push origin main
# Vercel auto-redeploys
```

### Database Rollback

1. **From backup**
   - Supabase Dashboard > Backups
   - Select backup date
   - Click Restore

2. **Manual rollback**
   ```bash
   # Get backup file
   psql < backup.sql
   ```

## Post-Deployment

### 1. Smoke Tests

- [ ] Website loads
- [ ] Authentication works
- [ ] Database accessible
- [ ] API endpoints respond
- [ ] File uploads work
- [ ] Search functionality works

### 2. Monitoring

- [ ] Check error tracking (Sentry)
- [ ] Review analytics (Google Analytics)
- [ ] Monitor performance (Lighthouse)
- [ ] Track uptime (Vercel/Status page)

### 3. Performance Review

```bash
# Lighthouse CI
npm run lighthouse:ci

# Bundle analysis
npm run analyze
```

## Support & Escalation

- 📧 **Email**: support@moboui.com
- 🐛 **Issues**: GitHub Issues
- 🆘 **Critical Issues**: Escalate to team lead

---

**Last Updated**: May 2026

For questions or issues, please contact the deployment team or check the troubleshooting section.
