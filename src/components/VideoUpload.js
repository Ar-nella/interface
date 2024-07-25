// src/components/VideoUpload.js
import React from 'react';
import { Button, Box } from '@mui/material';

const VideoUpload = ({ onUpload }) => (
  <Box>
    <input
      accept="video/*"
      style={{ display: 'none' }}
      id="contained-button-file"
      multiple
      type="file"
      onChange={onUpload}
    />
    <label htmlFor="contained-button-file">
      <Button variant="contained" color="primary" component="span">
        Browse files
      </Button>
    </label>
  </Box>
);

export default VideoUpload;
