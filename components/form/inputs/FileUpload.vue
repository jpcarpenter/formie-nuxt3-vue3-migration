<template>
  <div>
    <FieldLabel :id="useId()" :field="field.value" position="above-input" />

    <FieldInstructions :field="field.value" position="above-input" />

    <input
      :id="useId()"
      :name="determineName"
      :required="field.value.required"
      :multiple="multiple"
      type="file"
      :disabled="disabled"
      class="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      @change="handleUpload"
    />

    <FieldInstructions :field="field.value" position="below-input" />

    <FieldLabel :id="useId()" :field="field.value" position="below-input" />
  </div>
</template>
<script setup>
const props = defineProps({
  field: {
    type: Object,
    default: Object,
  },
});

// const {getId, getName } = useFieldMixin(props);
const files = ref([]);
const uploadError = ref(false);
const overLimit = ref(false);
const maxUploadSize = 524288000; // 500 MB -> Bytes

const limitFiles = computed(() =>
  field.value.limitFiles ? field.value.limitFiles : 1
);
const multiple = computed(() => limitFiles.value > 1);
const disabled = computed(() => files.value.length >= limitFiles.value);

const totalSize = computed(() => {
  let fileSizes = [];
  files.value.forEach((file) => {
    let size = file[0].size ?? file.size;
    fileSizes.push(size);
  });
  const sum = fileSizes.reduce((accumulator, value) => {
    return accumulator + value;
  }, 0);
  return sum;
});

const determineName = computed(() => {
  let name = null;
  if (props.dominoControlId.length > 0) {
    name = props.dominoControlId;
  } else if (props.fileControlIds && props.fileControlIds.length == 1) {
    name = props.fileControlIds[0];
  } else {
    name = useName();
  }
  return name;
});

watch(totalSize, (val) => {
  const uploadZone = ref.value.uploadZone;
  if (val && val > maxUploadSize) {
    uploadZone.setAttribute("data-formie-input-error", true);
    uploadError.value = "File size(s) must be under 500 MB";
    // this.$store.commit('disableFormSubmitButton', true)
  } else {
    uploadZone.removeAttribute("data-formie-input-error");
    uploadError.value = false;
    // this.$store.commit('disableFormSubmitButton', false)
  }
});

const handleUpload = (e) => {
  const filesToUpload = Array.from(e.target.files) || [];
  if (filesToUpload.length <= limitFiles.value) {
    overLimit.value = false;
    // this.$store.commit('disableFormSubmitButton', false)
    if (filesToUpload.length > 1) {
      filesToUpload.forEach((file) => {
        files.value.push([file]);
      });
    } else {
      files.value.push(filesToUpload);
    }
    // this.$emit('input', files.value)
  } else {
    overLimit.value = true;
    // this.$store.commit('disableFormSubmitButton', true)
  }
};

const formatBytes = (bytes, decimals) => {
  if (bytes == 0) return "0 Bytes";
  let k = 1024,
    dm = decimals || 2,
    sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
    i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
};

const removeFile = (file) => {
  const fileIndex = files.value.indexOf(file);
  files.value.splice(fileIndex, 1);
};

const dragover = (event) => {
  event.preventDefault();
  // Add some visual fluff to show the user can drop its files
  if (!event.currentTarget.classList.contains("bg-gray-600")) {
    event.currentTarget.classList.remove("bg-gray-600");
    event.currentTarget.classList.add("bg-gray-600");
  }
};

const dragleave = (event) => {
  // Clean up
  event.currentTarget.classList.add("bg-gray-600");
  event.currentTarget.classList.remove("bg-gray-600");
};
</script>

<style lang="scss" scoped>
.overlayed {
  @apply absolute inset-0 w-full block;
}
.upload-zone {
  @apply flex items-center justify-center pointer-events-none;
  [data-formie-input-error] & {
    @apply bg-gray-600 border-gray-400;
  }
}
.upload-text {
  @apply text-gray-500;
  span {
    @apply text-gray-500;
  }
  [data-formie-input-error] & {
    @apply text-gray-400;
    span {
      @apply text-gray-400;
    }
  }
}
</style>
