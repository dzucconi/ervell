import gql from 'graphql-tag';

import profileTipsFragment from 'react/components/ProfileEmptyMessage/components/ProfileTips/fragments/profileTips';

export default gql`
  query ProfileTips {
    me {
      ... ProfileTips
    }
  }
  ${profileTipsFragment}
`;