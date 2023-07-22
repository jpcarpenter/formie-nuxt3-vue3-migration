import { ComputedRef, Ref } from 'vue'
export type LayoutKey = string
declare module "/Users/jacobcarpenter/Documents/Resources/Dev/formie-nuxt3-vue3-migration/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    layout?: false | LayoutKey | Ref<LayoutKey> | ComputedRef<LayoutKey>
  }
}