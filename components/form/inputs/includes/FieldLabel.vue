<template>
    <label
        v-if="canShow"
        :for="id"
        :class="[
            'block mb-1 text-sm font-light text-gray-900',
            { 'text-xs text-gray-400': isSubfield },
        ]"
    >
        {{ field.label }}
        <span v-if="field.required" class="text-red-500">*</span>
    </label>
</template>

<script setup>
import { computed } from 'vue'
import { upperFirst, camelCase } from 'lodash-es';

const props = defineProps({
    id: {
        type: String,
        default: '',
    },

    field: {
        type: Object,
        default: () => ({}),
    },

    position: {
        type: String,
        default: 'above-input',
    },

    isSubfield: {
        type: Boolean,
        default: false,
    },
})

const canShow = computed(() => {
    const className = `verbb\\formie\\positions\\${upperFirst(
        camelCase(props.position)
    )}`

    if (props.field.labelPosition == className) {
        return true
    }

    if (!props.field.labelPosition && props.position == 'above-input') {
        return true
    }

    return false
})
</script>
