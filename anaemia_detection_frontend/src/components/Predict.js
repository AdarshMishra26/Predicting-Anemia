import React, { useState } from 'react';
import axios from 'axios';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Card, CardContent, Menu, MenuItem } from '@mui/material';
import logo from '../assets/logo-modified.png';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Lottie from 'react-lottie';
import animationData1 from '../assets/background.json';
import img1 from '../assets/img_1_1.jpg';

const hero1 = {
    loop: true,
    autoplay: true,
    animationData: animationData1,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
    }
};

const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2',
        },
    },
});

function Predict() {
    const navigate = useNavigate();
    const [image, setImage] = useState(null);
    const [cameraImage, setCameraImage] = useState(null);
    const [prediction, setPrediction] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleImageChange = (event) => {
        setImage(event.target.files[0]);
    };

    const captureImage = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            const video = document.createElement('video');
            video.srcObject = stream;
            video.play();

            video.onloadedmetadata = () => {
                const canvas = document.createElement('canvas');
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                canvas.getContext('2d').drawImage(video, 0, 0);
                stream.getTracks().forEach(track => track.stop());
                const imageUrl = canvas.toDataURL('image/png');
                setCameraImage(imageUrl);
            };
        } catch (error) {
            console.error(error);
            setError(error.toString());
        }
    };

    const handleFormSubmit = async (event, imageSource) => {
        event.preventDefault();
        setLoading(true);
        setError(null);

        let formData = new FormData();
        if (imageSource === 'upload' && image instanceof File) {
            formData.append('image', image);
        } else if (imageSource === 'camera' && cameraImage) {
            const blob = await fetch(cameraImage).then(r => r.blob());
            formData.append('image', blob);
        }

        axios.post('http://localhost:8000/api/predict/', formData)
            .then(response => {
                setPrediction(response.data.prediction);
                setLoading(false);
            })
            .catch(error => {
                setError(error.toString());
                setLoading(false);
            });
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
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
                        Anaemia <br /> Predictor
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', flexGrow: 1, gap: '16px' }}>
                        <Button
                            aria-controls="simple-menu"
                            aria-haspopup="true"
                            onClick={handleClick}
                            variant="contained"
                            sx={{
                                background: "#231651",
                                color: "white",
                                borderRadius: "1em"
                            }}
                            endIcon={<AccountCircleIcon />}
                        >
                            User
                        </Button>
                        <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={() => navigate("/profile")}>Profile</MenuItem>
                            <MenuItem onClick={() => navigate("/history")}>History</MenuItem>
                            <MenuItem onClick={() => navigate("/contact")}>Contact Us</MenuItem>
                            <MenuItem onClick={logout}>Logout</MenuItem>
                        </Menu>
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

            <ThemeProvider theme={theme}>
                <Box sx={{ backgroundColor: "transparent", minHeight: "100vh", py: 8 }}>
                    <Container maxWidth="lg">
                        <Box display="flex" justifyContent="space-between" sx={{ gap: '2rem', position: "relative", zIndex: 1 }}>
                            {/* Sample Image Card */}
                            <Card sx={{ flex: '1', borderRadius: "10px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)", backgroundColor: "#FFFFFF" }}>
                                <CardContent>
                                    <Typography variant="h6" gutterBottom style={{ color: '#102C57' }}>
                                        Sample Image to be Uploaded
                                    </Typography>
                                    <img src={img1} alt="Sample" style={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: "10px" }} />
                                </CardContent>
                            </Card>

                            {/* Predict with Image Card */}
                            <Card sx={{ flex: '1', borderRadius: "10px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)", backgroundColor: "#FFFFFF" }}>
                                <CardContent>
                                    <Typography variant="h6" gutterBottom style={{ color: '#102C57' }}>
                                        Predict with Image
                                    </Typography>
                                    <form onSubmit={(event) => handleFormSubmit(event, 'upload')} style={{ marginBottom: "1rem" }}>
                                        <input type="file" onChange={handleImageChange} style={{ display: 'none' }} id="image-upload" />
                                        <label htmlFor="image-upload">
                                            <Button variant="contained" component="span" sx={{ marginBottom: "1rem", color: '#FFFFFF', backgroundColor: '#102C57' }}>
                                                Upload Image
                                            </Button>
                                        </label><br />
                                        <Button type="submit" variant="contained" disabled={loading} sx={{ marginLeft: "1rem", color: '#FFFFFF', backgroundColor: '#102C57' }}>
                                            {loading ? 'Uploading...' : 'Predict'}
                                        </Button>
                                    </form>
                                    {image && (
                                        <div>
                                            <Typography variant="h5" sx={{ mt: 4, color: '#102C57' }}>Image Preview</Typography>
                                            {typeof image === 'string' ? (
                                                <img src={image} alt="Preview" style={{ width: '100%', height: '300px', objectFit: 'cover', marginTop: "1rem", borderRadius: "10px" }} />
                                            ) : (
                                                <img src={URL.createObjectURL(image)} alt="Preview" style={{ width: '100%', height: '300px', objectFit: 'cover', marginTop: "1rem", borderRadius: "10px" }} />
                                            )}
                                        </div>
                                    )}
                                    {loading && (
                                        <div>
                                            <Typography variant="h5" sx={{ mt: 4, color: '#102C57' }}>Loading...</Typography>
                                        </div>
                                    )}
                                    {prediction !== null && !loading && (
                                        <div>
                                            <Typography variant="h5" sx={{ mt: 4, color: '#102C57' }}>Prediction</Typography>
                                            <Typography variant="body1" style={{ color: '#102C57' }}>{prediction === 0 ? 'Normal' : 'Anaemia'}</Typography>
                                        </div>
                                    )}
                                    {error && !loading && (
                                        <div>
                                            <Typography variant="h5" sx={{ mt: 4, color: '#102C57' }}>Error</Typography>
                                            <Typography variant="body1" style={{ color: '#102C57' }}>{error}</Typography>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>


                            {/* // Predict with Camera Card */}
                            <Card sx={{ flex: '1', borderRadius: "10px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)", backgroundColor: "#FFFFFF" }}>
                                <CardContent>
                                    <Typography variant="h6" gutterBottom style={{ color: '#102C57' }}>
                                        Predict with Camera
                                    </Typography>
                                    <Button onClick={() => captureImage()} variant="contained" sx={{ marginBottom: "1rem", color: '#FFFFFF', backgroundColor: '#102C57' }}>
                                        Capture Image
                                    </Button>
                                    {cameraImage && (
                                        <div>
                                            <Typography variant="h5" sx={{ mt: 4, color: '#102C57' }}>Image Preview</Typography>
                                            <img src={cameraImage} alt="Preview" style={{ width: '100%', height: '300px', objectFit: 'cover', marginTop: "1rem", borderRadius: "10px" }} />
                                            <Button onClick={(event) => handleFormSubmit(event, 'camera')} variant="contained" sx={{ marginTop: "1rem", color: '#FFFFFF', backgroundColor: '#102C57' }}>
                                                Predict
                                            </Button>
                                        </div>
                                    )}
                                    {loading && (
                                        <div>
                                            <Typography variant="h5" sx={{ mt: 4, color: '#102C57' }}>Loading...</Typography>
                                        </div>
                                    )}
                                    {prediction !== null && !loading && (
                                        <div>
                                            <Typography variant="h5" sx={{ mt: 4, color: '#102C57' }}>Prediction</Typography>
                                            <Typography variant="body1" style={{ color: '#102C57' }}>{prediction === 0 ? 'Normal' : 'Anaemia'}</Typography>
                                        </div>
                                    )}
                                    {error && !loading && (
                                        <div>
                                            <Typography variant="h5" sx={{ mt: 4, color: '#102C57' }}>Error</Typography>
                                            <Typography variant="body1" style={{ color: '#102C57' }}>{error}</Typography>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>


                        </Box>
                    </Container>
                </Box>
                <footer style={{ backgroundColor: '#eebcbc', color: '#231651', textAlign: 'center', padding: '10px', position: 'fixed', bottom: '0', width: '100%', fontWeight: '400', }}>
                    &copy; {new Date().getFullYear()} | NanoBiosLab
                </footer>
            </ThemeProvider>
        </>
    );
}

export default Predict;
