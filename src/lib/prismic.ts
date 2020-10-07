import Prismic from 'prismic-javascript';

export const apiEndpoint = 'https://rocketseat-nextjs-devcommerce.cdn.prismic.io/api/v2';

export function client(req = null) {
  const options = req ? { req } : null;

  return Prismic.client(apiEndpoint, options);
}
