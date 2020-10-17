import styled from 'styled-components';
import { Flex } from '@chakra-ui/core';

export const StyledFlex = styled(Flex)`
  flex-direction: row;

  @media (max-width: 1076px) {
    flex-direction: column;

    img {
      margin-right: auto;
      margin-left: auto;
      margin-bottom: 3rem;
    }

    h1 {
      text-align: center;
      margin-bottom: 1.5rem;
    }

    span {
      margin-top: 1.5rem;
    }
  }
`;
