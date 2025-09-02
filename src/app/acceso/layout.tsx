// src/app/layout.tsx
"use client";

import React, { useState } from 'react';
import { Box, CssBaseline } from '@mui/material';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import './styles/globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Manejo del estado si deseas controlar el sidebar abierto/cerrado
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <html lang="es">
      <body>
        <CssBaseline />
        <Box sx={{ display: 'flex' }}>
          {/* SIDEBAR */}
          <Sidebar
            isOpen={isSidebarOpen}
            toggleSidebar={toggleSidebar}
          />
          
          {/* CONTENIDO PRINCIPAL */}
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              minHeight: '100vh',
              backgroundColor: '#fff',
            }}
          >
            {/* HEADER */}
            <Header toggleSidebar={toggleSidebar} />
            
            {/* CONTENIDO */}
            <Box sx={{ p: 2 }}>
              {children}
            </Box>
          </Box>
        </Box>
      </body>
    </html>
  );
}
