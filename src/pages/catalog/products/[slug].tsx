import { useState, useRef } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { GetStaticProps, GetStaticPaths } from 'next';
import PrismicDOM from 'prismic-dom';
import { client } from '@/lib/prismic';
import { Document } from 'prismic-javascript/types/documents';
import formatPrice from '@/utils/formatPrice';
import { Flex, Text, Box, Image } from '@chakra-ui/core';
import { StyledFlex } from '@/styles/pages/product';
import Button from '@/components/Button';
import { lighten } from 'polished';

interface ProductProps {
  product: Document;
}

const AddToCartModal = dynamic(() => import('@/components/AddToCartModal'), {
  loading: () => <p>Loading...</p>,
});

export default function Product({ product }: ProductProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = useRef();

  if (router.isFallback) {
    return (
      <Flex justify="center" align="center">
        <Text as="span">Loading...</Text>
      </Flex>
    );
  }

  return (
    <Box
      marginBottom="1rem"
      background={lighten(0.05, '#121214')}
      padding="2rem"
      borderRadius="15px"
      width="80%"
      maxWidth="1400px"
      marginX="auto"
    >
      <StyledFlex>
        <Image
          src={product.data.thumbnail.url}
          width="300px"
          height="300px"
          alt=""
          borderRadius="5px"
          marginRight="4rem"
        />

        <Flex direction="column" justify="space-between" maxWidth="700px">
          <Text fontSize="1.25rem" as="h1">
            {PrismicDOM.RichText.asText(product.data.title)}
          </Text>

          <Box fontSize="1.10rem">
            <Text
              as="p"
              color="gray.300"
              dangerouslySetInnerHTML={{ __html: PrismicDOM.RichText.asHtml(product.data.description) }}
            />
          </Box>

          <Text as="span">
            Price: <Text as="strong">{product.data.formattedPrice}</Text>
          </Text>

          <AddToCartModal isOpen={isOpen} onClose={onClose} cancelRef={cancelRef} product={product} />
        </Flex>
      </StyledFlex>
      <Button onClick={() => setIsOpen(true)} marginTop="2rem">
        Add to cart
      </Button>
    </Box>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<ProductProps> = async (context) => {
  const { slug } = context.params;

  const product = await client().getByUID('product', String(slug), {});

  product.data.formattedPrice = formatPrice(product.data.price);

  return { props: { product }, revalidate: 5 };
};
