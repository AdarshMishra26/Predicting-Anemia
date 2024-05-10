import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import logo from '../assets/logo-modified.png';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

const History = () => {
  const navigate = useNavigate();
  const [predictions, setPredictions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/prediction/history/');
        setPredictions(response.data);
      } catch (error) {
        console.error('Error fetching prediction history:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <AppBar position="sticky" sx={{ top: 0, backgroundColor: "#eebcbc", padding: '5px', zIndex: 1000 }}>
        <Toolbar>
          <img src={logo} alt="logo" style={{ marginRight: '8px', height: '50px' }} />
          <Typography variant="h6" component="div" sx={{ color: "#231651", fontWeight : "800",lineHeight : "20px", flexGrow: 1 }}>
            Anaemia <br/> Predictor
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', flexGrow: 1, gap: '16px' }}>
            <Button
              onClick={() => navigate("/signin")}
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
              Home
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" sx={{ p: 4, mt: 16 }}>
        <Typography variant="h4" gutterBottom style={{ textAlign: 'center', mt: 4, mb: 4 }}>
          Prediction History
        </Typography>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="right">Timestamp</TableCell>
                <TableCell align="right">Result</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {predictions.map((prediction) => (
                <TableRow
                  key={prediction.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {prediction.id}
                  </TableCell>
                  <TableCell align="right">{prediction.timestamp}</TableCell>
                  <TableCell align="right">{prediction.result}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
      <footer style={{ backgroundColor: '#eebcbc', color: '#231651', textAlign: 'center', padding: '10px', position: 'fixed', bottom: '0', width: '100%', fontWeight: '800', left:'0' }}>
        &copy; {new Date().getFullYear()} | NanoBiosLab
      </footer>
    </>
  );
};

export default History;
