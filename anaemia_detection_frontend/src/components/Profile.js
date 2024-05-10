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
import logo from '../assets/logo-modified.png';

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
      try {
        const token = localStorage.getItem('token');
        const result = await axios.get('http://localhost:8000/api/user/profile/', {
          headers: {
            Authorization: `Token ${token}`
          }
        });
        setUserData({
          id: result.data.id,
          firstName: result.data.first_name,
          lastName: result.data.last_name,
          email: result.data.email,
        });
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };
    fetchData();
  }, []);

  const handleInput = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put('http://localhost:8000/api/user/profile/', userData, {
        headers: {
          Authorization: `Token ${token}`
        }
      });
      alert('User profile updated successfully');
    } catch (error) {
      console.error('Error updating user profile:', error);
    }
  };
  const logout = () => {
    localStorage.removeItem("IS_LOGED");
    navigate("/");
  }
  return (
    <>
      <AppBar position="sticky" sx={{ top: 0, backgroundColor: "#eebcbc", padding: '5px', zIndex: 1000 }}>
        <Toolbar>
          <img src={logo} alt="logo" style={{ marginRight: '8px', height: '50px' }} />
          <Typography variant="h6" component="div" sx={{ color: "#231651", fontWeight: "800", lineHeight: "20px", flexGrow: 1 }}>
            Anaemia <br />Predictor
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', flexGrow: 1, gap: '16px' }}>
            <Button
              onClick={logout}
              variant="contained"
              sx={{
                background: "#231651",
                color: "white",
                borderRadius: "1em"
              }}
            >
              Logout
            </Button>
            <Button
              onClick={() => navigate("/contact")}
              variant="contained"
              sx={{
                background: "#231651",
                color: "white",
                borderRadius: "1em"
              }}
            >
              Contact Us
            </Button>
          </Box>
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
                background: "#231651",
                color: "white",
                borderRadius: "1em"
              }}
            >
              Update
            </Button>
          </Box>
        </form>
      </Container>
      <footer style={{ backgroundColor: '#eebcbc', color: '#231651', textAlign: 'center', padding: '10px', position: 'fixed', bottom: '0', width: '100%', left: '0' }}>
        &copy; {new Date().getFullYear()} | NanoBiosLab
      </footer>
    </>
  );
};

export default Profile;
