$(document).ready(function() {

  var userLocation = new Object();
  var markers = [];
  var map;

  // If you're adding a number of markers, you may want to drop them on the map
  // consecutively rather than all at once. This example shows how to use
  // window.setTimeout() to space your markers' animation.
  var neighborhoods = [
    {lat: 52.511, lng: 13.447},
    {lat: 52.549, lng: 13.422},
    {lat: 52.497, lng: 13.396},
    {lat: 52.517, lng: 13.394}
  ];

  var markers = [];
  var map;

  function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
      zoom: 12,
      center: {lat: 52.520, lng: 13.410}
    });
    drop();
  }

  function drop() {
    clearMarkers();
    for (var i = 0; i < neighborhoods.length; i++) {
      addMarkerWithTimeout(neighborhoods[i], i * 200);
    }
  }

  function addMarkerWithTimeout(position, timeout) {
    window.setTimeout(function() {
      markers.push(new google.maps.Marker({
        position: position,
        map: map,
        animation: google.maps.Animation.DROP
      }));
    }, timeout);
  }

  function clearMarkers() {
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(null);
    }
    markers = [];
  }

  function newLocation(campus, latitude, longitude) {
    var location = new Object();
    location.campus = campus;
    location.lat = latitude;
    location.lng = longitude;
    return location;
  }

  function setCampuses(locations) {
    locations.push(newLocation("Allendale", 42.963918, -85.888397));
    locations.push(newLocation("Annis Water Resource Center", 43.233644, -86.259783));
    locations.push(newLocation("Cook-DeVos Center for Health Sciences", 42.970727, -85.661486));
    locations.push(newLocation("Detroit", 42.337508, -83.048052));
    locations.push(newLocation("Holland", 42.779597, -86.075288));
    locations.push(newLocation("Muskegon Regional Center", 43.248491, -86.193867));
    locations.push(newLocation("Pew Campus", 42.964221, -85.677128));
    locations.push(newLocation("Traverse City", 44.739785, -85.620594))
  }

  function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success);
    } else {
        $("#title").append(
          "<p>Geolocation is not supported by this browser.</p>"
        );
    }
  }

  function distance(locationFrom, locationTo) {
    var lat1 = locationFrom.lat;
    var lon1 = locationFrom.lng;
    var lat2 = locationTo.lat;
    var lon2 = locationTo.lng;

    var p = 0.017453292519943295;    // Math.PI / 180
    var c = Math.cos;
    var a = 0.5 - c((lat2 - lat1) * p)/2 +
              c(lat1 * p) * c(lat2 * p) *
              (1 - c((lon2 - lon1) * p))/2;
    // 2 * R; R = 3959 miles
    return 7918 * Math.asin(Math.sqrt(a));
  }

  function getDistances(locations) {
    var distances = []
    for (var index in locations) {
      var dist = distance(userLocation, locations[index]);
      distances.push({ distance: dist, location });
    }
    return distances;
  }

  function success(position) {
    $("#title").append("Latitude: " + position.coords.latitude +
      "<br>Longitude: " + position.coords.longitude
    );
    userLocation.lat = position.coords.latitude;
    userLocation.lng = position.coords.longitude;
    main();
  }

  function main() {
    var locations = [];
    setCampuses(locations);
    var distances = getDistances(locations);
  }

  getLocation();

})
