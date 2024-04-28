import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  // ...
  // The value of `databaseURL` depends on the location of the database
  databaseURL: "https://club-central-2af6e-default-rtdb.firebaseio.com/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
const db = getDatabase(app);




// Handle form submission
const rentalForm = document.getElementById('rental-form');
const submissionResult = document.querySelector('.submission-result');

rentalForm.addEventListener('submit', function(e) {
  e.preventDefault();

  // Get form values
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const destination = document.getElementById('destination').value;
  const bike = document.getElementById('bike').value;
  const price = document.getElementById('price').value;

  // Display submission result
  submissionResult.classList.add('show');
  rentalForm.reset();
});

//save to database

function save() {
    db.ref('snacks/' + name).set({
       name: name,
       email: email,
       destination: destination,
       bike: bike, 
       price: price,

    })

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