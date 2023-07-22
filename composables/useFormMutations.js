/**
 * Composable function for generating a GraphQL mutation based on form data.
 * @exports getFormMutation - The GraphQL mutation that was generated based on the 'form' data.
 * @exports getMutationVariables - A function that can be used to get the mutation variables from a form element.
 *
 * How to use this composable:
 * 1. Call the useFormMutation composable function with your form data as a parameter:
 *    const form = { /* Your form data here * / };
 *    const { getFormMutation, getMutationVariables } = useFormMutation(form);
 *
 * 2. Now you can use the GraphQL mutation and the function to get mutation variables in your component:
 *    - Use 'getFormMutation' to access the GraphQL mutation generated based on the 'form' data.
 *       The mutation is a GraphQL query that can be used to send form data to the server.
 *    - Use 'getMutationVariables(el)' to get the mutation variables from the form element 'el'.
 *       The function converts the form element data into an object with mutation variables,
 *       which can be used in conjunction with the generated GraphQL mutation.
 */

import gql from "graphql-tag";
import { FormDataJson } from "form-data-json-convert";
import { flatMap, isPlainObject } from "lodash-es";

function getFormFieldMeta(form) {
  const allRows = flatMap(form.pages, "rows");
  const allFields = flatMap(allRows, "rowFields");

  const fields = flatMap(allFields, ({ handle, inputTypeName }) => {
    return { handle, inputTypeName };
  });

  return fields;
}

function createMutationHandle(form) {
  return `save_${form.handle}_Submission`;
}

function createMutationTypes(form) {
  const types = getFormFieldMeta(form).map(({ handle, inputTypeName }) => {
    return `$${handle}: ${inputTypeName}`;
  });

  // Add in any captcha tokens generated when we queried the form.
  form.captchas.forEach((captcha) => {
    types.push(`$${captcha.handle}: FormieCaptchaInput`);
  });

  return types.join(", ");
}

function createMutationValues(form) {
  const values = flatMap(getFormFieldMeta(form), "handle").map((key) => {
    return `${key}: $${key}`;
  });

  // Add in any captcha tokens generated when we queried the form.
  form.captchas.forEach((captcha) => {
    values.push(`${captcha.handle}: $${captcha.handle}`);
  });

  return values.join(", ");
}

export function useFormMutation(form) {
  const mutation = ref(null);

  function generateFormMutation() {
    const mutationTypes = createMutationTypes(form);
    const mutationHandle = createMutationHandle(form);
    const mutationValues = createMutationValues(form);

    return gql`
      mutation FormMutation(${mutationTypes}) {
        ${mutationHandle}(${mutationValues}) {
          id
        }
      }
    `;
  }

  function getMutationVariables(el) {
    const object = FormDataJson.formToJson(el);

    // Get the mutation types to ensure we cast everything properly
    const mutationTypes = getFormFieldMeta(form);

    mutationTypes.forEach((info) => {
      let value = object[info.handle];

      if (typeof value === "undefined") {
        return;
      }

      // Fix up any objects that look like arrays
      if (isPlainObject(value)) {
        if (typeof value[0] !== "undefined") {
          value = Object.values(value);
        }
      }

      if (info.inputTypeName === "Int") {
        value = parseInt(object[info.handle], 10);
      }

      if (info.inputTypeName === "[Int]") {
        if (isPlainObject(value)) {
          value = Object.values(value);
        }

        value = value.map((item) => {
          return parseInt(item, 10);
        });
      }

      if (info.inputTypeName === "Number") {
        value = Number(object[info.handle]);
      }

      if (info.inputTypeName === "[Number]") {
        if (isPlainObject(value)) {
          value = Object.values(value);
        }

        value = value.map((item) => {
          return Number(item);
        });
      }

      object[info.handle] = value;
    });

    // Add in any captcha tokens generated when we queried the form.
    form.captchas.forEach((captcha) => {
      object[captcha.handle] = {
        name: captcha.name,
        value: captcha.value,
      };
    });

    return object;
  }

  mutation.value = generateFormMutation();

  return {
    getFormMutation: mutation,
    getMutationVariables,
  };
}