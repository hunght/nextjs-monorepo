import type { AlertProps } from '@mui/material/Alert';
import MuiAlert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import Snackbar from '@mui/material/Snackbar';
import Stack from '@mui/material/Stack';

import Toolbar from '@mui/material/Toolbar';

import * as React from 'react';
import { useEffect } from 'react';
import { AppbarContainer } from '../appbar';

import { Sidebar } from './sidebar';

const drawerWidth = 240;

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
  error?: string;
  success?: string;
}
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
export const MainLayout: React.FC<Props> = (props) => {
  const { window, error, success } = props;
  const [open, setOpen] = React.useState(!error);
  useEffect(() => {
    setOpen(!!error);
  }, [error]);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [drawerOpen, setDrawerOpen] = React.useState(true);
  const handleMobileDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const drawerWidthCaculated = drawerOpen ? drawerWidth : 0;
  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };
  return (
    <Box sx={{ display: 'flex' }}>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={error ? 'error' : 'success'}
          sx={{ width: '100%' }}>
          {error ?? success}
        </Alert>
      </Snackbar>
      <CssBaseline />
      <AppbarContainer
        drawerWidthCaculated={drawerWidthCaculated}
        handleDrawerToggle={handleDrawerToggle}
        handleMobileDrawerToggle={handleMobileDrawerToggle}
      />
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidthCaculated }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleMobileDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}>
          <Sidebar />
        </Drawer>
        <Drawer
          variant="persistent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidthCaculated,
            },
          }}
          open={drawerOpen}>
          <Sidebar />
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: `calc(100% - ${drawerWidthCaculated}px)`,
        }}>
        <Toolbar />
        {props.children}
      </Box>
    </Box>
  );
};
