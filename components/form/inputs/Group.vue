<template>
  <div>
    <FieldLabel :id="getId()" :field="field" position="above-input" />

    <FieldInstructions :field="field" position="above-input" />

    <fieldset class="relative p-4 space-y-6">
      <div v-for="(nestedField, fieldIndex) in field.fields" :key="fieldIndex">
        <component :is="nestedField.displayName" :field="nestedField" />
      </div>
    </fieldset>

    <FieldInstructions :field="field" position="below-input" />

    <FieldLabel :id="getId()" :field="field" position="below-input" />
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

const { getId } = useFieldMixin(props);
</script>
