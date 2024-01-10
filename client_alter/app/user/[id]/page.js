'use client'
import React from 'react';
import styles from './user.module.css';
import SideMenu from './SideMenu';
import UserInfo from './UserInfo';
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
  return (
    <Router>
      <div className={styles.myPageContainer}>
        <UserInfo />

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
