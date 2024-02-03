// AllDeliveryInfoModal.js
import React from 'react';

const AllDeliveryInfoModal = ({ closeAllModal, allDeliveryInfo }) => {
  return (
    <div>
      <h2>전체 배송지 정보</h2>
      {allDeliveryInfo.map((info, index) => (
        <div key={index}>
          <p>이름: {info.name}</p>
          <p>주소: {info.address}</p>
          <p>전화번호: {info.phoneNumber}</p>
          <hr />
        </div>
      ))}
      <button onClick={closeAllModal}>닫기</button>
    </div>
  );
};

export default AllDeliveryInfoModal;
