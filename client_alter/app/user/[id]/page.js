'use client'
import React from 'react';
import styles from './user.module.css';
import SideMenu from './SideMenu';
import UserInfo from './UserInfo';
import { useEffect,useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import OrderHistory from './pages/orders';
import CancellationHistory from './pages/cancel';
import Subscription from './pages/subscriptions';
import RestockAlerts from './pages/restock';
import CouponsPage from './pages/coupon';
import PointsPage from './pages/points';
import RecentProductsPage from './pages/recent';
import FavoriteProductsPage from './pages/favorite';
import FavoriteBrandsPage from './pages/brand';
import InquiriesPage from './pages/inquires';
import ProductReviewsPage from './pages/review';
import ProductQuestionsPage from './pages/question';
import ShippingAddressPage from './pages/address';
import ProfilePage from './pages/profile';



const MyPage = () => {
  const [name,setName]= useState('');
  const fetchData = async () => {
    try {
      const response = await fetch(`http://211.45.170.37:3000/user/080e2550-b3a3-11ee-aa99-992d88953757`);
      const data = await response.json();
  
      // 데이터를 성공적으로 가져왔을 때 처리 로직을 추가합니다.
      setName(data.data.name);
      console.log(data)
     
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
  }, []); 
  return (
    <Router>
      <div className={styles.myPageContainer}>
        <UserInfo name={name}/>

        <div className={styles.middleArea}>
          <SideMenu />

          <div className={styles.rightArea}>
        
      <Routes>
      
        <Route path='/user/orders' exact element={<OrderHistory />} />
        <Route path='/user/subscriptions' element={<Subscription />} />
        <Route path='/user/cancel' element={<CancellationHistory />} />
        <Route path='/user/restock-alerts' element={<RestockAlerts />} />
        <Route path='/user/coupons' element={<CouponsPage />} />
              <Route path='/user/points' element={<PointsPage />} />
              <Route path='/user/recent-products' element={<RecentProductsPage />} />
              <Route path='/user/favorite-products' element={<FavoriteProductsPage />} />
              <Route path='/user/favorite-brands' element={<FavoriteBrandsPage />} />
              <Route path='/user/inquiries' element={<InquiriesPage />} />
              <Route path='/user/product-reviews' element={<ProductReviewsPage />} />
              <Route path='/user/product-questions' element={<ProductQuestionsPage />} />
              <Route path='/user/shipping-address' element={<ShippingAddressPage />} />
              <Route path='/user/profile' element={<ProfilePage />} />
      </Routes>
 
          </div>
        </div>
      </div>
    </Router>
  );
};

export default MyPage;
