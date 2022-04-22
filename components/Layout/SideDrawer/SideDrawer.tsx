import { alpha, Divider, Drawer, useTheme } from '@mui/material';
import { MouseEventHandler } from 'react';
import Link from 'next/link';
import NavItems from './NavItems/NavItems';
import * as S from './SideDrawer.styles';
import { ROUTE } from '../../../utils/Routes';

interface SideDrawerProps {
  open: boolean;
  handleToggleSideDrawer: MouseEventHandler;
}

const SideDrawer = ({ open, handleToggleSideDrawer }: SideDrawerProps) => {
  const theme = useTheme();

  return (
    <Drawer
      open={open}
      onClose={handleToggleSideDrawer}
      PaperProps={{
        style: {
          backdropFilter: 'blur(10px)',
          backgroundColor: alpha(theme.palette.background.default, 0.6),
        },
      }}
    >
      <S.DrawerHeader>
        <Link href={ROUTE.HOME}>
          <a onClick={handleToggleSideDrawer}>
            <S.WykopLogo />
          </a>
        </Link>
      </S.DrawerHeader>
      <Divider />
      <S.NavContainer>
        <NavItems onNavItemClick={handleToggleSideDrawer} />
      </S.NavContainer>
      <Divider />
    </Drawer>
  );
};

export default SideDrawer;
