// ItemPage.jsx
'use client'
import React, { useEffect, useState, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './admin_seller.module.css'; // Import the CSS module
import { v4 as uuidv4 } from 'uuid';
import { useDropzone } from 'react-dropzone';
import ImageWithAnimation from '../admin/image';

import Cookies from 'js-cookie';

// 쿠키에서 토큰을 가져오기
const accessToken = Cookies.get('accessToken');

const ItemPage = (props) => {
  const [files, setFiles] = useState([]);
  const [orders, setOrders] = useState([]);
  const [items, setItems] = useState([]);
  const [uploadDisabled, setUploadDisabled] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(false);
  const [deliveryType, setDeliveryType] = useState('all');
  const [orderState, setOrderState] = useState('all');
  const myUuid = uuidv4();
  console.log(myUuid);
  const handleDrop = useCallback((acceptedFiles) => {
    // 기존 파일과 새로 받은 파일을 합친 새로운 배열 생성
    const combinedFiles = [...files, ...acceptedFiles];
    setFiles(combinedFiles);
  }, [files]);
  const fetchData = async () => {
    try {
      const response = await fetch(`https://udtown.site/seller/order`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      console.log(data.data.rows);
      setOrders(data.data.rows);


    } catch (error) {
      console.error('데이터를 불러오는 중 오류가 발생했습니다:', error);
    }
    try {
      const response = await fetch(`https://udtown.site/seller/items`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      console.log(data.data.rows);
      setItems(data.data.rows);


    } catch (error) {
      console.error('데이터를 불러오는 중 오류가 발생했습니다:', error);
    }

  };
  const handleQuantityChange = (index, newAmount) => {

    if (newAmount >= 0) {

      const updatedItems = [...items];
      updatedItems[index].stock = newAmount;
      setItems(updatedItems);
    } else {


      const updatedItems = [...items];
      updatedItems[index].stock = 0;
      setItems(updatedItems);
    }
  };
  const handleNameChange = (index, newName) => {

      const updatedItems = [...items];
      updatedItems[index].item_name = newName;
      setItems(updatedItems);
  
  };
  const handlePriceChange = (index, newPrice) => {

    const updatedItems = [...items];
      updatedItems[index].price = newPrice;
      setItems(updatedItems);
  
  };
  // useEffect 안에서 fetchData 함수를 호출합니다.
  useEffect(() => {
    fetchData();
  }, []);
  const handleDisplayCountChange = (e) => {
    setDeliveryType(e.target.value);
    
  };
  const handleDisplayChange = (e) => {
    setOrderState(e.target.value);
    
  };
  const Cancel = useCallback(
    (id) => {

      fetch(`https://udtown.site/category/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },

      })
        .then((response) => {
          if (response.status == 405) {
            alert('삭제 실패하였습니다');
          } else if (response.status == 201) {
            alert('삭제되었습니다');
          }


        })
        .finally(() => {
          window.location.reload();
        });

    },
    [],
  );
  const setDate = (data)=>{
    const dateString = data;

// 문자열을 Date 객체로 파싱
const date = new Date(dateString);


// 날짜 및 시간을 원하는 형식으로 변환
const formattedDate = date.toLocaleString('ko-KR', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false, // 24시간 형식으로 표시
  timeZone: 'Asia/Seoul', // 한국 표준시로 설정
});
return formattedDate;
  }
  const setPaid =  useCallback(
    (order) => {

      fetch(`https://udtown.site/seller/order/${order.order_id}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },


      })
        .then(async(response) => {
          console.log(response)
          const data = await response.json()
          console.log(data)
          if (response.status == 405) {
            alert('수락 실패하였습니다');
          } else if (response.status == 201) {
            alert('해당 주문을 수락하였습니다');
          }


        })
        .finally(() => {
          window.location.reload
        });

    },
    [],
  );
  const Update = useCallback(
    (id, stock,name,price) => {
      files.forEach((file, index) => {
        formData.append(`img`, file);
     
      });
      fetch(`https://udtown.site/category/${id}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'stock': stock,
          'item_name':name,
          'price':price,
          // 'img':files[0]
        }),

      })
        .then((response) => {
          if (response.status == 405) {
            alert('수정 실패하였습니다');
          } else if (response.status == 200) {
            alert('수정되었습니다');
            window.location.reload;
          }


        })


    },
    [],
  );

  const { getRootProps, getInputProps } = useDropzone({ onDrop: handleDrop, multiple: true, disabled: uploadDisabled });
  return (
    <div style={{ 'marginBottom': '100px' }}>
      <h1 className={styles.title}>상품 관리</h1>
      <div className={styles.basketContainer}>
        <table className={styles.productTable}>
          <thead>
            <tr>

              <th>이미지</th>
              <th>상품명</th>
              <th>가격</th>
              {/* <th>취소</th> */}
              <th>재고</th>
            </tr>
          </thead>
          <tbody>
            {items.map((items, index) => (
              <tr key={index} className={styles.productCard}>

                <td style={{ display: 'flex', alignItems: 'center', }}>
                {/* <div {...getRootProps()} className={styles.dropzone}>
            <input {...getInputProps()} />
            {files.length > 0 ? (
              <div className={styles.preview}>
                {files.map((file, index) => (
                  <div key={file.name} className={styles.imageContainer}>
                    <ImageWithAnimation src={URL.createObjectURL(file)} alt={file.name} className={styles.image} />
                    <button type="button" className={styles.cancel} onClick={() => handleCancel(index)}>X</button>
                  </div>
                ))}
              </div>
            ) : (
              <p onClick={() => { setUploadDisabled(false); }}>이곳에 이미지를 드래그하거나 클릭하여 업로드 해주세요.</p>
            )}
          </div> */}

                  <img
                    src={`https://udtown.site/${items.img}`}
                    alt={items.item_name}
                    className={styles.productImage}
                  />
                </td>
                <td><p>  <input className={styles.nameInput} placeholder={items.item_name} onChange={(e)=>
                     handleNameChange(index, e.target.value)}></input></p></td>
                <td>
                <td><p>  <input className={styles.nameInput} placeholder={items.price+'원'} onChange={(e)=>
                     handlePriceChange(index, e.target.value)}></input></p></td>
                
                </td>
                {/* <td>
                <button className={styles.deleteButton}
                      onClick={() =>
                        {Cancel(items.id)}
                      }
                    >X
                    </button>
                </td> */}
                <td>
                  <div className={styles.quantityControl}>
                    <button
                      onClick={() =>
                        handleQuantityChange(index, items.stock - 1)
                      }
                    >-
                    </button>
                    <input className={styles.quantityInput} placeholder={items.stock} onChange={(e)=>
                     handleQuantityChange(index, e.target.value)}></input>
                    <button
                      onClick={() =>
                        handleQuantityChange(index, items.stock + 1)
                      }
                    >+
                    </button>
                    <button
                      onClick={() =>
                        Update(items.item_id, items.stock,items.item_name,items.price)
                      }
                    >저장
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
        </div>
        <h1 className={styles.title}>관리자 주문 조회</h1>
        <div className={styles.sortAndScroll}>
    

        <div className={styles.scrollButtons}>
          <select
            id="displayCount"
            className={styles.dropInput}
            value={deliveryType}
            onChange={handleDisplayCountChange}
          >
              <option value={'all'}>모두보기</option>
            <option value={'daily'}>당일배송</option>
            <option value={'normal'}>일반배송</option>
          </select>
          <label htmlFor="displayCount"></label>
        </div>
        <div className={styles.scrollButtons}>
          <select
            id="displayCount"
            className={styles.dropInput}
            value={orderState}
            onChange={handleDisplayChange}
          >
            <option value={'all'}>모두보기</option>
            <option value={'paid'}>결제완료</option>
            <option value={'accept'}>제조중</option>
            <option value={'deliver'}>전송완료</option>
          </select>
          <label htmlFor="displayCount"></label>
        </div>
      </div>
        <div className={styles.basketContainer}>
        <table className={styles.orderTable}>
          <thead>
            <tr>
              <th>이미지</th>
            
              <th>상품명</th>
              <th>가격</th>

              <th>주문 일자</th>
              <th>주문자 정보</th>
              <th>배송 정보</th>
              <th>상태</th>
              <th>수락</th>
              <th>상세</th>
            </tr>
          </thead>
          <tbody>
          {orders.filter(order => (orderState === 'all' || order.state === orderState) && (deliveryType === 'all' || order.delivery_type === deliveryType)).map((order, index) => (
              <>
                <tr key={index} className={styles.orderRow}>
                  <img
                    src={`https://udtown.site/${order.OrderDetails[0].img}`}
                    alt={order.OrderDetails[0].item_name}
                    className={styles.productImage}
                  />
                
                  <td>{order.OrderDetails[0].item_name}외 {order.OrderDetails?order.OrderDetails[0].length:''}건</td>
                  <td>{order.amount}원</td>

                  <td>{setDate(order.updatedAt)}</td>
                  <td>
                    <p>주문자명: {order.customer_name}</p>
                    <p>연락처: {order.phone}</p>
                    <p>우편번호: {order.post}</p>
                    <p>주소: <b>{order.addr} {order.addr_detail}</b></p>
                  </td>
                  <td>
                    <p>배송 유형:   {order.delivery_type === 'daily' ? (
                       <img src="/today.jpg" className={styles.postImage} alt="따끈 배송" />

                    ) : order.delivery_type === 'normal' ? (
                      <img src='post.jpg' className={styles.postImage} alt="일반 배송" />

                    ) : null}</p>
                    <p>요청 사항: {order.requests}</p>
                  </td>
                  {order.state === 'paid' ? (
                      <td style={{'color':'green','fontWeight':'bold'}}>결제완료</td>
                    ) : order.state === 'accept' ? (
                      <td style={{'color':'red','fontWeight':'bold'}}>제조중</td>
                    ) : order.state === 'deliver' ? (
                      <td style={{'color':'blue','fontWeight':'bold'}}>전송완료</td>
                    ): null}
                 
                  <td>
                    {order.state === 'paid' ? (
                      <button onClick={()=>{setPaid(order)}} className={styles.accessButton}>
                        수락
                      </button>
                    ) : order.state === 'accept' ? (
                      <button onClick={()=>{setPaid(order)}} className={styles.accessButton}>
                        완료
                      </button>
                    ) : null}
                 
                   
                  </td>
                  <td>
                    <button
                      className={styles.detailBtn}
                      onClick={() => setSelectedOrder(!selectedOrder)}
                    >
                      상세보기
                    </button>
                    </td>
                  {/* 선택된 주문에 대한 상세 정보를 나타내는 부분 */}

                </tr>
                <tr>
                  <td colSpan="9">
                    {selectedOrder && (
                      <div >

                        <table className={styles.detailTable}>
                          <thead>
                            <tr>
                              <th>이미지</th>
                              <th>상품명</th>
                              <th>가격</th>
                              <th>갯수</th>
                            </tr>
                          </thead>
                          <tbody>
                            {order.OrderDetails.map((detail, index) => (
                              <tr key={index}>
                                <td>  <img
                                  src={`https://udtown.site/${detail.img} `}
                                  alt={detail.item_name}
                                  className={styles.productImage}
                                /></td>
                                <td>{detail.item_name}</td>
                                <td>{detail.price}원</td>
                                <td>{detail.stock}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </td>
                </tr>

              </>
            ))}
          </tbody>
        </table>
    


        </div>
    </div>
  );
};

export default ItemPage;
