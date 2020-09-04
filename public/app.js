$(document).on("click", "#zipButton", function() {
    console.log("button works") 
  });

initAutocomplete = () => {
  const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 34.0522, lng: -118.576 },
    zoom: 10
  });

  const input = document.getElementById("inputArea");
  const searchBox = new google.maps.places.SearchBox(input);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  map.addListener("bounds_changed", () => {
    searchBox.setBounds(map.getBounds());
  });

  let markers = [];

  searchBox.addListener("places_changed", () => {
    const places = searchBox.getPlaces();

    if(places.length == 0) {
      return;
    }

    markers.forEach(marker => {
      marker.setMap(null);
    });
    markers = [];

    const bounds = new google.maps.LatLngBounds();
    places.forEach(place => {
      if(!place.geometry) {
        console.log("Returned place contains no geometry");
        return;
      }
      const icon = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };
      markers.push(
        new google.maps.Marker({
          map,
          icon,
          title: place.name,
          position: place.geometry.location
        })
      );

      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    map.fitBounds(bounds);
  });
}
// let map, infoWindow;

// initMap = () => {
//   map = new google.maps.Map(document.getElementById("map"), {
//     center: { lat: 34.0522, lng: -118.576 },
//     zoom: 10
//   });
//   infoWindow = new google.maps.InfoWindow;

//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(function(position) {
//       var pos = {
//         lat: position.coords.latitude,
//         lng: position.coords.longitude
//       };

//       infoWindow.setPosition(pos);
//       infoWindow.setContent('You are here!');
//       infoWindow.open(map);
//       map.setCenter(pos);
//     }, function() {
//       handleLocationError(true, infoWindow, map.getCenter());
//     });
//   } else {
//     // Browser doesn't support Geolocation
//     handleLocationError(false, infoWindow, map.getCenter());
//   }

//   function handleLocationError(browserHasGeolocation, infoWindow, pos) {
//     infoWindow.setPosition(pos);
//     infoWindow.setContent(browserHasGeolocation ?
//                           'Error: The Geolocation service failed.' :
//                           'Error: Your browser doesn\'t support geolocation.');
//     infoWindow.open(map);
//   }

// }