import MailIcon from '@mui/icons-material/Mail';

import InboxIcon from '@mui/icons-material/MoveToInbox';

import Divider from '@mui/material/Divider';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import { useRouter } from 'next/router';

import * as React from 'react';
type Menu = { name: string; url: string };
export const Sidebar: React.FC = () => {
  const menuArray: Menu[] = [
    { name: 'Bots', url: '/trading-bot' },
    { name: 'API', url: '/public-api' },
    { name: 'Billing', url: '/billing' },
    { name: 'Profile', url: '/user/profile' },
  ];
  const router = useRouter();
  return (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {menuArray.map(({ name, url }, index) => (
          <ListItem
            button
            key={name}
            onClick={() => {
              router.push(url);
            }}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={name} />
          </ListItem>
        ))}
      </List>
      <Divider />
    </div>
  );
};
