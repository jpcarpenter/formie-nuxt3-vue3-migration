import gql from "graphql-tag";
import { FormFragment } from "./fragments/form/form";

export const FormQuery = gql`
  ${FormFragment}
  query formQuery($slug: [String]) {
    entry(section: "formPages", slug: $slug) {
      ... on formPages_default_Entry {
        id
        title
        headingGroup {
          ...headingGroup
        }
        form {
          ...FormFragment
        }
      }
    }
  }
`;
