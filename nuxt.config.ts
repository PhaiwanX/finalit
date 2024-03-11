export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    head: {
      title: 'แผนกเทคโนโลยีสารสนเทศ - วิทยาลัยเทคนิคชัยภูมิ',
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
    }
  },
  nitro: {
    plugins: ["~/server/index.ts"],
  },
  plugins: [
  ],
  css: [
    '@/assets/css/global.css',
    '@fortawesome/fontawesome-free/css/all.css'
    // '@fortawesome/rfontawesome-svg-core/styles.css'
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/google-fonts",
    '@pinia/nuxt',
    'usebootstrap',
  ],
  googleFonts: {
    families: {
      Kanit: true,
    }
  },
  runtimeConfig: {
    mongoUrl: process.env.MONGO_URL,
    secret: process.env.SECRET_KEY,
  },

})