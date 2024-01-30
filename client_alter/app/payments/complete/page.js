// Complete.js

import React from 'react';
import styles from './complete.module.css';

export default async function Complete({ searchParams }) {
  const secretKey = process.env.TOSS_SECRET_KEY || '';
  const basicToken = Buffer.from(`${secretKey}:`, 'utf-8').toString('base64');

  const url = `https://api.tosspayments.com/v1/payments/orders/${searchParams.orderId}`;
  const payments = await fetch(url, {
    headers: {
      Authorization: `Basic ${basicToken}`,
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json());

  const { card } = payments;

  return (
  <div  className={styles.back}>
    <div  className={styles.ground}></div>
<div className={styles.container}>
      <h1 className={styles.title}>결제가 완료되었습니다</h1>
      <ul className={styles.infoList}>
        <li className={styles.infoListItem}>
          <span className={styles.label}>결제 상품:</span>
          {payments.orderName}
        </li>
        <li className={styles.infoListItem}>
          <span className={styles.label}>주문번호:</span>
          {payments.orderId}
        </li>
        <li className={styles.infoListItem}>
          <span className={styles.label}>결제승인날짜:</span>
          {Intl.DateTimeFormat().format(new Date(payments.approvedAt))}
        </li>
      </ul>
    </div>
  </div>
    
  );
}
