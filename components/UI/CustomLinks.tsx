export const xd = 'xd';

import { LinkProps as MuiLinkProps, styled, Link as MuiLink } from '@mui/material';
import { MouseEventHandler, PropsWithChildren } from 'react';
import Link, { LinkProps } from 'next/link';

export const UnstyledLink = styled(Link)({
  color: 'inherit',
  textDecoration: 'inherit',
});

const stopPropagation: MouseEventHandler<HTMLElement> = (e) => e.stopPropagation();

export const ExternalNoPropagationLink = ({
  href,
  children,
}: Pick<MuiLinkProps, 'href' | 'children'>) => (
  <MuiLink href={href} onClick={stopPropagation} onMouseUp={stopPropagation} underline='hover'>
    {children}
  </MuiLink>
);

export const NoPropagationLink = ({
  href,
  children,
}: Pick<PropsWithChildren<LinkProps>, 'href' | 'children'>) => (
  <Link href={href} passHref>
    <MuiLink onClick={stopPropagation} onMouseUp={stopPropagation} underline='hover'>
      {children}
    </MuiLink>
  </Link>
);
