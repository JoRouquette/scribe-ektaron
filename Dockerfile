# --- Stage 1 : build TypeScript ---
FROM node:20-alpine AS builder

WORKDIR /app

# Installer les deps (dev + prod)
COPY package*.json ./
RUN npm ci

# Copier la config et les sources
COPY tsconfig.json ./
COPY tsconfig.build.json ./
COPY src ./src

# Build TypeScript -> dist/
RUN npm run build


# --- Stage 2 : image runtime minimaliste ---
FROM node:20-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production

# Installer uniquement les deps de prod
COPY package*.json ./
RUN npm ci --omit=dev

# Copier le build compilé
COPY --from=builder /app/dist ./dist

# Port interne de l'app
ENV PORT=3000
EXPOSE 3000

# Pas de .env dans l'image : on passe tout via variables d'environnement
CMD ["node", "dist/main.js"]
