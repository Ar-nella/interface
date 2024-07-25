 // src/components/Footer.js
import React from 'react';
import { Typography, Box } from '@mui/material';

const Footer = () => (
  <Box mt={5} mb={3}>
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      Reconnaissance de Langue des Signes avec Inception I3D {new Date().getFullYear()}
      {'.'}
    </Typography>
  </Box>
);

export default Footer;
