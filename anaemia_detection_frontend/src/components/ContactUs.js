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

function ContactUs() {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    // handle form submission here
  };

  return (
    <div style={{ backgroundColor: '#0F1214', backgroundImage: "linear-gradient(to right, #0F1214, #121212)", minHeight: '100vh' }}>
      <AppBar position="static" sx={{ backgroundColor: "#333333" }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography variant="h6" component="div">
            Hello, User
          </Typography>
          <Box display="flex" alignItems="center">
            <Button
              variant="contained"
              color="secondary"
              onClick={() => navigate("/predict")}
              sx={{
                background: "linear-gradient(45deg, #3F51B5 30%, #2196F3 90%)",
                boxShadow: "0px 3px 5px 2px rgba(63, 81, 181, .3)",
                color: "white",
                "&:hover": {
                  background: "linear-gradient(45deg, #2196F3 30%, #3F51B5 90%)",
                  boxShadow: "0px 5px 10px 2px rgba(63, 81, 181, .3)",
                },
                mr: 2,
              }}
            >
              Dashboard
            </Button>
            <Button
              onClick={() => navigate("/signin")}
              sx={{
                backgroundColor: "white",
                color: "black",
                "&:hover": {
                  backgroundColor: "grey",
                },
              }}
            >
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Box sx={{ textAlign: 'center', color: 'white' }}>
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
                  sx={{ mt: 3,
                    background: "linear-gradient(45deg, #3F51B5 30%, #2196F3 90%)",
                    boxShadow: "0px 3px 5px 2px rgba(63, 81, 181, .3)",
                    color: "white",
                    "&:hover": {
                      background: "linear-gradient(45deg, #2196F3 30%, #3F51B5 90%)",
                      boxShadow: "0px 5px 10px 2px rgba(63, 81, 181, .3)",
                    },
                  }}
                >
                  Submit
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </div>
  );
}

export default ContactUs;
