import {initializeApp} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import {getDatabase, ref, set, child, get, remove, update} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js";
import {getStorage, ref as sref, getDownloadURL} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-storage.js"
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
const storage = getStorage(app);
const db = getDatabase(app);

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
// End of Header Package================================================================================================

const id = sessionStorage.getItem("currentClub");

get(child(ref(db), 'clubs/' + id)).then((snapshot) => {
  if (!snapshot.exists())
    return;
  document.getElementById("name").innerHTML = snapshot.val().name;
  document.getElementById("email").innerHTML = "Email: " + snapshot.val().email;
  document.getElementById("category").innerHTML = "Type: " + snapshot.val().category;
  document.getElementById("description").innerHTML = snapshot.val().description;
  
});

getDownloadURL(sref(storage, 'clubs/' + id))
.then((url) => {

  // Or inserted into an <img> element
  const img = document.getElementById('photo');
  img.setAttribute('src', url);
});