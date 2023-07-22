<template>
  <div>
    <FieldLabel :id="useId" :field="field" position="above-input" />

    <FieldInstructions :field="field" position="above-input" />

    <input
      v-bind="attrs"
      :min="field.min"
      :max="field.max"
      type="number"
      class="block w-full mt-1 border-gray-300 shadow-sm focus:border-blue-100 sm:text-sm"
    />

    <FieldInstructions :field="field" position="below-input" />

    <FieldLabel :id="getId" :field="field" position="below-input" />
  </div>
</template>

<script setup>
import FieldInstructions from "@/components/form/inputs/includes/FieldInstructions.vue";
import FieldLabel from "@/components/form/inputs/includes/FieldLabel.vue";

const props = defineProps({
  field: {
    type: Object,
    default: Object,
  },
});

const { attrs, getId } = useFieldMixin();
</script>
