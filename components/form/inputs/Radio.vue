<template>
  <fieldset :aria-labelledby="useId()">
    <legend class="block mb-1 text-sm font-light text-gray-500">
      {{ field.label }}
      <span v-if="field.required" class="text-red-500">*</span>
    </legend>

    <IncludesFieldInstructions :field="field" position="fieldset-start" />

    <div class="mt-2 space-y-4">
      <div
        v-for="(option, index) in field.options"
        :key="index"
        class="flex items-center bg-white border border-gray-300"
      >
        <div class="p-6 border-r border-gray-300">
          <input
            :id="useId([index])"
            :name="useName()"
            :value="option.value"
            :required="field.required"
            type="radio"
            class="w-6 h-6 border border-gray-300 rounded-full cursor-pointer text-green-meta focus:ring-0"
          />
        </div>
        <div class="p-6">
          <label
            :for="useId([index])"
            class="block ml-3 text-sm text-gray-500 cursor-pointer"
          >
            {{ option.label }}
          </label>
        </div>
      </div>
    </div>

    <IncludesFieldInstructions :field="field" position="fieldset-end" />
  </fieldset>
</template>

<script setup>
const { field, useId, useName } = useFieldMixin();
</script>
