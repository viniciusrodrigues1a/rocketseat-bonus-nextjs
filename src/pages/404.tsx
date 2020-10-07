/* eslint-disable */
import Link from 'next/link';
import { Container } from '../styles/pages/404';

export default function NotFound() {
  return (
    <Container>
      <div>
        <h1>Page not found</h1>
        <p>Are you lost?</p>
        <p>You can go back to home</p>{' '}
        <Link href="/">
          <a>here</a>
        </Link>
      </div>
    </Container>
  );
}
