import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';

import channelContentsSorterSetQuery from 'react/components/ChannelContentsSorter/components/ChannelContentsSorterSet/queries/channelContentsSorterSet';

import ChannelContentsSorterItem from 'react/components/ChannelContentsSorter/components/ChannelContentsSorterItem';
import ChannelContentsSorterPlaceholder from 'react/components/ChannelContentsSorter/components/ChannelContentsSorterPlaceholder';

// static propTypes = {
//   id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
//   skeleton: PropTypes.arrayOf(PropTypes.shape({
//     id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
//     type: PropTypes.string.isRequired,
//   })).isRequired,

const ChannelContentsSorterSet = ({ id, skeleton, indexOffset }) => {
  const variables = {
    id,
    connectables: skeleton.map(c =>
      ({ id: c.id, type: c.type.toUpperCase() })),
  };

  return (
    <Query query={channelContentsSorterSetQuery} variables={variables}>
      {({ data, loading, error }) => {
        if (error) return null;

        if (loading) {
          return skeleton.map((connectable, index) => (
            <ChannelContentsSorterPlaceholder
              key={`ChannelContentsSorterPlaceholder:${connectable.id}:${connectable.__typename}`}
              index={index + indexOffset}
              {...connectable}
            />
          ));
        }

        const { channel: { contents } } = data;

        return contents.map((connectable, index) => (
          <ChannelContentsSorterItem
            key={`ChannelContentsSorter:${connectable.id}:${connectable.__typename}`}
            index={index + indexOffset}
            connectable={connectable}
          />
        ));
      }}
    </Query>
  );
};

export default ChannelContentsSorterSet;
