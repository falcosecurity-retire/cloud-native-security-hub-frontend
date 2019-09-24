FROM node:12.8.0
RUN mkdir -p /usr/src/nuxt-app
WORKDIR /usr/src/nuxt-app

EXPOSE 3000
ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

COPY static ./static
COPY package.json ./
COPY node_modules ./node_modules
COPY .nuxt ./.nuxt

CMD [ "npm", "run", "serve" ]
