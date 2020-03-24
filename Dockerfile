FROM node:12.16.1 as builder

ENV NODE_ENV development

RUN mkdir -p /usr/src/nuxt-app
WORKDIR /usr/src/nuxt-app

COPY . ./
RUN npm ci --no-progress

ENV NODE_ENV production

RUN npm run build && npm prune --production

# ---

FROM node:12.16.1-alpine

ENV NODE_ENV production

COPY --from=builder --chown=node:node /usr/src/nuxt-app /usr/src/nuxt-app

USER node
WORKDIR /usr/src/nuxt-app
EXPOSE 3000
ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

CMD ["npx", "nuxt", "start"]
