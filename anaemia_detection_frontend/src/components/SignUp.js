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
import logo from '../assets/logo-modified.png';


function SignUp({ setLoggedIn }) {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repassword, setRepassword] = useState('');
  const [error, setError] = useState(null);

  const handleFormSubmit = (event) => {
    event.preventDefault();

    axios.post('http://localhost:8000/api/signup/', { firstName, lastName, email, password, repassword })
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
      <AppBar position="sticky" sx={{ backgroundColor: "#4D869C", zIndex: 1000 }}>
        <Toolbar>
          <img src={logo} alt="logo" style={{ marginRight: '10px', height: '40px' }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Anaemia Predictor
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => navigate("/")}
            sx={{
              background: "linear-gradient(45deg, #102C57 30%, #2196F3 90%)",
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

      <Box sx={{ minHeight: '100vh', display: 'flex', backgroundColor: '#ffffff', borderRadius: '.5rem .5rem 0 0' }}>
        <Box sx={{ display: 'flex', flex: '1', justifyContent: 'center', alignItems: 'center', mt:'0' }}>
          <Container maxWidth="sm">
            <form onSubmit={handleFormSubmit}>
              <Typography variant="h4" gutterBottom style={{ textAlign: 'center' }}>
                Sign Up
              </Typography>
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
              <TextField
                margin="normal"
                required
                fullWidth
                name="repassword"
                label="Confirm Password"
                type="password"
                id="repassword"
                autoComplete="new-password"
                value={repassword}
                onChange={(e) => setRepassword(e.target.value)}
              />
              {error && <Typography variant="body1" sx={{ color: 'red', textAlign: 'center', mt: 1, mb: 1 }}>{error}</Typography>}
              <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                <Button
                  variant="contained"
                  type="submit"
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
                  Sign Up
                </Button>
              </Box>
            </form>
            <footer style={{ backgroundColor: '#4D869C', color: 'white', textAlign: 'center', padding: '10px', position: 'fixed', bottom: '0', width: '100%', left:'0' }}>
              &copy; {new Date().getFullYear()} | NanoBiosLab
            </footer>
          </Container>
        </Box>
        <Box sx={{ display: 'flex', flex: '1' }}>
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
            style={{ width: '100%', height: 'auto', minHeight: '100vh' }}
            alt=""
          />
        </Box>
      </Box>
    </>
  );
}

export default SignUp;

