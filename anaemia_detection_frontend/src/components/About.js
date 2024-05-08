import React from 'react';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { useNavigate } from 'react-router-dom';

function About() {
    const navigate = useNavigate();

    return (
        <>
            <AppBar position="static" sx={{ backgroundColor: "#333333" }}>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Anaemia Predictor
                    </Typography>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => navigate("/")}
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
                        Home
                    </Button>

                </Toolbar>
            </AppBar>
            <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', backgroundColor: '#0F1214', mb:'6', backgroundImage: "linear-gradient(to right, #0F1214, #121212)" }}>
                <Container maxWidth="md">
                    <Box sx={{ marginTop: 8, textAlign: 'center' }}>
                        <Typography variant="h4" gutterBottom style={{ color: 'white' }}>
                            About
                        </Typography>
                        <Typography variant="h6" gutterBottom style={{ color: 'white' }}>
                            Developed by NanoBios Lab
                        </Typography>
                        <Typography variant="body1" paragraph style={{ color: 'white' }}>
                            NanoBios Lab can be termed as the perfect breather for a passionate researcher. A learning hub where creative ideas are translated into successful simulations with a positive impact. Every candidate is trained resourcefully to lead research projects and contribute towards smooth operational activities of the lab. The lab group members associate with each other as family and believe in achieving success as a unit combining their expertise coming from various disciplines. Our guide (Prof. Srivastava) has always motivated us to explore solutions for the under-researched challenges majorly impacting our country. This is the place where we are empowered to be skilled independent researchers in the future, develop solutions for the healthcare industry and contribute to the maximum towards bringing up a healthier India.
                        </Typography>
                    </Box>
                </Container>
            </Box>
        </>
    );
}

export default About;
