import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';

import newChannelGroupsQuery from 'react/components/NewChannelForm/components/NewChannelGroups/queries/newChannelGroups';

import Pulldown from 'react/components/UI/Pulldown';
import AuthorOption from 'react/components/AuthorOption';

export default class NewChannelGroups extends Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }

  static defaultProps = {
    value: 0,
  }

  render() {
    const { onChange, value } = this.props;

    return (
      <Query query={newChannelGroupsQuery}>
        {({ data, errors, loading }) => {
          if (loading || errors) {
            return (
              <div>
                <Pulldown
                  value={value}
                  options={{
                    0: <AuthorOption member={{ name: 'Me', __typename: 'me' }} />,
                  }}
                />
              </div>
            );
          }

          const { me, me: { groups } } = data;

          return (
            <div>
              <Pulldown
                value={value}
                onChange={onChange}
                options={{
                  0: <AuthorOption member={me} />,
                  ...groups.reduce((memo, group) => ({
                    ...memo, [group.id]: <AuthorOption member={group} />,
                  }), {}),
                }}
              />
            </div>
          );
        }}
      </Query>
    );
  }
}
