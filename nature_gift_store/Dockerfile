# Stage 1: Building the store
FROM node:20-alpine AS builder-store

WORKDIR /app/store
COPY nature_gift_store/package.json nature_gift_store/package-lock.json ./

# Install dependencies
RUN npm ci --legacy-peer-deps

# Copy store source
COPY nature_gift_store/ ./

# Build application
RUN npm run build

# Stage 2: Production image
FROM node:20-alpine AS runner-store

WORKDIR /app

# Copy built application
COPY --from=builder-store /app/store/.next ./.next
COPY --from=builder-store /app/store/node_modules ./node_modules
COPY --from=builder-store /app/store/package.json ./package.json
COPY --from=builder-store /app/store/public ./public

ENV NODE_ENV production
ENV PORT 3001

EXPOSE 3001

CMD ["npm", "start"]