import React, { useEffect } from 'react';
import { Container, Typography, Button, AppBar, Toolbar, Grid, Box, useMediaQuery, useTheme, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo-modified.png';
import animationData from '../assets/health.json'
import Lottie from 'react-lottie';
import animationData1 from '../assets/health1.json'

const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
    }
};

const hello = {
    loop: true,
    autoplay: true,
    animationData: animationData1,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
    }
};

function LandingPage() {
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const symptoms = [
        "Fatigue or weakness",
        "Pale or yellowish skin",
        "Irregular heartbeat",
        "Shortness of breath",
        "Dizziness or lightheadedness",
        "Chest pain",
        "Cold hands and feet",
        "Headache",
        "Brittle nails",
        "Poor appetite",
        "Numbness or tingling in the hands and feet"
    ];

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
                        gap: 5px;
                    }
                    .logo img {
                        height: 50px;
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
                        animation: fadeInAnimation 1s ease-in-out;
                        animation-fill-mode: forwards;
                        opacity: 0;
                    }
                    .about-container {
                        min-height: 100vh;
                        display: flex;
                        align-items: center;
                        background-color: white;
                        margin-top: 0;
                        margin-bottom: 0;
                        padding: 50px;
                        animation: fadeInAnimation 1s ease-in-out;
                        animation-fill-mode: forwards;
                        opacity: 0;
                    }
                    .footer {
                        background-color: #eebcbc;
                        color: #231651;
                        text-align: center;
                        padding: 10px;
                        position: fixed;
                        bottom: 0;
                        width: 100%;
                        fontWeight : "800"
                    }
                    .image-container {
                        max-width: 100%;
                        animation: fadeInAnimation 1s ease-in-out;
                        animation-fill-mode: forwards;
                        opacity: 0;
                    }
                    .image-container img {
                        width: 100%;
                        height: auto;
                        border-radius: 10px;
                    }
                    .content-container {
                        text-align: center;
                        animation: fadeInAnimation 1s ease-in-out;
                        animation-fill-mode: forwards;
                        opacity: 0;
                    }
                    .content-container p,.about-container p {
                        text-align: justify;
                    }
                    .action {
                        display: flex;
                        gap: 10px;
                    }
                    @keyframes fadeInAnimation {
                        0% {
                            opacity: 0;
                        }
                        100% {
                            opacity: 1;
                        }
                    }
                    .fade-in-left {
                        animation: fadeInLeft 1s ease-in-out;
                        animation-fill-mode: forwards;
                        opacity: 0;
                    }
                    @keyframes fadeInLeft {
                        0% {
                            opacity: 0;
                            transform: translateX(-50px);
                        }
                        100% {
                            opacity: 1;
                            transform: translateX(0);
                        }
                    }
                `}
            </style>
            <AppBar position="sticky" className="sticky-app-bar" sx={{ backgroundColor: "#eebcbc", padding: "5px" }}>
                <Toolbar sx={{ justifyContent: "space-between" }}>
                    <div className="logo">
                        <img src={logo} alt="Logo" />
                        <Typography variant="h6" component="div" sx={{ color: "#231651", fontWeight: "800", lineHeight: "20px" }}>
                            Anaemia <br /> Predictor
                        </Typography>
                    </div>
                    <div className='action'>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => navigate("/signup")}
                            sx={{
                                background: "#231651",
                                color: "white",
                                borderRadius: "1em"
                            }}
                        >
                            Sign Up
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => navigate("/signin")}
                            sx={{
                                background: "#231651",
                                color: "white",
                                borderRadius: "1em"

                            }}


                        >
                            Sign In
                        </Button>

                    </div>
                </Toolbar>
            </AppBar>


            <Container className="main-container">
                <Grid container spacing={4} justifyContent="center" alignItems="center">
                    <Grid item xs={12} md={6} className="image-container fade-in-left">

                        {/* <img src={anaemiaImage} alt="Anaemia Prediction" /> */}
                        <Lottie options={defaultOptions}
                            height={400}
                            width={400}
                        />
                    </Grid>
                    <Grid item xs={12} md={6} className="content-container fade-in-left">
                        <Typography variant="h2" align="center" gutterBottom>
                            Anaemia Predictor
                        </Typography>
                        <hr />
                        <Typography variant="h6" align="center" paragraph>
                            This is a website where you can upload your image and we will predict whether you have anemia or not. Our machine learning model is trained to detect anemia from images.
                        </Typography>
                        <hr />

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
                                background: "#231651",
                                color: "white",
                                borderRadius: "1em",
                                width: "30%",
                                marginTop: "10px"

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
                            <Box sx={{ marginTop: 1 }}>
                                <Typography variant="h3" gutterBottom mt={-6}>
                                    Symptoms
                                </Typography>
                                <hr />
                                <Typography variant="body1" paragraph>
                                    Anaemia symptoms can vary depending on the cause and severity of the condition. Common signs and symptoms include:
                                </Typography>
                                <Typography variant="body1" paragraph>
                                    <ul>
                                        {symptoms.map((symptom, index) => (
                                            <Typography key={index} variant="body1" paragraph>
                                                <li>    {symptom}.</li>
                                            </Typography>
                                        ))}
                                    </ul>
                                </Typography>
                                <Typography variant="body1" paragraph>
                                    If you experience any of these symptoms, it's essential to consult with your healthcare provider for proper diagnosis and treatment.
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={6} mt={2} className="fade-in-left">
                            {/* Enlarged image with borderRadius */}
                            <img src="https://www.pathkindlabs.com/sites/default/files/styles/large/public/1-01.jpg" alt="Lab" style={{ width: '600px', height: '520px' }} />
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            <Divider />

            <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', backgroundColor: 'white', mb: '6', }}>
                <Container maxWidth="md">
                    <Box>
                        <Typography sx={{ textAlign: 'center' }} variant="h3" gutterBottom style={{ color: 'black' }}>
                            Developed by NanoBiosLab
                        </Typography>
                        <hr />
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div style={{ flex: '1 1 50%', paddingRight: '20px' }} className="fade-in-left">
                                <Typography variant="h5" sx={{ textAlign: 'justify' }} gutterBottom style={{ color: 'black' }}>
                                    About the lab
                                </Typography>
                                <Typography variant="body1" paragraph style={{ color: 'black', textAlign: "justify" }}>
                                    NanoBios Lab can be termed as the perfect breather for a passionate researcher. A learning hub where creative ideas are translated into successful simulations with a positive impact. Every candidate is trained resourcefully to lead research projects and contribute towards smooth operational activities of the lab. The lab group members associate with each other as family and believe in achieving success as a unit combining their expertise coming from various disciplines. Our guide (Prof. Srivastava) has always motivated us to explore solutions for the under-researched challenges majorly impacting our country. This is the place where we are empowered to be skilled independent researchers in the future, develop solutions for the healthcare industry and contribute to the maximum towards bringing up a healthier India.
                                </Typography>
                            </div>
                            <div style={{ flex: '1 1 50%', paddingLeft: '20px' }} className="fade-in-left">
                                <Lottie options={hello} height={400} width={400} />
                            </div>
                        </div>
                    </Box>
                </Container>
            </Box>

            <footer className="footer fade-in-left">
                <Typography variant="body2" >
                    &copy; {new Date().getFullYear()} | NanoBiosLab
                </Typography>
            </footer>
        </>
    );
}

export default LandingPage;
