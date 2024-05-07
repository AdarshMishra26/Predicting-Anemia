// SignIn.js
import React, { useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';

function SignIn({ setLoggedIn }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleFormSubmit = (event) => {
    event.preventDefault();

    axios.post('http://localhost:8000/api/signin/', { email, password })
      .then(response => {
        console.log(response.data.message);
        // setLoggedIn(true);
        navigate("/predict");
      })
      .catch(error => {
        console.error('Error signing in:', error);
        setError(error.toString());
      });
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ marginTop: 8, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
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
          {error && <p>{error}</p>}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
        </form>
        <Button
          type="submit"
          fullWidth
          style={{
            backgroundColor: "red",
        }}
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={() => navigate("/signup")}
        >
          Sign Up
        </Button>
      </Box>
    </Container>
  );
}

export default SignIn;
