<template>
  <fieldset :aria-labelledby="useId()">
    <legend class="block mb-1 text-sm font-light text-gray-500">
      {{ field.label }}
      <span v-if="field.required" class="text-red-500">*</span>
    </legend>

    <IncludesFieldInstructions :field="field" position="fieldset-start" />

    <div class="mt-2 space-y-2">
      <div
        v-for="(option, index) in field.options"
        :key="index"
        class="flex items-center"
      >
        <input
          :id="useId([index])"
          :name="useName([''])"
          :value="option.value"
          :required="field.required"
          type="checkbox"
          class="w-4 h-4 text-blue-100 border-gray-300 rounded focus:ring-blue-100"
        />

        <label :for="useId([index])" class="block ml-3 text-sm text-gray-500">
          {{ option.label }}
        </label>
      </div>
    </div>

    <IncludesFieldInstructions :field="field" position="fieldset-end" />
  </fieldset>
</template>

<script setup>
import FieldInstructions from "@/components/form/inputs/includes/FieldInstructions.vue";

const props = defineProps({
  form: {
    type: Object,
    default: Object,
  },

  field: {
    type: Object,
    default: Object,
  },
});

const { useId, useName } = useFieldMixin(props);
</script>
