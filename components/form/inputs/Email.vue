<template>
  <div>
    <IncludesFieldLabel :id="getId()" :field="field" position="above-input" />

    <IncludesFieldInstructions :field="field" position="above-input" />

    <input
      v-bind="attrs()"
      :min="field.min"
      :max="field.max"
      type="email"
      autocomplete="email"
      class="block w-full mt-1 border-gray-300 shadow-sm focus:border-blue-100 sm:text-sm"
    />

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
