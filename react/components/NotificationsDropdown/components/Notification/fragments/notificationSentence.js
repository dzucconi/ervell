import gql from 'graphql-tag';

import notificationObjectFragment from 'react/components/NotificationsDropdown/components/Notification/fragments/notificationObject';

export default gql`
  fragment NotificationSentence on Deed {
    __typename
    id
    is_read
    owner {
      __typename
      ... on User {
        id
        label: name
        href
      }
      ... on Group {
        id
        label: name
        href
      }
    }
    action
    item {
      ...NotificationObject
    }
    item_title
    connector
    target {
      ...NotificationObject
    }
    created_at(relative: true)
  }
  ${notificationObjectFragment}
`;
