<template>
  <div
    :id="`${form.handle}`"
    class="p-10 overflow-hidden bg-white rounded-md shadow"
  >
    <form v-if="form" ref="formRef" novalidate @submit.prevent="onSubmit">
      <FormAlert
        v-model="alertState"
        :success-text="form.settings.submitActionMessageHtml"
        :error-text="form.settings.errorMessageHtml"
      />

      <div v-if="form.settings.displayFormTitle" class="text-center">
        <h2 class="my-4 text-xl font-semibold leading-6 text-gray-900 sm:my-6">
          {{ form.title }}
        </h2>
        <hr />
      </div>

      <div
        v-if="form.settings.displayPageTabs"
        class="px-4 border-b border-gray-200 sm:px-6"
      >
        <nav class="flex -mb-px space-x-8" aria-label="Tabs">
          <a
            v-for="(page, index) in form.pages"
            :key="index"
            href="#"
            :class="
              index == activePage
                ? 'border-indigo-500 text-indigo-600 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm'
            "
            @click.prevent="onTabClick(index)"
          >
            {{ page.name }}
          </a>
        </nav>
      </div>

      <div v-if="form.settings.displayPageProgress" class="px-4 mt-4 sm:px-6">
        <div
          class="flex h-5 overflow-hidden text-xs font-medium text-white bg-gray-200 rounded-md"
        >
          <div
            class="flex flex-col justify-center text-center bg-indigo-500"
            :style="'width: ' + stepPercentage + '%'"
            role="progressbar"
            :aria-valuenow="stepPercentage"
            aria-valuemin="0"
            aria-valuemax="100"
          >
            <span class="">{{ stepPercentage }}%</span>
          </div>
        </div>
      </div>
      <FormFormiePage
        v-for="(page, index) in form.pages"
        :key="index"
        v-model="activePage"
        :page="page"
        :page-index="index"
        :form="form"
        :loading="loading"
        :alert-state="alertState"
        @close-alert="alertState = null"
        @go-back="activePage -= 1"
      />
    </form>

    <div
      v-else-if="form === null"
      class="p-24 text-center text-red-500 bg-white"
    >
      Unable to find form "{{ handle }}".
    </div>

    <div v-else class="p-24 text-center text-red-500 bg-white">
      <div v-if="error" class="text-red-500">{{ error }}</div>
      <div v-else class="loading loading-lg"></div>
    </div>
  </div>
</template>

<script setup>
import Pristine from "pristinejs";
import { print } from "graphql/language/printer";

// DEFINE PROPS
const props = defineProps({
  form: {
    type: Object,
    required: true,
  },
});

// IMPORT MUTATION COMPOSABLES
const { getFormMutation, getMutationVariables } = useFormMutation(props.form);

// IMPORT VALIDATION COMPOSABLES
const {
  resetValidation,
  showValidation,
  runValidation,
  applyServerValidation,
} = useFormValidation();

const activePage = ref(0);
const error = ref(false);
const loading = ref(false);
const alertState = ref(null);
const validator = ref(null);
const formRef = ref(null);

const stepPercentage = computed(() => {
  return parseInt(((activePage.value + 1) / props.form.pages.length) * 100, 10);
});

const onTabClick = (index) => {
  activePage.value = index;
};

const onSubmit = async (e) => {
  loading.value = true;
  alertState.value = false;
  validator.value = new Pristine(formRef.value);

  resetValidation(formRef.value);

  const isLastPage = activePage.value === props.form.pages.length - 1;
  const valid = runValidation(validator.value, formRef.value);

  if (!valid) {
    loading.value = false;
    alertState.value = "error";
    return;
  }

  if (!isLastPage) {
    loading.value = false;
    activePage.value += 1;
    return;
  }

  const formData = await getMutationVariables(props.form, formRef.value);
  const formMutation = getFormMutation;

  try {
    // Submit form mutation to backend (via custom composable)
    const route = useRoute();
    const { data } = await useGraphqlQuery({
      routeQuery: route.query,
      key: "formSubmission",
      query: print(formMutation.value),
      variables: formData,
    });

    loading.value = false;
    const response = data.value[`save_${props.handle}_Submission`];
    onSuccess(response);
  } catch (error) {
    loading.value = false;
    alertState.value = "error";
    applyServerValidation(validator.value, formRef.value, error);
    console.error(error);
  }
};

onErrorCaptured((error) => {
  error.value = error.message;
  return true;
});

const onSuccess = (response) => {
  if (props.form.settings.submitAction === "message") {
    alertState.value = "success";
  }

  formRef.value.reset();
};
</script>

<style lang="scss" scoped>
// input {
//   @apply block w-full mt-1 border-gray-300 shadow-sm focus:border-blue-100 sm:text-sm;
// }
.loading {
  @apply relative pointer-events-none;

  color: transparent !important;
  min-height: theme("spacing.4");
}

.loading::after {
  @apply absolute block h-4 w-4 -mt-2 -ml-2 border-2 border-solid rounded-full;
  @apply border-indigo-500;

  top: 50%;
  left: 50%;
  z-index: 1;

  animation: loading 0.5s infinite linear;
  border-right-color: transparent;
  border-top-color: transparent;
  content: "";
}

.loading.loading-lg {
  min-height: theme("spacing.8");
}

.loading.loading-lg::after {
  @apply h-8 w-8 -mt-4 -ml-4;
}

a.loading::after,
button.loading::after {
  @apply border-white;

  border-right-color: transparent;
  border-top-color: transparent;
}

@keyframes loading {
  0% {
    transform: rotate(0);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
