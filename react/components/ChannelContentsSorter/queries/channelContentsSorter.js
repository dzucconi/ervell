import gql from 'graphql-tag';

export default gql`
  query ChannelContentsSorter($id: ID!) {
    channel(id: $id) {
      __typename
      id
      skeleton {
        id
        type
      }
    }
  }
`;
