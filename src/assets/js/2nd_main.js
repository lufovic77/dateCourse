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
		
});
	
var mapOptions = {
	    center: new naver.maps.LatLng(37.3595704, 127.105399),
		zoom: 15,
		mapTypeControl: true
};
var map = new naver.maps.Map('map', mapOptions);

	
var infoWindow = new naver.maps.InfoWindow({
		 anchorSkew: true
});

map.setCursor('pointer');

function searchCoordinateToAddress(latlng) {

  infoWindow.close();

  naver.maps.Service.reverseGeocode({
      coords: latlng,
      orders: [
	        naver.maps.Service.OrderType.ADDR,
	        naver.maps.Service.OrderType.ROAD_ADDR
	      ].join(',')
    }, function(status, response) {
	    if (status === naver.maps.Service.Status.ERROR) {
		      if (!latlng) {
			          return alert('ReverseGeocode Error, Please check latlng');
			        }
		      if (latlng.toString) {
			          return alert('ReverseGeocode Error, latlng:' + latlng.toString());
			        }
		      if (latlng.x && latlng.y) {
			          return alert('ReverseGeocode Error, x:' + latlng.x + ', y:' + latlng.y);
			        }
		      return alert('ReverseGeocode Error, Please check latlng');
		    }
	
	    var address = response.v2.address,
	        htmlAddresses = [];
	
	    if (address.jibunAddress !== '') {
		        htmlAddresses.push('[지번 주소] ' + address.jibunAddress);
		    }
	
	    if (address.roadAddress !== '') {
		        htmlAddresses.push('[도로명 주소] ' + address.roadAddress);
		    }
	
	    infoWindow.setContent([
		      '<div style="padding:10px;min-width:200px;line-height:150%;">',
		      '<h4 style="margin-top:5px;">검색 좌표</h4><br />',
		      htmlAddresses.join('<br />'),
		      '</div>'
		    ].join('\n'));
	
	    infoWindow.open(map, latlng);
	  });
}

function searchAddressToCoordinate(address) {
  naver.maps.Service.geocode({
      query: address
    }, function(status, response) {
	    if (status === naver.maps.Service.Status.ERROR) {
		      if (!address) {
			          return alert('Geocode Error, Please check address');
			        }
		      return alert('Geocode Error, address:' + address);
		    }
	
	    if (response.v2.meta.totalCount === 0) {
		      return alert('No result.');
		    }
	
	    var htmlAddresses = [],
	      item = response.v2.addresses[0],
	      point = new naver.maps.Point(item.x, item.y);
	
	    if (item.roadAddress) {
		      htmlAddresses.push('[도로명 주소] ' + item.roadAddress);
		    }
	
	    if (item.jibunAddress) {
		      htmlAddresses.push('[지번 주소] ' + item.jibunAddress);
		    }
	
	    if (item.englishAddress) {
		      htmlAddresses.push('[영문명 주소] ' + item.englishAddress);
		    }
	
	    infoWindow.setContent([
		      '<div style="padding:10px;min-width:200px;line-height:150%;">',
		      '<h4 style="margin-top:5px;">검색 주소 : '+ address +'</h4><br />',
		      htmlAddresses.join('<br />'),
		      '</div>'
		    ].join('\n'));
	
	    map.setCenter(point);
	    infoWindow.open(map, point);
	  });
}

function initGeocoder() {
  if (!map.isStyleMapReady) {
      return;
    }

  map.addListener('click', function(e) {
      searchCoordinateToAddress(e.coord);
    });

  $('#address').on('keydown', function(e) {
      var keyCode = e.which;
  
      if (keyCode === 13) { // Enter Key
	        searchAddressToCoordinate($('#address').val());
	      }
    });

  $('#submit').on('click', function(e) {
      e.preventDefault();
  
      searchAddressToCoordinate($('#address').val());
    });

  searchAddressToCoordinate('정자동 178-1');
}
	naver.maps.onJSContentLoaded = initGeocoder;
	naver.maps.Event.once(map, 'init_stylemap', initGeocoder);




})(jQuery);

