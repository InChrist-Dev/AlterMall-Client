
import Cookies from 'js-cookie';

// 쿠키에서 토큰을 가져오기
const accessToken = Cookies.get('accessToken');
export default async function handler(req, res) {
    const { orderId, paymentKey, amount } = req.query;
    console.log(req.query)
    const secretKey = 'test_sk_24xLea5zVAoPKMyLlpbm8QAMYNwW';
    const url = `https://api.tosspayments.com/v1/payments/confirm`;
    const basicToken = Buffer.from(`${secretKey}:`, `utf-8`).toString("base64");
    await fetch(url,{
        method:'post',
        body:JSON.stringify({
           orderId,
            paymentKey, 
             amount,

        }),
        headers:{
            Authorization:`Basic ${basicToken}`,
            "Content-Type":"application/json",
        },
    }).then((res)=> res.json());
   
    try {
        await fetch('https://udtown.site/customer/confirm/', {
            method: 'patch',
            body: JSON.stringify({
                "order_id": orderId,
                "payment_key": paymentKey,
                "amount": amount,


            }),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
               
            },
            credentials: 'include',
        }).then((res) => console.log(res.json()));
    } catch (error) {
        console.error('데이터를 불러오는 중 오류가 발생했습니다:', error);
    }



    //TODO: DB처리
    res.redirect(`/payments/complete?orderId=${orderId}`);
}