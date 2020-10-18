/*
   Industrious by TEMPLATED
   templated.co @templatedco
   Released for free under the Creative Commons Attribution 3.0 license (templated.co/license)
 */
(function ($) {

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

})(jQuery);
