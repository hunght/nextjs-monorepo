import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Toolbar, IconButton, Typography } from '@mui/material';

import { ProfileMenu } from './profile-menu';
type Props = {
  drawerWidthCaculated: number;
  handleMobileDrawerToggle?: () => void;
  handleDrawerToggle?: () => void;
};

export const AppbarContainer: React.FC<Props> = ({
  drawerWidthCaculated,
  handleMobileDrawerToggle,
  handleDrawerToggle,
}) => {
  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${drawerWidthCaculated}px)` },
        ml: { sm: `${drawerWidthCaculated}px` },
      }}>
      <Toolbar>
        {handleMobileDrawerToggle && (
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleMobileDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}>
            <MenuIcon />
          </IconButton>
        )}
        {handleDrawerToggle && (
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { xs: 'none', sm: 'block' } }}>
            <MenuIcon />
          </IconButton>
        )}
        <Typography variant="h6" noWrap component="div">
          Responsive drawer
        </Typography>
        <ProfileMenu />
      </Toolbar>
    </AppBar>
  );
};
