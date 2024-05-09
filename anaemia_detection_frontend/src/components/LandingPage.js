import React, { useEffect } from 'react';
import { Container, Typography, Button, AppBar, Toolbar, Grid, Box, useMediaQuery, useTheme,  Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo-modified.png';
import anaemiaImage from '../assets/anaemia.jpg';

function LandingPage() {
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    useEffect(() => {
        window.scrollTo(0, 0); // Scrolls the page to the top when the component mounts
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        // handle form submission here
    };

    return (
        <>
            <style>
                {`
                    body {
                        background-color: #FAFAFA;
                        margin: 0;
                        padding: 0;
                    }
                    .sticky-app-bar {
                        position: fixed;
                        top: 0;
                        left: 0;
                        width: 100%;
                        z-index: 1000;
                    }
                    .logo {
                        display: flex;
                        align-items: center;
                    }
                    .logo img {
                        height: 32px;
                        margin-right: 8px;
                    }
                    .main-container {
                        padding: ${isMobile ? '50px 0' : '100px 0'};
                        min-height: 100vh;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        background-color: #FAFAFA;
                        border-radius: 0;
                        position: relative;
                        left: 0;
                        right: 0;
                    }
                    .about-container {
                        min-height: 100vh;
                        display: flex;
                        align-items: center;
                        background-color: white;
                        margin-top: 0;
                        margin-bottom: 0;
                        padding: 50px;
                    }
                    .footer {
                        background-color: #4D869C;
                        color: white;
                        text-align: center;
                        padding: 10px;
                        position: fixed;
                        bottom: 0;
                        width: 100%;
                    }
                    .image-container {
                        max-width: 100%;
                    }
                    .image-container img {
                        width: 100%;
                        height: auto;
                        border-radius: 10px;
                    }
                    .content-container {
                        text-align: center;
                        color: #102C57;
                    }
                    .content-container p {
                        color: #102C57;
                    }
                `}
            </style>
            <AppBar position="sticky" className="sticky-app-bar" sx={{ backgroundColor: "#4D869C" }}>
                <Toolbar sx={{ justifyContent: "space-between" }}>
                    <div className="logo">
                        <img src={logo} alt="Logo" />
                        <Typography variant="h6" component="div" sx={{ color: "white" }}>
                            Anaemia Predictor
                        </Typography>
                    </div>
                    <div>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => navigate("/signup")}
                            sx={{
                                background: "linear-gradient(45deg, #102C57 30%, #2196F3 90%)",
                                boxShadow: "0px 3px 5px 2px rgba(63, 81, 181, .3)",
                                color: "white",
                                "&:hover": {
                                    background: "linear-gradient(45deg, #2196F3 30%, #3F51B5 90%)",
                                    boxShadow: "0px 5px 10px 2px rgba(63, 81, 181, .3)",
                                },
                                mr: 1,
                            }}
                        >
                            Sign Up
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => navigate("/signin")}
                            sx={{
                                background: "linear-gradient(45deg, #102C57 30%, #2196F3 90%)",
                                boxShadow: "0px 3px 5px 2px rgba(63, 81, 181, .3)",
                                color: "white",
                                "&:hover": {
                                    background: "linear-gradient(45deg, #2196F3 30%, #3F51B5 90%)",
                                    boxShadow: "0px 5px 10px 2px rgba(63, 81, 181, .3)",
                                },
                                mr: 1,
                            }}
                        >
                            Sign In
                        </Button>

                    </div>
                </Toolbar>
            </AppBar>


            <Container className="main-container">
                <Grid container spacing={4} justifyContent="center" alignItems="center">
                    <Grid item xs={12} md={6} className="image-container">
                        <img src={anaemiaImage} alt="Anaemia Prediction" />
                    </Grid>
                    <Grid item xs={12} md={6} className="content-container">
                        <Typography variant="h3" align="center" gutterBottom>
                            Welcome to Anaemia Predictor
                        </Typography>
                        <Typography variant="h6" align="center" paragraph>
                            This is a website where you can upload your image and we will predict whether you have anemia or not. Our machine learning model is trained to detect anemia from images.
                        </Typography>
                        <Typography variant="body1" align="center" paragraph>
                            Anemia is a condition in which you lack enough healthy red blood cells to carry adequate oxygen to your body's tissues. Having anemia can make you feel tired and weak. There are many forms of anemia, each with its own cause. Anemia can be temporary or long term, and it can range from mild to severe.
                        </Typography>
                        <Typography variant="body1" align="center" paragraph>
                            Our model is designed to detect anemia by analyzing the color of the inner eyelid. This method is non-invasive and can be done easily at home. Please make sure to upload a clear and well-lit image for accurate results.
                        </Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => navigate("/signin")}
                            sx={{
                                background: "linear-gradient(45deg, #102C57 30%, #2196F3 90%)",
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

            <Divider />



            <Box className="about-container">
                <Container maxWidth="md">
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={6}>
                            <Box sx={{ marginTop: 8 }}>
                                <Typography variant="h4" gutterBottom mt={-6}>
                                    Symptoms of Anaemia
                                </Typography>
                                <Typography variant="body1" paragraph>
                                    Anaemia symptoms can vary depending on the cause and severity of the condition. Common signs and symptoms include:
                                </Typography>
                                <Typography variant="body1" paragraph>
                                    - Fatigue or weakness
                                    <br />
                                    - Pale or yellowish skin
                                    <br />
                                    - Irregular heartbeat
                                    <br />
                                    - Shortness of breath
                                    <br />
                                    - Dizziness or lightheadedness
                                    <br />
                                    - Chest pain
                                    <br />
                                    - Cold hands and feet
                                    <br />
                                    - Headache
                                    <br />
                                    - Brittle nails
                                    <br />
                                    - Poor appetite
                                    <br />
                                    - Numbness or tingling in the hands and feet
                                </Typography>
                                <Typography variant="body1" paragraph>
                                    If you experience any of these symptoms, it's essential to consult with your healthcare provider for proper diagnosis and treatment.
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={6} mt={2}>
                            {/* Enlarged image with borderRadius */}
                            <img src="https://www.pathkindlabs.com/sites/default/files/styles/large/public/1-01.jpg" alt="Lab" style={{ width: '600px', height:'520px' }} />
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            <Divider />

            <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', backgroundColor: 'white', mb:'6',  }}>
                <Container maxWidth="md">
                    <Box sx={{ marginTop: 8, textAlign: 'center' }}>
                        <Typography variant="h4" gutterBottom style={{ color: 'black' }}>
                            Developed by NanoBiosLab
                        </Typography>
                        <Typography variant="h6" gutterBottom style={{ color: 'black' }}>
                            About the lab
                        </Typography>
                        <Typography variant="body1" paragraph style={{ color: 'black' }}>
                            NanoBios Lab can be termed as the perfect breather for a passionate researcher. A learning hub where creative ideas are translated into successful simulations with a positive impact. Every candidate is trained resourcefully to lead research projects and contribute towards smooth operational activities of the lab. The lab group members associate with each other as family and believe in achieving success as a unit combining their expertise coming from various disciplines. Our guide (Prof. Srivastava) has always motivated us to explore solutions for the under-researched challenges majorly impacting our country. This is the place where we are empowered to be skilled independent researchers in the future, develop solutions for the healthcare industry and contribute to the maximum towards bringing up a healthier India.
                        </Typography>
                    </Box>
                </Container>
            </Box>

            <footer className="footer">
                <Typography variant="body2" color="inherit">
                    &copy; {new Date().getFullYear()} | NanoBiosLab
                </Typography>
            </footer>
        </>
    );
}

export default LandingPage;
