<template>
  <fieldset :aria-labelledby="getId()" class="-mb-5">
    <legend class="block mb-1 text-sm font-light text-gray-900">
      {{ field.label }}
    </legend>

    <IncludesFieldInstructions :field="field" position="fieldset-start" />

    <div v-for="(fields, i) in subFields" :key="i" class="flex flex-wrap -mx-2">
      <div
        v-for="(subField, index) in fields"
        :key="index"
        class="flex-1 px-2 mb-5"
      >
        <IncludesFieldLabel
          :id="getId([index])"
          :field="subField"
          :is-subfield="true"
          position="above-input"
        />
        <div v-if="index === 'country'">
          <select
            :id="getId([index])"
            :name="getName([index])"
            :autocomplete="autocomplete[index]"
            class="block w-full py-2 pl-3 pr-10 mt-1 text-base border-gray-300 focus:outline-none focus:ring-blue-100 focus:border-blue-100 sm:text-sm"
          >
            <option
              v-for="(option, j) in subField.options"
              :key="j"
              :selected="subField.defaultValue === option.value"
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
          :id="getId([index])"
          :field="subField"
          :is-subfield="true"
          position="below-input"
        />
      </div>
    </div>
  </fieldset>
</template>

<script setup>
const props = defineProps({
  field: {
    type: Object,
    default: Object,
  },
});

const { getId, getName, attrs } = useFieldMixin(props);

const subFields = ref([
  ["address1"],
  ["address2"],
  ["address3"],
  ["city", "zip"],
  ["state", "country"],
]);

const autocomplete = ref({
  address1: "address-line1",
  address2: "address-line2",
  address3: "address-line3",
  city: "address-level2",
  zip: "postal-code",
  state: "address-level1",
  country: "country",
});
</script>
