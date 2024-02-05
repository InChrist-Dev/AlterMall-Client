export default async function handler(req, res){
    const { orderId, paymentKey, amount,name,phone} = req.query;
    console.log(req.query)
    const secretKey = process.env.TOSS_SECRET_KEY;
    const url = `https://api.tosspayments.com/v1/payments/confirm`;
    const basicToken = Buffer.from(`${secretKey}:`,`utf-8`).toString("base64");

 
    await fetch('http://211.45.170.37:3000/customer/confirm',{
        method:'post',
        body:JSON.stringify({
            "order_id": orderId,
            "payment_key": paymentKey,
            "addr": "rich building",
            "addr_detail":"5th floor",
            "name":name,
            "amount": amount,
            "phone": phone
         
        }),
        headers:{
            Authorization:`Basic ${basicToken}`,
            "Content-Type":"application/json",
        },
    }).then((res)=> res.json());

    //TODO: DB처리
    res.redirect(`/payments/complete?orderId=${orderId}`);
}