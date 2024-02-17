import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import Link from 'next/link'; // Import Link from Next.js

export const mainListItems = (
  <React.Fragment>
    <Link href="/" passHref>
      <ListItemButton component="a">
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>
    </Link>

    <Link href="/reports" passHref>
      <ListItemButton component="a">
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
        <ListItemText primary="Reports" />
      </ListItemButton>
    </Link>

    <Link href="/realizations" passHref>
      <ListItemButton component="a">
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Realizations" />
      </ListItemButton>
    </Link>

    <Link href="/provisions" passHref>
      <ListItemButton component="a">
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="Provisions" />
      </ListItemButton>
    </Link>
  </React.Fragment>
);