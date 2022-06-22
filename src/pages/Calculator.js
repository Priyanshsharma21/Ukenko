import React,{useEffect, useState} from 'react'
import axios from 'axios'
import { Box, Stack, Typography, TextField, Button} from '@mui/material';


const Calculator = ({setProgress}) => {

    const [calculation, setCalculation] = useState({})
    const [weight, setWeight] = useState(75)
    const [height, setHeight] = useState(180)

    const bmiOptions = {
        method: 'GET',
        url: 'https://mega-fitness-calculator1.p.rapidapi.com/bmi',
        params: {weight: `${weight}`, height: `${height}`},
        headers: {
          'X-RapidAPI-Key': '9b4e8da4e0msh4e8f304113b52e5p1e2beajsn9ca950eddec5',
          'X-RapidAPI-Host': 'mega-fitness-calculator1.p.rapidapi.com'
        }
      };

      const handleCalculation = ()=>{
        if(weight && height){
            setProgress(50)
            axios.request(bmiOptions).then(function (response) {
              setCalculation(response.data)
                  setProgress(100)
            }).catch(function (error) {
                console.error(error);
            });
           }else{
            alert("Enter Weight And Height")
           }
      }

    useEffect(()=>{
           handleCalculation()
    },[])

    // console.log(calculation.info.bmi)

  return (
    <Box >
        <div className="container bmi-box">
            <Box position="relative" ml="100px" mb="72px"  sx={{direction:{lg:"row", xs:"column"}}}>
            <TextField
            height="76px"
            sx={{ input: { fontWeight: '700', border: 'none', borderRadius: '4px'  },mt:{xs:"20px",lg:"20px"}, width: { lg: '500px', xs: '600px' }, backgroundColor: '#fff', borderRadius: '40px', mr:"20px" }}
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="Weight in kg's"
            type="number"
            />

            <TextField
            height="76px"
            sx={{ input: { fontWeight: '700', border: 'none', borderRadius: '4px' }, width: { lg: '500px', xs: '600px' }, mt:{xs:"20px",lg:"20px"}, backgroundColor: '#fff', borderRadius: '40px' }}
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="Height in cm's"
            type="number"
            />
            <Button className="search-btn"  sx={{ bgcolor: '#FF2625',ml:{lg:"20px", xs:"0px"} ,color: '#fff',mt:{xs:"20px",lg:"20px"}, textTransform: 'none', width: { lg: '173px', xs: '150px' }, height: '56px',  fontSize: { lg: '20px', xs: '14px' } }} onClick={handleCalculation}>
            Search
            </Button>
        </Box>

        <Stack>
            <Typography sx={{ fontSize: { lg: '24px', xs: '18px' },ml:{xs:"70px"} }} color="#4F4C4C"  textAlign="center" variant="body2">
                Your BMI  -  {calculation?.info?.bmi}
            </Typography>
            <Typography sx={{ fontSize: { lg: '24px', xs: '18px' },ml:{xs:"70px"}  }} color="#4F4C4C"  textAlign="center" variant="body2">
                Health status - {calculation?.info?.health}
            </Typography>
        </Stack>
            
        </div>
    </Box>
  )
}

export default Calculator