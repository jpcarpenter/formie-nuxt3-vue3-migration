<template>
  <input v-bind="attrs" type="hidden" :value="field.defaultValue" />
</template>

<script setup>
// import useFieldMixin from '@/composables/useFieldMixin'

const { attrs } = useFieldMixin();

// Define the props used in the component
const props = defineProps({
  field: {
    type: Object,
    required: true,
  },
});
</script>
