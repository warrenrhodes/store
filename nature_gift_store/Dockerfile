# Stage 1: Building the models
FROM node:20-alpine AS models-builder-store

WORKDIR /app/models
COPY models/package.json models/yarn.lock ./
RUN yarn install --frozen-lockfile
COPY models/ ./
RUN yarn build

# Stage 2: Building the store
FROM node:20-alpine AS builder-store

WORKDIR /app/store
COPY nature_gift_store/package.json nature_gift_store/yarn.lock ./
COPY --from=models-builder-store /app/models/dist /app/models/dist
COPY --from=models-builder-store /app/models/package.json /app/models/package.json

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy store source
COPY nature_gift_store/ ./

# Build application
RUN yarn build

# Stage 3: Production image
FROM node:20-alpine AS runner-store

WORKDIR /app

# Copy built application
COPY --from=builder-store /app/store/.next ./.next
COPY --from=builder-store /app/store/node_modules ./node_modules
COPY --from=builder-store /app/store/package.json ./package.json
COPY --from=builder-store /app/store/public ./public
COPY --from=models-builder-store /app/models/dist /app/models/dist
COPY --from=models-builder-store /app/models/package.json /app/models/package.json

ENV NODE_ENV production
ENV PORT 3001

EXPOSE 3001

CMD ["yarn", "start"]