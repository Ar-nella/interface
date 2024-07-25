import logo from './logo.svg';
import './App.css';
import React, { useState, useRef } from 'react';
import { Container, Box, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from '@mui/material';
import Header from './components/Header';
import VideoUpload from './components/VideoUpload';
import WebcamCapture from './components/WebcamCapture';
import TranscriptionDisplay from './components/TranscriptionDisplay';
// import Footer from './components/Footer';
import axios from 'axios';

const App = () => {
  const [mode, setMode] = useState('upload');
  const [transcription, setTranscription] = useState('');
  const videoRef = useRef(null);

  const handleModeChange = (event) => {
    setMode(event.target.value);
  };

  const handleUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);

    const response = await axios.post('http://localhost:5000/upload', formData);
    setTranscription(response.data.transcription);
  };

  const handleCapture = async (imageSrc) => {
    const response = await axios.post('http://localhost:5000/capture', { image: imageSrc });
    setTranscription(response.data.transcription);
  };

  const handleRealtimeTranscription = () => {
    const interval = setInterval(async () => {
      if (videoRef.current) {
        const imageSrc = videoRef.current.getScreenshot();
        const response = await axios.post('http://localhost:5000/capture', { image: imageSrc });
        setTranscription(response.data.transcription);
      }
    }, 1000);

    return () => clearInterval(interval);
  };

  return (
    <Container>
      <Header />
      <Box my={4}>
        <FormLabel component="legend">Cette application permet la reconnaissance en temps réel de gestes ou de mots en langue des signes à partir de vidéos. Vous pouvez capturer une vidéo en direct depuis votre webcam ou télécharger une vidéo pour la transcription.</FormLabel>
        <FormControl component="fieldset">
          <FormLabel component="legend">Sélectionnez le mode de capture :</FormLabel>
          <RadioGroup row aria-label="mode" name="mode" value={mode} onChange={handleModeChange}>
            <FormControlLabel value="webcam" control={<Radio />} label="Webcam" />
            <FormControlLabel value="upload" control={<Radio />} label="Téléchargement" />
          </RadioGroup>
        </FormControl>
        <div className="video-transcription-container">
          {mode === 'upload' ? <VideoUpload onUpload={handleUpload} /> : <WebcamCapture onCapture={handleCapture} ref={videoRef} />}
          <TranscriptionDisplay transcription={transcription} />
        </div>
        {mode === 'webcam' && <button onClick={handleRealtimeTranscription}>Start Realtime Transcription</button>}
      </Box>
      {/* <Footer /> */}
    </Container>
  );
};

export default App;
