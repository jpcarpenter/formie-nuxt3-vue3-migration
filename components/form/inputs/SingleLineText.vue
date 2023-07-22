<template>
  <div>
    <FieldLabel :id="getId()" :field="field" position="above-input" />

    <FieldInstructions :field="field" position="above-input" />

    <input
      v-bind="attrs"
      type="tel"
      autocomplete="phone"
      :value="value.value"
      class="block w-full mt-1 border-gray-300 shadow-sm focus:border-blue-100 sm:text-sm"
      @input="updateValue"
    />

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
    required: true,
  },
  value: {
    type: String,
    default: "",
  },
});

const { getId, attrs } = useFieldMixin(props);
const value = ref(props.value);

const updateValue = (event) => {
  value.value = event.target.value;
};
</script>
