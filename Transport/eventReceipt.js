import {initializeApp} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import {getDatabase, ref, set, child, get, remove, update} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js";
import {getStorage, ref as sref, getDownloadURL, uploadBytes} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-storage.js";
// Header Package=============================================================================================================
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


document.getElementById("sign-out").addEventListener('click', signOut);

function signOut() {
  sessionStorage.setItem("currentUser", "");
}
getDownloadURL(sref(storage, 'users/' + sessionStorage.getItem("currentUser")))
.then((url) => {

  // Or inserted into an <img> element
  const img = document.getElementById('profile-pic');
  img.setAttribute('src', url);
});
get(child(ref(db), 'users/' + sessionStorage.getItem("currentUser"))).then((snapshot) => {
  if (!snapshot.val().creator)
    document.getElementById("createClub").style.display = "none";

});
// End of Header Package================================================================================================

document.getElementById("eventname").innerHTML = localStorage.getItem("event");
document.getElementById("eventdetails").innerHTML = "Location: " + localStorage.getItem("eventaddress") + "<br>Date: " + localStorage.getItem("eventdate");
document.getElementById("eventdesc").innerHTML = localStorage.getItem("eventdesc");
const drivernum = localStorage.getItem("driver");
const cpnum = localStorage.getItem("currentuser");
document.getElementById("driver").innerHTML = localStorage.getItem("user" + drivernum);
document.getElementById("driverinfo").innerHTML = "Driver" + "<br>" + localStorage.getItem("phone" + drivernum) + "<br>" + localStorage.getItem("email" + drivernum) + "<br>" + localStorage.getItem("address" + drivernum);
document.getElementById("carpoolerinfo").innerHTML = "Carpooler" + "<br>" + localStorage.getItem("email" + cpnum) + "<br>" + localStorage.getItem("address" + cpnum);
document.getElementById("carpooler").innerHTML = localStorage.getItem("user" + cpnum);


export function initMap() {
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