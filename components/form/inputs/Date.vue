<template>
  <div>
    <IncludesFieldLabel :id="useId()" :field="field" position="above-input" />

    <IncludesFieldInstructions :field="field" position="above-input" />

    <input
      v-bind="attrs"
      type="date"
      class="block w-full mt-1 border-gray-300 shadow-sm focus:border-blue-100 sm:text-sm"
    />

    <IncludesFieldInstructions :field="field" position="below-input" />

    <IncludesFieldLabel :id="useId()" :field="field" position="below-input" />
  </div>
</template>

<script setup>
const { attrs, useId } = useFieldMixin();

const props = defineProps({
  field: {
    type: Object,
    default: Object,
  },
});
</script>
