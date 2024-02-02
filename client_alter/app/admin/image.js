'use client'
import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';

const ImageWithAnimation = ({ src, onDelete }) => {
  const [loaded, setLoaded] = useState(false);
  const [hovered, setHovered] = useState(false);

  const fade = useSpring({
    opacity: loaded ? (hovered ? 1 : 0.8) : 0,
    transform: loaded ? (hovered ? 'scale(1.05)' : 'scale(1)') : 'scale(0.8)',
    from: { opacity: 0, transform: 'scale(0.8)' },
    
  });
  
  return (
    <div className="image-container">
      <animated.img
        src={src}
        alt=""
        style={fade}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onLoad={() => setLoaded(true)}
      />
   
    </div>
  );
};

export default ImageWithAnimation;
