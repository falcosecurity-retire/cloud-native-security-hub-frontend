FROM node:12.14 as builder

ENV NODE_ENV development

RUN mkdir -p /usr/src/nuxt-app
WORKDIR /usr/src/nuxt-app

COPY . ./
# RUN npm ci --no-progress Uncomment if we want to install modules with docker instead of using local ones

ENV NODE_ENV production

RUN npm run build && \
  npm prune --production
# ---
FROM node:12.14-alpine

ENV NODE_ENV production

COPY --from=builder --chown=node:node /usr/src/nuxt-app /usr/src/nuxt-app

USER node
WORKDIR /usr/src/nuxt-app
EXPOSE 3000
ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

CMD ["npx", "nuxt", "start"]
