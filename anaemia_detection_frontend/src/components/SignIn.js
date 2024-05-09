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


function SignIn({ setLoggedIn }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/signin/', { email, password });
      console.log(response.data.message);
      // setLoggedIn(true);
      navigate("/predict");
    } catch (error) {
      console.error('Error signing in:', error);
      setError("Invalid email or password.");
    }
  };

  return (
    <>
      <AppBar position="sticky" sx={{ top: 0, backgroundColor: "#4D869C", zIndex: 1000 }}>
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
                    background: "linear-gradient(45deg, #3F51B5 30%, #2196F3 90%)",
                    boxShadow: "0px 3px 5px 2px rgba(63, 81, 181, .3)",
                    color: "white",
                    "&:hover": {
                      background: "linear-gradient(45deg, #2196F3 30%, #3F51B5 90%)",
                      boxShadow: "0px 5px 10px 2px rgba(63, 81, 181, .3)",
                    },
                    width: '50%', // Adjust button width here
                    mt: 2, // Adjust margin top here
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
          <footer style={{ backgroundColor: '#4D869C', color: 'white', textAlign: 'center', padding: '10px', position: 'fixed', bottom: '0', width: '100%' }}>
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
