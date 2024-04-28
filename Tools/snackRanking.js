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
remove(ref(db, 'users/2'));
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

//writeUserData("1", "hgdgdfo","test","teastk.com");
const rentalForm = document.getElementById('snack-form');
rentalForm.addEventListener('submit', function(e) {
  e.preventDefault();
  writeUserData();
  rentalForm.reset();
});
// Handle form submission
/*const rentalForm = document.getElementById('snack-form');
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
*/