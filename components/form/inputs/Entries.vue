<template>
  <component :is="field.displayType" :field="fieldWithModifiedOptions" />
</template>

<script setup>
import Checkboxes from "@/components/form/inputs/Checkboxes.vue";
import Dropdown from "@/components/form/inputs/Dropdown.vue";
import Radio from "@/components/form/inputs/Radio.vue";

// Define the props used in the component
const props = defineProps({
  field: {
    type: Object,
    required: true,
  },
});

// Use the field mixin composable to get utility functions
// const { subFields, attrs, getId, getName, getSubFields } = useFieldMixin(props);

// Compute suffix based on field.displayType
const suffix = computed(() =>
  props.field.displayType !== "checkboxes" ? [""] : []
);

// Create a reactive reference to store the modified options
const fieldWithModifiedOptions = ref(props.field);

// Modify the options on component mount
onMounted(() => {
  fieldWithModifiedOptions.value.options = props.field.entries.map(
    (option) => ({
      label: option.title,
      value: option.id,
    })
  );
});
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
