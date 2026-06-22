# Build stage
FROM oven/bun:1.1-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies using bun (much faster than npm ci)
RUN bun install

# Copy source code
COPY . .

# Build the Next.js application
RUN bun run build

# Production stage
FROM oven/bun:1.1-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Create a non-root user for security
RUN addgroup -S nodejs && adduser -S nextjs -G nodejs

# Set correct permissions
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Copy standalone built application from builder
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

# Expose port
EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Start the application using Bun
CMD ["bun", "server.js"]
