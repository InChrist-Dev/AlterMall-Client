export default async function handler(req, res){
    const { orderId, paymentKey, amount} = req.query;
    const secretKey = process.env.TOSS_SECRET_KEY;
    const url = `https://api.tosspayments.com/v1/payments/confirm`;
    const basicToken = Buffer.from(`${secretKey}:`,`utf-8`).toString("base64");

 
    await fetch('http://211.45.170.37:3000/customer/order',{
        method:'post',
        body:JSON.stringify({
            "order_id": orderId,
            "payment_key": paymentKey,
            "addr": "rich building",
            "addr_detail":"5th floor",
            "post":"11032",
            "requests":"빠르게 배송해 주세요",
            "amount": amount,
            "customer_id":"89122e30-b9c5-11ee-9d01-07fefcbd1ba0",
            "item_id":"e8f12213-5585-4c3d-ac52-89ce9bf9440f"
        }),
        headers:{
            Authorization:`Basic ${basicToken}`,
            "Content-Type":"application/json",
        },
    }).then((res)=> res.json());

    //TODO: DB처리
    res.redirect(`/payments/complete?orderId=${orderId}`);
}