// src/app/components/Sidebar.tsx
"use client";

import React from 'react';
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Box
} from '@mui/material';
import { FaTachometerAlt, FaShoppingCart, FaChartLine, FaUser } from 'react-icons/fa'; // React Icons
import { PiMicrosoftExcelLogoFill } from "react-icons/pi";
import { DOMAIN_FRONT } from '../../../../env';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

export default function Sidebar({ isOpen, toggleSidebar }: SidebarProps) {
  const drawerWidth = 240;

  return (
    <Drawer
      variant="persistent"
      open={isOpen}
      onClose={toggleSidebar}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: '#5B2C7C',
          color: '#fff'
        },
      }}
    >
      <Box sx={{ p: 2 }}>
        <a href={DOMAIN_FRONT+'acceso/'}>
        <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
          ST TRAVEL
        </Typography>
        </a>
      </Box>

      <List className='p-4'>
        <ListItemButton>
          <a href={DOMAIN_FRONT+'acceso/'}>
           <ListItemIcon sx={{ color: '#fff' }}>
             <FaTachometerAlt />
           </ListItemIcon>
          <ListItemText primary="Tours" />
          </a>
        </ListItemButton>

        <ListItemButton>
          <a href={DOMAIN_FRONT+'acceso/'}>
          <ListItemIcon sx={{ color: '#fff',textAlign:'center' }}>
            <FaChartLine />
          </ListItemIcon>
          <ListItemText primary="Revisión" />
          </a>
        </ListItemButton>
        <ListItemButton>
          <a href={DOMAIN_FRONT+'acceso/filtros'}>
          <ListItemIcon sx={{ color: '#fff' }}>
            <PiMicrosoftExcelLogoFill />
          </ListItemIcon>
          <ListItemText primary="Filtros" />
          </a>
        </ListItemButton>
      </List>
    </Drawer>
  );
}
