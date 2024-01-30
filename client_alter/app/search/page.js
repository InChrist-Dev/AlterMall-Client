'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

import styles from './search.module.css'; // 스타일링을 위한 CSS 모듈
// 샘플 데이터


const ItemPage = (props) => {
  const [categoryS, setCategoryS] = useState([]);
  const [sortBy, setSortBy] = useState('latest');
  const [displayCount, setDisplayCount] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [page, setPage] = useState(1);
  const [categoryList,setCategoryList] = useState([])

  const name = props.searchParams.search;
  console.log(props.searchParams.search);
  const fetchData = async () => {
    try {
      const response = await   fetch(`http://211.45.170.37:3000/category/search?name=${name}`);
      const data = await response.json();
  
      // 데이터를 성공적으로 가져왔을 때 처리 로직을 추가합니다.
      setCategoryList(data.data.items);
      setPage(data.data.totalPages);

  
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
  }, [currentPage,sortBy,displayCount]); 

  const indexOfLastProduct = currentPage * displayCount;
  const indexOfFirstProduct = indexOfLastProduct - displayCount;
  const currentProducts = categoryList.slice(indexOfFirstProduct, indexOfLastProduct);

  const pageNumbers = [];
  for (let i = 1; i <= page; i++) {
    pageNumbers.push(i);
  }

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
    fetchData();

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
  const displayWord = name;


  return (
    <div>
      <h1 className={styles.caTitle}>{displayWord} 검색결과</h1>
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
            <option value={10}>10개씩 보기</option>
            <option value={30}>30개씩 보기</option>
          </select>
          <label htmlFor="displayCount"></label>
        </div>
      </div>
      <div className={styles.productContainer}>
  {categoryList.map((item, i) => {
    const currentIndex = indexOfFirstProduct + i; // 현재 데이터의 실제 인덱스 계산
    return (
      <>
      <div key={item} className={styles.productCard}>
        <Link href={`/products/${item.item_id}`} style={{ textDecoration: "none" }}>
          <div className={styles.productLink}>
            <img src={`http://211.45.170.37:3000/${item.img}`}  />
            <h3> {item.item_name}</h3>
            <p>{item.price.toLocaleString()}원</p>
            <p>{categoryS[currentIndex]}</p>
            <button>Add to Cart</button>
          </div>
        </Link>
      </div>
      </>
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
