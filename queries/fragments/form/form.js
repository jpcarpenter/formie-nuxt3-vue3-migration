import gql from "graphql-tag";
import { FieldFragment } from "./field";

export const FormFragment = gql`
  ${FieldFragment}
  fragment FormFragment on FormInterface {
    id
    title
    handle
    siteId
    csrfToken {
      name
      value
    }
    captchas {
      handle
      name
      value
    }
    settings {
      ... on FormSettingsType {
        displayPageTabs
      }
    }
    settings {
      displayFormTitle
      displayPageTabs
      displayCurrentPageTitle
      displayPageProgress
      scrollToTop
      submitMethod
      submitAction
      submitActionTab
      submitActionFormHide
      submitActionMessageHtml
      submitActionMessagePosition
      submitActionMessageTimeout
      redirectUrl
      errorMessageHtml
      loadingIndicator
      loadingIndicatorText
      validationOnSubmit
      validationOnFocus
      defaultLabelPosition
      defaultInstructionsPosition
      progressPosition
      integrations {
        settings
      }
      redirectEntry {
        id
        uri
        slug
        sectionHandle
      }
    }
    pages {
      name
      id
      settings {
        submitButtonLabel
        backButtonLabel
        showBackButton
        buttonsPosition
      }
      rows {
        rowFields {
          ...FieldFragment

          ... on Field_Repeater {
            fields {
              ...FieldFragment
            }
          }

          ... on Field_Group {
            fields {
              ...FieldFragment
            }
          }
        }
      }
    }
  }
`;
