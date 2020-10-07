import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import PrismicDOM from 'prismic-dom';
import { client } from '@/lib/prismic';
import { Document } from 'prismic-javascript/types/documents';

interface ProductProps {
  product: Document;
}

const AddToCartModal = dynamic(() => import('@/components/AddToCartModal'), {
  loading: () => <p>Loading...</p>,
});

export default function Product({ product }: ProductProps) {
  const router = useRouter();
  const [isAddToCartVisible, setIsAddToCartVisible] = useState(false);

  function handleAddToCart() {
    setIsAddToCartVisible(true);
  }

  if (router.isFallback) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>{PrismicDOM.RichText.asText(product.data.title)}</h1>

      <img src={product.data.thumbnail.url} width="300" alt="" />

      <div dangerouslySetInnerHTML={{ __html: PrismicDOM.RichText.asHtml(product.data.description) }} />

      <p>Price: {product.data.price}</p>

      <button type="button" onClick={handleAddToCart}>
        Add to cart
      </button>

      {isAddToCartVisible && <AddToCartModal />}
    </div>
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

  return { props: { product }, revalidate: 5 };
};
