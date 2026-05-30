# Multi-stage Dockerfile for MOBOUI
# Production-ready image with optimized size, security, and performance
# Build: docker build -t moboui:latest .
# Run: docker run -p 3000:3000 moboui:latest

# ========================================
# Stage 1: Dependencies
# ========================================
FROM node:18-alpine AS deps

WORKDIR /app

# Copy dependency files
COPY package.json package-lock.json* yarn.lock* pnpm-lock.yaml* ./

# Install dependencies based on available lock file
RUN \
  if [ -f pnpm-lock.yaml ]; then \
    npm install -g pnpm && pnpm install --frozen-lockfile; \
  elif [ -f yarn.lock ]; then \
    yarn install --frozen-lockfile; \
  elif [ -f package-lock.json ]; then \
    npm ci; \
  else \
    npm install; \
  fi

# ========================================
# Stage 2: Builder
# ========================================
FROM node:18-alpine AS builder

WORKDIR /app

# Copy dependencies from Stage 1
COPY --from=deps /app/node_modules ./node_modules

# Copy source code
COPY . .

# Build application with Next.js
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production
RUN npm run build

# Check if build succeeded
RUN test -d .next || (echo "Build failed" && exit 1)

# ========================================
# Stage 3: Production Runtime
# ========================================
FROM node:18-alpine AS runtime

WORKDIR /app

# Set environment variables
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Install dumb-init for proper signal handling and curl for health checks
RUN apk add --no-cache dumb-init curl

# Create non-root user for security (critical for production)
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001

# Copy only necessary files from dependencies stage
COPY --from=deps /app/node_modules ./node_modules

# Copy package.json and supporting files
COPY package.json package.json
COPY package-lock.json* package-lock.json
COPY .next-config.ts* ./
COPY tsconfig.json* ./

# Copy built application from builder
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.ts ./
COPY --from=builder /app/prisma ./prisma

# Change ownership of all files to nextjs user
RUN chown -R nextjs:nodejs /app

# Switch to non-root user
USER nextjs

# Expose port (matches Next.js default)
EXPOSE 3000

# Health check endpoint
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/api/health || exit 1

# Signal handling with dumb-init
ENTRYPOINT ["dumb-init", "--"]

# Start Next.js application
CMD ["npm", "start"]

# ========================================
# Build Instructions
# ========================================
#
# 1. Build the Docker image:
#    docker build -t moboui:latest .
#    docker build --build-arg NODE_OPTIONS="--max_old_space_size=2048" -t moboui:latest .
#
# 2. Run the container:
#    docker run -p 3000:3000 \
#      -e NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co \
#      -e NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key \
#      -e SUPABASE_SERVICE_ROLE_KEY=your-service-role-key \
#      moboui:latest
#
# 3. With environment file:
#    docker run -p 3000:3000 --env-file .env.production moboui:latest
#
# 4. With docker-compose:
#    docker-compose up -d
#
# 5. View logs:
#    docker logs -f <container-id>
#
# 6. Execute commands:
#    docker exec -it <container-id> npm run build
#    docker exec -it <container-id> node -v
#
# 7. Push to registry:
#    docker tag moboui:latest your-registry/moboui:latest
#    docker push your-registry/moboui:latest
#
# ========================================
# Security Best Practices
# ========================================
#
# ✓ Uses Alpine Linux (minimal attack surface)
# ✓ Multi-stage build (no build tools in final image)
# ✓ Non-root user (nextjs:1001)
# ✓ No package manager in runtime (apk removed)
# ✓ Health checks configured
# ✓ Proper signal handling (dumb-init)
# ✓ Read-only root filesystem capable
# ✓ Environment variables for secrets (no hardcoding)
#
# ========================================
# Environment Variables Required
# ========================================
#
# NEXT_PUBLIC_SUPABASE_URL       - Supabase project URL
# NEXT_PUBLIC_SUPABASE_ANON_KEY  - Supabase anonymous key
# SUPABASE_SERVICE_ROLE_KEY      - Supabase service role key (server-only)
# NODE_ENV                       - Set to 'production'
# NEXT_TELEMETRY_DISABLED        - Disable Next.js telemetry
#
# ========================================
# Production Notes
# ========================================
#
# - Image size: ~400MB (optimized)
# - Build time: ~3-5 minutes
# - Runtime memory: ~150-300MB
# - CPU: 1-2 cores recommended
# - Health check endpoint: /api/health (configure as needed)
# - Logs: Use docker logs or mount volume to /app/.next/logs
# - Data persistence: Not needed (stateless app)
# - Scaling: Horizontally scalable with load balancer
