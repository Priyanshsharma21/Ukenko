import React,{ useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Box } from '@mui/material';
import './App.css';
import LoadingBar from 'react-top-loading-bar'
import ExerciseDetail from './pages/ExerciseDetail';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Quotes from './pages/Quotes';
import Calculator from './pages/Calculator'



const App = () => {
  const [progress,setProgress] = useState(0)

  return (
    <Box width="400px" sx={{ width: { xl: '1488px' } }} m="auto">
      <Navbar />
      <LoadingBar
      color='red'
      progress={progress}
      height="5px"
    />
      <Routes>
      <Route path="/" element={<Home setProgress={(progress)=>{setProgress(progress)}}/>} />
      <Route path="/exercise/:id" element={<ExerciseDetail setProgress={(progress)=>{setProgress(progress)}}/>} />
      <Route path="/motivation" element={<Quotes setProgress={(progress)=>{setProgress(progress)}}/>} />
      <Route path="/calculator" element={<Calculator setProgress={(progress)=>{setProgress(progress)}}/>} />
      </Routes>
      <Footer />
    </Box>
);
}

export default App;
