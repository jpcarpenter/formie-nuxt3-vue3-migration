<template>
  <component :is="field.displayType" :field="field" />
</template>

<script setup>
import Checkboxes from "@/components/form/inputs/Checkboxes.vue";
import Dropdown from "@/components/form/inputs/Dropdown.vue";
import Hidden from "@/components/form/inputs/Hidden.vue";
import Radio from "@/components/form/inputs/Radio.vue";

// Define the props used in the component
const props = defineProps({
  field: {
    type: Object,
    required: true,
  },
});
</script>

<script>
export default {
  components: {
    Checkboxes,
    Dropdown,
    Hidden,
    Radio,
  },
};
</script>
