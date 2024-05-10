import React from 'react';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import logo from '../assets/logo-modified.png';

function ContactUs() {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    // handle form submission here
  };

  return (
    <div style={{ backgroundColor: 'white', minHeight: '100vh' }}>
      <AppBar position="sticky" sx={{ top: 0, backgroundColor: "#eebcbc", padding: '5px', zIndex: 1000 }}>
        <Toolbar>
          <img src={logo} alt="logo" style={{ marginRight: '8px', height: '50px' }} />
          <Typography variant="h6" component="div" sx={{ color: "#231651", fontWeight: "800", lineHeight: "20px", flexGrow: 1 }}>
            Anaemia <br /> Predictor
          </Typography>
          <Box display="flex" alignItems="center">
            <Button
              variant="contained"
              color="secondary"
              onClick={() => navigate("/predict")}
              sx={{
                background: "#231651",
                color: "white",
                borderRadius: "1em",
                marginRight: '1em' // Add this line
              }}
            >
              Dashboard
            </Button>
            <Button
              onClick={() => navigate("/signin")}
              sx={{
                background: "#231651",
                color: "white",
                borderRadius: "1em"
              }}
            >
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Box sx={{ textAlign: 'center', color: 'black' }}>
          <Typography variant="h4" gutterBottom>
            Contact Us
          </Typography>
          <Typography variant="body1" paragraph>
            If you have any questions or feedback, please feel free to contact us using the form below.
          </Typography>
          <Card sx={{ backgroundColor: 'white', boxShadow: '0px 4px 8px rgba(0,0,0,0.1)' }}>
            <CardContent>
              <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  name="name"
                  autoComplete="name"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="message"
                  label="Message"
                  type="text"
                  id="message"
                  multiline
                  rows={4}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="secondary"
                  sx={{
                    background: "#231651",
                    color: "white",
                    borderRadius: "1em"
                  }}
                >
                  Submit
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Container>

      <footer style={{ backgroundColor: '#eebcbc', color: '#231651', textAlign: 'center', padding: '10px', position: 'fixed', bottom: '0', width: '100%', fontWeight: '400', }}>
        &copy; {new Date().getFullYear()} | NanoBiosLab
      </footer>
    </div>
  );
}

export default ContactUs;
