import tailwindcss from "@tailwindcss/vite";


// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      title: 'Happy Folke Gardens', // default fallback title
      htmlAttrs: {
        lang: 'en',
      },
    },
  },
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  modules: ['@nuxt/fonts', '@nuxt/image', '@vueuse/nuxt', 'motion-v/nuxt', '@nuxtjs/sanity'],
  sanity: {
    projectId: 'pw4670k6',
    useCdn: false,
  },
  
  image: {
    sanity: {
      projectId: 'pw4670k6',
      dataset: 'production',
    }
  },
  css: ['./app/assets/css/main.css'],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
})