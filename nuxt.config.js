import colors from 'vuetify/es5/util/colors'
import redirectSSL from 'redirect-ssl'
export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - دکترشو',
    title: 'سامانه آزمون',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'سامانه آزمون آکادمی کنکور دکترشو' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },


  serverMiddleware: [
    redirectSSL.create({ redirectHost: "exam.drsho1.ir", enabled: process.env.NODE_ENV === 'production' }),

  
  ],
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/font/style.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~plugins/toast.js', mode: 'client' },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',


  ],
  router: {
    

  },

  manifest: {
    icon: {
      iconSrc: '/app.png',
    },
    short_name: 'دکترشو',
    name: 'سامانه آزمون دکترشو',

    descreption: 'سامانه آزمون',
    start_url: '/',
    theme_color: '#fff',
    background_color: '#000',
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    "@nuxtjs/pwa",
    "@nuxtjs/axios",
    '@nuxtjs/auth-next',
    'nuxt-mobile',
  ],
  axios: {
    baseURL: 'https://api.drsho1.ir/api/'
  },
  auth: {
    watchLoggedIn: true,
    strategies: {
      'laravelJWT': {
        provider: 'laravel/jwt',
        url: 'https://api.drsho1.ir/api/',
        endpoints: {
          login: {
            url: 'login',
            method: 'post',
            propertyName: 'success',
          },
          user: {
            url: 'user',
            method: 'get',
          },
          logout: {
            url: 'logout',
            method: 'get',
            propertyName: 'success',

          },
          refresh: {
            url: 'refresh',
            method: 'post',
          },
        },

        token: {
          property: 'token',
          maxAge: 360 * 60
        },
        refreshToken: {
          maxAge: 20160 * 60
        }
      }
    }, redirect: {
      login: '/panel',
      logout: '/',
      home: '/',
    },
  },


  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {

  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },
  server: {
    port: 5298
  }
}
