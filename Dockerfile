FROM node:22-alpine AS build
RUN apk update && apk add build-base g++ cairo-dev pango-dev giflib-dev libjpeg-turbo-dev
WORKDIR /build
COPY . .
RUN npm ci && \
    npm run build && \
    npm run reset && \
    npm -w backend ci --omit=dev

FROM node:22-alpine AS sync-in
RUN addgroup -g 8888 syncin && \
    adduser -D -u 8888 -G syncin syncin && \
    apk update && \
    apk add cairo-dev pango-dev giflib-dev libjpeg-turbo-dev fontconfig ttf-liberation && \
    mkdir -p /app/data /app/environment && chown -R syncin:syncin /app
WORKDIR /app
COPY --from=build --chown=syncin:syncin build/LICENSE .
COPY --from=build --chown=syncin:syncin build/dist/ .
COPY --from=build --chown=syncin:syncin build/node_modules ./node_modules
COPY --from=build --chown=syncin:syncin build/backend/migrations ./migrations
COPY --from=build --chown=syncin:syncin build/environment/environment.dist.yaml ./environment/environment.dist.yaml
COPY --from=build --chown=syncin:syncin build/scripts/sync-in-server.sh ./sync-in-server.sh
ENV NODE_ENV=production
ENV NPM_CONFIG_UPDATE_NOTIFIER=false
EXPOSE 3000
USER syncin
ENTRYPOINT ["/bin/sh", "sync-in-server.sh"]