'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

import styles from './category.module.css'; // 스타일링을 위한 CSS 모듈
// 샘플 데이터
const sampleData = {
  categoryName: ['사과당근주스', '쌀 쿠키', '샐러드', '쌀 케이크'],
  categoryPrice: [10000, 20000, 30000, 40000],
  categoryS: ['글루텐프리마크', '소금프리마크', '락토프리마크', 4],
  categoryImage: ['/food/nack.jpg', '/food/pizza.jpg', '/food/chicken.jpg', '/food/ham.jpg'],
  categoryId: [13212, 5345, 25253, 235235],
};

const ItemPage = (props) => {
  const [categoryName, setCategoryName] = useState([]);
  const [categoryPrice, setCategoryPrice] = useState([]);
  const [categoryS, setCategoryS] = useState([]);
  const [categoryImage, setCategoryImage] = useState([]);
  const [categoryId, setCategoryId] = useState([]);
  const [sortBy, setSortBy] = useState('latest');
  const [displayCount, setDisplayCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const id = props.params.id;

  useEffect(() => {
    fetch("http://211.45.170.37:3000/category", {
      method: "get",
      headers: {
        "content-type": "application/json",
      },
      
    })
      .then((res) => res.json())
      .then((json) => {
        
        console.log(json);
      });
  }, []);

  const indexOfLastProduct = currentPage * displayCount;
  const indexOfFirstProduct = indexOfLastProduct - displayCount;
  const currentProducts = categoryName.slice(indexOfFirstProduct, indexOfLastProduct);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(categoryName.length / displayCount); i++) {
    pageNumbers.push(i);
  }

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleDisplayCountChange = (e) => {
    setDisplayCount(Number(e.target.value));
    setCurrentPage(1); // 페이지 수 변경시 현재 페이지를 1로 리셋
  };

  const sortByLowestPrice = () => {
    setSortBy('lowest');
    // 다른 처리 로직 추가
  };

  const sortByHighestPrice = () => {
    setSortBy('highest');
    // 다른 처리 로직 추가
  };

  const sortByLatest = () => {
    setSortBy('latest');
    // 다른 처리 로직 추가
    console.log(sortBy);
  };

  // id에 따라 다른 단어를 설정
  let displayWord;
  switch (id) {
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
      <h1 className={styles.caTitle}>{displayWord}</h1>
      <div className={styles.sortAndScroll}>
        <div className={styles.sortButtons}>
          <button
            onClick={sortByLowestPrice}
            className={sortBy === 'lowest' ? styles.activeButton : ''}
          >
            낮은 가격순
          </button>
          ㅣ
          <button
            onClick={sortByHighestPrice}
            className={sortBy === 'highest' ? styles.activeButton : ''}
          >
            높은 가격순
          </button>
          ㅣ
          <button
            onClick={sortByLatest}
            className={sortBy === 'latest' ? styles.activeButton : ''}
          >
            최신순
          </button>
        </div>

        <div className={styles.scrollButtons}>
          <select
            id="displayCount"
            className={styles.dropInput}
            value={displayCount}
            onChange={handleDisplayCountChange}
          >
            <option value={1}>1개씩 보기</option>
            <option value={3}>3개씩 보기</option>
          </select>
          <label htmlFor="displayCount"></label>
        </div>
      </div>
      <div className={styles.productContainer}>
  {currentProducts.map((name, index) => {
    const currentIndex = indexOfFirstProduct + index; // 현재 데이터의 실제 인덱스 계산
    return (
      <div key={currentIndex} className={styles.productCard}>
        <Link href={`/products/${categoryId[currentIndex]}`} style={{ textDecoration: "none" }}>
          <div className={styles.productLink}>
            <img src={categoryImage[currentIndex]} alt={name} />
            <h3>{name}</h3>
            <p>{categoryPrice[currentIndex].toLocaleString()}원</p>
            <p>{categoryS[currentIndex]}</p>
            <button>Add to Cart</button>
          </div>
        </Link>
      </div>
    );
  })}
</div>

      <div className={styles.pagination}>
  {pageNumbers.map((number) => (
    <span
      key={number}
      className={currentPage === number ? styles.activePage : styles.pageNumber}
      onClick={() => handlePageClick(number)}
    >
      {number}
    </span>
  ))}
</div>
    </div>
  );
};

export default ItemPage;
