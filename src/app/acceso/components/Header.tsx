// src/app/components/Header.tsx
"use client";

import React from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Avatar,
  Box,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { FaBars } from 'react-icons/fa'; // React Icon

interface HeaderProps {
  toggleSidebar: () => void;
}

export default function Header({ toggleSidebar }: HeaderProps) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: '#67328c',
        boxShadow: 'none',
        borderBottom: '1px solid #ddd'
      }}
    >
      <Toolbar>
        {isSmallScreen && (
          <IconButton
            color="inherit"
            edge="start"
            onClick={toggleSidebar}
            sx={{ mr: 2 }}
          >
            <FaBars />
          </IconButton>
        )}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          
        </Typography>
        
        {/* Avatar del usuario */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar alt="User Smith" src="/user-avatar.jpg" sx={{ mr: 1 }} />
          <Typography variant="body1">Cerrar Sesión</Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
