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
import Link from '@mui/material/Link';
import logo from '../assets/logo-modified.png';

function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/signin/', {
        email: email.trim(),
        password: password.trim()
      });

      // Store the token in local storage
      localStorage.setItem('IS_LOGED', true);
      localStorage.setItem('token', response.data?.token)

      navigate("/predict");
    } catch (error) {
      console.error('Error signing in:', error);
      setError("Invalid email or password.");
    }
  };

  return (
    <>
      <AppBar position="sticky" sx={{ top: 0, backgroundColor: "#eebcbc", padding: '5px', zIndex: 1000 }}>
        <Toolbar>
          <img src={logo} alt="logo" style={{ marginRight: '8px', height: '50px' }} />
          <Typography variant="h6" component="div" sx={{ color: "#231651", fontWeight: "800", lineHeight: "20px", flexGrow: 1 }}>
            Anaemia <br /> Predictor
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate("/")}
            sx={{
              background: "#231651",
              color: "white",
              borderRadius: "1em"
            }}
          >
            Home
          </Button>
        </Toolbar>
      </AppBar>

      <Box sx={{ minHeight: '100vh', display: 'flex', backgroundColor: 'white', }}>
        <Box sx={{ flex: 1 }}>
          <Container maxWidth="sm" sx={{ p: 4, mt: 16 }}>
            <Typography variant="h4" gutterBottom style={{ textAlign: 'center', mt: 4, mb: 4 }}>
              Sign In
            </Typography>
            <form onSubmit={handleFormSubmit}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
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
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {error && <Typography variant="body1" sx={{ color: 'red', textAlign: 'center', mt: 1, mb: 1 }}>{error}</Typography>}
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    background: "#231651",
                    color: "white",
                    borderRadius: "1em"
                  }}
                >
                  Sign In
                </Button>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <Typography variant="body2" color="textSecondary">
                  If New User? <Link href="/signup">Register Here</Link>
                </Typography>
              </Box>
            </form>
          </Container>
          <footer style={{ backgroundColor: '#eebcbc', color: '#231651', textAlign: 'center', padding: '10px', position: 'fixed', bottom: '0', width: '100%', fontWeight: '400', }}>
            &copy; {new Date().getFullYear()} | NanoBiosLab
          </footer>
        </Box>
        <Box sx={{ flex: 1 }}>
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

export default SignIn;
