<template>
  <fieldset :aria-labelledby="getId()">
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
          :id="getId([index])"
          :name="getName([option.value])"
          :value="option.value"
          :required="field.required"
          type="checkbox"
          class="w-4 h-4 text-blue-100 border-gray-300 rounded focus:ring-blue-100"
        />

        <label :for="getId([index])" class="block ml-3 text-sm text-gray-500">
          {{ option.label }}
        </label>
      </div>
    </div>

    <IncludesFieldInstructions :field="field" position="fieldset-end" />
  </fieldset>
</template>

<script setup>
const props = defineProps({
  field: {
    type: Object,
    default: Object,
  },
});

const { getId, getName } = useFieldMixin(props);
</script>
