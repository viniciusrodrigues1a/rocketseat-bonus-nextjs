import { ReactNode } from 'react';
import Link from 'next/link';
import { Button } from '@chakra-ui/core';
import { lighten } from 'polished';

interface HeaderLinkProps {
  children: ReactNode;
  active: boolean;
  href: string;
}

export default function HeaderLink({ children, active, href }: HeaderLinkProps) {
  return (
    <Link href={href}>
      <Button
        as="a"
        backgroundColor="none"
        color={active ? '#8257e5' : '#ccc'}
        cursor="pointer"
        _hover={{ color: !active && lighten(0.1, '#ccc') }}
        _active={{}}
      >
        {children}
      </Button>
    </Link>
  );
}
