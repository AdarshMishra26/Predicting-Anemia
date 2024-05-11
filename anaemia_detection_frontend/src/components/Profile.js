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
import Lottie from 'react-lottie';
import animationData1 from '../assets/background.json';

const hero1 = {
  loop: true,
  autoplay: true,
  animationData: animationData1,
  rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
  }
};

const Profile = () => {
  const [userData, setUserData] = useState({
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    dateJoined: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const fetchData = async () => {
      try {
        const result = await axios.get('http://127.0.0.1:8000/api/profile/', {
          headers: {
            Authorization: `Token ${token}`
          }
        });
        const userData = result.data.response_data[0]; // Accessing the first element of the array
        setUserData({
          id: userData.id,
          firstName: userData.first_name,
          lastName: userData.last_name,
          email: userData.email,
          dateJoined: userData.date_joined,
        });
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };
    fetchData();
  }, []);
  
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
              onClick={() => navigate("/predict")}
              variant="contained"
              sx={{
                background: "#231651",
                color: "white",
                borderRadius: "1em"
              }}
            >
              Dashboard
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Lottie
                options={hero1}
                height={"100%"}
                width={"100%"}
                isClickToPauseDisabled={true}
                style={{ position: "fixed", top: 0, left: 0, zIndex: -1 }}
            />

      <Container maxWidth="sm" sx={{top:0, p: 4, mt: 6 }}>
        <Typography variant="h4" gutterBottom style={{ textAlign: 'center', mt: 4, mb: 4 }}>
          User Profile
        </Typography>
        <form>
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
            InputProps={{
              readOnly: true,
            }}
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
            InputProps={{
              readOnly: true,
            }}
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
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="dateJoined"
            label="Date Joined"
            name="dateJoined"
            autoComplete="dateJoined"
            value={userData.dateJoined}
            InputProps={{
              readOnly: true,
            }}
          />
        </form>
      </Container>
      <footer style={{ backgroundColor: '#eebcbc', color: '#231651', textAlign: 'center', padding: '10px', position: 'fixed', bottom: '0', width: '100%', left: '0' }}>
        &copy; {new Date().getFullYear()} | NanoBiosLab
      </footer>
    </>
  );
};

export default Profile;
