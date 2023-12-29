import React from 'react';

const ImageButton = ({ imagePath, altText, onClick }) => {
  return (
    <button
      style={{ width: '100%', height: '250px', borderRadius: '10px', overflow: 'hidden', position: 'relative' }}
      onClick={onClick}
    >
      <img
        src={imagePath}  // imagePath에 이미지 파일의 경로를 전달
        alt={altText}
        style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '7px' }}
      />
    </button>
  );
};

export default ImageButton;
