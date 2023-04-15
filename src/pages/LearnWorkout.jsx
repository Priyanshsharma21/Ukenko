import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { exerciseOptions, fetchData, youtubeOptions } from '../utils/fetchData';
import { Box } from '@mui/material';
import ExerciseVideos from '../components/ExerciseVideos';


const LearnWorkout = ({setProgress}) => {
    const [exerciseVideos, setExerciseVideos] = useState([]);
    setProgress(100)
    const { workoutId } = useParams()
    const mainWorkoutName = workoutId.split("-")[0]

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    
        const fetchExercisesData = async () => {
          const youtubeSearchUrl = 'https://youtube-search-and-download.p.rapidapi.com';
    
          const exerciseVideosData = await fetchData(`${youtubeSearchUrl}/search?query=${mainWorkoutName} exercise`, youtubeOptions);
          setExerciseVideos(exerciseVideosData.contents);

        };
    
        fetchExercisesData();
      }, []);


      console.log(exerciseVideos)
  return (
    <div className="learn_workout">
         <Box sx={{ mt: { lg: '6px', xs: '30px' } }}>
            <ExerciseVideos exerciseVideos={exerciseVideos} name={mainWorkoutName} limit={20} />
        </Box>
    </div>
  )
}

export default LearnWorkout