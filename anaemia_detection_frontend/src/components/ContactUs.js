import React, { useState } from 'react';
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

function ContactUs() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setSubmitting(true);
      const response = await fetch('http://localhost:8000/contact/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert('Message sent successfully');
        setFormData({ name: '', email: '', message: '' });
      } else {
        const data = await response.json();
        alert(data.error || 'Failed to send message');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to send message');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{  minHeight: '100vh' }}>
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

      <Lottie
        options={hero1}
        height={"100%"}
        width={"100%"}
        isClickToPauseDisabled={true}
        style={{ position: "fixed", top: 0, left: 0, zIndex: -1 }}
      />

      <Container maxWidth="md" sx={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Box sx={{ textAlign: 'center', color: 'black', marginTop: '-100px' }}>
          <Typography variant="h4" gutterBottom>
            Contact Us
          </Typography>
          <Typography variant="body1" paragraph>
            If you have any questions or feedback, please feel free to contact us using the form below.
          </Typography>
          <Card sx={{ backgroundColor: 'white', boxShadow: '0px 4px 8px rgba(0,0,0,0.1)' }}>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  name="name"
                  autoComplete="name"
                  autoFocus
                  value={formData.name}
                  onChange={handleChange}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
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
                  value={formData.message}
                  onChange={handleChange}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="secondary"
                  disabled={submitting}
                  sx={{
                    background: "#231651",
                    color: "white",
                    borderRadius: "1em"
                  }}
                >
                  {submitting ? 'Submitting...' : 'Submit'}
                </Button>
              </form>
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
