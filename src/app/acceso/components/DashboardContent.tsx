// src/app/components/DashboardContent.tsx
"use client";

import React from 'react';
import { Grid, Card, CardContent, Typography } from '@mui/material';
import { FaChartLine } from 'react-icons/fa'; // React Icons

export default function DashboardContent() {
  return (
    <Grid container spacing={2}>
      {/* Payments Overview */}
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              <FaChartLine /> Payments Overview
            </Typography>
            {/* Aquí puedes integrar tu gráfica */}
            <div style={{ height: 200, backgroundColor: '#f0f0f0' }}>
              <p style={{ textAlign: 'center', paddingTop: '80px' }}>Chart A</p>
            </div>
            <Typography variant="body2" sx={{ mt: 2 }}>
              Received Amount: $45,670.00
            </Typography>
            <Typography variant="body2">
              Due Amount: $32,400.00
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      {/* Profit this week */}
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              <FaChartLine /> Profit this week
            </Typography>
            <div style={{ height: 200, backgroundColor: '#f0f0f0' }}>
              <p style={{ textAlign: 'center', paddingTop: '80px' }}>Chart B</p>
            </div>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
