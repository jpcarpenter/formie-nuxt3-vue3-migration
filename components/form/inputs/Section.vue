<template>
  <hr
    :style="[
      field.borderStyle ? `border-top-style: ${field.borderStyle}` : null,
      field.borderWidth ? `border-top-width: ${field.borderWidth}px` : null,
      field.borderColor ? `border-top-color: ${field.borderColor}` : null,
    ]"
  />
</template>

<script setup>
// Define the props used in the component
const props = defineProps({
  field: {
    type: Object,
    required: true,
  },
});
</script>
