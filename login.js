import {initializeApp} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import {getDatabase, ref, set, child, get, remove} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js";

const firebaseConfig = {
  databaseURL: "https://club-central-2af6e-default-rtdb.firebaseio.com"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Realtime Database and get a reference to the service
const db = getDatabase(app);



//FOR DELETION
//remove(ref(db, 'users/2'));
function writeUserData() {
  const name = document.getElementById("description").value;
  //FOR STORING DATA
  set(ref(db, 'users/1'), {
    username: name,
    email: "hi",
    profile_picture : "hi"
  });

  //FOR READING DATA
  get(child(ref(db), 'users/1')).then((snapshot) => {
    if (snapshot.exists()) {
      console.log(snapshot.val());
      document.getElementById("hi").innerHTML = snapshot.val().username.replace(/\n/g, "<br>");;
    } else {
      console.log("No data available");
    }
  }).catch((error) => {
    console.error(error);
  });
}

const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener('click', () =>{
    container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener('click', () =>{
    container.classList.remove("sign-up-mode");
});


// the below is not used but for reference
document.getElementById("signupform").addEventListener("submit", async function(event) {
  event.preventDefault();

  const username = document.getElementById("signupusername").value.trim();
  const name = document.getElementById("signupname").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("signuppassword").value.trim();
  const address = document.getElementById("address").value.trim();

  
  if (username === "" || email === "" || password === "" || address === "") {
    alert("Please fill in all fields.");
    return;
  }

  let usernameAlreadyExists = false;
  var snapshot = await get(child(ref(db), 'users/'));
  snapshot.forEach((childSnapshot) => {
    if (childSnapshot.child('username').val() == username)
      usernameAlreadyExists = true;
  });
  if (usernameAlreadyExists) {
    alert("Username already exists");
    return;
  }
  let i = 1;
  let done = false;
  while (!done) {
    snapshot = await get(child(ref(db), 'users/' + i));
    if (snapshot.exists()) {
      i++;
    } else {
      await set(ref(db, 'users/' + i), {
        name: username,
        email: email,
        profile_picture: password
      });
      done = true;
    }
  }
  sessionStorage.setItem("currentUser", i);
  // while (localStorage.getItem("user" + i) !== null) {
  //   i++;
  // }

  //document.getElementById("result").innerHTML = localStorage.getItem("user1");

  //localStorage.clear();
  // Assume AJAX call to send login info to server and save in database
  const urlParams = new URLSearchParams(window.location.search);
  //Redirect to page that brought user to login page
  window.location.href = urlParams.get('redirect') ? urlParams.get('redirect') : '/clubCentral.html';
});

document.getElementById("signinform").addEventListener("submit", function(event) {
  event.preventDefault(); 

  const name = document.getElementById("signinname").value.trim();
  const password = document.getElementById("signinpassword").value.trim();

  if (name === "" || password === "") {
    alert("Please fill in all fields.");
    return;
  }
  var i = 1;
  while (localStorage.getItem("user" + i) !== null && localStorage.getItem("user"+i) != name) {
    i++;
  }
  if (localStorage.getItem("user" + i) === null) {
    alert("Invalid username or password.");
    return;
  }
  else if (localStorage.getItem("password" + i) != password) {
    alert("Invalid username or password.");
    return;
  }
  else {
    localStorage.setItem("currentuser", i);
    const urlParams = new URLSearchParams(window.location.search);
    window.location.href = urlParams.get('redirect');

    //document.getElementById("result").innerHTML = localStorage.getItem("user1");

    //localStorage.clear();
    // Assume AJAX call to send login info to server and save in database
    // Redirect to another page after successful login
    //window.location.href = "/result.html?driver=" + name; // Redirect to event selection page
  }

});