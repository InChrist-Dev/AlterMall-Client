'use client'
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faShoppingCart, faUser, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import ImageButton from './component/imagebutton';

import Link from 'next/link';
import { NextURL } from 'next/dist/server/web/next-url';
import ImageSlider from './component/ImageSlider';
import CategoryButtons from './component/category';
import Recommend from './component/recommend';

const HomePage = () => {


  return (
    <div >
  
      <ImageSlider/>
      <CategoryButtons/>
     {/* <Recommend/> */}
  
     {/* <div style={{border:'0.5px solid #ccc'}}></div> */}
      {/* <Recommend/> */}
    </div>
  );
};

export default HomePage;
