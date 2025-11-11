FROM node:22-alpine

RUN npm install -g pnpm@9.0.0

WORKDIR /app

COPY package.json pnpm-workspace.yaml pnpm-lock.yaml ./

COPY packages/ ./packages/

COPY apps/be/ ./apps/be/

# Install dependencies
RUN pnpm install --frozen-lockfile

# Build the BE app
RUN pnpm --filter be build

# Build arguments (can be passed during build)
ARG DATABASE_URL
ARG PORT=8080
ARG NODE_ENV=production

# Set as environment variables
ENV DATABASE_URL=$DATABASE_URL
ENV PORT=$PORT
ENV NODE_ENV=$NODE_ENV

EXPOSE 8080

# Start the application
WORKDIR /app/apps/be
CMD ["node", "dist/index.js"]