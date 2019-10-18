FROM node:12.8.0
RUN mkdir -p /usr/src/nuxt-app
WORKDIR /usr/src/nuxt-app

EXPOSE 3000
ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

COPY node_modules ./node_modules
COPY infrastructure/Sitemap.js infrastructure/Canonical.js ./infrastructure/
COPY nuxt.config.js package.json .env ./
COPY static ./static
COPY .nuxt ./.nuxt

CMD [ "npm", "run", "serve" ]
