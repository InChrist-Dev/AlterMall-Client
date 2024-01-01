'use client'
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './category.module.css'; // Create a CSS module for styling
import Link from 'next/link';
// Sample data
const sampleData = {
  categoryName: ['낙곱새', '피자', '치킨', '햄버거'],
  categoryPrice: [10000, 20000, 300000000, 40000],
  categoryS: ['글루텐프리마크', '소금프리마크', '락토프리마크', 4],
  categoryImage:['/food/nack.jpg', '/food/pizza.jpg', '/food/chicken.jpg', '/food/ham.jpg'],
  categoryId:[13212,5345,25253, 235235],
};

const ItemPage = (props) => {
  const [categoryName, setCategoryName] = useState([]);
  const [categoryPrice, setCategoryPrice] = useState([]);
  const [categoryS, setCategoryS] = useState([]);
  const [categoryImage, setCategoryImage] = useState([]);
  const [displayCount, setDisplayCount] = useState(10);
  const [categoryId,setCategoryId] = useState([]);

  useEffect(() => {
    // Simulating API fetch with sample data
    setCategoryName(sampleData.categoryName);
    setCategoryPrice(sampleData.categoryPrice);
    setCategoryS(sampleData.categoryS);
    setCategoryImage(sampleData.categoryImage);
    setCategoryId(sampleData.categoryId);
  }, []);

  const sortByLowestPrice = () => {
    // Implement sorting logic for lowest price
    // Update state accordingly
  };

  const sortByHighestPrice = () => {
    // Implement sorting logic for highest price
    // Update state accordingly
  };

  const sortByLatest = () => {
    // Implement sorting logic for latest
    // Update state accordingly
  };


  return (
    <div>
      <h1>Category: {props.params.id}</h1>
      <div></div>
      <div className={styles.sortAndScroll}>
        <div className={styles.sortButtons}>
          <button onClick={sortByLowestPrice}>낮은 가격순</button>
          <button onClick={sortByHighestPrice}>높은 가격순</button>
          <button onClick={sortByLatest}>최신순</button>
        </div>

        <div className={styles.scrollButtons}>
          <button onClick={() => setDisplayCount(10)}>10개 보기</button>
          <button onClick={() => setDisplayCount(30)}>30개 보기</button>
        </div>
      </div>

      <div className={styles.productContainer}>
      {categoryName.slice(0, displayCount).map((name, index) => (
  <div key={index} className={styles.productCard}>
    <Link href={`/products/${categoryId[index]}`} style={{ textDecoration: "none" }}>
      <div className={styles.productLink}>
        <img src={categoryImage[index]} alt={name} />
        <h3>{name}</h3>
        <p>{categoryPrice[index].toLocaleString()}원</p>
        <p>{categoryS[index]}</p>
        <button>Add to Cart</button>
      </div>
    </Link>
  </div>
))}


      </div>
    </div>
  );
};

export default ItemPage;
