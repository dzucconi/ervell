import React from 'react';
import styled from 'styled-components';
import { SortableElement } from 'react-sortable-hoc';

import Box from 'react/components/UI/Box';
import Text from 'react/components/UI/Text';
import Truncate from 'react/components/UI/Truncate';

export const Container = styled(Box).attrs({
  border: '1px solid',
  borderColor: 'gray.light',
  bg: 'gray.hint',
  px: 6,
  mb: 3,
})`
  position: relative;
  display: flex;
  align-items: stretch;
  width: 100%;
  overflow: hidden;
  cursor: grab;
  border-radius: 0.25em;
  user-select: none;
  height: ${props => props.theme.space[8]};

  &:hover {
    z-index: 1;
    border-color: ${props => props.theme.colors.gray.medium}
  }
`;

export const ThumbPlaceholder = styled(Box).attrs({
  bg: 'gray.hint',
})`
  width: ${props => props.theme.space[8]};
  height: ${props => props.theme.space[8]};
`;

const Thumb = styled.img`
  display: block;
  width: ${props => props.theme.space[8]};
  height: ${props => props.theme.space[8]};
  background-color: ${props => props.theme.colors.gray.hint};
`;

const ChannelContentsSorterItem = ({ connectable, index, ...rest }) => (
  <Container index={index} {...rest}>
    {connectable.thumb_url ? (
      <Thumb src={connectable.thumb_url} />
    ) : (
      <ThumbPlaceholder />
    )}

    <Box px={6} flex="1" bg="white" display="flex" alignItems="center">
      <Text color="gray.medium" f={2}>
        {(connectable.title || connectable.content) ? (
          <Truncate length={55}>
            {[connectable.title, connectable.content].filter(Boolean).join(', ')}
          </Truncate>
        ) : (
          '—'
        )}
      </Text>
    </Box>
  </Container>
);

export default SortableElement(ChannelContentsSorterItem);
