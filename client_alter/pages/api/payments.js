
import Cookies from 'js-cookie';

// 쿠키에서 토큰을 가져오기
const accessToken = Cookies.get('accessToken');
export default async function handler(req, res,{Data}){
    const { orderId, paymentKey, amount,name,Phone} = req.query;
    console.log(req.query)
    const secretKey = 'test_sk_24xLea5zVAoPKMyLlpbm8QAMYNwW';
    const url = `https://api.tosspayments.com/v1/payments/confirm`;
    const basicToken = Buffer.from(`${secretKey}:`,`utf-8`).toString("base64");

 
    await fetch('https://udtown.site/customer/confirm',{
        method:'post',
        body:JSON.stringify({
            "order_id": orderId,
            "payment_key": paymentKey,
            "addr": "rich building",
            "addr_detail":"5th floor",
            "name":name,
            "amount": amount,
            "phone": Phone
         
        }),
        headers:{
            Authorization:`Bearer ${accessToken}`,
            "Content-Type":"application/json",
        },
        credentials:'include',
    }).then((res)=> res.json());

    // await fetch(url,{
    //     method:'post',
    //     body:JSON.stringify({
    //         "order_id": orderId,
    //         "payment_key": paymentKey,
    //         "addr": "rich building",
    //         "addr_detail":"5th floor",
    //         "name":name,
    //         "amount": amount,
    //         "phone": '2121921'
         
    //     }),
    //     headers:{
    //         Authorization:`Basic ${basicToken}`,
    //         "Content-Type":"application/json",
    //     },
    // }).then((res)=> res.json());

    //TODO: DB처리
    res.redirect(`/payments/complete?orderId=${orderId}`);
}