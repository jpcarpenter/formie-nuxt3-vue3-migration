/**
 * Composable function to generate an ID based on the handles array.
 * @param {Array} handles - Array of handles used to generate the ID.
 * @returns {string} - Generated ID.
 *
 * How to use this composable:
 * 1. Call the useId composable function with the 'handles' array as a parameter:
 *    const handles = ['field1', 'field2', 'field3'];
 *    const id = useId(handles);
 *
 * 2. Now you can use the 'id' variable containing the generated ID.
 */
export function useId(handles) {
  // Traditional method
  // return `fields-${handles.join('][')}`;

  return `${handles.join("-")}`;
}

/**
 * Composable function to generate a name based on the handles array.
 * @param {Array} handles - Array of handles used to generate the name.
 * @returns {string} - Generated name.
 *
 * How to use this composable:
 * 1. Call the useName composable function with the 'handles' array as a parameter:
 *    const handles = ['field1', 'field2', 'field3'];
 *    const name = useName(handles);
 *
 * 2. Now you can use the 'name' variable containing the generated name.
 */
export function useName(handles) {
  // Traditional method
  // return `fields[${handles.join('][')}]`;

  const first = handles.shift();

  if (handles.length) {
    return `${first}[${handles.join("][")}]`;
  }

  return first;
}

/**
 * Composable function to generate attribute table from an array of rows.
 * @param {Array} table - Array of rows used to generate the attribute table.
 * @returns {Object} - Generated attribute table.
 *
 * How to use this composable:
 * 1. Call the useAttributesTable composable function with the 'table' array as a parameter:
 *    const table = [
 *      { label: 'attr1', value: 'value1' },
 *      { label: 'attr2', value: 'value2' },
 *      // Other rows...
 *    ];
 *    const attrs = useAttributesTable(table);
 *
 * 3. Now you can use the 'attrs' variable containing the generated attribute table.
 */
export function useAttributesTable(table) {
  const attrs = {};

  if (table && Array.isArray(table)) {
    table.forEach((row) => {
      attrs[row.label] = row.value;
    });
  }

  return attrs;
}
