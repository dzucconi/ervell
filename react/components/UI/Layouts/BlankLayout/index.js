// NOTE: Extend this layout when creating new layouts
// Do not put anything here that cannot be put on any page.

import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import LegacyDarkTheme from 'react/components/UI/Layouts/BlankLayout/components/LegacyDarkTheme';
import BaseStyles from 'react/components/UI/Layouts/BlankLayout/components/BaseStyles';
import Description from 'react/components/UI/Head/components/Description';

import analytics from 'react/util/analytics';
import globalKeyboardShortcuts from 'react/util/globalKeyboardShortcuts';

class BlankLayout extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
    history: PropTypes.shape({
      listen: PropTypes.func.isRequired,
    }).isRequired,
  }

  componentDidMount() {
    analytics.initializePage();
    globalKeyboardShortcuts.bind();
    this.unlisten = this.props.history.listen(() =>
      analytics.trackPageView());
  }

  componentWillUnmount() {
    this.unlisten();
    globalKeyboardShortcuts.unbind();
  }

  render() {
    const { children } = this.props;

    return (
      <Fragment>
        <LegacyDarkTheme />
        <BaseStyles />

        <Description>
          Are.na is a social platform for creative and collaborative research.
        </Description>

        {children}
      </Fragment>
    );
  }
}

export default withRouter(BlankLayout);
