import { getDataFromTree } from 'react-apollo';
import { ServerStyleSheet } from 'styled-components';

import { wrapWithProviders } from 'react/apollo';

export default (client, options = {}) => (Component, props = {}) => {
  const sheet = new ServerStyleSheet();
  const WrappedComponent = wrapWithProviders(client, options)(Component, props);
  sheet.collectStyles(WrappedComponent);
  const styles = sheet.getStyleTags();

  return getDataFromTree(WrappedComponent)
    .then((html) => {
      const state = client.extract();

      return {
        html,
        state,
        styles,
        client,
      };
    });
};
