import {initializeApp} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import {getDatabase, ref, set, child, get, remove} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js";

const firebaseConfig = {
  databaseURL: "https://club-central-2af6e-default-rtdb.firebaseio.com"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Realtime Database and get a reference to the service
const db = getDatabase(app);

if (!sessionStorage.getItem("currentUser")) {
  document.querySelector('.profile-icon').style.display = "none";
}
else {
  document.querySelector('.sign-up-message').style.display = "none";
  //Change PATH according to your own naming convention
  get(child(ref(db), 'users/' + sessionStorage.getItem("currentUser"))).then((snapshot) => {
    if (snapshot.exists()) {
      // Assumes there is a field called "name" in users with user's name stored
      document.querySelector('.username').innerHTML = snapshot.val().name;
    } else {
      console.log("No data available");
    }
  }).catch((error) => {
    console.error(error);
  });

}

document.querySelector('.sign-out-message').addEventListener('click', signOut);
document.querySelector('.sign-up-message').addEventListener('click', signUp);



function signOut() {
  console.log("works");
}
function signUp() {
  
}