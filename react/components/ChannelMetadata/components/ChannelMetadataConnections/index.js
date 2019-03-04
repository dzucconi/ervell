import React, { Component } from 'react';
import { propType } from 'graphql-anywhere';
import styled from 'styled-components';

import LinksList from 'react/components/LinksList';
import { Expandable } from 'react/components/UI/ExpandableSet';

import channelMetadataQuery from 'react/components/ChannelMetadata/queries/channelMetadata';

import channelMetadataConnectionsFragment from 'react/components/ChannelMetadata/components/ChannelMetadataConnections/fragments/channelMetadataConnections';

import Connect from 'react/components/Connect';

const Actions = styled.div`
  div + & {
    margin-top: 1em;
  }

  &:first-child {
    margin-top: 0.66em;
  }
`;

const ConnectionsList = styled(LinksList)`
  padding-right: 1em;
`;

export default class ChannelMetadataConnections extends Component {
  static propTypes = {
    channel: propType(channelMetadataConnectionsFragment).isRequired,
  }

  render() {
    const { channel } = this.props;

    return (
      <div>
        {channel.connected_to_channels.length > 0 &&
          <Expandable>
            <ConnectionsList links={channel.connected_to_channels} />
          </Expandable>
        }

        {channel.can.connect &&
          <Actions>
            <Connect
              id={channel.id}
              type="CHANNEL"
              refetchQueries={[{
                query: channelMetadataQuery,
                variables: { id: channel.id },
              }]}
            />
          </Actions>
        }
      </div>
    );
  }
}
