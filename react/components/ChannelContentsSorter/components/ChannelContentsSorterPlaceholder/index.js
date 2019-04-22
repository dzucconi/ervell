import React from 'react';

import Box from 'react/components/UI/Box';
import Text from 'react/components/UI/Text';
import { Container, ThumbPlaceholder } from 'react/components/ChannelContentsSorter/components/ChannelContentsSorterItem';

export default ({ id, type, ...rest }) => (
  <Container borderBottom="1px solid" borderColor="gray.light">
    <ThumbPlaceholder />

    <Box px={6} flex="1" bg="white" display="flex" alignItems="center">
      <Text f={2} color="gray.semiLight">
        Loading...
      </Text>
    </Box>
  </Container>
);
