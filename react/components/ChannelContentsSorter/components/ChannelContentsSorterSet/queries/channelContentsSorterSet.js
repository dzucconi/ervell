import gql from 'graphql-tag';

import channelContentsSorterItemFragment from 'react/components/ChannelContentsSorter/components/ChannelContentsSorterItem/fragments/channelContentsSorterItem';

export default gql`
  query ChannelContentsSorterSet($id: ID!, $connectables: [ConnectableInput]!) {
    channel(id: $id) {
      __typename
      id
      contents(connectables: $connectables) {
        ...ChannelContentsSorterItem
      }
    }
  }
  ${channelContentsSorterItemFragment}
`;
