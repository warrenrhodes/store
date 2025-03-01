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
ENV AUTH_COOKIE_SIGNATURE_KEY_CURRENT "jZKw4KiEb95Hl3UtFmCr543rXrU7ngoO"
ENV AUTH_COOKIE_SIGNATURE_KEY_PREVIOUS "vWZ6CsOl386zYn6FfFPz0VsawNPRlZpd"

ARG DATABASE_URL
ARG CLERK_SECRET_KEY
ARG CLERK_ENCRYPTION_KEY
ARG NEXT_PUBLIC_CLERK_DOMAIN
ARG NEXT_PUBLIC_NOTIFICATIONAPI_CLIENT_ID
ARG NEXT_PUBLIC_NOTIFICATIONAPI_CLIENT_SECRET
ARG NEXT_PUBLIC_ADMIN_DASHBOARD_URL
ARG NEXT_PUBLIC_ADMIN_EMAIL
ARG NEXT_PUBLIC_ADMIN_PHONE_NUMBER
ARG NEXT_PUBLIC_ECOMMERCE_STORE_URL
ARG NEXT_PUBLIC_NOTIFICATIONAPI_CLIENT_ID
ARG NEXT_PUBLIC_NOTIFICATIONAPI_CLIENT_SECRET
ARG NEXT_PUBLIC_FACEBOOK_PIXEL_ID
ARG NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID
ARG NEXT_PUBLIC_FIREBASE_PROJECT_ID
ARG FIREBASE_CLIENT_EMAIL
ARG FIREBASE_PRIVATE_KEY
ARG NEXT_PUBLIC_FIREBASE_API_KEY
ARG NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
ARG NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
ARG NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
ARG NEXT_PUBLIC_FIREBASE_APP_ID


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