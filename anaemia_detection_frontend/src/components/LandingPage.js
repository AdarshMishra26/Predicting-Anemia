import React from 'react';
import { Container, Typography, Button, AppBar, Toolbar, Grid, Box, useMediaQuery, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <>
            <style>
                {`
                    body {
                        background-color: #0F1214;
                    }
                `}
            </style>
            <AppBar position="static" sx={{ backgroundColor: "#333333" }}>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Anaemia Predictor
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => navigate("/signup")}
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
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => navigate("/signin")}
                        sx={{
                            background: "linear-gradient(45deg, #3F51B5 30%, #2196F3 90%)",
                            boxShadow: "0px 3px 5px 2px rgba(63, 81, 181, .3)",
                            color: "white",
                            "&:hover": {
                                background: "linear-gradient(45deg, #2196F3 30%, #3F51B5 90%)",
                                boxShadow: "0px 5px 10px 2px rgba(63, 81, 181, .3)",
                            },
                            ml: 1,
                        }}
                    >
                        Sign In
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => navigate("/about")}
                        sx={{
                            background: "linear-gradient(45deg, #3F51B5 30%, #2196F3 90%)",
                            boxShadow: "0px 3px 5px 2px rgba(63, 81, 181, .3)",
                            color: "white",
                            "&:hover": {
                                background: "linear-gradient(45deg, #2196F3 30%, #3F51B5 90%)",
                                boxShadow: "0px 5px 10px 2px rgba(63, 81, 181, .3)",
                            },
                            ml: 1,
                        }}
                    >
                        About
                    </Button>
                </Toolbar>
            </AppBar>

            <Container
                sx={{
                    backgroundColor: '#0F1214',
                    padding: isMobile ? '50px 0' : '100px 0',
                    minHeight: '100vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 0,
                    zIndex: 1,
                    backgroundImage: "linear-gradient(to right, #0F1214, #121212)",
                    position: 'relative',
                    left: 0,
                    right: 0
                }}
                
            >
                <Grid container spacing={4} justifyContent="center" alignItems="center">
                    <Grid item xs={12} md={6}>
                        <Box maxWidth="100%">
                            <img src="https://miro.medium.com/v2/resize:fit:1400/1*Z-Aqguy-l1cve-gDupTG7A.jpeg" alt="Anaemia Prediction" style={{ width: '100%', height: 'auto', borderRadius: "10px" }} />
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h3" align="center" gutterBottom style={{ color: 'white' }}>
                            Welcome to Anaemia Predictor
                        </Typography>
                        <Typography variant="h6" align="center" paragraph style={{ color: 'white' }}>
                            This is a website where you can upload your image and we will predict whether you have anemia or not. Our machine learning model is trained to detect anemia from images.
                        </Typography>
                        <Typography variant="body1" align="center" paragraph style={{ color: 'white' }}>
                            Anemia is a condition in which you lack enough healthy red blood cells to carry adequate oxygen to your body's tissues. Having anemia can make you feel tired and weak. There are many forms of anemia, each with its own cause. Anemia can be temporary or long term, and it can range from mild to severe.
                        </Typography>
                        <Typography variant="body1" align="center" paragraph style={{ color: 'white' }}>
                            Our model is designed to detect anemia by analyzing the color of the inner eyelid. This method is non-invasive and can be done easily at home. Please make sure to upload a clear and well-lit image for accurate results.
                        </Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => navigate("/signin")}
                            sx={{
                                background: "linear-gradient(45deg, #3F51B5 30%, #2196F3 90%)",
                                boxShadow: "0px 3px 5px 2px rgba(63, 81, 181, .3)",
                                color: "white",
                                "&:hover": {
                                    background: "linear-gradient(45deg, #2196F3 30%, #3F51B5 90%)",
                                    boxShadow: "0px 5px 10px 2px rgba(63, 81, 181, .3)",
                                },
                                margin: '0 auto',
                                display: 'block'
                            }}
                        >
                            Try it Now
                        </Button>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
}

export default LandingPage;
