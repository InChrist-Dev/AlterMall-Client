"use client";
import React, { useEffect, useState } from "react";
import styles from "./[id]/user.module.css";
import SideMenu from "./[id]/SideMenu";
import UserInfo from "./[id]/UserInfo";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import OrderHistory from "./[id]/pages/orders";
import CancellationHistory from "./[id]/pages/cancel";
import Subscription from "./[id]/pages/subscriptions";
import RestockAlerts from "./[id]/pages/restock";
import CouponsPage from "./[id]/pages/coupon";
import PointsPage from "./[id]/pages/points";
import RecentProductsPage from "./[id]/pages/recent";
import FavoriteProductsPage from "./[id]/pages/favorite";
import FavoriteBrandsPage from "./[id]/pages/brand";
import InquiriesPage from "./[id]/pages/inquires";
import ProductReviewsPage from "./[id]/pages/review";
import ProductQuestionsPage from "./[id]/pages/question";
import ShippingAddressPage from "./[id]/pages/address";
import ProfilePage from "./[id]/pages/profile";

import { auth } from "@/fire-config"; // 실제 경로에 맞게 수정하세요.
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/fire-config"; // Firestore import

const MyPage = () => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true); // 로딩 상태 관리

  useEffect(() => {
    // Firebase Auth 상태 변경 리스너 설정
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // 사용자가 로그인한 경우
        // Firestore에서 사용자 데이터 가져오기
        const userRef = doc(db, "users", user.uid);
        try {
          const docSnap = await getDoc(userRef);
          if (docSnap.exists()) {
            const userData = docSnap.data();
            setName(userData.name || userData.displayName || "");
            setLoading(false);
          } else {
            console.log("사용자 문서가 존재하지 않습니다.");
            setLoading(false);
          }
        } catch (error) {
          console.error("사용자 데이터를 가져오는 중 오류 발생:", error);
          setLoading(false);
        }
      } else {
        // 사용자가 로그인하지 않은 경우
        // 로그인 페이지로 리다이렉트
        window.location.href = "/loginPage";
      }
    });

    // 컴포넌트 언마운트 시 리스너 정리
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>로딩 중...</div>;
  }

  return (
    <Router>
      <div className={styles.myPageContainer}>
        <UserInfo name={name} />

        <div className={styles.middleArea}>
          <SideMenu />

          <div className={styles.rightArea}>
            <Routes>
              <Route path="/user/orders" exact element={<OrderHistory />} />
              <Route path="/user/subscriptions" element={<Subscription />} />
              <Route path="/user/cancel" element={<CancellationHistory />} />
              <Route path="/user/restock-alerts" element={<RestockAlerts />} />
              <Route path="/user/coupons" element={<CouponsPage />} />
              <Route path="/user/points" element={<PointsPage />} />
              <Route
                path="/user/recent-products"
                element={<RecentProductsPage />}
              />
              <Route
                path="/user/favorite-products"
                element={<FavoriteProductsPage />}
              />
              <Route
                path="/user/favorite-brands"
                element={<FavoriteBrandsPage />}
              />
              <Route path="/user/inquiries" element={<InquiriesPage />} />
              <Route
                path="/user/product-reviews"
                element={<ProductReviewsPage />}
              />
              <Route
                path="/user/product-questions"
                element={<ProductQuestionsPage />}
              />
              <Route
                path="/user/shipping-address"
                element={<ShippingAddressPage />}
              />
              <Route path="/user/profile" element={<ProfilePage />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default MyPage;
