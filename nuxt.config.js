import colors from 'vuetify/es5/util/colors'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - examapp',
    title: 'examapp',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/font/style.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~plugins/toast.js' , mode: 'client' },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    
  ],
  router: {
    middleware: 'authenticated'
  },
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    "@nuxtjs/axios",
    '@nuxtjs/auth-next',
  ],
  axios: {
    baseURL: 'http://localhost:8000/api/'
  },
  auth: {
    watchLoggedIn: true,
    strategies: {
      'laravelJWT': {
        provider: 'laravel/jwt',
        url: 'http://localhost:8000/api/',
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
      login: '/dashboard',
      logout: '/login',
      home: '/',
    },
  },
  server: {
    host: 'localhost',
    port: 3000
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
