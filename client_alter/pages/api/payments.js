

export default async function handler(req, res) {
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