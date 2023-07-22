<template>
  <div>
    <template v-if="field.useMultipleFields">
      <fieldset :aria-labelledby="getId()" class="-mb-5">
        <legend class="block mb-1 text-sm font-light text-gray-700">
          {{ field.label }}
        </legend>

        <IncludesFieldInstructions :field="field" position="fieldset-start" />

        <div
          v-for="(fields, i) in getSubFields()"
          :key="i"
          class="flex flex-wrap -mx-2"
        >
          <div
            v-for="(subField, index) in fields"
            :key="index"
            class="flex-1 px-2 mb-5"
          >
            <IncludesFieldLabel
              :id="getId([index])"
              :field="subField"
              position="above-input"
            />

            <div v-if="index === 'prefix'">
              <select
                :id="getId([index])"
                :name="useName([index])"
                :autocomplete="autocomplete[index]"
                class="block w-full py-2 pl-3 pr-10 mt-1 text-base border-gray-300 focus:outline-none focus:border-blue-100 sm:text-sm"
              >
                <option
                  v-for="(option, j) in subField.options"
                  :key="j"
                  :value="option.value"
                >
                  {{ option.label }}
                </option>
              </select>
            </div>

            <div v-else>
              <input
                v-bind="attrs(subField, [index])"
                :autocomplete="autocomplete[index]"
                type="text"
                class="block w-full mt-1 border-gray-300 shadow-sm focus:border-blue-100 sm:text-sm"
              />
            </div>

            <IncludesFieldLabel
              :id="useId([index])"
              :field="subField"
              position="below-input"
            />
          </div>
        </div>
      </fieldset>
    </template>

    <template v-else>
      <IncludesFieldLabel :id="getId()" :field="field" position="above-input" />

      <IncludesFieldInstructions :field="field" position="above-input" />

      <input
        v-bind="attrs()"
        type="text"
        class="block w-full mt-1 border-gray-300 shadow-sm focus:border-blue-100 sm:text-sm"
      />

      <IncludesFieldInstructions :field="field" position="below-input" />

      <IncludesFieldLabel :id="getId()" :field="field" position="below-input" />
    </template>
  </div>
</template>

<script setup>
const props = defineProps({
  field: {
    type: Object,
    default: Object,
  },
});

const subFields = ref([["prefix", "firstName", "middleName", "lastName"]]);

const { getId, attrs, getSubFields } = useFieldMixin(props, subFields);

const autocomplete = ref({
  prefix: "honorific-prefix",
  firstName: "given-name",
  middleName: "additional-name",
  lastName: "family-name",
});
</script>
