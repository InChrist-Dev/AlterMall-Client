'use client'
import { useState, useEffect } from 'react';
import { faSearch, faShoppingCart, faUser, faChevronLeft, faChevronRight, faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { LoginBtn } from '../logins';

import Cookies from 'js-cookie';

// 쿠키에서 토큰을 가져오기
const accessToken = Cookies.get('accessToken');
const position = Cookies.get('position');


const NavigationBar = () => {

  const [isMenuOpen, setIsMenuOpen] = useState(false); // 메뉴를 열고 닫는 상태값 저장
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false); // 메뉴를 열고 닫는 상태값 저장

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState); // 열고 닫는 메뉴의 이전 상태값을 반환하도록 설정
  };
  const toggleSubMenu = () => {
    setIsSubMenuOpen(!isSubMenuOpen);
  };
  if (accessToken) {
    useEffect(() => {
      // 1분(60초)마다 실행되는 함수
      const interval = setInterval(() => {

        const result = confirm('토큰 만료 30분전입니다. 다시 로그인 하시겠습니까?');
        if (result) {
          Cookies.remove('accessToken');
          window.location.href='http://localhost:3000/loginPage';
        } else {
          // 사용자가 "취소" 버튼을 클릭한 경우 또는 대화 상자를 닫은 경우
          console.log('사용자가 취소를 선택했거나 대화 상자를 닫았습니다.');
        }

      }, 3.5 * 60 * 60000); // 60000밀리초 = 1분

      // 컴포넌트가 언마운트될 때 interval 정리
      return () => clearInterval(interval);
    }, []); // useEffect의 두 번째 인자로 빈 배열을 전달하여 한 번만 실행되도록 설정
  }

  const [search, setSearch] = useState('');
  const [relatedKeywords, setRelatedKeywords] = useState([]);
  const [isKeywordMenu, setIsKeywordMenu] = useState(true);

  useEffect(() => {
    if (search.length == 0) {
      setIsKeywordMenu(true);
    } else {
      fetch(`https://altermall.site/category/search?name=${search}`, {

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
    switch (key) {
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
              <input type="text" className="searchInput"
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
              ? <a href={position == 'seller' ? '/admin_seller' : '/user'}>
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
                    <li><a href="/category/salad">샐러드</a></li>
                    <li><a href="/category/free">락토프리</a></li>
                    <li><a href="/category/drink">음료</a></li>
                  </ul>
                </div>
              </li>
              <li><a href="/master">장인소개</a></li>
              <li><a onClick = {() => alert('준비중입니다.')} href="/">건강정보</a></li>
              <li><a href="/ranking">랭킹</a></li>
              <li><a href="/submit">납품</a></li>
             


            </ul>
          </nav>
        </div>
        <div style={{ borderBottom: '0.5px solid #ddd' }}></div>
      </div>
      <div className="navigation-mobile">
        <div className="mobile">
          <nav className="navbar">

            <div className="menu-icon">
              <span></span>
              <span></span>
              <span></span>
            </div>

            <div className="dropdown-menu">
              <ul className="nav-list">
                <li className="category-dropdown">
                  <a className="category">카테고리</a>
                  <div className="category-menu">
                    <ul>
                      <li><a href="https://altermall.shop/category/dessert">디저트</a></li>
                      <li><a href="https://altermall.shop/category/salad">샐러드</a></li>
                      <li><a href="https://altermall.shop/category/free">락토프리</a></li>
                      <li><a href="https://altermall.shop/category/drink">음료</a></li>
                    </ul>
                  </div>
                </li>
                <li><a href="/master">장인소개</a></li>
                <li><a href="/ranking">랭킹</a></li>
                <li><a href="https://altermall.shop/submit">납품</a></li>
                <li><a href="https://altermall.shop/">건강정보</a></li>
              </ul>
            </div>
          </nav>
        </div>
        <div className="mobileContainer">
          <div className=''>

            <div >
              <button  className='hamburger' onClick={toggleMenu}>
                {isMenuOpen ? <FontAwesomeIcon className='hamburger' icon={faBars} alt='닫기버튼' /> : <FontAwesomeIcon className='hamburger' icon={faBars} alt='햄버거 버튼' />}
              </button>
            </div>
              {/* 사이드 메뉴 */}
      <div className={`sidebar ${isMenuOpen ? 'open' : ''}`}>
        <nav className="sidebar-nav">
          <ul>
          
       
              <li  className="category" onClick={toggleSubMenu}>
              
                카테고리 
                {/* {isSubMenuOpen ? (
                  <FontAwesomeIcon icon={faChevronUp} />
                ) : (
                  <FontAwesomeIcon icon={faChevronDown} />
                )} */}
                 {isSubMenuOpen && (
                <ul className="submenu">
                  <li><a href="https://altermall.shop/category/dessert">디저트</a></li>
                  <li><a href="https://altermall.shop/category/salad">샐러드</a></li>
                  <li><a href="https://altermall.shop/category/free">락토프리</a></li>
                  <li><a href="https://altermall.shop/category/drink">음료</a></li>
                </ul>
               
              )}
               </li>
               <div style={{ borderBottom: '0.5px solid #aaa' }}></div>
            <li><a href="https://altermall.shop/master">장인소개</a></li>
            <div style={{ borderBottom: '0.5px solid #aaa' }}></div>
            <li><a href="/">건강정보</a></li>
            <div style={{ borderBottom: '0.5px solid #aaa' }}></div>
            <li><a href="/submit">납품</a></li>
            <div style={{ borderBottom: '0.5px solid #aaa' }}></div>
            <li><a href="/submit">랭킹</a></li>
            <div style={{ borderBottom: '0.5px solid #aaa' }}></div>
            <li onClick={toggleMenu}>닫기</li>
          </ul>
        </nav>
      </div>
          </div>

          {/* 로고 이미지 */}
          <a href='/'><img src="/logo2.png" alt="로고" className="logo" /></a>
          {/* 장바구니 및 유저 아이콘 */}
          <div className="cartUserIcons">
            {
              accessToken
                ? <a href={position == 'seller' ? '/admin_seller' : '/user'}>
                  <FontAwesomeIcon icon={faUser} className="cartIcon" />
                </a>
                : <LoginBtn></LoginBtn>
            }
            <a href='/basket'>
              <FontAwesomeIcon icon={faShoppingCart} className="cartIcon" />
            </a>
          </div>
          

          </div>
          {/* 검색 창 */}
          <div className="searchContainer">
            <ul className="nav-list">
              <li className="keyword-dropdown">
                <input type="text" className="searchInput"
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
        </div>
        <div>

          {/* 네비게이션 바 */}



        </div>
    </span>
  );
};


export default NavigationBar;

