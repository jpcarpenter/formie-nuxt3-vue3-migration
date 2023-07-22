<template>
  <div>
    <IncludesFieldLabel
      :id="useId()"
      :field="field.value"
      position="above-input"
    />

    <IncludesFieldInstructions :field="field.value" position="above-input" />

    <!-- eslint-disable -->
    <div v-html="field.value.htmlContent"></div>
    <!-- eslint-enable -->

    <IncludesFieldInstructions :field="field.value" position="below-input" />

    <IncludesFieldLabel
      :id="getId()"
      :field="field.value"
      position="below-input"
    />
  </div>
</template>

<script setup>
// import useFieldMixin from "@/composables/useFieldMixin";

const { getId } = useFieldMixin();

// Define the props used in the component
const props = defineProps({
  field: {
    type: Object,
    required: true,
  },
});
</script>
