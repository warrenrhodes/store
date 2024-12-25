# Stage 1: Building the admin
FROM node:20-alpine AS builder-admin

WORKDIR /app/admin
COPY nature_gift_admin/package.json nature_gift_admin/package-lock.json ./

# Install dependencies
RUN npm ci --legacy-peer-deps

# Copy admin source
COPY nature_gift_admin/ ./

# Build application
RUN npm run build

# Stage 2: Production image
FROM node:20-alpine AS runner-admin

WORKDIR /app

# Copy built application
COPY --from=builder-admin /app/admin/.next ./.next
COPY --from=builder-admin /app/admin/node_modules ./node_modules
COPY --from=builder-admin /app/admin/package.json ./package.json
COPY --from=builder-admin /app/admin/public ./public

ENV NODE_ENV production
ENV PORT 3000

EXPOSE 3000

CMD ["npm", "start"]