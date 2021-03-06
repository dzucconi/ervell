import gql from 'graphql-tag';

import profileFollowingFragment from 'react/components/ProfileFollows/fragments/profileFollowing';

export default gql`
  query ProfileFollowing($id: ID!, $page: Int, $per: Int) {
    identity(id: $id) {
      identifiable {
        ... ProfileFollowing
      }
    }
  }
  ${profileFollowingFragment}
`;
