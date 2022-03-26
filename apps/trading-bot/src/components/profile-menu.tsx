import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';

import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import * as React from 'react';
import { useAppSelector } from 'redux/store';

type ProfileMenu = 'Profile' | 'Account' | 'Logout';

const settings: ProfileMenu[] = ['Profile', 'Account', 'Logout'];

export const ProfileMenu = () => {
  const { session: user } = useAppSelector((state) => state.auth);
  const router = useRouter();

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = (type: ProfileMenu) => {
    if (type === 'Logout') {
      signOut().then((data) => {
        console.log(`==== data signOut ===`);
        console.log(data);
        console.log('==== end log ===');
      });
      return;
    }
    if (type === 'Profile') {
      router.push('/user/profile');
      return;
    }

    setAnchorElUser(null);
  };

  return (
    <div>
      {user && (
        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt="Remy Sharp" src={user.image ?? undefined} />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: '45px' }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}>
            {settings.map((setting) => (
              <MenuItem
                key={setting}
                onClick={() => {
                  handleCloseUserMenu(setting);
                }}>
                <Typography textAlign="center">{setting}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      )}
    </div>
  );
};
