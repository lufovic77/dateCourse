/*
   Industrious by TEMPLATED
   templated.co @templatedco
   Released for free under the Creative Commons Attribution 3.0 license (templated.co/license)
 */
(function ($) {

var totalPrice=0;
 var $window = $(window),
 $banner = $('#banner'),
 $body = $('body');

 // Breakpoints.
 breakpoints({
		 default: ['1681px', null],
xlarge: ['1281px', '1680px'],
large: ['981px', '1280px'],
medium: ['737px', '980px'],
small: ['481px', '736px'],
xsmall: ['361px', '480px'],
xxsmall: [null, '360px']
});

 // Play initial animations on page load.
 $window.on('load', function () {
	var acc = document.getElementsByClassName("accordion");
	var i;
		
	var mapOptions = {
		    center: new naver.maps.LatLng(37.3595704, 127.105399),
			zoom: 10
	};
	var map = new naver.maps.Map('map', mapOptions);
	window.setTimeout(function () {
			 $body.removeClass('is-preload');
			 }, 100);
 });

//결제 버튼 누르면 반응
$("#search_btn").click(function () {
	if(totalPrice==0){
		alert("먼저 메뉴를 고르세요");
		return;
	}
});


function payment(agent) {
	//var windowReference = window.open('', 'payment_popup', 'width=426,height=510,toolbar=no,location=no');

	var request = $.ajax({
url: 'assets/php/test.php',
method: 'GET',
dataType: 'json'
});

request.done(function (data){
		//	console.log(data.next_redirect_pc_url);
		if (agent === 'web') {
		//windowReference.location = data.next_redirect_pc_url;
		location.href = data.next_redirect_pc_url;
		} else {
		//windowReference.location = data.next_redirect_mobile_url;
		location.href = data.next_redirect_mobile_url;
		}
		});

request.fail(function (jqXHR, textStatus) {
		console.log("Request failed: " + textStatus);
		});
}
//]]>

function calculateTotal(flag, amount){
	if(flag==0){ //minus
		totalPrice-=amount;
	}
	else{ //plus
		totalPrice+=amount;
	}

	var divobj = document.getElementById('totalPrice');
	divobj.style.display='block';
	divobj.innerHTML = "가격: "+totalPrice+"원";
}

// Menu.
$('#menu')
	.append('<a href="#menu" class="close"></a>')
.appendTo($body)
	.panel({
target: $body,
visibleClass: 'is-menu-visible',
delay: 500,
hideOnClick: true,
hideOnSwipe: true,
resetScroll: true,
resetForms: true,
side: 'right'
});

})(jQuery);
