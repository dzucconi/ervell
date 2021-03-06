import React, { Component } from 'react';
import { propType } from 'graphql-anywhere';

import channelMetadataFragment from 'react/components/ChannelMetadata/fragments/channelMetadata';

import Grid from 'react/components/UI/Grid';
import Pocket from 'react/components/UI/Pocket';
import HeaderMetadataContainer from 'react/components/UI/HeaderMetadata/HeaderMetadataContainer';
import ChannelBreadcrumb from 'react/components/ChannelMetadata/components/ChannelBreadcrumb';
import ChannelMetadataCollaborators from 'react/components/ChannelMetadata/components/ChannelMetadataCollaborators';
import ChannelMetadataInfo from 'react/components/ChannelMetadata/components/ChannelMetadataInfo';
import ChannelMetadataConnections from 'react/components/ChannelMetadata/components/ChannelMetadataConnections';
import ChannelMetadataActions from 'react/components/ChannelMetadata/components/ChannelMetadataActions';
import { ExpandableContext } from 'react/components/UI/ExpandableSet';

export default class ChannelMetadata extends Component {
  static propTypes = {
    channel: propType(channelMetadataFragment).isRequired,
  }

  render() {
    const { channel, ...rest } = this.props;

    return (
      <HeaderMetadataContainer
        breadcrumb={
          <ChannelBreadcrumb channel={channel} />
        }
        actions={
          <ChannelMetadataActions channel={channel} />
        }
        {...rest}
      >
        <ExpandableContext>
          <Grid gutterSpacing={2} variableHeight>
            <Pocket title="Info">
              <ChannelMetadataInfo channel={channel} />
            </Pocket>

            {(channel.can.manage_collaborators || channel.collaborators.length > 0) &&
              <Pocket title="Collaborators">
                <ChannelMetadataCollaborators channel={channel} />
              </Pocket>
            }

            {(channel.can.connect || channel.connected_to_channels.length > 0) &&
              <Pocket title="This channel appears in">
                <ChannelMetadataConnections channel={channel} />
              </Pocket>
            }
          </Grid>
        </ExpandableContext>
      </HeaderMetadataContainer>
    );
  }
}
