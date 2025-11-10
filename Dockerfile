# ---------- FRONTEND BUILD ----------
FROM node:20-alpine AS frontend-builder
WORKDIR /app/frontend
COPY apps/frontend/package.json apps/frontend/package-lock.json ./
RUN npm ci --no-audit --no-fund
COPY apps/frontend/ ./
# Build Angular en prod (base-href racine)
RUN npm run build

# ---------- BACKEND BUILD ----------
FROM node:20-alpine AS backend-builder
WORKDIR /app/backend
COPY apps/backend/package.json apps/backend/package-lock.json ./
RUN npm ci --no-audit --no-fund
COPY apps/backend/ ./
# Transpile TypeScript → dist
RUN npm run build

# ---------- RUNTIME (UN SEUL PROCESS) ----------
FROM node:20-alpine AS runtime
ENV NODE_ENV=production \
    PORT=3000 \
    CONTENT_ROOT=/content \
    UI_ROOT=/ui \
    API_PREFIX=/api
# Crée les répertoires
WORKDIR /app
RUN addgroup -S nodegrp && adduser -S nodeusr -G nodegrp
# Backend runtime deps
COPY --from=backend-builder /app/backend/package.json ./apps/backend/package.json
COPY --from=backend-builder /app/backend/package-lock.json ./apps/backend/package-lock.json
WORKDIR /app/apps/backend
RUN npm ci --omit=dev --no-audit --no-fund
# Copie du backend build
COPY --from=backend-builder /app/backend/dist ./dist
# Copie du frontend build
WORKDIR /app
COPY --from=frontend-builder /app/frontend/dist/ /ui/
# Crée le volume de contenu (sera monté par docker-compose)
RUN mkdir -p /content && chown -R nodeusr:nodegrp /content /ui /app
USER nodeusr
EXPOSE 3000
# Lancement du backend (qui sert aussi /ui et /content en statique)
CMD ["node", "apps/backend/dist/main.js"]
