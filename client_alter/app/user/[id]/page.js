'use client'
import React from 'react';
import styles from './user.module.css';
import SideMenu from './SideMenu';
import UserInfo from './UserInfo';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import OrderHistory from './pages/orders';
import CancellationHistory from './pages/subscriptions';
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
        <Route path='/user/subscriptions' element={<CancellationHistory />} />
       
      </Routes>
 
          </div>
        </div>
      </div>
    </Router>
  );
};

export default MyPage;
