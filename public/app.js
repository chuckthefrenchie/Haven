// Google API Key
// AIzaSyBE8vNY5NdxQVYKy4u6Tj1OegLTcJKEBOk

let map, infoWindow;

initMap = () => {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 10
  });
  infoWindow = new google.maps.InfoWindow;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      
      infoWindow.setPosition(pos);
      infoWindow.setContent('You are here!');
      infoWindow.open(map);
      map.setCenter(pos);
    }, function () {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }

  function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
      'Error: The Geolocation service failed.' :
      'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
  }
}

function getZipInput() {
  var zipInput = document.getElementById("inputArea").value;

  $.ajax({
    url: "https://maps.googleapis.com/maps/api/geocode/json?address=" + zipInput + "&key=AIzaSyBE8vNY5NdxQVYKy4u6Tj1OegLTcJKEBOk",
    method: "GET",
    dataType: "json",
  }).then(function (response) {
    let lat = response.results[0].geometry.location.lat;
    let lng = response.results[0].geometry.location.lng;

    let userInput = new google.maps.LatLng(lat, lng)
    
    map = new google.maps.Map(document.getElementById('map'), {
      center: userInput,
      zoom: 10
    });
  })
}
