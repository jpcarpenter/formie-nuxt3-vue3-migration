<template>
  <div>
    <IncludesFieldLabel :id="getId()" :field="field" position="above-input" />

    <IncludesFieldInstructions :field="field" position="above-input" />

    <textarea
      v-bind="attrs()"
      rows="3"
      class="block w-full border border-gray-300 shadow-sm focus:border-blue-100 sm:text-sm"
    ></textarea>

    <IncludesFieldInstructions :field="field" position="below-input" />

    <IncludesFieldLabel :id="getId()" :field="field" position="below-input" />
  </div>
</template>

<script setup>
const props = defineProps({
  field: {
    type: Object,
    default: Object,
  },
});

const { getId, attrs } = useFieldMixin(props);
</script>
