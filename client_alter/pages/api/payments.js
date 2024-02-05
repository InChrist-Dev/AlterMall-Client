export default async function handler(req, res){
    const { orderId, paymentKey, amount,name,customerMobilePhone} = req.query;
    console.log(req.query)
    const secretKey = process.env.TOSS_SECRET_KEY;
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
            "phone": customerMobilePhone
         
        }),
        headers:{
            Authorization:`Basic ${basicToken}`,
            "Content-Type":"application/json",
        },
    }).then((res)=> res.json());

    //TODO: DB처리
    res.redirect(`/payments/complete?orderId=${orderId}`);
}