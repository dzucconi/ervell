import React, { Component } from 'react';
import sharify from 'sharify';

import Head from 'react/components/UI/Head';
import Title from 'react/components/UI/Head/components/Title';
import CenteringBox from 'react/components/UI/CenteringBox';
import RegistrationForm from 'react/components/RegistrationForm';

const { data: { RECAPTCHA_SITE_KEY } } = sharify;

export default class RegistrationPage extends Component {
  state = {
    token: null,
  }

  componentDidMount() {
    window.onRecaptchaLoad = () => {
      window.grecaptcha.ready(() => {
        window.grecaptcha.execute(RECAPTCHA_SITE_KEY, { action: 'homepage' })
          .then(token => this.setState({ token }));
      });
    };
  }

  render() {
    const { token } = this.state;

    return (
      <CenteringBox p={7}>
        <Head>
          <script
            src={`https://www.google.com/recaptcha/api.js?onload=onRecaptchaLoad&render=${RECAPTCHA_SITE_KEY}`}
          />
        </Head>

        <Title>
          Join
        </Title>

        <RegistrationForm validation_token={token} />
      </CenteringBox>
    );
  }
}
