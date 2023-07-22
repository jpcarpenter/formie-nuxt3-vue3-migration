<template>
  <SectionBlock v-if="form" section-type="both">
    <FormFormieForm :form="form[0]" />
  </SectionBlock>
</template>

<script setup>
import { print } from "graphql/language/printer";
import { FormQuery } from "~/queries/form.js";

// Fetch Data (via custom composable)
const route = useRoute();
const response = await useGraphqlQuery({
  routeQuery: route.query,
  key: "formPage",
  query: print(FormQuery),
  variables: {
    slug: route.params.slug,
  },
});

// Destructure and cast response data
const { title, form, headingGroup } = response.data.value.entry ?? [];
</script>

<style scoped></style>
