/**
 * Composable function for form validation.
 * @exports resetValidation - Function to reset validation errors and messages in the form.
 * @exports showValidation - Function to show validation errors on the form.
 * @exports runValidation - Function to run validation on the form.
 * @exports applyServerValidation - Function to apply validation errors received from the server to the form.
 *
 * How to use this composable:
 * 1. Call the useFormValidation composable function to get the validation functions:
 *    const { resetValidation, showValidation, runValidation, applyServerValidation } = useFormValidation();
 *
 * 2. Now you can use the validation functions in your component:
 *    - Use resetValidation(el) to clear out all errors and messages for the form element 'el'.
 *    - Use showValidation(pristine) to display validation errors based on the Pristine instance 'pristine'.
 *    - Use runValidation(pristine, $page) to validate the form inputs within the page element '$page'.
 *       The function returns a boolean indicating whether the form is valid or not.
 *    - Use applyServerValidation(pristine, el, error) to apply validation errors received from the server.
 *       The 'pristine' is the Pristine instance used for validation, 'el' is the form element,
 *       and 'error' is the server response containing validation errors.
 */

export function useFormValidation() {
  // Function to reset validation errors and messages in the form
  function resetValidation(el) {
    // Clear out all errors for the form
    el.querySelectorAll("[data-formie-input-error]").forEach((input) => {
      input.removeAttribute("data-formie-input-error");
    });

    el.querySelectorAll("[data-formie-error-text]").forEach((input) => {
      input.remove();
    });
  }

  // Function to show validation errors on the form
  function showValidation(pristine) {
    const appliedErrors = [];

    // There's some errors here with Pristine when calling `getErrors()`
    // https://github.com/sha256/Pristine/pull/48
    pristine.fields.forEach((field) => {
      if (!field.errors) {
        field.errors = [];
      }
    });

    pristine.getErrors().forEach(({ input, errors }) => {
      // Add errors to the inputs
      input.setAttribute("data-formie-input-error", true);

      const inputName = input.getAttribute("name");
      const tagName = input.tagName.toLowerCase();
      const inputType = input.getAttribute("type")
        ? input.getAttribute("type").toLowerCase()
        : "";

      // Prevent errors applying multiple times
      if (appliedErrors.includes(inputName)) {
        return;
      }

      // Add the error message to the input
      const errorTextElement = document.createElement("div");
      errorTextElement.setAttribute("data-formie-error-text", true);
      errorTextElement.innerHTML = errors.join("<br/>");

      let errorTextParent = input.parentElement;

      // Handle grouped fields like radio and checkboxes
      if (inputType === "radio" || inputType === "checkbox") {
        errorTextParent = errorTextParent.parentElement;
      }

      errorTextParent.appendChild(errorTextElement);

      // Save so we never have multiple errors per input
      appliedErrors.push(inputName);
    });
  }

  // Function to run validation on the form
  function runValidation(pristine, $page) {
    // Validate only the inputs on a given page
    const inputs = $page.querySelectorAll(
      "input:not([type^=hidden]):not([type^=submit]), select, textarea"
    );

    // Validate the inputs
    const valid = pristine.validate(inputs);

    // Show validation info - due to it being Vue, doesn't happen automatically
    showValidation(pristine);

    return valid;
  }

  // Function to apply validation errors received from the server
  function applyServerValidation(pristine, el, error) {
    let errors = {};

    try {
      errors = JSON.parse(error.message);
    } catch (e) {
      //
    }

    // Load in any errors from GQL into Pristine to show
    Object.entries(errors).forEach(([key, value]) => {
      const input = el.querySelector(`[name="${key}"]`);

      if (input) {
        pristine.addError(input, value);
      }
    });

    // Show errors, need to manually trigger this due to Vue incompatibility
    showValidation(pristine);
  }

  return {
    // Function to reset validation errors and messages in the form
    resetValidation,

    // Function to show validation errors on the form
    showValidation,

    // Function to run validation on the form
    runValidation,

    // Function to apply validation errors received from the server
    applyServerValidation,
  };
}
