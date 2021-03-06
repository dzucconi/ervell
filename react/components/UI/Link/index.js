import styled from 'styled-components';

import { mixin as boxMixin } from 'react/components/UI/Box';

const Link = styled.a`
  ${boxMixin}
  ${props => props.userSelect && `user-select: ${props.userSelect};`}
`;

Link.defaultProps = {
  role: 'button',
  tabIndex: 0,
};

export default Link;
