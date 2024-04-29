import {initializeApp} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import {getDatabase, ref, set, child, get, remove, update} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js";
import {getStorage, ref as sref, getDownloadURL, uploadBytes} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-storage.js";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDjMBUC1EhrOSzzgId-sglmdmJJ4kCyV5Q",
  authDomain: "club-central-2af6e.firebaseapp.com",
  databaseURL: "https://club-central-2af6e-default-rtdb.firebaseio.com",
  projectId: "club-central-2af6e",
  storageBucket: "club-central-2af6e.appspot.com",
  messagingSenderId: "578174084496",
  appId: "1:578174084496:web:13f92682f267332f62ff15",
  measurementId: "G-FKR7SRZ915"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const storage = getStorage(app);


var driverId;
await get(child(ref(db), 'events/' + sessionStorage.getItem("currentEvent"))).then((snapshot) => {
  driverId = snapshot.val().driver;
});
await getDownloadURL(sref(storage, 'users/' + driverId))
.then((url) => {
  document.getElementById("driverPhoto").src = url;
});
await get(child(ref(db), 'users/' + driverId)).then((snapshot) => {
  if (snapshot.exists()) {
    document.getElementById("drivername").innerHTML = snapshot.val().name;
    document.getElementById("driverinfo").innerHTML = "Driver<br>" + snapshot.val().phone + "<br>" + snapshot.val().email + "<br>" + snapshot.val().address;
  }
});
var carpoolers = [];
// var carpoolernames = [];
// var carpoolerdescriptions = [];
await get(child(ref(db), 'events/' + sessionStorage.getItem("currentEvent"))).then((snapshot) => {
  carpoolers = snapshot.val().carpoolers || [];
});
if (carpoolers.length == 0) {
  const noRiders = document.createElement("h1");
  noRiders.innerHTML = "There are currently no riders for this event.";
  document.getElementById("carpoolers").appendChild(noRiders);
}
else {
  for (let i = 0; i < carpoolers.length; i++) {
    const span = document.createElement("span");
    await getDownloadURL(sref(storage, 'events/' + eventId))
    .then((url) => {
      const img = document.createElement('img');
      img.classList.add("header-img");
      img.src = url;
      span.appendChild(img);
    });
    await get(child(ref(db), 'users/' + carpoolers[i])).then((snapshot) => {
      if (snapshot.exists()) {
        snapshot.val().name
        
        carpoolerdescriptions.push(snapshot.val().description);
      }
    });
  }
}

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
initMap();
//window.initMap = initMap;





/*var i = 1;
while (localStorage.getItem("user" + i) !== null) {
  document.getElementById("result").innerHTML += localStorage.getItem("user"+i) + " ";
  i++;
}
*/