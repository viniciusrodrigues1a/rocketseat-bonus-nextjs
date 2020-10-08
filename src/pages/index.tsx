import { GetServerSideProps } from 'next';
import Link from 'next/link';
import SEO from '@/components/SEO';
import Prismic from 'prismic-javascript';
import PrismicDOM from 'prismic-dom';
import { Document } from 'prismic-javascript/types/documents';
import { client } from '@/lib/prismic';
import formatPrice from '@/utils/formatPrice';
import Button from '@/components/Button';
import { Grid, Box, Text } from '@chakra-ui/core';
import ZoomableImage from '@/components/ZoomableImage';

interface HomeProps {
  products: Document[];
}

export default function Home({ products }: HomeProps) {
  return (
    <div>
      <SEO title="DevCommerce, your best e-commerce!" image="boost.png" shouldExcludeTitleSuffix />

      <section>
        <Grid templateColumns="repeat(5, 1fr)" marginX="6rem" gap="1rem">
          {products.map((product) => {
            return (
              <Box width="100%" marginX="auto" marginBottom="3rem" key={product.id}>
                <Box width="100%" height="230px" marginBottom="0.5rem" overflow="hidden">
                  <ZoomableImage src={product.data.thumbnail.list.url} width="100%" height="230px" />
                </Box>

                <Text color="#ccc">{PrismicDOM.RichText.asText(product.data.title)}</Text>

                <Text fontWeight="bold" marginY="0.6rem">
                  {product.data.formattedPrice}
                </Text>

                <Link href={`/catalog/products/${product.uid}`}>
                  <Button>More info</Button>
                </Link>
              </Box>
            );
          })}
        </Grid>
      </section>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const products = await client().query([Prismic.Predicates.at('document.type', 'product')]);

  for (let i = 0; i < products.results.length; i++) {
    const productsData = products.results[i].data;
    productsData.formattedPrice = formatPrice(productsData.price);
  }

  return { props: { products: products.results } };
};
