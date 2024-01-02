// seller.js

import React from 'react';
import styles from './seller.module.css';

const EpisodeItem = ({ episode }) => (
  <div className={styles.episodeItem}>
    {/* 에피소드 아이템 내용 */}
    <p>{episode.title}</p>
    {/* 에피소드 정보 등 */}
  </div>
);

const Carousel = ({ episodes }) => (
  <div className={styles.carousel}>
    {episodes.map((episode, index) => (
      <EpisodeItem key={index} episode={episode} />
    ))}
  </div>
);

const DramaDetailPage = () => {
  // 가상의 에피소드 데이터
  const episodes = [
    { title: '에피소드 1', description: '에피소드 1 설명' },
    { title: '에피소드 2', description: '에피소드 2 설명' },
    // 추가 에피소드 데이터
  ];

  return (
    <div className={styles.container}>
      <div className={styles.backgroundOverlay }>
        <img className={styles.backgroundImage} src='squid.jpg'/>
      </div>
      <div className={styles.content}>
        <h1 className={styles.title}>사장님가게로고: 무슨사장님</h1>
        <button className={styles.subscribeButton}>구독</button>
        <p className={styles.description}>가게 설명 Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
        <Carousel episodes={episodes} />
      </div>
    </div>
  );
};

export default DramaDetailPage;
