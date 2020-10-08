import { useCallback } from 'react';
import { Box, Stack, Flex } from '@chakra-ui/core';
import { darken } from 'polished';
import { useRouter } from 'next/router';
import HeaderLink from './HeaderLink';

export default function Header() {
  const router = useRouter();
  const doesRouteMatch = useCallback(
    (route: string): boolean => {
      return route === router.route;
    },
    [router]
  );

  return (
    <Box width="100%" height="4rem" backgroundColor={darken(0.3, '#121214')} marginBottom="4rem">
      <Flex justify="right" align="center" height="100%" marginRight="6rem">
        <Stack isInline spacing={8} shouldWrapChildren>
          <HeaderLink href="/" active={doesRouteMatch('/')}>
            Products
          </HeaderLink>
          <HeaderLink href="/search" active={doesRouteMatch('/search')}>
            Search
          </HeaderLink>
        </Stack>
      </Flex>
    </Box>
  );
}
