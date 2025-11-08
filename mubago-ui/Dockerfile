# ================================
# 1. Build Stage
# ================================
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy project files
COPY . .

# Build production-ready Next.js app
RUN npm run build

# ================================
# 2. Run Stage
# ================================
FROM node:20-alpine AS runner

WORKDIR /app

# Copy only necessary output from build
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/next.config.js ./next.config.js

# Expose port
ENV PORT=3000
EXPOSE 3000

# Healthcheck
HEALTHCHECK CMD wget --no-verbose --tries=1 --spider http://localhost:3000 || exit 1

# Start Next.js in production mode
CMD ["npm", "start"]