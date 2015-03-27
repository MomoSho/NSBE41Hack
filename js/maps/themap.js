var map;
var acOptions = {
	types: ['establishment']
  };
var autocomplete = new google.maps.places.Autocomplete(document.getElementById('autocomplete'),acOptions);
var marker;
var infoWindowOptions = {
    content: 'Moscone Is Here!'
};
var infoWindow = new google.maps.InfoWindow(infoWindowOptions);

function initialize() {
  var mapOptions = {
    zoom: 8, //0 shows world, 19 shows streets
    center: new google.maps.LatLng(-34.397, 150.644)
  };
  map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);
	    
  
	autocomplete.bindTo('bounds',map);

	// Create marker, to designate point of interest
	var markerOptions = {
    position: new google.maps.LatLng(37.7831, -122.4039)
	};
	marker = new google.maps.Marker(markerOptions);
	marker.setMap(map);
	}

	// Try HTML5 geolocation
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = new google.maps.LatLng(position.coords.latitude,
                                       position.coords.longitude);

      var infowindow = new google.maps.InfoWindow({
        map: map,
        position: pos,
        content: 'Location found using HTML5.'
      });

      map.setCenter(pos);
    }, function() {
      handleNoGeolocation(true);
    });
  } else {
    // Browser doesn't support Geolocation
    handleNoGeolocation(false);
  }
	
google.maps.event.addDomListener(window, 'load', initialize);
google.maps.event.addListener(autocomplete, 'place_changed', function() {
  infoWindow.close();
  var place = autocomplete.getPlace();
  if (place.geometry.viewport) {
    map.fitBounds(place.geometry.viewport);
  } else {
    map.setCenter(place.geometry.location);
    map.setZoom(17);
  }
  marker.setPosition(place.geometry.location);
  infoWindow.setContent('<div><strong>' + place.name + '</strong><br>');
  infoWindow.open(map, marker);
  google.maps.event.addListener(marker,'click',function(e){

    infoWindow.open(map, marker);

  });
});

function handleNoGeolocation(errorFlag) {
  if (errorFlag) {
    var content = 'Error: The Geolocation service failed.';
  } else {
    var content = 'Error: Your browser doesn\'t support geolocation.';
  }

  var options = {
    map: map,
    position: new google.maps.LatLng(60, 105),
    content: content
  };

  var infowindow = new google.maps.InfoWindow(options);
  map.setCenter(options.position);
}