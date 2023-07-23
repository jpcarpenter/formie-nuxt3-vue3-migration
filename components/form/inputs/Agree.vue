<template>
  <div>
    <IncludesFieldInstructions :field="field" position="above-input" />

    <div class="mt-2 bg-white border border-gray-300">
      <input
        type="hidden"
        aria-checked="false"
        aria-hidden="true"
        :name="getName()"
        value=""
      />

      <div class="flex items-center">
        <div class="p-6 border-r border-gray-300">
          <input
            :id="manualId ? manualId : getId()"
            :name="getName()"
            value="1"
            type="checkbox"
            :required="field.required"
            class="w-6 h-6 border border-gray-300 rounded-full cursor-pointer text-green-meta focus:ring-0"
            @click="$emit('inputClicked', $event.target.checked)"
          />
        </div>
        <div class="px-6">
          <label
            :for="manualId ? manualId : getId()"
            class="block text-sm font-light text-gray-500 cursor-pointer"
          >
            {{ fieldLabel }}<br />
            <!-- eslint-disable -->
            <span v-html="field.descriptionHtml"></span>
            <!-- eslint-enable -->
          </label>
        </div>
      </div>
    </div>

    <IncludesFieldInstructions :field="field" position="below-input" />

    <IncludesFieldLabel :id="getId()" :field="field" position="below-input" />
  </div>
</template>

<script setup>
const manualId = ref(null);
const { getId, getName } = useFieldMixin();

const props = defineProps({
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
