import {initializeApp} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import {getDatabase, ref, set, child, get, remove, update} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js";

const firebaseConfig = {
  databaseURL: "https://club-central-2af6e-default-rtdb.firebaseio.com"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Realtime Database and get a reference to the service
const db = getDatabase(app);



const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener('click', () =>{
    container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener('click', () =>{
    container.classList.remove("sign-up-mode");
});

const siUser = document.getElementById('submit1');
const submitButton2 = document.getElementById('submit2');

// Flags to track which button was clicked
let buttonClicked = '';

// Add click event listeners to the submit buttons
submitButton1.addEventListener('click', () => {
  buttonClicked = 'submit1';
});


// the below is not used but for reference
document.getElementById("signupform").addEventListener("submit", async function(event) {
  event.preventDefault();

  const username = document.getElementById("signupusername").value.trim();
  const name = document.getElementById("signupname").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("signuppassword").value.trim();
  const address = document.getElementById("address").value.trim();
  const phone = document.getElementById("phonenumber").value.trim();


  
  if (name === "" || username === "" || email === "" || password === "" || address === "") {
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
        name: name,
        username: username,
        email: email,
        password: password,
        address: address,
        phone: phone
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

document.getElementById("signinform").addEventListener("submit", async function(event) {
  event.preventDefault(); 

  const username = document.getElementById("signinusername").value.trim();
  const password = document.getElementById("signinpassword").value.trim();

  if (username === "" || password === "") {
    alert("Please fill in all fields.");
    return;
  }
  var passwordCorrect = false;
  var i = "";
  var snapshot = await get(child(ref(db), 'users/'));
  snapshot.forEach((childSnapshot) => {
    if (childSnapshot.child('username').val() == username && childSnapshot.child('password').val() == password) {
      passwordCorrect = true;
      i = childSnapshot.key;
    }
  });
  
  if (!passwordCorrect) {
    alert("Invalid username or password");
    return;
  }
  else {
    sessionStorage.setItem("currentUser", i);
    const urlParams = new URLSearchParams(window.location.search);
    window.location.href = urlParams.get('redirect');

    //document.getElementById("result").innerHTML = localStorage.getItem("user1");

    //localStorage.clear();
    // Assume AJAX call to send login info to server and save in database
    // Redirect to another page after successful login
    //window.location.href = "/result.html?driver=" + name; // Redirect to event selection page
  }

});