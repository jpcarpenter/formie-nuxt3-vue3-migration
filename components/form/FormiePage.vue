<template>
  <div v-show="pageIndex === activePage">
    <div class="">
      <div
        v-if="form.settings.displayCurrentPageTitle && alertState != 'success'"
      >
        <h3 class="mb-6 text-lg font-light leading-6 text-gray-900">
          {{ page.name }}
        </h3>
        <p class="text-sm text-gray-500">
          Step <strong>{{ pageIndex + 1 }}</strong> of
          <strong>{{ form.pages.length }}</strong>
        </p>
      </div>
      <FormAlert
        v-if="alertState"
        :state="alertState"
        :success-text="form.settings.submitActionMessageHtml"
        :error-text="form.settings.errorMessageHtml"
        class="mb-8"
        @close-alert="$emit('closeAlert')"
      />
      <div
        v-for="(row, rowIndex) in page.rows"
        :key="rowIndex"
        class="flex flex-wrap md:-mx-4"
      >
        <FormFormieField
          v-for="(field, fieldIndex) in row.rowFields"
          :key="fieldIndex"
          :field="field"
        />
      </div>
    </div>
    <div class="pb-3">
      <div class="flex" :class="position">
        <button
          v-if="page.settings.showBackButton"
          type="button"
          @click.prevent="onBack"
        >
          {{ page.settings.showBackButton }}
        </button>
        <button
          type="submit"
          :disabled="loading"
          :class="[loading ? 'loading' : '', 'btn-primary']"
        >
          {{ page.settings.submitButtonLabel }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  form: {
    type: Object,
    default: Object,
  },

  page: {
    type: Object,
    default: Object,
  },

  pageIndex: {
    type: Number,
    default: 0,
  },

  loading: {
    type: Boolean,
    default: false,
  },

  value: {
    type: Number,
    default: 0,
  },
  alertState: {
    type: [String, Boolean],
    default: null,
  },
});

const emit = defineEmits(["closeAlert"]);

const activePage = computed({
  get: () => props.value,
  set: (newValue) => emit("closeAlert", newValue),
});

const position = computed(() => {
  if (props.page.settings.buttonsPosition === "left-right") {
    return "justify-between";
  }

  if (props.page.settings.buttonsPosition === "center") {
    return "justify-center";
  }

  if (props.page.settings.buttonsPosition === "right") {
    return "justify-end";
  }

  return "";
});

const onBack = () => {
  activePage.value -= 1;
};
</script>
