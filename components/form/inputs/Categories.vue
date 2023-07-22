<template>
  <component :is="field.value.displayType" :field="field.value" />
</template>

<script setup>
import Checkboxes from "@/components/form/inputs/Checkboxes.vue";
import Dropdown from "@/components/form/inputs/Dropdown.vue";
import Radio from "@/components/form/inputs/Radio.vue";

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

const suffix = computed(() => {
  if (field.value.displayType !== "checkboxes") {
    return [""];
  }
  return [];
});

onMounted(() => {
  field.value.options = field.value.categories.map((option) => {
    return { label: option.title, value: option.id };
  });
});
</script>
