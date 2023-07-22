<template>
  <component :is="field.displayType" :field="localField" />
</template>

<script setup>
import Checkboxes from "@/components/form/inputs/Checkboxes.vue";
import Dropdown from "@/components/form/inputs/Dropdown.vue";
import Radio from "@/components/form/inputs/Radio.vue";

const props = defineProps({
  field: {
    type: Object,
    default: Object,
  },
});

const suffix = computed(() => {
  if (props.field.displayType !== "checkboxes") {
    return [""];
  }

  return [];
});

// Create a local copy of the field prop
// const localField = ref({ ...props.field });

// onMounted(() => {
//   localField.value.options = localField.value.users.map((option) => {
//     return { label: option.fullName, value: option.id };
//   });
// });
</script>

<script>
export default {
  components: {
    Checkboxes,
    Dropdown,
    Radio,
  },
};
</script>
