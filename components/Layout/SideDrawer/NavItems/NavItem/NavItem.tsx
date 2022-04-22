import { MouseEventHandler, ReactNode } from 'react';
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface NavItemProps {
  children: ReactNode;
  icon: ReactNode;
  href: string;
  onClick: MouseEventHandler;
}

const NavItem = ({ children, icon, href, onClick }: NavItemProps) => {
  const { asPath } = useRouter();

  return (
    <li>
      <Link href={href} passHref>
        <ListItemButton selected={asPath === href} onClick={onClick}>
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText>{children}</ListItemText>
        </ListItemButton>
      </Link>
    </li>
  );
};

export default NavItem;
