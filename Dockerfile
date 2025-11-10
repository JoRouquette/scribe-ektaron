# ---------- FRONTEND BUILD ----------
FROM node:20.19.0-alpine3.20 AS frontend-builder
WORKDIR /app/frontend
COPY apps/frontend/package.json apps/frontend/package-lock.json ./
RUN npm ci --no-audit --no-fund
COPY apps/frontend/ ./
# Build Angular (Angular 18/20 → dist/<project>/browser)
RUN npm run build

# ---------- BACKEND BUILD ----------
FROM node:20.19.0-alpine3.20 AS backend-builder
WORKDIR /app/backend
COPY apps/backend/package.json apps/backend/package-lock.json ./
RUN npm ci --no-audit --no-fund
COPY apps/backend/ ./
# Transpile TypeScript → dist
RUN npm run build

# ---------- RUNTIME (UN SEUL PROCESS) ----------
FROM node:20.19.0-alpine3.20 AS runtime
ENV NODE_ENV=production \
    PORT=3000 \
    CONTENT_ROOT=/content \
    UI_ROOT=/ui \
    API_PREFIX=/api

# 0) Patch sécurité base (réduit les vulnérabilités high/critical)
RUN apk --no-cache upgrade

# 1) Backend runtime deps (en root pour éviter EACCES), puis purge cache
WORKDIR /app/apps/backend
COPY --from=backend-builder /app/backend/package.json ./package.json
COPY --from=backend-builder /app/backend/package-lock.json ./package-lock.json
RUN npm ci --omit=dev --omit=optional --no-audit --no-fund \
    && npm cache clean --force

# 2) Code backend compilé
COPY --from=backend-builder /app/backend/dist ./dist

# 3) Frontend compilé → /ui (détecte le bon sous-dossier de dist)
WORKDIR /app
# On copie TOUTE la dist pour décider ensuite du bon chemin
COPY --from=frontend-builder /app/frontend/dist /app/ui-src
RUN set -eux; \
    mkdir -p /ui; \
    if [ -d "/app/ui-src/publish-frontend/browser" ]; then \
    cp -r /app/ui-src/publish-frontend/browser/* /ui/; \
    elif [ -d "/app/ui-src/frontend/browser" ]; then \
    cp -r /app/ui-src/frontend/browser/* /ui/; \
    elif [ -f "/app/ui-src/index.html" ]; then \
    cp -r /app/ui-src/* /ui/; \
    else \
    echo "ERROR: Angular build not found (expected dist/<project>/browser). Contents of /app/ui-src:"; \
    ls -R /app/ui-src; \
    exit 1; \
    fi; \
    rm -rf /app/ui-src
# Fail-fast si index.html manquant
RUN [ -f "/ui/index.html" ] || (echo "ERROR: /ui/index.html missing"; exit 1)

# 4) Utilisateur non-root + permissions propres
RUN addgroup -S nodegrp && adduser -S -D -h /app -G nodegrp nodeusr \
    && mkdir -p /content \
    && chown -R nodeusr:nodegrp /app /content /ui
USER nodeusr

# 5) CLEANUP — réduire surface d’attaque et taille
RUN find /ui -type f -name "*.map" -delete || true \
    && rm -rf /usr/local/share/.cache /home/node/.npm /home/nodeusr/.npm /root/.npm || true \
    && rm -rf /usr/local/lib/node_modules/npm/{docs,doc,html,man} || true

EXPOSE 3000
CMD ["node", "apps/backend/dist/main.js"]
