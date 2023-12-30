'use client'
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// Sample data
const sampleData = {
  categoryName: ['낙곱새', '피자', '치킨', '햄버거'],
  categoryPrice: [10000, 20000, 30000, 40000],
  categoryS: [1, 2, 3, 4],
  categoryImage: ['/food/nack.jpg', '/food/pizza.jpg', 3, 4],
};

export default function ItemPage(props) {
  const [categoryName, setCategoryName] = useState([]);
  const [categoryPrice, setCategoryPrice] = useState([]);
  const [categoryS, setCategoryS] = useState([]);
  const [categoryImage, SetCategoryImage] = useState([]);
  useEffect(() => {
    // Simulating API fetch with sample data
    setCategoryName(sampleData.categoryName);
    setCategoryPrice(sampleData.categoryPrice);
    setCategoryS(sampleData.categoryS);
    SetCategoryImage(sampleData.categoryImage);
  }, []);

  return (
    <div>
      <h1>Category: {props.params.id}</h1>

      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {categoryName.map((name, index) => (
          <div key={index} style={{ width: '300px', margin: '10px', border: '1px solid #ddd', padding: '10px' }}>
           
            <h3>{name}</h3>
            <img style={{width:'270px'}} src='/food/nack.jpg'></img>
            <p>Price: {categoryPrice[index]}</p>
            <p>Stock: {categoryS[index]}</p>
            {/* You can add more details or customize the product card as needed */}
            <button>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}
