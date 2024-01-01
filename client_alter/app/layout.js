'use client'
import { Inter } from 'next/font/google'
import './globals.css'
import { faSearch, faShoppingCart, faUser, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';


const inter = Inter({ subsets: ['latin'] })


export default function RootLayout({ children }) {
  return (
    <html className="container" lang="ko">
      <body className={inter.className}>   {/* 상단 내비게이션 */}
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
      {children}</body>
    </html>
  )
}
