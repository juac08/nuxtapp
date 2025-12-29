export default defineNuxtConfig({
  compatibilityDate: "2025-12-29",

  // Global app configuration
  app: {
    head: {
      title: "Task Manager",
      htmlAttrs: {
        lang: "en",
      },
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "description", content: "" },
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
    pageTransition: {
      name: "fade",
      mode: "out-in",
    },
  },

  // Global CSS
  css: ["~/assets/styles/main.css"],

  // Plugins
  plugins: [
    // { src: "~/plugins/vuex.js", mode: "client" }, // Replaced with Pinia
    // { src: "~/plugins/chart.js", mode: "client" } // Commented out - needs update for Nuxt 3/4
  ],

  // Auto import components
  components: true,

  // Modules
  modules: ["@pinia/nuxt"],

  // SSR configuration
  ssr: false,

  // Vite configuration
  vite: {
    build: {
      target: "esnext",
    },
  },
});
