FROM node:22-bookworm-slim

RUN apt-get update \
    && apt-get install -y --no-install-recommends ca-certificates \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /build

COPY package.json package-lock.json turbo.json ./
COPY apps/backend/package.json apps/backend/package.json
COPY apps/backend apps/backend

# Build and install runtime dependencies in one layer. Removing the build tree
# before the production install avoids keeping two Medusa dependency trees on
# Docker's constrained local/remote build disk.
RUN npm ci --no-audit --no-fund --cache /tmp/npm-cache \
    && STRIPE_SECRET_KEY=sk_test_build_only \
       STRIPE_WEBHOOK_SECRET=whsec_build_only \
       STRIPE_MODE=sandbox \
       npm --prefix apps/backend run build \
    && mv /build/apps/backend/.medusa/server /runtime \
    && cd / \
    && rm -rf /build /tmp/npm-cache \
    && cd /runtime \
    && npm install --omit=dev --no-audit --no-fund --legacy-peer-deps --cache /tmp/npm-cache \
    && rm -rf /tmp/npm-cache \
    && mv /runtime /server

WORKDIR /server
ENV NODE_ENV=production \
    HOST=0.0.0.0 \
    PORT=9000

COPY container-entrypoint.sh /usr/local/bin/container-entrypoint
RUN chmod +x /usr/local/bin/container-entrypoint

EXPOSE 9000
ENTRYPOINT ["container-entrypoint"]
