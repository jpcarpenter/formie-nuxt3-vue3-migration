import type { NavigationGuard } from 'vue-router'
export type MiddlewareKey = string
declare module "/Users/jacobcarpenter/Documents/Resources/Dev/formie-nuxt3-vue3-migration/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    middleware?: MiddlewareKey | NavigationGuard | Array<MiddlewareKey | NavigationGuard>
  }
}