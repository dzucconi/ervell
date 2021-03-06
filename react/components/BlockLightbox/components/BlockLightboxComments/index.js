import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';

import blockLightboxCommentsFragment from 'react/components/BlockLightbox/components/BlockLightboxComments/fragments/blockLightboxComments';

import Box from 'react/components/UI/Box';
import BlockLightboxComment from 'react/components/BlockLightbox/components/BlockLightboxComment';
import BlockLightboxAddComment from 'react/components/BlockLightbox/components/BlockLightboxAddComment';

export default class BlockLightboxComments extends PureComponent {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    block: propType(blockLightboxCommentsFragment).isRequired,
  }

  render() {
    const { block, loading, ...rest } = this.props;

    return (
      <Box {...rest}>
        {!loading && block.comments.map(comment => (
          <BlockLightboxComment
            mb={6}
            key={comment.id}
            comment={comment}
          />))
        }

        <BlockLightboxAddComment id={block.id} />
      </Box>
    );
  }
}
