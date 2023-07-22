<template>
  <component :is="field.displayType" :field="field" />
</template>

<script setup>
import Checkboxes from "@/components/form/inputs/Checkboxes.vue";
import Dropdown from "@/components/form/inputs/Dropdown.vue";
import Radio from "@/components/form/inputs/Radio.vue";

const props = defineProps({
  field: {
    type: Object,
    default: () => ({}),
  },
});

const { suffix } = useFieldMixin(field);

const components = {
  Checkboxes,
  Dropdown,
  Radio,
};

onBeforeUpdate(() => {
  // Update the field options whenever the tags change
  field.options = field.tags.map((option) => ({
    label: option.title,
    value: option.id,
  }));
});
</script>
