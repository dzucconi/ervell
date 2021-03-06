import gql from 'graphql-tag';

import memberAvatarFragment from 'react/components/MemberAvatar/fragments/memberAvatar';

export default gql`
  fragment ManagedMember on Member {
    __typename
    ... on User {
      id
      name
      href
      ...MemberAvatar
    }
    ... on Group {
      id
      name
      ...MemberAvatar
      visibility
      user {
        __typename
        id
        name
      }
    }
  }
  ${memberAvatarFragment}
`;
