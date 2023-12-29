import React from 'react';

const ImageButton = ({ imagePath, altText, onClick }) => {
  return (
    <button
      style={{ width: '100%', height: '250px',  overflow: 'hidden', position: 'relative' ,border:'0'}}
      onClick={onClick}
    >
      <img
        src={imagePath}  // imagePath에 이미지 파일의 경로를 전달
        alt={altText}
        style={{ width: '100%', height: '100%', objectFit: 'fill' }}
      />
    </button>
  );
};

export default ImageButton;
