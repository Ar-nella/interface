import axios from 'axios';

const TranscriptionHandler = async (imageSrc) => {
  if (!imageSrc) {
    throw new Error('Image source is required');
  }

  try {
    const response = await axios.post('http://localhost:5000/capture', { image: imageSrc });
    return response.data.transcription;
  } catch (error) {
    console.error('Error in capturing image:', error);
    throw error;
  }
};

export default TranscriptionHandler;
