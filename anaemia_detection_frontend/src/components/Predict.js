// Predict.js
import React, { useState } from 'react';
import axios from 'axios';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AppBar, Toolbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const theme = createTheme();

function Predict() {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('image', image);

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
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <h1>Hello,User</h1>
          <Button
               onClick={() => navigate("/signin")}
            style={{
              backgroundColor: "white",
            }}
          >Logout</Button>
        </Toolbar>

      </AppBar>
      <ThemeProvider theme={theme}>
        <Container maxWidth="sm">
          <Box sx={{ marginTop: 8, textAlign: 'center',

            backgroundColor:"#ececec"
           }}>
            <Typography variant="h4" gutterBottom>
              Anaemia Detection
            </Typography>

            <form onSubmit={handleFormSubmit}>
              <input type="file" onChange={handleImageChange} />
              <Button type="submit" variant="contained" disabled={loading} sx={{ mt: 2 }}>
                {loading ? 'Uploading...' : 'Upload Image'}
              </Button>
            </form>

            {image && (
              <div>
                <Typography variant="h5" sx={{ mt: 4 }}>Image Preview</Typography>
                <img src={URL.createObjectURL(image)} alt="Preview" style={{ maxWidth: '100%' }} />
              </div>
            )}

            {loading && (
              <div>
                <Typography variant="h5" sx={{ mt: 4 }}>Loading...</Typography>
                {/* <Loader type="Puff" color="#00BFFF" height={100} width={100} /> */}
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
        </Container>
      </ThemeProvider>
    </>
  );
}

export default Predict;
