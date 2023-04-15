import React, { useEffect, useState } from 'react'
import { Box, InputLabel, MenuItem, Select, Slider, Stack, TextField, Typography } from '@mui/material';
import Loader from '../components/Loader'
import { Link } from 'react-router-dom';
import { makeStyles } from "@material-ui/core/styles";
import Typewriter from 'typewriter-effect';
import {
  Configuration,
  OpenAIApi
} from 'openai'
import {moke_string } from '../const/index.js'


const configuration = new Configuration({
  apiKey: process.env.REACT_APP_API_KEY
});

const openai = new OpenAIApi(configuration);

const useStyles = makeStyles({
  root: {
    color: "#ffffffc0",
    "& .MuiSlider-thumb": {
      backgroundColor: "#ffffff",
      opacity: 1,
    },
    "& .MuiSlider-track": {
      opacity: 0.2,
    },
  },

  outlinedInput: {
    "&:hover $notchedOutline": {
      borderColor: "red",
    },
    "&$focused $notchedOutline": {
      borderColor: "red",
    },
  },
  notchedOutline: {},
  focused: {},
});


const formDatas = {
    fitnessLevel : 'Beginner',
    height : '',
    weight : '',
    goalWeight : '',
    age : 0,
    gender : 'Female',
    howManyWorkouts : 0,
    whereWorkout : 'Gym',
    topGymGoal : 'Lose weight',
    secondGymGoal : 'Build muscle',
    sleep : '',
    medicalHistory : '',
    stressLevel : 0,
}




