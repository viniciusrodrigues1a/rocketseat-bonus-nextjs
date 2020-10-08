import { ReactNode } from 'react';
import { Button as ChakraButton } from '@chakra-ui/core';

interface ButtonProps {
  children?: ReactNode;
}

export default function Button({ children = null }: ButtonProps) {
  return (
    <ChakraButton
      as="a"
      background="none"
      color="#776fbf"
      border="1px"
      borderColor="#fff"
      borderRadius="4px"
      padding="0.4rem"
      width="100%"
      cursor="pointer"
      _hover={{
        background: '#fff',
        color: '#493fa6',
        borderColor: '#493fa6',
      }}
    >
      {children}
    </ChakraButton>
  );
}

Button.defaultProps = {
  children: null,
};
