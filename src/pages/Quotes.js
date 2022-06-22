import React,{useState, useEffect} from 'react'
import { Box } from '@mui/material';
import Motivation from '../components/Motivation'
import axios from 'axios'
import {quotesOption} from '../utils/fetchData'



const Quotes = ({setProgress}) => {

    const [quote, setQuote] = useState([])

    useEffect(()=>{

        setProgress(50)
        axios.request(quotesOption).then(function (response) {
            const data = response.data;
            setQuote(data)
            setProgress(100)

        }).catch(function (error) {
            console.error(error);
        })

    },[quote.id])

    

  return (
    <>
    <Box sx={{mt:{ lg: '96px', xs: '60px'}}}>
         <Motivation quote = {quote} key={quote.id}/>
    </Box>
    </>
  )
}

export default Quotes