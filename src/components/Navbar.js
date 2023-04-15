import React from 'react';
import { Link } from 'react-router-dom';
import { Stack } from '@mui/material';

import Logo from '../assets/images/Logo.png';

const Navbar = () => (
  <Stack direction="row" justifyContent="space-around" sx={{ gap: { sm: '123px', xs: '40px' }, mt: { sm: '32px', xs: '20px' }, justifyContent: 'none' }} px="20px">
    <Link to="/">
      <div className="logo_unenko">
        UKENKO
      </div>
    </Link>
    <Stack
      direction="row"
      gap="40px"
      fontFamily="Alegreya"
      fontSize="24px"
      alignItems="flex-end"
      className='make_me_centere'
    >
      <a href="#exercises" className="make_me_vanish" style={{ textDecoration: 'none', color: '#ffffff' }}>Exercises</a>
      <Link to='/workoutai' className="res_nav" style={{ textDecoration: 'none', color: '#ffffff' }}>WPlan AI</Link>
      <Link to='/calculator' className="res_nav" style={{ textDecoration: 'none', color: '#ffffff' }}>Calculator</Link>
    </Stack>
  </Stack>
);

export default Navbar;
