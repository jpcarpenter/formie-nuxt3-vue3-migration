// Everything in this file has been stripped down to only have the requirements of how forms are implemented.

export default defineNuxtConfig({
  devtools: { enabled: true },
  nitro: {
    prerender: {
      crawlLinks: true,
      ignore: ["/live-preview", "/live-preview/**"],
    },
    routeRules: {
      "/live-preview": { ssr: false },
      "/live-preview/**": { ssr: false },
    },
  },

  modules: ["@nuxtjs/tailwindcss", "@vueuse/nuxt"],

  tailwindcss: {
    viewer: false,
  },

  components: {
    dirs: [
      // IMPORTANT: You need to make your input components global in order to
      // be able to dynamically use them without having to manually import them.
      {
        path: "~/components/form/inputs",
        global: true,
      },
      "~/components",
    ],
  },

  runtimeConfig: {
    public: {
      craftUrl: process.env.API_BASE_URL + "/graphql" || "",
      gqlToken: process.env.GQL_TOKEN || "",
      livePreviewParam: "has-live-preview",
    },
  },
});
