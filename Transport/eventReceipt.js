
document.getElementById("eventname").innerHTML = localStorage.getItem("event");
document.getElementById("eventdetails").innerHTML = "Location: " + localStorage.getItem("eventaddress") + "<br>Date: " + localStorage.getItem("eventdate");
document.getElementById("eventdesc").innerHTML = localStorage.getItem("eventdesc");
const drivernum = localStorage.getItem("driver");
const cpnum = localStorage.getItem("currentuser");
document.getElementById("driver").innerHTML = localStorage.getItem("user" + drivernum);
document.getElementById("driverinfo").innerHTML = "Driver" + "<br>" + localStorage.getItem("phone" + drivernum) + "<br>" + localStorage.getItem("email" + drivernum) + "<br>" + localStorage.getItem("address" + drivernum);
document.getElementById("carpoolerinfo").innerHTML = "Carpooler" + "<br>" + localStorage.getItem("email" + cpnum) + "<br>" + localStorage.getItem("address" + cpnum);
document.getElementById("carpooler").innerHTML = localStorage.getItem("user" + cpnum);


function initMap() {
  const directionsService = new google.maps.DirectionsService();
  const directionsRenderer = new google.maps.DirectionsRenderer();
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 7,
    center: { lat: 40.686506, lng: -74.570665},
  });

  directionsRenderer.setMap(map);
  calculateAndDisplayRoute(directionsService, directionsRenderer);
}

function calculateAndDisplayRoute(directionsService, directionsRenderer) {
  const waypts = [];
  waypts.push({
    location: localStorage.getItem("address"+localStorage.getItem("currentuser")),
    stopover: true,
  })
  directionsService
  .route({
    origin: {
      query: localStorage.getItem("address" + localStorage.getItem("driver")),
    },
    waypoints: waypts,
    destination: {
      query: localStorage.getItem("eventaddress"),
    },
    travelMode: google.maps.TravelMode.DRIVING,
  })
  .then((response) => {
    directionsRenderer.setDirections(response);
  })
  .catch((e) => window.alert("Directions request failed due to " + status));
}

//window.initMap = initMap;





/*var i = 1;
while (localStorage.getItem("user" + i) !== null) {
  document.getElementById("result").innerHTML += localStorage.getItem("user"+i) + " ";
  i++;
}
*/