const WorkoutAI = ({setProgress}) => {

  setProgress(100)

  const [formValues, setFormValues] = useState(formDatas);
  const [loading, setLoading] = useState(false)
  const [workout, setWorkout] = useState([])
  const [ikeMessage, setIKEMessage] = useState("")
  const classes = useStyles();
  const handleChange = (e) => {
    const {name, value} = e.target
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const getFormatedData = async(string)=>{
    const split2 = string.trim().split('\n\n')
    const day_array  = []
    const exercise_Array = []
    split2.map((item,i)=>{
        const day = item.trim().split('\n')
        if(day.length===1 && day[0].length<10){
            day_array.push(day)
        }else{
            exercise_Array.push(day)
        }
    })
    const workoutDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    const result = exercise_Array.reduce((acc, workout, index)=>{
        acc.push({
            day: workoutDays[index],
            workout: workout.map((exercise) => exercise.trim())
          });
          return acc;
    },[])

    setWorkout(result)

}

// const handleVideos = async(exercise)=>{

// }


  // console.log(workout)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    const {
    fitnessLevel,height,weight,goalWeight,age,gender,howManyWorkouts,whereWorkout,topGymGoal,secondGymGoal,sleep,medicalHistory,stressLevel,
  } = formValues;

    const prompt = `
    Generate a workout plan for a ${gender.toLowerCase()} who is ${age} years old, ${height} tall, weighs ${weight}, and has a goal weight of ${goalWeight}. They are a ${fitnessLevel.toLowerCase()} fitness level and want to work out ${howManyWorkouts} times a week at ${whereWorkout.toLowerCase()}.

  Their top gym goal is to ${topGymGoal.toLowerCase()} and their second gym goal is to ${secondGymGoal.toLowerCase()}.

  They have a stress level of ${stressLevel} and sleep for ${sleep} hours a night.

  Based on their medical history, which includes ${medicalHistory}, create a workout plan that focuses on ${topGymGoal.toLowerCase()}. The plan should be designed to help them achieve their goal weight, taking into account their fitness level and any limitations from their medical history. 

  Provide a detailed workout plan that includes exercises, sets, reps, and rest times. Ensure that the plan is challenging but also realistic and achievable for the user. 

  Generate the output with Proper format, this format is - 
  Day Name (Ex- Monday), then next line -
  Workouts Name - set's, reps, rest

  Day Name (Tuesday)
  Workouts Name - Set's, Reps, Rest
    `
    try {
      const res = await openai.createCompletion({
        model : "text-davinci-003",
        prompt : `${prompt}`,
        temperature : 0,
        max_tokens : 3000,
        top_p : 1,
        frequency_penalty : 0.5,
        presence_penalty : 0,
    });
      getFormatedData(res.data.choices[0].text)
      setLoading(false)
    } catch (error) {
      console.error(error);
      setIKEMessage("We are getting lot's of request please try again later, till then explore exercises in exercise section")
      setLoading(false)
    }
  };


    
  return (
    <>
       <Box className="motivation_ai">
          <div className="message_ai">AI WORK<span className="out_blue">O</span>UT PLAN</div>

          <div className="message_ai_sub">AI Workout plan will help you generate best workout plan by analyzing your Fitness goals, body measures, daily habits, health issues, nutrition intake, activity level etc.
          This is the most powerful AI generated workout plan you will find on internet.
          </div>


         <div className="form_ai">
         <form onSubmit={handleSubmit}>
          <Stack spacing={2} mt={3}>
          <InputLabel
          className='make_me_white' id="demo-simple-select-label">1. Fitness Level</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={formValues.fitnessLevel}
              label="Fitness Level"
              name="fitnessLevel"
              onChange={handleChange}
              className='input_select_wplan'
            >
              <MenuItem className="options" value="Beginner">Beginner (0-1) Years Experience</MenuItem>
              <MenuItem className="options" value="Intermediate">Intermediate (1-3) Years Experience</MenuItem>
              <MenuItem className="options" value="Advanced">Advanced (3-5) Years Experience</MenuItem>
              <MenuItem className="options" value="Expert">Expert (5+) Years Experience</MenuItem>
            </Select>


          <InputLabel
            className='make_me_white' id="demo-simple-select-label">2. Enter Your Height</InputLabel>
            <TextField
            name="height" classes={{ notchedOutline: classes.notchedOutline, focused: classes.focused }} className="make_me_border" id="outlined-basic" value={formValues.height} onChange={handleChange} placeholder="e.g. 181CM or 5'11" />


          <InputLabel
            className='make_me_white' id="demo-simple-select-label">3. Enter Your Weight</InputLabel>
          <TextField
            name="weight"
            className="make_me_border"
            id="outlined-basic"
            value={formValues.weight}
            onChange={handleChange}
            placeholder="e.g. 72KG or 154LBS."
            variant="outlined"
            InputProps={{ style: { outline: "none" } }}
          />

          <InputLabel
            className='make_me_white' id="demo-simple-select-label">4. Enter Your Target Weight</InputLabel>
            <TextField
            name="goalWeight" className="make_me_border" id="outlined-basic" value={formValues.goalWeight} onChange={handleChange} placeholder="72KG or 154LBS." variant="outlined" />

          <InputLabel
            className='make_me_white' id="demo-simple-select-label">5. Enter Your Age</InputLabel>
           <TextField
            name="age" className="make_me_border" id="outlined-basic" value={formValues.age} onChange={handleChange} placeholder="e.g. 21" variant="outlined" />



  
            <InputLabel
            className='make_me_white' id="demo-simple-select-label">6. Select Your Gender.</InputLabel>

            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={formValues.gender}
              placeholder="e.g. Female"
              name="gender"
              onChange={handleChange}
              className='input_select_wplan'
            >
              <MenuItem className="options" value="Male">Male</MenuItem>
              <MenuItem className="options" value="Female">Female</MenuItem>
              <MenuItem className="options" value="Other">Other</MenuItem>
            </Select>


            <InputLabel
            className='make_me_white' id="demo-simple-select-label">7. Enter how many days a week you can workout -
            <span className="show_the_days">
              {formValues.howManyWorkouts}
            </span>
            </InputLabel>
            
            <Slider
              value={formValues.howManyWorkouts}
              onChange={(e, value) =>
                setFormValues({ ...formValues, howManyWorkouts: value })
              }
              min={0}
              max={7}
              classes={{
              root: classes.root,
            }}
            />;




            <InputLabel
            className='make_me_white' id="demo-simple-select-label">8. Select whether you'll workout in the gym or at home.</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={formValues.whereWorkout}
              placeholder="e.g. Gym"
              name="whereWorkout"
              onChange={handleChange}
              className='input_select_wplan'
            >
              <MenuItem className="options" value="Gym">Gym</MenuItem>
              <MenuItem className="options" value="Home workout - no equipment">Home workout - no equipment</MenuItem>
              <MenuItem className="options" value="Home workout - basic equipment">Home workout - basic equipment</MenuItem>
            </Select>



            <InputLabel
            className='make_me_white' id="demo-simple-select-label">9. Select your top gym goal.</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={formValues.topGymGoal}
              placeholder="Select your top gym goal."
              name="topGymGoal"
              onChange={handleChange}
              className='input_select_wplan'
            >
              <MenuItem className="options" value="Lose weight">Lose weight</MenuItem>
              <MenuItem className="options" value="Build muscle">Build muscle</MenuItem>
              <MenuItem className="options" value="Lean and toned body">Lean and toned body</MenuItem>
              <MenuItem className="options" value="Clean bulk">Clean bulk</MenuItem>
            </Select>


            
            <InputLabel
            className='make_me_white' id="demo-simple-select-label">10. Select your second top gym goal.</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={formValues.secondGymGoal}
              placeholder="Select your second top gym goal."
              name="secondGymGoal"
              onChange={handleChange}
              className='input_select_wplan'
            >
              <MenuItem className="options" value="Lose weight">Lose weight</MenuItem>
              <MenuItem className="options" value="Build muscle">Build muscle</MenuItem>
              <MenuItem className="options" value="Lean and toned body">Lean and toned body</MenuItem>
              <MenuItem className="options" value="Clean bulk">Clean bulk</MenuItem>
            </Select>

            <InputLabel
            className='make_me_white' id="demo-simple-select-label">11. Enter How Much You Sleep</InputLabel>
           <TextField
            name="sleep" className="make_me_border" id="outlined-basic" value={formValues.sleep} onChange={handleChange} placeholder="e.g. 7hr" variant="outlined" />


            
            <InputLabel
            className='make_me_white' id="demo-simple-select-label">12. Enter If Any Medical History</InputLabel>
           <TextField
            name="medicalHistory" className="make_me_border" id="outlined-basic" value={formValues.medicalHistory} onChange={handleChange} placeholder="Asthma, Arthritis, Diabetes, Heart disease, Obesity, Pregnancy etc. If No then type None" variant="outlined" />



          <InputLabel
            className='make_me_white' id="demo-simple-select-label">13. Enter Your Stress Level {formValues.stressLevel} - 
            <span className="show_the_days">
              {formValues.stressLevel === 0 ? "No stress" :
              formValues.stressLevel === 1 ? "Mild stress" :
              formValues.stressLevel === 2 ? "Low stress" :
              formValues.stressLevel === 3 ? "Moderate stress" :
              formValues.stressLevel === 4 ? "Moderately high stress" :
              formValues.stressLevel === 5 ? "High stress" :
              formValues.stressLevel === 6 ? "Very high stress" :
              formValues.stressLevel === 7 ? "Extremely high stress" :
              formValues.stressLevel === 8 ? "Severe stress" :
              formValues.stressLevel === 9 ? "Near breakdown" :
              formValues.stressLevel === 10 ? "Complete breakdown" : ""}
            </span>

            </InputLabel>
            <Slider
              value={formValues.stressLevel}
              onChange={(e, value) =>
                setFormValues({ ...formValues, stressLevel: value })
              }
              min={0}
              max={10}
              classes={{
              root: classes.root,
            }}
            />;

            

            <button className="submit_data" type="submit">Generate Workout Plan</button>
          </Stack>
        </form>
         </div>
       </Box>

       <div className="showWorkout">
       
            {loading ? (
                <div className="loade">
                  <Loader />
                </div>
            ):(
              <>
                {workout ? (
                  <>
                    <div className="workout_show flex justify-center">
                      {workout && (
                        <div className="workout_ai_typewriter flex justify-center">
                        {workout.map((day,i)=>(
                          <>
                            <h4 className="day_of_workout">{day.day}</h4>
                            {day.workout.map((exercise)=>(
                              <p className="main_p_for_workouts">
                              <Link target="_blank" className="actual_workout_workout" to={`/learn/${exercise}`}>{exercise}</Link>
                              </p>
                            ))}
                          </>
                        ))}

                        {/* <Typewriter
                          onInit={(typewriter) => {
                            workout?.map((day)=>{
                              typewriter?.typeString(`<h4 class="day_of_workout">${day.day}</h4>`);
                              
                              day?.workout?.map((exercise)=>{
                                typewriter
                                  .pauseFor(500) // Add a pause between each exercise
                                  .typeString(`<p class="actual_workout_workout"><Link to={'/learn/${exercise}'}>${exercise}</Link></p>`);
                              });
                            });
                            typewriter.callFunction(() => {
                              // Stop the animation when it's finished
                              typewriter.stop();
                            }).start();
                          }}
                          options={{
                            delay: 10, // Set the delay between each character to 10ms
                            loop: false, // Set loop to false to stop the animation when it's finished
                          }}
                        />  */}
                        </div>
                      )}
                    </div>
                  </>
                ):(
                  <>
                    <div className="message_of_more_request">
                      {ikeMessage}
                    </div>
                  </>
                )}
              </>
            )}
       </div>
    </>
  )
}

export default WorkoutAI