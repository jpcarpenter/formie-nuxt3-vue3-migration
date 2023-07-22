<template>
  <div>
    <IncludesFieldLabel :id="getId()" :field="field" position="above-input" />

    <IncludesFieldInstructions :field="field" position="above-input" />

    <input
      v-bind="attrs()"
      type="tel"
      autocomplete="phone"
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
  value: {
    type: String,
    default: String,
  },
});

const { getId, attrs } = useFieldMixin(props);
</script>
