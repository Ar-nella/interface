// src/components/WebcamCapture.js
import React, { useRef, useCallback } from 'react';
import Webcam from 'react-webcam';
import { Button, Box } from '@mui/material';

const WebcamCapture = ({ onCapture }) => {
  const webcamRef = useRef(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    onCapture(imageSrc);
  }, [webcamRef, onCapture]);

  return (
    <Box>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width="100%"
      />
      <Button variant="contained" color="primary" onClick={capture}>
        Capture
      </Button>
    </Box>
  );
};

export default WebcamCapture;
