import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getDatabase, ref, set, child, get, remove, update } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js";
import { getStorage, ref as sref, uploadBytes } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-storage.js"
import {initializeApp} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
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
$(document).ready(function () {
  $("#resp-menu").click(function () {
    $(".menu").show();
    $(".biz_header_overlay").show();
    $(".menu_close").show();
  });
  $(".menu_close").click(function () {
    $(".menu").hide();
    $(".biz_header_overlay").hide();
  });
  $(".biz_header_overlay").click(function () {
    $(".menu").hide();
    $(".menu_close").hide();
    $(".biz_header_overlay").hide();
  });
});

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

// Initialize Realtime Database and get a reference to the service
const db = getDatabase(app);

// Handle form submission
const rentalForm = document.getElementById('snack-form');
const submissionResult = document.querySelector('.submission-result');

rentalForm.addEventListener('submit', function(e) {
  e.preventDefault();

  // Get form values
  const name = document.getElementById('name').value;
  const address = document.getElementById('address').value;
  const description = document.getElementById('description').value;
  const bike = document.getElementById('bike').value;
  const price = document.getElementById('price').value;
  console.log(name, address, description, bike, price);
  save(name, address, description, bike, price);

  // Display submission result
  submissionResult.classList.add('show');
  rentalForm.reset();
});

//save to database

function save(name, address, description, bike, price) {
  set(ref(db, 'snacks/' + name), {
    name: name,
    address: address,
    description: description,
    bike: bike,
    price: price,
  });

  alert('Saved')
}

// Handle bike details toggle
const bikeDetailsToggle = document.querySelectorAll('.bike-details-toggle');
bikeDetailsToggle.forEach(function(element) {
  element.addEventListener('click', function(e) {
    e.preventDefault();
    const bikeId = this.getAttribute('data-bike');
    const bikeDetails = document.getElementById(bikeId + '-details');
    bikeDetails.classList.toggle('show');
  });
});

