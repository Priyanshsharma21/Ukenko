import React from 'react'
import Card from '@mui/material/Card';
import { Box, Stack, Typography } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import Loader from '../components/Loader'
import { textAlign } from '@mui/system';


const Motivation = ({quote}) => {

  if (!quote.length) return <Loader />;

    
  return (
    <>
       <Box>
       {quote.map((q)=>(
            <Card alignItems="center" sx={{mb:{lg:"30px", xs:"12px"}}}  className="motivation_quotes" style={{boxShadow:"4px 4px 20px gray", backgroundColor:'#ff00003b'}}>
      <CardContent>
        <Typography sx={{ fontSize: { lg: '30px', xs: '20px' } }} fontWeight={700} textTransform="capitalize"  textAlign="center" gutterBottom variant="h5" component="div">
          "{q.author}"
        </Typography>
        <Typography sx={{ fontSize: { lg: '24px', xs: '18px' } }} color="#4F4C4C"  textAlign="center" variant="body2"  >
          {q.quote}
        </Typography>
      </CardContent>
    </Card>
        ))}
       </Box>
    </>
  )
}

export default Motivation