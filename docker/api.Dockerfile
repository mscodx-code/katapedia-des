FROM node:24-alpine AS base

WORKDIR /app
RUN npm install -g pnpm@12.4.2

FROM base AS builder
COPY package.json pnpm-lock.yaml* pnpm-workspace.yaml turbo.json ./
COPY packages/ ./packages/
COPY apps/api/ ./apps/api/

RUN pnpm install --frozen-lockfile || pnpm install
RUN pnpm --filter @katapedia/database generate
RUN pnpm --filter @katapedia/api build

FROM base AS migrate
WORKDIR /app
COPY --from=builder /app ./
CMD ["pnpm", "--filter", "@katapedia/database", "deploy"]

FROM node:24-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/package.json ./
COPY --from=builder /app/pnpm-workspace.yaml ./
COPY --from=builder /app/packages/ ./packages/
COPY --from=builder /app/apps/api/ ./apps/api/
COPY --from=builder /app/node_modules/ ./node_modules/

EXPOSE 4000
CMD ["node", "apps/api/dist/server.js"]
