# Stage 1: Building the models
FROM node:20-alpine AS models-builder

WORKDIR /app/models
COPY models/package.json models/yarn.lock ./
RUN yarn install --frozen-lockfile
COPY models/ ./
RUN yarn build

# Stage 2: Building the admin
FROM node:20-alpine AS builder

WORKDIR /app/admin
COPY nature_gift_admin/package.json nature_gift_admin/yarn.lock ./
COPY --from=models-builder /app/models/dist /app/models/dist
COPY --from=models-builder /app/models/package.json /app/models/package.json

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy admin source
COPY nature_gift_admin/ ./

# Build application
RUN yarn build

# Stage 3: Production image
FROM node:20-alpine AS runner

WORKDIR /app

# Copy built application
COPY --from=builder /app/admin/.next ./.next
COPY --from=builder /app/admin/node_modules ./node_modules
COPY --from=builder /app/admin/package.json ./package.json
COPY --from=builder /app/admin/public ./public
COPY --from=models-builder /app/models/dist /app/models/dist
COPY --from=models-builder /app/models/package.json /app/models/package.json

ENV NODE_ENV production
ENV PORT 3000

EXPOSE 3000

CMD ["yarn", "start"]