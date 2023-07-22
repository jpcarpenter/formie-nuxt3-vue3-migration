<template>
  <div>
    <FieldInstructions :field="field.value" position="above-input" />

    <div class="mt-2 bg-white border border-gray-300">
      <input
        type="hidden"
        aria-checked="false"
        aria-hidden="true"
        :name="useName()"
        value=""
      />

      <div class="flex items-center">
        <div class="p-6 border-r border-gray-300">
          <input
            :id="manualId ? manualId : useId()"
            :name="useName()"
            value="1"
            type="checkbox"
            :required="field.value.required"
            class="w-6 h-6 border border-gray-300 rounded-full cursor-pointer text-green-meta focus:ring-0"
            @click="$emit('inputClicked', $event.target.checked)"
          />
        </div>
        <div class="px-6">
          <label
            :for="manualId ? manualId : useId()"
            class="block text-sm font-light text-gray-500 cursor-pointer"
          >
            {{ fieldLabel }}<br />
            <!-- eslint-disable -->
            <span v-html="field.value.descriptionHtml"></span>
            <!-- eslint-enable -->
          </label>
        </div>
      </div>
    </div>

    <FieldInstructions :field="field.value" position="below-input" />

    <FieldLabel :id="useId()" :field="field.value" position="below-input" />
  </div>
</template>

<script setup>
const manualId = ref(null);
const { useId, useName } = useFieldMixin();

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

const fieldLabel = computed(() => {
  return field.value.label ?? field.value.descriptionHtml;
});

const emit = defineEmits(["inputClicked"]);
</script>
