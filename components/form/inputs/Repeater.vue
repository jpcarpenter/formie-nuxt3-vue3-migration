<template>
  <div>
    <IncludesFieldLabel :id="getId()" :field="field" position="above-input" />

    <IncludesFieldInstructions :field="field" position="above-input" />

    <fieldset
      v-for="(row, rIndex) in rows"
      :key="row.__id"
      class="relative p-4 mb-5 bg-gray-100 border border-gray-200"
    >
      <div v-for="(nestedField, fieldIndex) in field.fields" :key="fieldIndex">
        <component :is="nestedField.displayName" :field="nestedField" />
      </div>

      <button
        type="button"
        class="absolute top-0 right-0 p-1 -mt-3 -mr-3 text-sm font-light text-gray-700 transform rotate-45 bg-white border border-gray-300 rounded-full shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-100"
        @click.prevent="onDelete(rIndex)"
      >
        <svg
          class="w-5 h-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
    </fieldset>

    <button
      type="button"
      class="px-4 py-2 text-sm font-light text-gray-700 bg-white border border-gray-300 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-100"
      @click.prevent="onAdd"
    >
      Add row
    </button>

    <IncludesFieldInstructions :field="field" position="below-input" />

    <IncludesFieldLabel :id="getId()" :field="field" position="below-input" />
  </div>
</template>

<script setup>
import { uniqueId } from "lodash-es";

const props = defineProps({
  field: {
    type: Object,
    default: Object,
  },
});

const { getId } = useFieldMixin();
const rows = ref([]);

const onAdd = () => {
  rows.value.push({
    __id: uniqueId(),
  });
};

const onDelete = (rIndex) => {
  rows.value.splice(rIndex, 1);
};
</script>
