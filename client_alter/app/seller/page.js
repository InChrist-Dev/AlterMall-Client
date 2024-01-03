// seller.js
'use client'
import React, { useState } from 'react';
import styles from './seller.module.css';

const DramaDetailPage = () => {
  const [episodes, setEpisodes] = useState([
    '햄버거',
    '치킨',
    '낙곱새','피자',
    '햄버거',
    '치킨',
    '낙곱새','피자',
    
  ]);

  const [episodesImage, setEpisodesImage] = useState([
    '/food/ham.jpg','/food/chicken.jpg','/food/nack.jpg', '/food/pizza.jpg',  '/food/ham.jpg','/food/chicken.jpg','/food/nack.jpg', '/food/pizza.jpg', 
  ]);

  const [currentSlide, setCurrentSlide] = useState(0);
  const transformValue = `translateX(${-currentSlide * 420}px)`; // 에피소드 카드의 너비(200px) + 간격(20px)을 기준으로 계산
  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === episodes.length - 1 ? 0 : prevSlide + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === 0 ? episodes.length - 1 : prevSlide - 1));
  };

  return (
    <div className={styles.container}>
      <div className={styles.background}></div>
      <div className={styles.content}>
        <h1 className={styles.title}>타고난 고기 전문가: 백종찬 사장님</h1>
        <button className={styles.subscribeButton}>구독</button>
        <p className={styles.description}>
        우리 고깃집은 육류 프리 고기만 취급합니다.우리 고깃집은 육류 프리 고기만 취급합니다.우리 고깃집은 육류 프리 고기만 취급합니다.우리 고깃집은 육류 프리 고기만 취급합니다.우리 고깃집은 육류 프리 고기만 취급합니다.우리 고깃집은 육류 프리 고기만 취급합니다.우리 고깃집은 육류 프리 고기만 취급합니다.
        </p>
        <div className={styles.episodeContainer}>
          <h2 className={styles.episodeTitle}>음식 목록</h2>
          <div className={styles.episodeSlider} style={{ transform: transformValue }}>
            {episodes.map((episode, i) => (
              <div key={i} className={styles.episodeCard}>
                <img className={styles.episodeImage} src={episodesImage[i]}/>
              </div>
            ))}
          </div>
          <button className={styles.arrowButton} onClick={prevSlide}>
            이전
          </button>
          <button className={styles.arrowButton} onClick={nextSlide}>
            다음 
          </button>
        </div>
      </div>
    </div>
  );
};

export default DramaDetailPage;
