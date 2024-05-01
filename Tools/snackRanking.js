import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getDatabase, ref, set, child, get, remove, update, query, orderByChild, orderByKey, orderByValue} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js";
import {getStorage, ref as sref, getDownloadURL, uploadBytes} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-storage.js";
// == Final ==
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

rentalForm.addEventListener('submit', async function(e) {
  e.preventDefault();

  // Get form values
  const name = document.getElementById('name').value.trim();
  const address = document.getElementById('address').value.trim();
  const description = document.getElementById('description').value.trim().replace(/\n/g, "<br>");
  const snackType = document.getElementById('snackType').value;
  const price = document.getElementById('price').value;
  await save(name, address, description, snackType, price);

  // Display submission result
  submissionResult.classList.add('show');
  rentalForm.reset();
  await refresh();
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
async function refresh() {
  const container = document.getElementById('container');
  container.innerHTML = "";
  const postsRef = ref(db, 'snacks');
  const sortedPostsQuery = await query(postsRef, orderByChild('score'));
  
  await get(sortedPostsQuery).then(async (snapshot) => {
    if (snapshot.exists()) {
      // Iterate through each child node
      const snapshotArray = [];
      snapshot.forEach((childSnapshot) => {
        snapshotArray.push(childSnapshot);
      });
  
      // Iterate through each child node in reverse order
      for (let i = snapshotArray.length - 1; i >= 0; i--) {
        const childSnapshot = snapshotArray[i];
        const snackId = childSnapshot.key;
        const snack = childSnapshot.val();
        const cardWrapper = document.createElement('div');
        //change md-# to specify num columns
        cardWrapper.classList.add('col-md-2');
        const snackBody = document.createElement('div');
        snackBody.classList.add('snack-card');
        const snackCard = document.createElement('div');
        snackCard.classList.add('card-body');
        snackBody.appendChild(snackCard);
        cardWrapper.appendChild(snackBody);
        const snackName = document.createElement('h5');
        snackName.classList.add("card-title");
        snackName.innerHTML = snack.name;
        snackCard.appendChild(snackName);
        const snackType = document.createElement('p');
        snackType.classList.add("card-text");
        snackType.innerHTML = "Type: " + snack.type;
        snackCard.appendChild(snackType);
        const buttons = document.createElement("span");
        const details = document.createElement("button");
        details.classList.add("show-details");
        details.setAttribute("snack", snackId);
        details.innerHTML = "<i class='fas fa-info-circle me-2'></i>Details";
        details.addEventListener('click', function(e) {
          e.preventDefault();
          const snackId = this.getAttribute('snack');
          const snackDetails = document.getElementById(snackId + 'details');
          snackDetails.classList.toggle('show');
        });
        buttons.appendChild(details);
        const upvote = document.createElement("button");
        upvote.classList.add("upvote");
        upvote.setAttribute("snack", snackId);
        var voted = false;
        var score;
        await get(ref(db, "users/" + sessionStorage.getItem("currentUser") + "/snacks/" + snackId)).then((snapshot) => {
          if (snapshot.exists()) {
            voted = snapshot.val().voted;
          }
        });
        await get(ref(db, "snacks/" + snackId)).then((snapshot) => {
          score = parseInt(snapshot.val().score);
        });
        upvote.innerHTML = "<i class='far " + ((voted) ? "fas" : "") + " fa-thumbs-up me-2'></i>" + score;
        if (voted) {
          upvote.classList.toggle('on');
        }
        upvote.addEventListener('click', async function(e) {
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
            await update(ref(db, "users/" + sessionStorage.getItem("currentUser") + "/snacks/" + this.getAttribute('snack')), {
              voted : false
            });
            icon.classList.remove("fas");
          }
          else {
            textNode.nodeValue = score + 1;
            await update(ref(db, "snacks/" + this.getAttribute('snack')), {
              score: score + 1
            });
            await update(ref(db, "users/" + sessionStorage.getItem("currentUser") + "/snacks/" + this.getAttribute('snack')), {
              voted : true
            });
            icon.classList.add("fas");
          }
          this.classList.toggle('on');
        });
        buttons.appendChild(upvote);
        snackCard.appendChild(buttons);
        const snackDescription = document.createElement('p');
        snackDescription.classList.add("snack-details");
        snackDescription.id = snackId + "details";
        snackDescription.innerHTML = "Price Range: " + snack.price + "<br>Vendor Address: " + snack.address + "<br>Description: " + snack.description;
        snackCard.appendChild(snackDescription);
        container.appendChild(cardWrapper);
      }
    }
  });
}
refresh();
// Handle bike details toggle
/*const showDetails = document.querySelectorAll('.show-details');
showDetails.forEach(function(element) {
  element.addEventListener('click', function(e) {
    e.preventDefault();
    const snackId = this.getAttribute('snack');
    console.log("snack");
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
      await update(ref(db, "users/" + sessionStorage.getItem("currentUser") + "/snacks/" + this.getAttribute('snack')), {
        voted : false
      });
      icon.classList.remove("fas");
    }
    else {
      textNode.nodeValue = score + 1;
      await update(ref(db, "snacks/" + this.getAttribute('snack')), {
        score: score + 1
      });
      await update(ref(db, "users/" + sessionStorage.getItem("currentUser") + "/snacks/" + this.getAttribute('snack')), {
        voted : true
      });
      icon.classList.add("fas");
    }
    this.classList.toggle('on');
  });
});*/