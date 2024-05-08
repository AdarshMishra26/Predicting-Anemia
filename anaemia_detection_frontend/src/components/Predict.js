import React, { useState } from 'react';
import axios from 'axios';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Card, CardContent } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
  },
});

function Predict() {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const captureImage = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      const video = document.createElement('video');
      video.srcObject = stream;
      video.play();

      video.onloadedmetadata = () => {
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas.getContext('2d').drawImage(video, 0, 0);
        stream.getTracks().forEach(track => track.stop());
        const imageUrl = canvas.toDataURL('image/png');
        setImage(imageUrl);
      };
    } catch (error) {
      console.error(error);
      setError(error.toString());
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
  
    const formData = new FormData();
    if (image instanceof File) {
      formData.append('image', image);
    } else {
      const blob = await fetch(image).then(r => r.blob());
      formData.append('image', blob);
    }
  
    axios.post('http://localhost:8000/api/predict/', formData)
      .then(response => {
        setPrediction(response.data.prediction);
        setLoading(false);
      })
      .catch(error => {
        setError(error.toString());
        setLoading(false);
      });
  };
  
  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "#333333" }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Anaemia-Predictor
          </Typography>
          <Box display="flex" justifyContent="space-between">
            <Button
              onClick={() => navigate("/signin")}
              variant="contained"
              sx={{
                background: "linear-gradient(45deg, #3F51B5 30%, #2196F3 90%)",
                boxShadow: "0px 3px 5px 2px rgba(63, 81, 181, .3)",
                color: "white",
                "&:hover": {
                  background: "linear-gradient(45deg, #2196F3 30%, #3F51B5 90%)",
                  boxShadow: "0px 5px 10px 2px rgba(63, 81, 181, .3)",
                },
                marginRight: "1rem"
              }}
            >
              Logout
            </Button>
            <Button
              onClick={() => navigate("/contact")}
              variant="contained"
              sx={{
                background: "linear-gradient(45deg, #3F51B5 30%, #2196F3 90%)",
                boxShadow: "0px 3px 5px 2px rgba(63, 81, 181, .3)",
                color: "white",
                "&:hover": {
                  background: "linear-gradient(45deg, #2196F3 30%, #3F51B5 90%)",
                  boxShadow: "0px 5px 10px 2px rgba(63, 81, 181, .3)",
                },
              }}
            >
              Contact Us
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <ThemeProvider theme={theme}>
        <Box sx={{ backgroundColor: "#0F1214", minHeight: "100vh", py: 8 }}>
          <Container maxWidth="lg">
            <Box display="flex" justifyContent="space-between" sx={{ gap: '2rem' }}>
              {/* Sample Image Card */}
              <Card sx={{ flex: '1', borderRadius: "10px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)",}}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Sample Image to be Uploaded
                  </Typography>
                  <img src="https://miro.medium.com/v2/resize:fit:1400/1*Z-Aqguy-l1cve-gDupTG7A.jpeg" alt="Sample" style={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: "10px" }} />
                </CardContent>
              </Card>

              {/* Anaemia Detection Section */}
              <Box sx={{
                flex: '1', textAlign: 'center',
                backgroundColor: "white", padding: "2rem", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
              }}>
                <Typography variant="h4" gutterBottom>
                  Anaemia Detection
                </Typography>

                <form onSubmit={handleFormSubmit} style={{ marginBottom: "1rem" }}>
                  <input type="file" onChange={handleImageChange} style={{ display: 'none' }} id="image-upload" />
                  <label htmlFor="image-upload">
                    <Button variant="contained" component="span" sx={{ marginBottom: "1rem" }}>
                      Upload Image
                    </Button>
                  </label><br />
                  <Button onClick={captureImage} variant="contained" sx={{ marginRight: "1rem" }}>
                    Capture Image
                  </Button>
                  <Button type="submit" variant="contained" disabled={loading} sx={{ marginLeft: "1rem" }}>
                    {loading ? 'Uploading...' : 'Predict'}
                  </Button>
                </form>

                {image && (
                  <div>
                    <Typography variant="h5" sx={{ mt: 4 }}>Image Preview</Typography>
                    {typeof image === 'string' ? (
                      <img src={image} alt="Preview" style={{ width: '100%', height: '300px', objectFit: 'cover', marginTop: "1rem", borderRadius: "10px" }} />
                    ) : (
                      <img src={URL.createObjectURL(image)} alt="Preview" style={{ width: '100%', height: '300px', objectFit: 'cover', marginTop: "1rem", borderRadius: "10px" }} />
                    )}
                  </div>
                )}

                {loading && (
                  <div>
                    <Typography variant="h5" sx={{ mt: 4 }}>Loading...</Typography>
                  </div>
                )}

                {prediction !== null && !loading && (
                  <div>
                    <Typography variant="h5" sx={{ mt: 4 }}>Prediction</Typography>
                    <Typography variant="body1">{prediction === 0 ? 'Normal' : 'Anaemia'}</Typography>
                  </div>
                )}

                {error && !loading && (
                  <div>
                    <Typography variant="h5" sx={{ mt: 4 }}>Error</Typography>
                    <Typography variant="body1">{error}</Typography>
                  </div>
                )}
              </Box>
            </Box>
          </Container>
        </Box>
      </ThemeProvider>
    </>
  );
}

export default Predict;
