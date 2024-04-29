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
var events;
await get(child(ref(db), 'users/' + sessionStorage.getItem("currentUser"))).then((snapshot) => {
  events = snapshot.val().events || [];
});
if (events.length == 0) {
  document.getElementById("noEventsMessage").innerHTML = "You are currently not signed up to carpool for any events.";
}
else {
  for (let i = 0; i < events.length; i++) {
    const span = document.createElement("div");
    span.id = events[i];
    span.classList.add("packages");
    await get(child(ref(db), 'events/' + events[i])).then((snapshot) => {
      if (snapshot.exists()) {
        const name = document.createElement("h1");
        name.innerHTML = snapshot.val().name;
        span.appendChild(name);
        const club = document.createElement("a");
        const hostClub = document.createElement("h2");
        hostClub.classList.add("text1");
        club.appendChild(hostClub);
        club.setAttribute("href", "../Organizations/clubProfile.html");
        club.id = events[i] + "club" + snapshot.val().club;
        span.appendChild(club);
        const list = document.createElement("ul");
        list.classList.add("list");
        const date = document.createElement("li");
        
      }
    });
    document.getElementById("carpoolers").appendChild(span);
  }
}

clubLink.id = eventId + "club" + snapshot.val().club;
document.getElementById(eventId).addEventListener("click", async function(event) {
// Access the id attribute of the target element
const id = event.target.id.charAt(event.target.id.length - 1).toString();
if (event.target.id.includes("club")) {
  sessionStorage.setItem("currentClub", id);
  return;
}