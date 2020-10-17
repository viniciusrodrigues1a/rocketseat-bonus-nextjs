import { useState, useMemo, FormEvent } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Prismic from 'prismic-javascript';
import PrismicDOM from 'prismic-dom';
import { client } from '@/lib/prismic';
import { Document } from 'prismic-javascript/types/documents';
import { lighten  } from 'polished'
import {
  PseudoBox,
  Box,
  Flex,
  IconButton,
  InputGroup,
  InputRightElement,
  Input,
  Stack,
  List,
  ListItem,
  Image,
  Text,
} from '@chakra-ui/core';

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
              <InputRightElement>
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
              </InputRightElement>
            </InputGroup>
          </Flex>
        </form>
      </Flex>

      <List styleType="none" width="40%" marginX="auto" marginTop="3rem">
        {searchResults.map((product) => {
          return (
            <ListItem key={product.id} marginY="1.5rem">
              <Link href={`/catalog/products/${product.uid}`}>
                <a>
                  <PseudoBox
                    as="div"
                    background="#080809"
                    padding="1rem"
                    borderRadius="15px"
                    _hover={{ background: lighten(0.1, '#080809') }}
                  >
                    <Stack isInline align="center">
                      <Image
                        width="64px"
                        height="64px"
                        src={product.data.thumbnail.url}
                        borderRadius="5px"
                        borderWidth="1px"
                        borderStyle="solid"
                        borderColor="black"
                      />
                      <Text as="span">{PrismicDOM.RichText.asText(product.data.title)}</Text>
                    </Stack>
                  </PseudoBox>
                </a>
              </Link>
            </ListItem>
          );
        })}
      </List>
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
