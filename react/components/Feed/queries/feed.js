import gql from 'graphql-tag';

import feedGroupFragment from 'react/components/Feed/components/FeedGroups/fragments/group';

export default gql`
  query FeedQuery($offset: Int, $limit: Int, $type: String) {
    me {
      id
      __typename
      feed(offset: $offset, limit: $limit, type: $type) {
        groups {
          ...FeedGroup
        }
      }
    }
  }
  ${feedGroupFragment}
`;
