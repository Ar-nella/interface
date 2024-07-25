// src/components/TranscriptionDisplay.js
import React from 'react';
import { Box, Typography } from '@mui/material';

const TranscriptionDisplay = ({ transcription }) => (
  <Box>
    <Typography variant="h6">Transcription:</Typography>
    <Typography variant="body1">{transcription}</Typography>
  </Box>
);

export default TranscriptionDisplay;
