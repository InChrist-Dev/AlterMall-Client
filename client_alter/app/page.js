'use client'
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faShoppingCart, faUser, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const HomePage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? 2 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 2 ? 0 : prevIndex + 1));
  };

  return (
    <div style={{ backgroundColor: '#f5f5f5', padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {/* 상단 내비게이션 */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
        {/* 로고 이미지 */}
        <img src="/logo.png" alt="로고" style={{ width: '180px', height: 'auto' }} />

        {/* 검색 창 */}
        <div style={{ display: 'flex', alignItems: 'center', marginRight: '20px' }}>
          <input
            type="text"
            placeholder="검색어를 입력하세요"
            style={{
              padding: '10px',
              fontSize: '16px',
              border: '2px solid #f12711',
              borderRadius: '5px',
              marginRight: '10px',
              backgroundColor: 'white',
              width: '300px',
            }}
          />
          <button
            style={{
              background: 'linear-gradient(to left, #f12711, #f5af19)',
              color: '#fff',
              padding: '10px 15px',
              fontSize: '16px',
              border: 'none',
              borderRadius: '10px',
              cursor: 'pointer',
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <FontAwesomeIcon icon={faSearch} style={{ marginRight: '5px' }} />
            검색
          </button>
        </div>

        {/* 장바구니 및 유저 아이콘 */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <FontAwesomeIcon icon={faShoppingCart} style={{ fontSize: '24px', cursor: 'pointer', color: '#f12711', marginRight: '10px' }} />
          <FontAwesomeIcon icon={faUser} style={{ fontSize: '24px', cursor: 'pointer', color: '#f12711' }} />
        </div>
      </div>

       {/* 이미지 슬라이더 */}
        {/* 이미지 슬라이더 */}
      <div style={{ width: '100%', overflow: 'hidden', position: 'relative', margin: '20px 0' }}>
        <div
          style={{
            display: 'flex',
            transition: 'transform 0.5s',
            width: '100%',  // 부모 컨테이너의 너비를 이미지의 실제 너비와 일치시킴
            transform: `translateX(-${currentIndex * 100}%)`, // 이미지를 이동시키는 부분
          }}
        >
          {/* 이미지 1 */}
          <img src="/1.jpg" alt="이미지1" style={{ width: '100%', height: '400px', flex: '0 0 auto' }} />

          {/* 이미지 2 */}
          <img src="/2.jpg" alt="이미지2" style={{ width: '100%', height: '400px', flex: '0 0 auto' }} />

          {/* 이미지 3 */}
          <img src="/3.jpg" alt="이미지3" style={{ width: '100%', height: '400px', flex: '0 0 auto' }} />
        </div>

        {/* 화살표 버튼 */}
        <FontAwesomeIcon
          icon={faChevronLeft}
          style={{
            fontSize: '24px',
            cursor: 'pointer',
            color: '#f12711',
            position: 'absolute',
            left: '0',
            top: '50%',
            transform: 'translateY(-50%)',
            backgroundColor: 'rgba(255, 255, 255, 0.5)', 
          }}
          onClick={handlePrev}
        />
        <FontAwesomeIcon
          icon={faChevronRight}
          style={{
            fontSize: '24px',
            cursor: 'pointer',
            color: '#f12711',
            position: 'absolute',
            right: '0',
            top: '50%',
            transform: 'translateY(-50%)',
            backgroundColor: 'rgba(255, 255, 255, 0.5)', 
          }}
          onClick={handleNext}
        />
      </div>
    </div>
  );
};

export default HomePage;
