import { useState, useMemo, FormEvent } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Prismic from 'prismic-javascript';
import PrismicDOM from 'prismic-dom';
import { client } from '@/lib/prismic';
import { Document } from 'prismic-javascript/types/documents';
import { Box, Flex, IconButton, InputGroup, InputRightElement, Input } from '@chakra-ui/core';

interface SearchProps {
  searchResults: Document[];
}

export default function Search({ searchResults }: SearchProps) {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const searchLength = useMemo(() => search.length, [search]);

  function handleSearch(e: FormEvent) {
    e.preventDefault();
    router.push(`/search?q=${encodeURIComponent(search)}`);
    setSearch('');
  }

  return (
    <Box>
      <Flex justify="center" align="center">
        <form onSubmit={handleSearch}>
          <Flex align="center">
            <InputGroup>
              <Input
                type="text"
                placeholder="Procure por um produto"
                backgroundColor="gray.700"
                variant="filled"
                value={search}
                onChange={(e: FormEvent) => setSearch((e.target as HTMLInputElement).value)}
                _hover={{
                  backgroundColor: 'gray.600',
                }}
                _active={{}}
                _focus={{
                  backgroundColor: 'purple.700',
                }}
                _placeholder={{
                  color: 'gray.100',
                }}
              />
              <InputRightElement
                children={
                  <IconButton
                    type="submit"
                    aria-label="Search for products"
                    icon="search"
                    variant="ghost"
                    outline="none"
                    color={searchLength >= 3 ? 'purple.500' : 'white'}
                    _hover={{}}
                    _active={{}}
                    _focus={{}}
                  />
                }
              />
            </InputGroup>
          </Flex>
        </form>
      </Flex>

      <Flex justify="center" align="center">
        <ul>
          {searchResults.map((product) => {
            return (
              <li key={product.id}>
                <Link href={`/catalog/products/${product.uid}`}>
                  <a>{PrismicDOM.RichText.asText(product.data.title)}</a>
                </Link>
              </li>
            );
          })}
        </ul>
      </Flex>
    </Box>
  );
}

export const getServerSideProps: GetServerSideProps<SearchProps> = async (context) => {
  const { q } = context.query;

  if (!q) {
    return { props: { searchResults: [] } };
  }

  const searchResults = await client().query([
    Prismic.Predicates.at('document.type', 'product'),
    Prismic.Predicates.fulltext('my.product.title', String(q)),
  ]);

  return {
    props: { searchResults: searchResults.results },
  };
};
