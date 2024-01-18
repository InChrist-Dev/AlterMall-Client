// seller.js
'use client'
import React, { useState, useEffect } from 'react';
import styles from './seller.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import YouTube, { YouTubeProps } from 'react-youtube';
import { Link } from 'react-router-dom';

const DramaDetailPage = () => {


  const [products, setProducts] = useState(['dd','dd']);
  const [isSubscribed, setSubscribed] = useState(false);
  const handleSubscribeClick = () => {
    setSubscribed(!isSubscribed);
  };
  const [episodesImage, setEpisodesImage] = useState([
    '/food/ham.jpg', '/food/chicken.jpg', '/food/nack.jpg', '/food/pizza.jpg', '/food/ham.jpg', '/food/chicken.jpg', '/food/nack.jpg', '/food/pizza.jpg',
  ]);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [sellerName, setSellerName] = useState('');
  const [sellerImg, setSellerImg] = useState('');
  const transformValue = `translateX(${-currentSlide * 420}px)`; // 에피소드 카드의 너비(200px) + 간격(20px)을 기준으로 계산

  const fetchData = async () => {
    try {
      const response = await fetch(`http://211.45.170.37:3000/user/seller/detail/080e2550-b3a3-11ee-aa99-992d88953757`);
      const data = await response.json();

      // 데이터를 성공적으로 가져왔을 때 처리 로직을 추가합니다.
      setSellerName(data.data.SellerDetail.img);
      console.log(data.data.Items)
      setProducts(data.data.Items)

      // 데이터를 state로 업데이트하는 로직을 추가합니다.
      // 예를 들어, setCategoryName(data.data.items.map(item => item.item_name));
      // 필요한 모든 state를 업데이트해야 합니다.
    } catch (error) {
      console.error('데이터를 불러오는 중 오류가 발생했습니다:', error);
    }
  };

  // useEffect 안에서 fetchData 함수를 호출합니다.
  useEffect(() => {
    fetchData();
  }, []);
  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === products.length - 1 ? 0 : prevSlide + 1));
  };


  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === 0 ? products.length - 1 : prevSlide - 1));
  };

  return (
    <div className={styles.container}>
      <div className={styles.background}></div>
      <div className={styles.content}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <h1 className={styles.title}><img className={styles.logo} src='/logos.png'></img> 김프리 사장님</h1>
            <button
              className={styles.subscribeButton}
              onClick={handleSubscribeClick}
            >
              <FontAwesomeIcon icon={isSubscribed ? solidHeart : regularHeart} />
            </button>
            <p className={styles.description}>
              저희 카페는 글루텐프리 쿠키와 케이크, 제로 음료만을 취급합니다. 제가 이 가게를 차리게 된 계기는 이러이러합니다.저희 카페는 글루텐프리 쿠키와 케이크, 제로 음료만을 취급합니다. 제가 이 가게를 차리게 된 계기는 이러이러합니다.저희 카페는 글루텐프리 쿠키와 케이크, 제로 음료만을 취급합니다. 제가 이 가게를 차리게 된 계기는 이러이러합니다.
            </p>

          </div>

          <YouTube className={styles.youtube}
            videoId="2g811Eo7K8U"
            opts={{
              width: "610",
              height: "350",
            }}
            onEnd={(e) => {
              e.target.stopVideo(0);
            }}
          />

        </div>


        <div className={styles.episodeContainer}>
          <h2 className={styles.episodeTitle}>음식 목록</h2>
          <div className={styles.episodeSlider} style={{ transform: transformValue }}>
            {products.map((products, i) => (
              <div key={i} className={styles.episodeCard}>
                <a href={`/products/${products.item_id}`}>
                <img className={styles.episodeImage} src={`http://211.45.170.37:3000/${products.img}`} />
                </a>
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
