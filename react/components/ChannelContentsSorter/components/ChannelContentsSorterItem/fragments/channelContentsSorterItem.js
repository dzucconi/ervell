import gql from 'graphql-tag';

export default gql`
  fragment ChannelContentsSorterItem on Konnectable {
    __typename
    ... on Model {
      id
    }
    ... on Text {
      content(format: MARKDOWN)
    }
    ... on Image {
      thumb_url: image_url(size: SQUARE)
    }
    ... on Embed {
      thumb_url: image_url(size: SQUARE)
    }
    ... on Link {
      thumb_url: image_url(size: SQUARE)
    }
    ... on Attachment {
      thumb_url: image_url(size: SQUARE)
    }
  }
`;
