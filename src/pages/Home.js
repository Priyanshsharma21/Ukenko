import React, { useState } from 'react';
import { Box } from '@mui/material';

import Exercises from '../components/Exercises';
import SearchExercises from '../components/SearchExercises';
import HeroBanner from '../components/HeroBanner';

const Home = ({ setProgress }) => {
  const [exercises, setExercises] = useState([]);
  const [bodyPart, setBodyPart] = useState('all');

  return (
    <Box>
      <HeroBanner setProgress={setProgress} />
      <SearchExercises setExercises={setExercises} bodyPart={bodyPart} setBodyPart={setBodyPart} setProgress={setProgress} />
      <Exercises setExercises={setExercises} exercises={exercises} bodyPart={bodyPart} setProgress={setProgress} />
    </Box>
  );
};

export default Home;
