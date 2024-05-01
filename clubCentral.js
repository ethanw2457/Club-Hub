import {initializeApp} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import {getDatabase, ref, set, child, get, remove} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js";
// == Final ==
//sessionStorage.setItem("currentUser","1");
const firebaseConfig = {
  databaseURL: "https://club-central-2af6e-default-rtdb.firebaseio.com"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Realtime Database and get a reference to the service
const db = getDatabase(app);

if (!sessionStorage.getItem("currentUser")) {
  document.getElementById("welcome").style.display = "none";
}
else {
  document.getElementById("login").style.display = "none";
  //Change PATH according to your own naming convention
  get(child(ref(db), 'users/' + sessionStorage.getItem("currentUser"))).then((snapshot) => {
    if (snapshot.exists()) {
      // Assumes there is a field called "name" in users with user's name stored
      const name = snapshot.val().name;
      const spaceIndex = name.indexOf(' ');

      // If space exists, extract substring up to the first space
      const fname = spaceIndex !== -1 ? name.substring(0, spaceIndex) : name;
      document.getElementById('username').innerHTML = "Welcome, " + fname + "!";
    } else {
      console.log("No data available");
    }
  }).catch((error) => {
    console.error(error);
  });

}

document.getElementById("sign-out-link").addEventListener('click', signOut);



function signOut() {
  sessionStorage.setItem("currentUser", "");
}