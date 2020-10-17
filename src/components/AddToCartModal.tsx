import PrismicDOM from 'prismic-dom';
import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
  Flex,
  Image,
  Text,
} from '@chakra-ui/core';
import { lighten, darken } from 'polished';

export default function addToCartModal({ isOpen, onClose, cancelRef, product }) {
  return (
    <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
      <AlertDialogOverlay />
      <AlertDialogContent
        position="absolute"
        top="50%"
        left="50%"
        transform="translateX(-50%) translateY(-50%)"
        marginY="none"
      >
        <AlertDialogHeader>
          <Text as="span" fontWeight="bold" fontSize="lg" color="black">
            Do you wish to add this item to the cart?
          </Text>
        </AlertDialogHeader>

        <AlertDialogBody>
          <Flex justify="content" align="center">
            <Image
              src={product.data.thumbnail.url}
              width="64px"
              height="64px"
              borderRadius="50%"
              borderWidth="2px"
              borderStyle="solid"
              borderColor="black"
            />
            <Flex direction="column" marginLeft="1rem">
              <Text as="span" fontSize="md" color="black">
                {PrismicDOM.RichText.asText(product.data.title)}
              </Text>
              <Text as="strong" color="black">
                {product.data.formattedPrice}
              </Text>
            </Flex>
          </Flex>
        </AlertDialogBody>
        <AlertDialogFooter>
          <Button
            ref={cancelRef}
            onClick={onClose}
            backgroundColor="#eee"
            color="black"
            border="1px solid #000"
            _hover={{ backgroundColor: darken(0.1, '#eee'), color: '#000' }}
          >
            Cancel
          </Button>
          <Button
            backgroundColor="#493fa6"
            onClick={onClose}
            ml={3}
            _hover={{ backgroundColor: lighten(0.1, '#493fa6') }}
          >
            Confirm
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
