<?php
$adminkey= "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"; // admin 
$cid='TC0ONETIME';// cid 
$req_auth = 'Authorization: KakaoAK xxxxxxxxx769a5a3xxxxxxxxxxxd2xxxxxxxxf227e'; 
$req_cont = 'Content-type: application/x-www-form-urlencoded;charset=utf-8'; 
$kakao_header = Array(
'POST /v1/payment/ready HTTP/1.1',
'Host: kapi.kakao.com',
 $req_auth,
 $req_cont
 ); 
$partner_order_id="partner_order_id";
$partner_user_id="partner_user_id";
$item_name="ramen";
$quantity=1;
$total_amount=2200;
$vat_amount=200;
$tax_free_amount=0;
$approval_url = "http://ezpayda.de/ezpay/";       
$cancel_url = "http://ezpayda.de/ezpay/";
$fail_url = "http://ezpayda.de/ezpay/";
$pay_url = "https://kapi.kakao.com/v1/payment/ready"; 
$cu = curl_init();


$kakao_arr = Array( 
'cid' => $cid, // 가맹점코드 
'partner_order_id' => $partner_order_id, // 주문번호 
'partner_user_id' => $partner_user_id, // 유저id 
'item_name' => $item_name, //상품명 
'quantity' => $quantity, // 상품 수량 
'total_amount' => $total_amount, // 상품 총액 
'tax_free_amount' => '0', // 상품 비과세 금액 
'approval_url' => $approval_url, // 결제성공 url 
'cancel_url' => $cancel_url, 
'fail_url' => $fail_url 
);

//print_r($kakao_arr);
 
curl_setopt($cu, CURLOPT_URL, $pay_url);
curl_setopt($cu, CURLOPT_BINARYTRANSFER, 1);
curl_setopt($cu, CURLOPT_HTTPHEADER,$kakao_header); 
curl_setopt($cu, CURLOPT_HEADER,false);  
curl_setopt($cu, CURLOPT_RETURNTRANSFER,1);  
curl_setopt($cu, CURLOPT_POST, true);
curl_setopt($cu, CURLOPT_POSTFIELDS, http_build_query($kakao_arr)); 
/*curl_setopt($cu, CURLOPT_CONNECTTIMEOUT, 30); 
curl_setopt($cu, CURLOPT_TIMEOUT, 30); 
curl_setopt($cu, CURLOPT_RETURNTRANSFER, true); 
curl_setopt($cu, CURLOPT_SSL_VERIFYPEER, 0);
*/
$output = curl_exec($cu); 
$status_code = curl_getinfo($cu, CURLINFO_HTTP_CODE); 
curl_close($cu); 
if($status_code == 200) { 
echo $output; 
} else { 
echo "Error 내용:".$output; 
}  
?> 
