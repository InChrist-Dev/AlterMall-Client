'use client'
import { faSearch, faShoppingCart, faUser, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const NavigationBar = () => {
  const handleSearch = async () => {
    // 검색어를 가져오기
    const searchInput = document.querySelector('.searchInput');
    const searchTerm = searchInput.value;

    // 서버로 검색어 전송
    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ searchTerm }),
      });

      if (response.ok) {
        // 서버 응답을 처리하는 로직 추가
        const searchData = await response.json();
        console.log('검색 결과:', searchData);
      } else {
        console.error('검색 요청이 실패했습니다.');
      }
    } catch (error) {
      console.error('에러 발생:', error);
    }
  };
  
  return (
    <span>
     <div className="navigation">
        {/* 로고 이미지 */}
        <a href='/'><img src="/logo1.jpg" alt="로고" className="logo" /></a>
        

        {/* 검색 창 */}
        <div className="searchContainer">
          <input
            type="text"
            placeholder="검색어를 입력하세요"
            className="searchInput"
          />
          <button className="searchButton">
            <FontAwesomeIcon icon={faSearch} onClick={handleSearch}/>
            검색
          </button>
        </div>

        {/* 장바구니 및 유저 아이콘 */}
        <div className="cartUserIcons">
          <a href='/user/salad'>
          <FontAwesomeIcon   className="userIcon"icon={faUser} />
          </a>
          <a href='/basket/salad'>
          <FontAwesomeIcon icon={faShoppingCart} className="cartIcon" />
          </a>
        </div>
      </div>
    <div>
      <div style={{ borderBottom: '0.5px solid #ddd' }}></div>
      {/* 네비게이션 바 */}
      <div className="navigation">
        <nav className="navbar">
          <ul className="nav-list">
            <li className="category-dropdown">
              <a>카테고리</a>
              <div className="category-menu">
                <ul>
                  <li><a href="/category/dessert">디저트</a></li>
                  <li><a href="/category/salad">샐러드</a></li>
                  <li><a href="/category/free">락토프리</a></li>
                  <li><a href="/category/drink">음료</a></li>
                </ul>
              </div>
            </li>
            <li><a href="/master">장인소개</a></li>
            <li><a href="/">랭킹</a></li>
            <li><a href="/">이벤트</a></li>
            <li><a href="/">이달의 특가</a></li>
            
           
          </ul>
        </nav>
      </div>
      <div style={{ borderBottom: '0.5px solid #ddd' }}></div>
    </div>
    </span>
  );
};


export default NavigationBar;

