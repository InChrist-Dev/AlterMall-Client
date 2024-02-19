'use client'
import { useState, useEffect } from 'react';
import { faSearch, faShoppingCart, faUser, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

import { LoginBtn } from '../logins';
import { UserBtn } from './userIcon';
import { LogOutBtn } from '../logout';
import Cookies from 'js-cookie';

// 쿠키에서 토큰을 가져오기
const accessToken = Cookies.get('accessToken');
console.log('ddd')

const NavigationBar = (session) => {
  if(accessToken){
    useEffect(() => {
      // 1분(60초)마다 실행되는 함수
      const interval = setInterval(() => {
        // 메시지 업데이트
        alert('1분이 지났습니다!');
      }, 16000); // 60000밀리초 = 1분
  
      // 컴포넌트가 언마운트될 때 interval 정리
      return () => clearInterval(interval);
    }, []); // useEffect의 두 번째 인자로 빈 배열을 전달하여 한 번만 실행되도록 설정
  }
  console.log(session)
  const [search, setSearch] = useState('');
  const [relatedKeywords, setRelatedKeywords] = useState([]);
  const [isKeywordMenu, setIsKeywordMenu] = useState(true);

  useEffect(() => {
    if (search.length == 0) {
      setIsKeywordMenu(true);
    } else {
      fetch(`https://udtown.site/category/search?name=${search}`, {

      })
        .then((res) => res.json())
        .then((json) => {
          setRelatedKeywords(json.data.items);
          setIsKeywordMenu(false);
          console.log(json.data.items);
        });
    }

  }, [search]);
  const handleSearch = async () => {
    // 검색어를 가져오기

    window.location.href = `/search?search=${search}`;
  };

  const handleKeyDown = (event) => {
    const key = event.code;
    switch(key){
        case 'Enter':
          handleSearch();
        break;
        default:
    }
}
  return (
    <span>
      <div className="navigation">
        {/* 로고 이미지 */}
        <a href='/'><img src="/logo1.jpg" alt="로고" className="logo" /></a>
        {/* 검색 창 */}
        <div className="searchContainer">
          <ul className="nav-list">
            <li className="keyword-dropdown">
              <input type="text" className="searchInput" placeholder="검색어를 입력하세요"
                value={search}
                
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={handleKeyDown} />
              {isKeywordMenu ? <div className="keyword-menu">
                <ul>
                  {relatedKeywords.map((keyword, index) => (
                    <li key={index}>{keyword.item_name}</li>
                  ))}
                </ul>
              </div> :
                <div className="keyword-menu" style={{ 'display': 'block' }}>
                  <ul>
                    {relatedKeywords.map((keyword, index) => (

                      <li onClick={() => { window.location.href = `/products/${keyword.item_id}`; }} key={index}>{keyword.item_name}</li>


                    ))}
                  </ul>
                </div>}

            </li>
            <button className="searchButton" onClick={handleSearch}>

              <FontAwesomeIcon icon={faSearch} />
              검색
            </button>

          </ul>



        </div>

        {/* 장바구니 및 유저 아이콘 */}
        <div className="cartUserIcons">
          {
            accessToken
              ?   <a href='/user'>
              <FontAwesomeIcon icon={faUser} className="cartIcon" />
            </a>
              : <LoginBtn></LoginBtn>
          }
          <a href='/basket'>
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
                    {/* <li><a href="/category/salad">샐러드</a></li>
                    <li><a href="/category/free">락토프리</a></li>
                    <li><a href="/category/drink">음료</a></li> */}
                  </ul>
                </div>
              </li>
              <li><a href="/master">장인소개</a></li>
              <li><a href="/ranking">랭킹</a></li>
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

