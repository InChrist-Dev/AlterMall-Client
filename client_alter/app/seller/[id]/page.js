// seller.js
'use client'
import React, { useState, useEffect } from 'react';
import styles from './seller.module.css';
import YouTube from 'react-youtube';


const DramaDetailPage = (props) => {
      
  
  const [products, setProducts] = useState([]);
  const [isSubscribed, setSubscribed] = useState(false);
  const [sellerDetail,setSellerDetail] = useState([]);
  const handleSubscribeClick = () => {
    setSubscribed(!isSubscribed);
  };

  const [currentSlide, setCurrentSlide] = useState(0);
const [sellerName, setSellerName] = useState('');
const [seller, setSeller] = useState([]);

  const transformValue = `translateX(${-currentSlide * 420}px)`; // 에피소드 카드의 너비(200px) + 간격(20px)을 기준으로 계산

  const fetchData = async () => {
    try {
      const response = await fetch(`https://altermall.site/user/seller/detail/${props.params.id}`);
      const data = await response.json();
   
      // 데이터를 성공적으로 가져왔을 때 처리 로직을 추가합니다.
      console.log(data.data)
      setSeller(data.data)
      setProducts(data.data.Items)
      setSellerName(data.data.User.name);

      setSellerDetail(data.data.SellerDetail);

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
      <div className={styles.background} style={{background: `linear-gradient(rgba(0,0,0 , 0), rgba(0, 0, 0, 1)), url('http://altermall.site/${sellerDetail.img}') center/cover`}}></div>
      <div className={styles.content}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex'}}>
            <img className={styles.logo} src={`https://altermall.site/${sellerDetail.logo}`}></img>
          <h1 className={styles.title}> {sellerName} 사장님</h1>
            </div>
      
          
  
    <p className={styles.slogan}>
        "{sellerDetail.title}"
        </p>
        <div style={{'height':'50px'}}></div>
        <div className={styles.talk} dangerouslySetInnerHTML={{ __html: sellerDetail.content }} />

   

          </div>
{/* 
        <YouTube className={styles.youtube}
    videoId="2g811Eo7K8U"
    opts={{
              width: "610",
    height: "350",
  }}
    onEnd={(e) => {
      e.target.stopVideo(0);
    }}
/> */}

        </div>
    
    
        <div className={styles.episodeContainer}>
          <h2 className={styles.episodeTitle}>음식 목록</h2>
          <div className={styles.episodeSlider} style={{ transform: transformValue }}>
            {products.map((products, i) => (
              <div key={i} className={styles.episodeCard}>
                <a href={`/products/${products.item_id}`}>
                <img className={styles.episodeImage} src={`https://altermall.site/${products.img}`} />
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
