import { Whatshot as HitsIcon, AccountCircle as MyWykopIcon } from '@mui/icons-material';
import { List } from '@mui/material';
import { MouseEventHandler } from 'react';
import { ROUTE } from 'utils/Routes';
import NavItem from './NavItem/NavItem';
import { MainIcon, MikroblogIcon, UpcomingIcon } from './NavItems.styles';

interface NavItemsProps {
  onNavItemClick: MouseEventHandler;
}

const NavItems = ({ onNavItemClick }: NavItemsProps) => (
  <List>
    <NavItem href={ROUTE.HOME} onClick={onNavItemClick} icon={<MainIcon />}>
      Główna
    </NavItem>

    <NavItem href={ROUTE.UPCOMING} onClick={onNavItemClick} icon={<UpcomingIcon />}>
      Wykopalisko
    </NavItem>

    <NavItem href={ROUTE.HITS} onClick={onNavItemClick} icon={<HitsIcon />}>
      Hity
    </NavItem>

    <NavItem href={ROUTE.MIKROBLOG} onClick={onNavItemClick} icon={<MikroblogIcon />}>
      Mikroblog
    </NavItem>

    <NavItem href={ROUTE.MY_WYKOP} onClick={onNavItemClick} icon={<MyWykopIcon />}>
      Mój Wykop
    </NavItem>
  </List>
);

export default NavItems;
