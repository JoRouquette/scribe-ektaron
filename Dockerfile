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
    API_PREFIX=/api \
    AUTHOR_NAME="Jonathan Rouquette" \
    REPO_URL=https://github.com/jonathanrouquette/scribe-ektaron

RUN apk --no-cache upgrade

WORKDIR /app/apps/backend
COPY --from=backend-builder /app/backend/package.json ./package.json
COPY --from=backend-builder /app/backend/package-lock.json ./package-lock.json
RUN npm ci --omit=dev --omit=optional --no-audit --no-fund \
    && npm cache clean --force

COPY --from=backend-builder /app/backend/dist ./dist

WORKDIR /app

COPY --from=frontend-builder /app/frontend/dist /app/ui-src
RUN set -eux; \
    mkdir -p ${UI_ROOT}; \
    if [ -d "/app/ui-src/publish-frontend/browser" ]; then \
    cp -r /app/ui-src/publish-frontend/browser/* ${UI_ROOT}; \
    elif [ -d "/app/ui-src/frontend/browser" ]; then \
    cp -r /app/ui-src/frontend/browser/* ${UI_ROOT}; \
    elif [ -f "/app/ui-src/index.html" ]; then \
    cp -r /app/ui-src/* ${UI_ROOT}; \
    else \
    echo "ERROR: Angular build not found (expected dist/<project>/browser). Contents of /app/ui-src:"; \
    ls -R /app/ui-src; \
    exit 1; \
    fi; \
    rm -rf /app/ui-src

RUN [ -f "/ui/index.html" ] || (echo "ERROR: /ui/index.html missing"; exit 1)


RUN addgroup -S nodegrp && adduser -S -D -h /app -G nodegrp nodeusr \
    && mkdir -p ${CONTENT_ROOT} \
    && chown -R nodeusr:nodegrp /app ${CONTENT_ROOT} ${UI_ROOT}
USER nodeusr


RUN find ${UI_ROOT} -type f -name "*.map" -delete || true \
    && rm -rf /usr/local/share/.cache /home/node/.npm /home/nodeusr/.npm /root/.npm || true \
    && rm -rf /usr/local/lib/node_modules/npm/{docs,doc,html,man} || true

EXPOSE 3000
CMD ["node", "apps/backend/dist/main.js"]
