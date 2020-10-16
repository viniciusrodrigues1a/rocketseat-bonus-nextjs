import { Button as ChakraButton, ButtonProps } from '@chakra-ui/core';

export default function Button({ children, ...rest }: ButtonProps) {
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
      {...rest}
    >
      {children}
    </ChakraButton>
  );
}

Button.defaultProps = {
  children: null,
  type: 'button',
};
