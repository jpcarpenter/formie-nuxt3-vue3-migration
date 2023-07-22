<template>
  <fieldset :aria-labelledby="useId()" class="contents">
    <legend class="block mb-1 text-sm font-light text-gray-700">
      {{ field.label }}
    </legend>

    <IncludesFieldInstructions :field="field" position="above-input" />

    <div class="flex flex-col">
      <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div
            class="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg"
          >
            <table ref="table" class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th
                    v-for="(column, cIndex) in field.columns"
                    :key="cIndex"
                    scope="col"
                    class="px-6 py-3 text-xs font-light tracking-wider text-left text-gray-500 uppercase"
                  >
                    {{ column.heading }}
                  </th>

                  <th scope="col" class="relative px-6 py-3">
                    <span class="sr-only">Delete</span>
                  </th>
                </tr>
              </thead>

              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="(row, rIndex) in rows" :key="row.__id">
                  <td
                    v-for="(column, cIndex) in field.columns"
                    :key="cIndex"
                    class="px-6 py-4 text-sm font-light text-gray-900 whitespace-nowrap"
                  >
                    <div v-if="column.type === 'checkbox'">
                      <input
                        :id="useId([rIndex, cIndex])"
                        :name="useName([rIndex, cIndex])"
                        type="hidden"
                        aria-checked="false"
                        aria-hidden="true"
                      />

                      <input
                        :id="useId([rIndex, cIndex])"
                        :name="useName([rIndex, cIndex])"
                        type="checkbox"
                        value="1"
                        class="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                      />

                      <label :for="useId([rIndex, cIndex])">
                        &nbsp;<span class="sr-only">{{ column.heading }}</span>
                      </label>
                    </div>

                    <div v-else-if="column.type === 'color'">
                      <input
                        :id="useId([rIndex, cIndex])"
                        :name="useName([rIndex, cIndex])"
                        type="color"
                        value=""
                        class="block w-full border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>

                    <div v-else-if="column.type === 'date'">
                      <input
                        :id="useId([rIndex, cIndex])"
                        :name="useName([rIndex, cIndex])"
                        type="date"
                        value=""
                        class="block w-full border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>

                    <div v-else-if="column.type === 'select'">
                      <select
                        :id="useId([rIndex, cIndex])"
                        :name="useName([rIndex, cIndex])"
                        class="block w-full py-2 pl-3 pr-10 mt-1 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      >
                        <option
                          v-for="(option, i) in column.options"
                          :key="i"
                          :value="option.value"
                        >
                          {{ option.label }}
                        </option>
                      </select>
                    </div>

                    <div v-else-if="column.type === 'email'">
                      <input
                        :id="useId([rIndex, cIndex])"
                        :name="useName([rIndex, cIndex])"
                        type="email"
                        value=""
                        class="block w-full border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>

                    <div v-else-if="column.type === 'heading'"></div>

                    <div v-else-if="column.type === 'multiline'">
                      <textarea
                        :id="useId([rIndex, cIndex])"
                        :name="useName([rIndex, cIndex])"
                        class="block w-full max-w-lg border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      ></textarea>
                    </div>

                    <div v-else-if="column.type === 'number'">
                      <input
                        :id="useId([rIndex, cIndex])"
                        :name="useName([rIndex, cIndex])"
                        type="number"
                        value=""
                        class="block w-full border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>

                    <div v-else-if="column.type === 'time'">
                      <input
                        :id="useId([rIndex, cIndex])"
                        :name="useName([rIndex, cIndex])"
                        type="time"
                        value=""
                        class="block w-full border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>

                    <div v-else-if="column.type === 'url'">
                      <input
                        :id="useId([rIndex, cIndex])"
                        :name="useName([rIndex, cIndex])"
                        type="url"
                        value=""
                        class="block w-full border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>

                    <div v-else>
                      <input
                        :id="useId([rIndex, cIndex])"
                        :name="useName([rIndex, cIndex])"
                        type="text"
                        value=""
                        class="block w-full border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </td>

                  <td
                    class="px-6 py-4 text-sm font-light text-right whitespace-nowrap"
                  >
                    <a
                      href="#"
                      class="text-indigo-600 hover:text-indigo-900"
                      @click.prevent="onDelete(rIndex)"
                      >Delete</a
                    >
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <button
      v-if="!field.static"
      type="button"
      class="px-4 py-2 mt-4 text-sm font-light text-gray-700 bg-white border border-gray-300 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      @click.prevent="onAdd"
    >
      {{ field.addRowLabel }}
    </button>

    <IncludesFieldInstructions :field="field" position="below-input" />
  </fieldset>
</template>

<script setup>
import { uniqueId } from "lodash-es";

const { field, useId, useName } = useFieldMixin();
const rows = ref([]);

const onAdd = () => {
  rows.value.push({
    __id: uniqueId(),
  });
};

const onDelete = (rIndex) => {
  rows.value.splice(rIndex, 1);
};
</script>
