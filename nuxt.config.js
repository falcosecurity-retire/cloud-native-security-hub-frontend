import { getSitemapRoutes } from './infrastructure/Sitemap'
require('dotenv').config()

export default {
  mode: 'universal',
  head: {
    titleTemplate: '%s - ' + 'Cloud Native Security Hub',
    title: 'Cloud Native Security Hub',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Discover and share our awesome security tools' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  modern: 'server',
  loading: { color: '#007BFF' },
  css: ['./assets/scss/custom.scss'],
  googleAnalytics: {
    id: process.env.GOOGLE_ANALYTICS_ID
  },
  bootstrapVue: {
    bootstrapCSS: false,
    bootstrapVueCSS: false
  },
  serverMiddleware: [
    {
      path: '/health',
      handler: (req, res, next) => {
        res.setHeader('Content-Type', 'text/plain')
        res.end('PASS')
      }
    }
  ],
  pwa: {
    workbox: {
      offlineAnalytics: true,
      runtimeCaching: [
        {
          urlPattern: process.env.API_URL + '/.*',
          handler: 'staleWhileRevalidate',
          method: 'GET'
        },
        {
          urlPattern: 'https://fonts.googleapis.com/.*',
          handler: 'cacheFirst',
          method: 'GET',
          strategyOptions: { cacheableResponse: { statuses: [0, 200] } }
        },
        {
          urlPattern: 'https://fonts.gstatic.com/.*',
          handler: 'cacheFirst',
          method: 'GET',
          strategyOptions: { cacheableResponse: { statuses: [0, 200] } }
        },
        {
          urlPattern: '/.(?:png|gif|jpg|jpeg|webp|svg)$',
          handler: 'cacheFirst',
          method: 'GET',
          strategyOptions: {
            cacheName: 'images',
            cacheExpiration: {
              maxEntries: 60,
              maxAgeSeconds: 30 * 24 * 60 * 60 // 30 Days
            }
          }
        }
      ]
    }
  },
  webfontloader: {
    custom: {
      families: [
        'Noto Sans',
        'Fjalla One'
      ],
      urls: [
        'https://fonts.googleapis.com/css?family=Open+Sans&display=swap',
        'https://fonts.googleapis.com/css?family=Roboto&display=swap'
      ]
    }
  },
  plugins: [
    '~/plugins/services.js'
  ],
  buildModules: [
    '@nuxtjs/eslint-module'
  ],
  modules: [
    'bootstrap-vue/nuxt',
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    ['@nuxtjs/dotenv', { systemvars: true }],
    '@nuxtjs/sitemap',
    'nuxt-webfontloader'
  ],
  sitemap: {
    hostname: '',
    path: '/sitemap.xml',
    gzip: true,
    routes () {
      return getSitemapRoutes()
    },
    generate: false
  },
  build: {
    extend (config, ctx) {
    }
  }
}
