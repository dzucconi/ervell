import gql from 'graphql-tag';

import myGroupLinksFragment from 'react/components/UserDropdown/components/MyGroupLinks/fragments/myGroupLinks';

export default gql`
  query UserDropdown {
    me {
      id
      name
      href
      is_premium
      is_confirmed
      created_at(format: "%B %d, %Y")
      ...MyGroupLinks
    }
  }
  ${myGroupLinksFragment}
`;
