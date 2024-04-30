import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getDatabase, ref, set, child, get, remove, update, query, orderByChild, orderByKey, orderByValue} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js";
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

// Initialize Firebase

// Initialize Realtime Database and get a reference to the service
const db = getDatabase(app);

// Handle form submission
const rentalForm = document.getElementById('snack-form');
const submissionResult = document.querySelector('.submission-result');

rentalForm.addEventListener('submit', function(e) {
  e.preventDefault();

  // Get form values
  const name = document.getElementById('name').value.trim();
  const address = document.getElementById('address').value.trim();
  const description = document.getElementById('description').value.trim();
  const snackType = document.getElementById('snackType').value;
  const price = document.getElementById('price').value;
  save(name, address, description, snackType, price);

  // Display submission result
  submissionResult.classList.add('show');
  rentalForm.reset();
});

//save to database

async function save(name, address, description, type, price) {
  let i = 1;
  let done = false;
  while (!done) {
    const snapshot = await get(child(ref(db), 'snacks/' + i));
    if (snapshot.exists()) {
      i++;
    } else {
      await set(ref(db, 'snacks/' + i), {
        name: name,
        address: address,
        description: description,
        type: type,
        price: price,
        score: 0
      });
      done = true;
    }
  }
}
const postsRef = ref(db, 'snacks');
const sortedPostsQuery = await query(postsRef, orderByChild('score'));

await get(sortedPostsQuery).then((snapshot) => {
  if (snapshot.exists()) {
    // Iterate through each child node
    snapshot.forEach((childSnapshot) => {
      // Access the child data
      const post = childSnapshot.val().name;
    });
  }
})
// Handle bike details toggle
const showDetails = document.querySelectorAll('.show-details');
showDetails.forEach(function(element) {
  element.addEventListener('click', function(e) {
    e.preventDefault();
    const snackId = this.getAttribute('snack');
    const snackDetails = document.getElementById(snackId + 'details');
    snackDetails.classList.toggle('show');
  });
});

const upvoteButtons = document.querySelectorAll('.upvote');
upvoteButtons.forEach(function(element) {
  element.addEventListener('click', async function(e) {
    e.preventDefault();
    const icon = this.querySelector('i');
    const textNode = this.childNodes[1];
    var score;
    await get(ref(db, "snacks/" + this.getAttribute('snack'))).then(async (snapshot) => {
      score = parseInt(snapshot.val().score);
    });
    if (this.classList.contains('on')) {
      textNode.nodeValue = score - 1;
      await update(ref(db, "snacks/" + this.getAttribute('snack')), {
        score: score - 1
      });
      await update(ref(db, "users/" + sessionStorage.getItem("currentUser") + "snacks"), {
        this.getAttribute('snack') : false
      });
      icon.classList.remove("fas");
    }
    else {
      textNode.nodeValue = score + 1;
      await update(ref(db, "snacks/" + this.getAttribute('snack')), {
        score: score + 1
      });
      await update(ref(db, "users/" + sessionStorage.getItem("currentUser") + "snacks"), {
        this.getAttribute('snack') : true
      });
      icon.classList.add("fas");
    }
    this.classList.toggle('on');
  });
});