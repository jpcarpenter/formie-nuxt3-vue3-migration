<template>
  <div>
    <IncludesFieldLabel :id="useId()" :field="field" position="above-input" />

    <IncludesFieldInstructions :field="field" position="above-input" />

    <select
      :id="useId()"
      :name="useName()"
      :multiple="field.multiple"
      :required="field.required"
      class="block w-full py-2 pl-3 pr-10 mt-1 text-base border-gray-300 focus:outline-none focus:border-blue-100 sm:text-sm"
    >
      <option
        v-for="(option, index) in field.options"
        :key="index"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>

    <IncludesFieldInstructions :field="field" position="below-input" />

    <IncludesFieldLabel :id="useId()" :field="field" position="below-input" />
  </div>
</template>

<script setup>
const { field, useId, useName } = useFieldMixin();
</script>
