//step 1: get DOM
let nextDom = document.getElementById('next');
let prevDom = document.getElementById('prev');

let carouselDom = document.querySelector('.carousel');
let SliderDom = carouselDom.querySelector('.carousel .list');
let thumbnailBorderDom = document.querySelector('.carousel .thumbnail');
let thumbnailItemsDom = thumbnailBorderDom.querySelectorAll('.item');
let timeDom = document.querySelector('.carousel .time');

thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
let timeRunning = 3000;
let timeAutoNext = 7000;

nextDom.onclick = function(){
    showSlider('next');    
}

prevDom.onclick = function(){
    showSlider('prev');    
}
let runTimeOut;
let runNextAuto = setTimeout(() => {
    next.click();
}, timeAutoNext)
function showSlider(type){
    let  SliderItemsDom = SliderDom.querySelectorAll('.carousel .list .item');
    let thumbnailItemsDom = document.querySelectorAll('.carousel .thumbnail .item');

    if(type === 'next'){
        SliderDom.appendChild(SliderItemsDom[0]);
        thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
        carouselDom.classList.add('next');
    }else{
        SliderDom.prepend(SliderItemsDom[SliderItemsDom.length - 1]);
        thumbnailBorderDom.prepend(thumbnailItemsDom[thumbnailItemsDom.length - 1]);
        carouselDom.classList.add('prev');
    }
    clearTimeout(runTimeOut);
    runTimeOut = setTimeout(() => {
        carouselDom.classList.remove('next');
        carouselDom.classList.remove('prev');
    }, timeRunning);

    clearTimeout(runNextAuto);
    runNextAuto = setTimeout(() => {
        next.click();
    }, timeAutoNext)
}

import {initializeApp} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import {getDatabase, ref, set, child, get, remove, update} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js";
import {getStorage, ref as sref, getDownloadURL} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-storage.js";
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
// End of Header Package================================================================================================

document.getElementById("profileForm").addEventListener("submit", async function(event) {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const category = document.getElementById("ClubCategory").value.trim();
  const description = document.getElementById("description").value.trim()..replace(/\n/g, "<br>");
  const phone = document.getElementById("phonenumber").value.trim();
  const imageUploadInput = document.getElementById('photo');


  if (name === "" || username === "" || email === "" || password === "" || address === "") {
    alert("Please fill in all fields.");
    return;
  }
  if (imageUploadInput.files.length === 0) {
    alert("Please upload a profile picture.");
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
        phone: phone,
        creator: asCreator
      });
      done = true;
    }
  }
  const storageRef = sref(storage, 'users/' + i);
  const file = imageUploadInput.files[0];
  // 'file' comes from the Blob or File API
  await uploadBytes(storageRef, file);
  //uploadBytes(storageRef, imageUploadInput.files[0]);
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