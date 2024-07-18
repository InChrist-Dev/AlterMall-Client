'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Slider from "react-slick";
import styles from './category.module.css'; // 스타일링을 위한 CSS 모듈
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ItemPage = (props) => {

  const [page, setPage] = useState(1);
  const [data, setData] = useState([])
  const category = props.params.category;
  console.log(category)
 

  const handleSellerClick = (sellerId) => {
    if (sellerId == 'youngun133@naver.com'|| sellerId == 'janexz') {
      alert('해당 매장은 7/22(월) 정식오픈 예정입니다.');
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch(`https://altermall.site/category/sellers/${category}`);
      const data = await response.json();
      console.log(data)

      setData(data.data.rows)

    } catch (error) {
      console.error('데이터를 불러오는 중 오류가 발생했습니다:', error);
    }
  };

  // useEffect 안에서 fetchData 함수를 호출합니다.
  useEffect(() => {
    fetchData();
  }, []);

  const pageNumbers = [];
  for (let i = 1; i <= page; i++) {
    pageNumbers.push(i);
  }
 // Slider settings
 const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 2.7,
  slidesToScroll: 3
};


  // id에 따라 다른 단어를 설정
  let displayWord;
  switch (category) {
    case 'dessert':
      displayWord = '디저트';
      break;
    case 'salad':
      displayWord = '샐러드';
      break;
    case 'free':
      displayWord = '락토프리';
      break;
    case 'drink':
      displayWord = '음료';
      break;
    default:
      displayWord = '알 수 없는 카테고리';
  }


  

  return (
    <div>
      {data.length > 0 && data.map(data => (
        <div key={data.SellerDetail.id} onClick={() => handleSellerClick(data.SellerDetail.id)}>
          {data.SellerDetail.id !== 'janexz' ||data.SellerDetail.id !== 'youngun133@naver.com'  ? (
            <Link href={`/categories/${category}/category/${data.SellerDetail.id}`} style={{ textDecoration: "none", color: 'black' }}>
              <div className={styles.masterContainer}>
                {/* 기존 컨텐츠 */}
                <div className={styles.banner}>  
                  <div className={styles.intro}>
                    <div className={styles.logoBorder}>
                      <img src={`https://altermall.site/${data.SellerDetail.logo}`} className={styles.logo} alt={data.User.name} />
                    </div>
                    <h1 className={styles.name}>{data.User.name}</h1>
                  </div>
                  <div className={styles.plus}>
                    더보기 
                    <FontAwesomeIcon className={styles.plusIcon} icon={faPlusCircle} size='1x'/>
                  </div>
                </div>
                <div className={styles.recommendations}>
                  <p className={styles.slogan}>{data.slogan}</p>
                  <div className={styles.items}>
                    <Slider {...settings}>
                      {data.Items && data.Items.map(item => (
                        <div key={item.item_id} className={styles.item}>
                          <Link href={`/products/${item.item_id}`} style={{ textDecoration: "none" }}>
                            <img src={`https://altermall.site/${item.img}`} alt={item.item_name} className={styles.itemImage} />
                          </Link>
                        </div>
                      ))}
                    </Slider>
                  </div>
                </div>
              </div>
            </Link>
          ) : (
            <div className={styles.masterContainer}>
            {/* 기존 컨텐츠 */}
            <div className={styles.banner}>  
              <div className={styles.intro}>
                <div className={styles.logoBorder}>
                  <img src={`https://altermall.site/${data.SellerDetail.logo}`} className={styles.logo} alt={data.User.name} />
                </div>
                <h1 className={styles.name}>{data.User.name}</h1>
              </div>
              <div className={styles.plus}>
                더보기 
                <FontAwesomeIcon className={styles.plusIcon} icon={faPlusCircle} size='1x'/>
              </div>
            </div>
            <div className={styles.recommendations}>
              <p className={styles.slogan}>{data.slogan}</p>
              <div className={styles.items}>
                <Slider {...settings}>
                  {data.Items && data.Items.map(item => (
                    <div key={item.item_id} className={styles.item}>
                      <Link href={`/products/${item.item_id}`} style={{ textDecoration: "none" }}>
                        <img src={`https://altermall.site/${item.img}`} alt={item.item_name} className={styles.itemImage} />
                      </Link>
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
          </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ItemPage;
