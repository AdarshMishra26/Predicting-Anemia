import React, { useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

function SignUp({ setLoggedIn }) {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleFormSubmit = (event) => {
    event.preventDefault();

    console.log('First Name:', firstName);
    console.log('Last Name:', lastName);
    console.log('Email:', email);
    console.log('Password:', password);

    axios.post('http://localhost:8000/api/signup/', { firstName, lastName, email, password })
      .then(response => {
        console.log(response.data.message);
        setLoggedIn(true);
        navigate("/signin");
      })
      .catch(error => {
        console.error('Error signing up:', error);
        setError(error.toString());
      });
  };

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "#333333" }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Anaemia Predictor
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => navigate("/")}
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
            Home
          </Button>
        </Toolbar>
      </AppBar>

      <Box sx={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#0F1214', backgroundImage: "linear-gradient(to right, #0F1214, #121212)" }}>
        <Container maxWidth="sm">
          <Card sx={{ width: '100%', maxWidth: 500, backgroundColor: 'white' }}>
            <CardContent>
              <Typography variant="h4" gutterBottom style={{ textAlign: 'center' }}>
                Sign Up
              </Typography>

              <form onSubmit={handleFormSubmit}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  name="firstName"
                  autoComplete="given-name"
                  autoFocus
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {error && <Typography variant="body1" sx={{ color: 'red', textAlign: 'center', mt: 1, mb: 1 }}>{error}</Typography>}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2,
                    background: "linear-gradient(45deg, #3F51B5 30%, #2196F3 90%)",
                    boxShadow: "0px 3px 5px 2px rgba(63, 81, 181, .3)",
                    color: "white",
                    "&:hover": {
                      background: "linear-gradient(45deg, #2196F3 30%, #3F51B5 90%)",
                      boxShadow: "0px 5px 10px 2px rgba(63, 81, 181, .3)",
                    },
                  }}
                >
                  Sign Up
                </Button>
              </form>

              <Button
                fullWidth
                variant="contained"
                sx={{
                  mt: 2,
                  mb: 2,
                  background: "red",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "darkred",
                  },
                }}
                onClick={() => navigate("/signin")}
              >
                Sign In
              </Button>
            </CardContent>
          </Card>
        </Container>
      </Box>
    </>
  );
}

export default SignUp;
