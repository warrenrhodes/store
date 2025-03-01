

# Stage 1: Building the admin
FROM node:20-alpine AS builder-admin

# Add build dependencies
RUN apk add --no-cache libc6-compat

WORKDIR /app/admin

# Install dependencies first (better layer caching)
COPY nature_gift_admin/package.json nature_gift_admin/package-lock.json ./
RUN npm ci --legacy-peer-deps

# Copy source with proper .dockerignore
COPY nature_gift_admin/ ./

# Set production environment for build
ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_ENV production
ENV NEXT_BUILD_TIME=true

ARG NEXT_PUBLIC_ADMIN_DASHBOARD_URL
ARG NEXT_PUBLIC_ADMIN_EMAIL
ARG NEXT_PUBLIC_ADMIN_PHONE_NUMBER
ARG NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
ARG NEXT_PUBLIC_ECOMMERCE_STORE_URL
ARG NEXT_PUBLIC_NOTIFICATIONAPI_CLIENT_ID
ARG NEXT_PUBLIC_NOTIFICATIONAPI_CLIENT_SECRET
ARG NEXT_PUBLIC_RICH_TEXT_VERSION
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
FROM node:20-alpine AS runner-admin

WORKDIR /app

# Add runtime dependencies
RUN apk add --no-cache libc6-compat

# Set production environment
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1
ENV PORT 3000

# Copy only necessary files
COPY --from=builder-admin /app/admin/public ./public
COPY --from=builder-admin /app/admin/.next/standalone ./
COPY --from=builder-admin /app/admin/.next/static ./.next/static

EXPOSE 3000

# Use standalone server
CMD ["node", "server.js"]
