<template>
  <component :is="field.headingSize" :class="field.headingSize">{{
    field.name
  }}</component>
</template>

<script setup>
// Define the props used in the component
const props = defineProps({
  field: {
    type: Object,
    required: true,
  },
});

// import useFieldMixin from '@/composables/useFieldMixin'

// const { field } = useFieldMixin()
</script>
