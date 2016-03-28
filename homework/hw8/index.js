
var map;

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
      zoom: 7,
      center: {lat: 42.963918, lng: -85.888397 }
    });
}

$(document).ready(function() {

  var userLocation = new Object();
  var markers = [];
  var locations = [];

  function drop() {
    for (var i = 0; i < locations.length; i++) {
      addMarkerWithTimeout(locations[i], i * 200);
    }
  }

  function addMarkerWithTimeout(position, timeout) {
    var marker;
    window.setTimeout(function() {
      marker = new google.maps.Marker({
        position: { lat: position.lat, lng: position.lng},
        content: position.campus,
        map: map,
        animation: google.maps.Animation.DROP
      });
      google.maps.event.addListener(marker, 'click', function() {
          marker.infowindow = new google.maps.InfoWindow({
              content: marker.content
          }).open(map, marker);
      });
      markers.push(marker);
    }, timeout);
  }

  function newLocation(campus, latitude, longitude) {
    var location = new Object();
    location.campus = campus;
    location.lat = latitude;
    location.lng = longitude;
    return location;
  }

  function setCampuses() {
    locations.push(newLocation("Allendale", 42.963918, -85.888397));
    locations.push(newLocation("Annis Water Resource Center", 43.233644, -86.259783));
    locations.push(newLocation("Cook-DeVos Center for Health Sciences", 42.970727, -85.661486));
    locations.push(newLocation("Detroit", 42.337508, -83.048052));
    locations.push(newLocation("Holland", 42.779597, -86.075288));
    locations.push(newLocation("Muskegon Regional Center", 43.248491, -86.193867));
    locations.push(newLocation("Pew", 42.964221, -85.677128));
    locations.push(newLocation("Traverse City", 44.739785, -85.620594))
  }

  function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success);
    } else {
        $("#title-container").append(
          "<p>Geolocation is not supported by this browser.</p>"
        );
    }
  }

  function distance(locationFrom, locationTo) {
    var lat1 = locationFrom.lat;
    var lon1 = locationFrom.lng;
    var lat2 = locationTo.lat;
    var lon2 = locationTo.lng;
    // Using the Haversine formula
    var p = 0.017453292519943295;    // Math.PI / 180
    var c = Math.cos;
    var a = 0.5 - c((lat2 - lat1) * p)/2 +
              c(lat1 * p) * c(lat2 * p) *
              (1 - c((lon2 - lon1) * p))/2;
    // 2 * R; R = 3959 miles
    return 7918 * Math.asin(Math.sqrt(a));
  }

  function getDistances() {
    var distances = []
    for (var index in locations) {
      var dist = distance(userLocation, locations[index]);
      distances.push({ distance: dist, location: locations[index] });
    }
    distances.sort(function(a, b) {
        return a.distance - b.distance;
    });
    return distances;
  }

  function success(position) {
    userLocation.lat = position.coords.latitude;
    userLocation.lng = position.coords.longitude;
    run();
  }

  function makeTable(distances) {
      var currentDistance = -1;
      for (var index in distances) {
          currentDist = distances[index].distance.toPrecision(4);
          $("#dist-table").append(
                "<tr><td>" + currentDist + " miles" + 
                "</td><td>" + distances[index].location.campus + "</td></td>"
                );
      }
  }
  
  function run() {
    setCampuses();
    var distances = getDistances();
    makeTable(distances);
    $(".title").html("geoLctr");
    drop();
  }

  getLocation();

})

