'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

import styles from './lanking.module.css'; // 스타일링을 위한 CSS 모듈
// 샘플 데이터


const ItemPage = (props) => {
  const [categoryS, setCategoryS] = useState([]);
  const [sortBy, setSortBy] = useState('latest');
  const [displayCount, setDisplayCount] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [page, setPage] = useState(1);
  const [categoryList,setCategoryList] = useState([])

  const category = props.params.id;

  const fetchData = async () => {
    try {
      const response = await fetch(`http://211.45.170.37:3000/category?p=${currentPage}&sortby=${sortBy}&product=${displayCount}`);
      const data = await response.json();
  
      // 데이터를 성공적으로 가져왔을 때 처리 로직을 추가합니다.
      setCategoryList(data.data.items);
      setPage(data.data.totalPages);
      console.log(data.data.items)
  
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
  const getCategory= (category) =>{
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
    return displayWord;
  };
 
  return (
    <div>
      <h1 className={styles.caTitle}>랭킹</h1>
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

      <table className={styles.rankTable}>
        <thead>
          <tr>
            <th>순위</th>
            <th>상품명</th>
            <th>가격</th>
            <th>카테고리</th>
        
          </tr>
        </thead>
        <tbody>
          {categoryList.map((item, i) => {
            const currentIndex = indexOfFirstProduct + i;
            return (
              <tr key={item}>
                <td>{currentIndex + 1}</td>
                <td>
                  <Link href={`/products/${item.item_id}`} className={styles.productLink} style={{ textDecoration: 'none' }}>
                  
                      <img src={`http://211.45.170.37:3000/${item.img}`} className={styles.img} />
                      <h3>{item.item_name}</h3>
                   
                  </Link>
                </td>
                <td>{item.price.toLocaleString()}원</td>
                <td>{getCategory(item.category)}</td>
             
              </tr>
            );
          })}
        </tbody>
      </table>

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
