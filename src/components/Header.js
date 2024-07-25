// src/components/Header.js
import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

const Header = () => (
  <AppBar position="static">
    <Toolbar>
      <Typography variant="h6">Reconnaissance de Langue des Signes avec Inception I3D</Typography>
    </Toolbar>
  </AppBar>
);

export default Header;
