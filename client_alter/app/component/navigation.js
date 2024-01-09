'use client'
import { faSearch, faShoppingCart, faUser, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const NavigationBar = () => {
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
            <FontAwesomeIcon icon={faSearch} />
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
              <a href="/">카테고리</a>
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

