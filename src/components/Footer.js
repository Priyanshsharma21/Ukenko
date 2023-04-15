import React from 'react';
import { Box, Stack, Typography } from '@mui/material';

const Footer = () => (
  <Box mt="80px" className='footer'>
    <Stack gap="40px" sx={{ alignItems: 'center' }} flexWrap="wrap" px="40px" pt="24px">
    </Stack>
    <Typography className='my_footer_text' variant="h5" sx={{ fontSize: { lg: '28px', xs: '20px' } }} mt="41px" textAlign="center" pb="40px">YOUTUBE + INSTAGRAM - 
    <a className="my_footer_text_main"target="_blank" rel="noreferrer" href="https://www.youtube.com/@mindbodyps/shorts">@mindbodyPS || Priyansh Sharma </a>
    </Typography>
  </Box>
);

export default Footer;
