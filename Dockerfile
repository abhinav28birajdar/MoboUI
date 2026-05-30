# Multi-stage Dockerfile for MOBOUI
# Production-ready image with optimized size and security

# ========================================
# Stage 1: Dependencies
# ========================================
FROM node:18-alpine AS deps

WORKDIR /app

# Copy dependency files
COPY package.json package-lock.json* yarn.lock* pnpm-lock.yaml* ./

# Install dependencies
RUN \
  if [ -f pnpm-lock.yaml ]; then npm install -g pnpm && pnpm install --frozen-lockfile; \
  elif [ -f yarn.lock ]; then yarn install --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  else npm install; \
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

# Build application
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# ========================================
# Stage 3: Production
# ========================================
FROM node:18-alpine AS runtime

WORKDIR /app

# Set environment
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Install dumb-init for proper signal handling
RUN apk add --no-cache dumb-init

# Copy runtime dependencies
COPY --from=deps /app/node_modules ./node_modules

# Copy package.json for runtime
COPY package.json .

# Copy built application
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.ts ./

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001

# Change ownership
RUN chown -R nextjs:nodejs /app

# Switch to non-root user
USER nextjs

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

# Use dumb-init to handle signals properly
ENTRYPOINT ["dumb-init", "--"]

# Start application
CMD ["npm", "start"]

# ========================================
# Build Instructions
# ========================================
#
# Build image:
#   docker build -t moboui:latest .
#   docker build --build-arg NODE_OPTIONS="--max_old_space_size=2048" -t moboui:latest .
#
# Run container:
#   docker run -p 3000:3000 \
#     -e NEXT_PUBLIC_SUPABASE_URL=<url> \
#     -e NEXT_PUBLIC_SUPABASE_ANON_KEY=<key> \
#     -e SUPABASE_SERVICE_ROLE_KEY=<key> \
#     moboui:latest
#
# Run with docker-compose:
#   docker-compose up -d
#
# View logs:
#   docker logs -f <container-id>
#
# Execute commands in container:
#   docker exec -it <container-id> npm run build
#
# Push to registry:
#   docker tag moboui:latest your-registry/moboui:latest
#   docker push your-registry/moboui:latest
#
# ========================================
# Security Best Practices
# ========================================
#
# - Uses non-root user (nextjs)
# - Alpine Linux for minimal image size
# - Multi-stage build to reduce final size
# - Health checks configured
# - Proper signal handling with dumb-init
# - No secrets in image (use environment variables)
#
