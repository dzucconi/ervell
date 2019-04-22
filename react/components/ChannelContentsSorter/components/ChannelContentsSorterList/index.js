import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import { SortableContainer } from 'react-sortable-hoc';

import chunk from 'react/util/chunk';

import moveConnectableMutation from 'react/components/ChannelContentsSorter/mutations/moveConnectable';

import Box from 'react/components/UI/Box';
import ChannelContentsSorterSet from 'react/components/ChannelContentsSorter/components/ChannelContentsSorterSet';

const reorder = ({ list, startIndex, endIndex }) => {
  const result = [...list];
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const Container = SortableContainer(Box);

const ChannelContentsSorterList = ({
  id,
  skeleton,
  moveConnectable,
  chunkSize,
  ...rest
}) => {
  const [connectables, setConnectables] = useState(skeleton);

  const handleSortEnd = ({ oldIndex, newIndex }) => {
    const connectable = connectables[oldIndex];

    const sorted = reorder({
      list: connectables,
      startIndex: oldIndex,
      endIndex: newIndex,
    });

    setConnectables(sorted);

    const insertAt = connectables.length - newIndex;

    moveConnectable({
      variables: {
        channel_id: id,
        connectable: {
          id: connectable.id,
          type: connectable.type.toUpperCase(),
        },
        insert_at: insertAt,
      },
    })
      .then(console.log.bind(console))
      .catch(console.error.bind(console));
  };

  const chunked = chunk(connectables, chunkSize);

  return (
    <Container onSortEnd={handleSortEnd} p={8} {...rest}>
      {chunked.map((pageSkeleton, index) => (
        <ChannelContentsSorterSet
          key={`ChannelContentsSorterSet:${JSON.stringify(pageSkeleton)}`}
          id={id}
          skeleton={pageSkeleton}
          indexOffset={index * chunkSize}
        />
      ))}
    </Container>
  );
};

ChannelContentsSorterList.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  skeleton: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    type: PropTypes.string.isRequired,
  })),
  moveConnectable: PropTypes.func.isRequired,
  chunkSize: PropTypes.number,
};

ChannelContentsSorterList.defaultProps = {
  skeleton: [],
  chunkSize: 10,
};

export default graphql(moveConnectableMutation, {
  name: 'moveConnectable',
})(ChannelContentsSorterList);
