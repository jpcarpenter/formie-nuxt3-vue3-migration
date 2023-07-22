<template>
  <div
    v-if="canInclude"
    v-show="canShow"
    class="flex-1 w-full px-4 mb-5"
    v-bind="attrs"
  >
    <component :is="field.displayName" :field="field" />
  </div>
</template>

<script setup>
const props = defineProps({
  field: {
    type: Object,
    default: () => ({}),
  },
});

const { displayName, visibility, cssClasses, containerAttributes } = toRefs(
  props.field
);

const canInclude = visibility !== "disabled";

const canShow = computed(
  () => visibility !== "hidden" && displayName !== "Hidden"
);

const attrs = computed(() => ({
  class: cssClasses,
  ...useAttributesTable(containerAttributes),
}));
</script>
