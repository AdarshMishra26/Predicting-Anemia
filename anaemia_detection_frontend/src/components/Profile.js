import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [userData, setUserData] = useState({
    id: '',
    firstName: '',
    lastName: '',
    email: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios('http://localhost:8000/api/user/profile/');
      setUserData({
        id: result.data.id,
        firstName: result.data.first_name,
        lastName: result.data.last_name,
        email: result.data.email,
      });
    };
    fetchData();
  }, []);

  const handleInput = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.put('http://localhost:8000/api/user/profile/', userData);
    alert('User profile updated successfully');
  };

  return (
    <>
      <AppBar position="sticky" sx={{ backgroundColor: "#4D869C", zIndex: 1000 }}>
        <Toolbar>
          {/* Add your logo here */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Anaemia Predictor
          </Typography>
          <Button
            onClick={() => navigate("/signin")}
            variant="contained"
            sx={{
              background: "linear-gradient(45deg, #102C57 30%, #2196F3 90%)",
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
              background: "linear-gradient(45deg, #102C57 30%, #2196F3 90%)",
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
        </Toolbar>
      </AppBar>
      <Container maxWidth="sm" sx={{ p: 4, mt: 16 }}>
        <Typography variant="h4" gutterBottom style={{ textAlign: 'center', mt: 4, mb: 4 }}>
          User Profile
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="firstName"
            label="First Name"
            name="firstName"
            autoComplete="firstName"
            autoFocus
            value={userData.firstName}
            onChange={handleInput}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="lastName"
            label="Last Name"
            name="lastName"
            autoComplete="lastName"
            value={userData.lastName}
            onChange={handleInput}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={userData.email}
            onChange={handleInput}
          />
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
              Update
            </Button>
          </Box>
        </form>
      </Container>
      <footer style={{ backgroundColor: '#4D869C', color: 'white', textAlign: 'center', padding: '10px', position: 'fixed', bottom: '0', width: '100%', left:'0' }}>
        &copy; {new Date().getFullYear()} | NanoBiosLab
      </footer>
    </>
  );
};

export default Profile;
