<template>
  <component :is="field.displayType" :field="field" />
</template>

<script setup>
const props = defineProps({
  field: {
    type: Object,
    default: Object,
  },
});
</script>
