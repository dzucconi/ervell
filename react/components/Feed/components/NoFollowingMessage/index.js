import React, { Component } from 'react';
import styled from 'styled-components';
import { graphql } from 'react-apollo';
import { propType } from 'graphql-anywhere';
import PropTypes from 'prop-types';
import sharify from 'sharify';

import Modal from 'react/components/UI/Modal/Portal';
import Text from 'react/components/UI/Text';
import PageContainer from 'react/components/UI/PageContainer';
import { GenericButtonLink } from 'react/components/UI/GenericButton';
import ConnectTwitter from 'react/components/ConnectTwitter';

import FollowerCountCheckQuery from 'react/components/Feed/components/NoFollowingMessage/queries/followerCount';
import FollowerCountCheckFragment from 'react/components/Feed/components/NoFollowingMessage/fragments/followerCount';

const { data: { API_URL, APP_URL } } = sharify;
const TWITTER_AUTHENTICATION_URL = `${(API_URL && API_URL.replace('/v2', ''))}/auth/twitter?origin=${APP_URL}/feed/find-friends`;

const ActionContainer = styled.div`
  text-align: center;
  padding: ${x => x.theme.space[7]} 0;
`;

const Container = styled(PageContainer)`
  margin: 0 auto ${x => x.theme.space[8]};
`;

const Headline = styled(Text).attrs({
  fontSize: 7,
  lineHeight: 1,
  align: 'center',
})`
`;

const SmallText = styled(Text).attrs({
  fontSize: 3,
  lineHeight: 1,
  mt: 6,
})``;

const Link = styled(SmallText)`
  text-decoration: underline;
  cursor: pointer;
  display: inline-block;
`;

class NoFollowingMessage extends Component {
  static propTypes = {
    data: PropTypes.shape({
      me: propType(FollowerCountCheckFragment),
    }).isRequired,
  }

  state = {
    mode: 'resting',
  }

  componentDidMount() {
    if (window.location.href.indexOf('showModal=true') > -1) {
      this.setState({ mode: 'modal' });
    }
  }

  closeModal = () => {
    this.setState({ mode: 'resting' });
  }

  handleTwitterConnectClick = (e) => {
    e.preventDefault();

    const { data: { me: { twitter_authentication } } } = this.props;

    if (!twitter_authentication) {
      window.location.href = TWITTER_AUTHENTICATION_URL;
      return null;
    }

    return this.setState({ mode: 'modal' });
  }

  render() {
    const { data, data: { error, loading } } = this.props;

    if (error || loading || (data.me.counts.following > 0)) {
      return (<div />);
    }

    const { mode } = this.state;

    return (
      <Container>
        {mode === 'modal' &&
          <Modal onClose={this.closeModal}>
            <ConnectTwitter />
          </Modal>
        }
        <Headline>
          Discover how other people are using Are.na
        </Headline>

        <ActionContainer>
          <GenericButtonLink f={5} href="/examples" mb={4}>
            See examples
          </GenericButtonLink>

          <SmallText>
            or&nbsp;
            <Link onClick={this.handleTwitterConnectClick}>
              connect your Twitter account to find people to follow
            </Link>.
          </SmallText>
        </ActionContainer>
      </Container>
    );
  }
}

export default graphql(FollowerCountCheckQuery)(NoFollowingMessage);
