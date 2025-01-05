# Stage 1: Building the store
FROM node:20-alpine AS builder-store

# Add build dependencies
RUN apk add --no-cache libc6-compat

WORKDIR /app/store

# Install dependencies first (better layer caching)
COPY nature_gift_store/package.json nature_gift_store/package-lock.json ./
RUN npm ci --legacy-peer-deps

# Copy source with proper .dockerignore
COPY nature_gift_store/ ./

# Set production environment for build
ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_ENV production
ENV NEXT_BUILD_TIME=true

ARG DATABASE_URL
ARG CLERK_SECRET_KEY
ARG CLERK_ENCRYPTION_KEY
ARG NEXT_PUBLIC_CLERK_DOMAIN
ARG NEXT_PUBLIC_NOTIFICATIONAPI_CLIENT_ID
ARG NEXT_PUBLIC_NOTIFICATIONAPI_CLIENT_SECRET
ARG NEXT_PUBLIC_ADMIN_DASHBOARD_URL
ARG NEXT_PUBLIC_ADMIN_EMAIL
ARG NEXT_PUBLIC_ADMIN_PHONE_NUMBER
ARG NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL
ARG NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL
ARG NEXT_PUBLIC_CLERK_DOMAIN
ARG NEXT_PUBLIC_CLERK_PROXY_URL
ARG NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
ARG NEXT_PUBLIC_CLERK_SIGN_IN_URL
ARG NEXT_PUBLIC_CLERK_SIGN_UP_URL
ARG NEXT_PUBLIC_ECOMMERCE_STORE_URL
ARG NEXT_PUBLIC_NOTIFICATIONAPI_CLIENT_ID
ARG NEXT_PUBLIC_NOTIFICATIONAPI_CLIENT_SECRET
ARG NEXT_PUBLIC_FACEBOOK_PIXEL_ID


RUN npm run prisma:generate

# Build application with error handling
RUN npm run build

# Stage 2: Production image
FROM node:20-alpine AS runner-store

WORKDIR /app

# Add runtime dependencies
RUN apk add --no-cache libc6-compat

# Set production environment
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1
ENV PORT 3001

# Copy only necessary files
COPY --from=builder-store /app/store/public ./public
COPY --from=builder-store /app/store/.next/standalone ./
COPY --from=builder-store /app/store/.next/static ./.next/static

EXPOSE 3001

# Use standalone server
CMD ["node", "server.js"]