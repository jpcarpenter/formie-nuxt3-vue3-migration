/**
 * Composable function for form field utility operations.
 * This composable provides utility functions for managing form fields.
 *
 * Main function for the form field mixin.
 * @param {Object} props - Props received from the component.
 * @returns {Object} - Object containing utility functions for form fields.
 *
 * How to use this composable:
 * 1. Call the useFieldMixin composable function with your form data as a parameter:
 *    const props = defineProps({ /* Your props here * / });
 *    const { subFields, attrs, getId, getName, getSubFields } = useFieldMixin(props);
 */

import { camelCase } from "lodash-es";

export function useFieldMixin(props) {
  // Create a reactive reference for subFields
  const subFields = ref([]);

  /**
   * Get attributes for the form field.
   * @param {Object} field - The form field object.
   * @param {Array} handles - The array of handles used to generate ID and name.
   * @returns {Object} - Object containing field attributes like ID, name, required, etc.
   */
  const attrs = (field = null, handles = []) => {
    if (field === null) {
      field = props.field;
    }
    const attr = field.inputAttributes
      ? useAttributesTable(field.inputAttributes)
      : null;
    return {
      id: getId(handles),
      name: getName(handles),
      required: field.required,
      placeholder: field.placeholder,
      value: field.defaultValue,
      attr,
    };
  };

  /**
   * Get the default ID for the form field.
   * @param {Array} handles - The array of handles used to generate ID.
   * @returns {string} - The default generated ID.
   */
  const getId = (handles = []) => {
    const parts = [props.field.handle, ...handles];

    return useId(parts);
  };

  /**
   * Get the default name for the form field.
   * @param {Array} handles - The array of handles used to generate name.
   * @returns {string} - The default generated name.
   */
  const getName = (handles = []) => {
    const parts = [props.field.handle, ...handles];
    return useName(parts);
  };

  /**
   * Get the enabled subfields for the form field.
   * @returns {Array} - Array containing enabled subfields with their options.
   */
  const getSubFields = () => {
    const enabledSubFields = [];

    subFields.value.forEach((subFields, groupIndex) => {
      subFields.forEach((subField) => {
        if (props.field[`${subField}Enabled`]) {
          const subFieldOptions = {};

          Object.keys(props.field).forEach((key) => {
            if (key.startsWith(subField)) {
              const newKey = camelCase(key.replace(subField, ""));

              subFieldOptions[newKey] = props.field[key];
            }
          });

          if (!enabledSubFields[groupIndex]) {
            enabledSubFields[groupIndex] = {};
          }

          enabledSubFields[groupIndex][subField] = subFieldOptions;
        }
      });
    });

    return enabledSubFields;
  };

  return {
    subFields,
    attrs,
    getId,
    getName,
    getSubFields,
  };
}
