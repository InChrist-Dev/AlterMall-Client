'use client'
import React from 'react';
import { useEffect } from 'react';
import ImageSlider from './component/ImageSlider';
import CategoryButtons from './component/category';
import Recommend from './component/recommend';

import Cookies from 'js-cookie';
const HomePage = () => {
  useEffect(() => {
    const position= Cookies.get('position');
    if(position=='guest'){
      Cookies.remove('accessToken');
      Cookies.remove('position');
    }
  }, []);

  return (
    <div >
  
      <ImageSlider/>
      <CategoryButtons/>
      <Recommend/>
    </div>
  );
};

export default HomePage;
