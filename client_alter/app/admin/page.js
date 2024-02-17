'use client'
import React, { useCallback, useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import ImageWithAnimation from './image';
import Link from 'next/link';
import style from './admin.module.css';

import Cookies from 'js-cookie';
import { json } from 'body-parser';

// 쿠키에서 토큰을 가져오기
const accessToken = Cookies.get('accessToken');
const ImageUploader = (props) => {
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modal,setModal] = useState('');
  const [files, setFiles] = useState([]);
  const [item_name, setItem_name] = useState('');
  const [item, setItem] = useState('');
  const [seller_id, setSeller_id] = useState('');
  const [category, setCategory] = useState('');
  const [stock, setStock] = useState('');
  const [price, setPrice] = useState('');
  const [uploadDisabled, setUploadDisabled] = useState(false);

  const handleDrop = useCallback((acceptedFiles) => {
    // 기존 파일과 새로 받은 파일을 합친 새로운 배열 생성
    const combinedFiles = [...files, ...acceptedFiles];
    setFiles(combinedFiles);
  }, [files]);



//   useEffect(() => {
//     const fetchData = async () => {
      
   
      
//       const response = await fetch(`https://udtown.site/category`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(data),
//       }).then( (res) =>  {
//       if(res.status == 200){
//         console.log('새로운 컨텐츠입니다.')
//       }else if(res.status == 300){
//         alert('잘못된 접근입니다.');
//         window.location.replace('/');
//         return;
//       }else if(res.status == 201){
//         console.log('기존 이용자입니다.')
//         const json = res.json();
//         console.log(json)
//       }})
    
     
    
//       // 데이터 처리 및 상태 업데이트 등 추가 구현
//     };
    
   
//       fetchData();
    
//   }, []);
 
  const handleConfirm = (item) => {
    fetch(`https://udtown.site/category/${item}`, {
              method: 'DELETE',
              headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
              },
            })
              .then((response) => {
                console.log(response.status);
                if(response.status == 404){
                   
                  alert('컨텐츠 저장에 실패하였습니다');
                }else if(response.status == 200){
                  alert('저장되었습니다');
                }
               
               
              })
              .finally(() => {
                setUploadDisabled(false);
              });
  };


  const handleCancel = useCallback((index) => {
    setFiles((prevFiles) => {
      const newFiles = [...prevFiles];
      newFiles.splice(index, 1);
      return newFiles;
    });
    setUploadDisabled(true);
  }, []);

  const handleSubmit = useCallback(
    (event) => {
      try{
          if(item_name == ''){
            setIsModalOpen(true);
            setModal('제품의 이름을 입력해주세요')
            event.preventDefault(); // 페이지 새로고침 방지
          }else if (seller_id == '') {
            setIsModalOpen(true);
            setModal('판매자id를 입력해주세요')
            event.preventDefault(); // 페이지 새로고침 방지
         

          }else if (price == '') {
            setIsModalOpen(true);
            setModal('제품의 가격을 입력해주세요')
            event.preventDefault(); // 페이지 새로고침 방지
         

          }else if (category == '') {
            setIsModalOpen(true);
            setModal('제품의 카테고리를 입력해주세요')
            event.preventDefault(); // 페이지 새로고침 방지
         

          }else if (files.length == 0) {
            setIsModalOpen(true);
            setModal('컨텐츠의 이미지를 넣어주세요')
            event.preventDefault(); // 페이지 새로고침 방지
         

          }else{
            confirm('업다운 컨텐츠를 저장하시겠습니까?');
            event.preventDefault();
            // const formData = new FormData();
            // formData.append('item_name', item_name); // title 媛� 異붽��
           
            // formData.append('price', price);
            // formData.append('stock',stock);
            // formData.append('category',category);
            // files.forEach((file, index) => {
            //   formData.append(`img`, file);
           
            // });
      
            fetch('https://udtown.site/category', {
              method: 'POST',
              headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
              },
              credentials: 'include',
              body: JSON.stringify({
                'item_name':item_name,
                'price':price,
                'stock':stock,
                'category': category,
                'img': files[0],
              }),
            })
              .then(async(response) => {
                const data = await response.json();
                console.log(data)
                if(response.status == 404){
                   
                  alert('컨텐츠 저장에 실패하였습니다');
                }else if(response.status == 200){
                  alert('저장되었습니다');
                }
               
               
              })
              .finally(() => {
                setUploadDisabled(false);
              });
          }
    
                 
        
      }catch(error){
        
        alert('컨텐츠 저장에 실패하였습니다')
      }
      
    },
    [files, item_name,category,seller_id,price],
  );

  const { getRootProps, getInputProps } = useDropzone({ onDrop: handleDrop, multiple: true, disabled: uploadDisabled });

 
  return (
    <div className="edit-bottom">
     

      <div className={style.form}>
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              상품명
              <input type="text" value={item_name} placeholder="상품명을 적어주세요" onChange={(event) => setItem_name(event.target.value)} />
            </label>
            <hr />
            <label>
              카테고리
              <input type="text" value={category} placeholder="상품의 카테고리를 적어주세요" onChange={(event) => setCategory(event.target.value)} />
            </label>
            <hr />
            <label>
              가격
              <input type="text" value={price} placeholder="제품의 가격을 적어주세요" onChange={(event) => setPrice(event.target.value)} />
            </label>
            <hr />
            <label>
              셀러 ID
              <input type="text" value={seller_id} placeholder="판매자의 ID를 적어주세요" onChange={(event) => setSeller_id(event.target.value)} />
            </label>
            <hr />
            <label>
              재고
              <input type="text" value={stock} placeholder="재고를 적어주세요" onChange={(event) => setStock(event.target.value)} />
            </label>
            <hr />
          </div>
          <label style={{"fontSize":"15px"}}>이미지 업로드  </label>
          <div {...getRootProps()} className={style.dropzone}>
            <input {...getInputProps()} />
            {files.length > 0 ? (
              <div className={style.preview}>
                {files.map((file, index) => (
                  <div key={file.name} className={style.imageContainer}>
                    <ImageWithAnimation src={URL.createObjectURL(file)} alt={file.name} className={style.image} />
                    <button type="button" className={style.cancel} onClick={() => handleCancel(index)}>X</button>
                  </div>
                ))}
              </div>
            ) : (
              <p onClick={() => { setUploadDisabled(false); }}>이곳에 이미지를 드래그하거나 클릭하여 업로드 해주세요.</p>
            )}
          </div>
          <button className={style.button}type="submit">저장</button>
        </form><label>
              아이템삭제
              <input type="text" value={item} placeholder="아이템ID를 적어주세요" onChange={(event) => setItem(event.target.value)} />
            </label>
          <button className={style.modalButton} onClick={()=>{handleConfirm(item)}}>확인</button>
  

        
      </div>
    </div>
  );
};

export default ImageUploader;



