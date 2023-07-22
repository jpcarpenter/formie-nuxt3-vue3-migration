<template>
    <p v-if="canShow" class="mb-1 text-sm text-navy-500">
        {{ field.instructions }}
    </p>
</template>

<script setup>
import { ref, computed } from 'vue'
import { upperFirst, camelCase } from 'lodash-es';

const props = defineProps({
    field: {
        type: Object,
        default: Object,
    },

    position: {
        type: String,
        default: 'above-input',
    },
})

const canShow = computed(() => {
    const className = `verbb\\formie\\positions\\${upperFirst(
        camelCase(props.position)
    )}`

    if (props.field.instructionsPosition == className) {
        return true
    }

    if (
        !props.field.instructionsPosition &&
        (props.position == 'above-input' ||
            props.position == 'fieldset-start')
    ) {
        return true
    }

    return false
})
</script>
