// == Final ==
import {initializeApp} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import {getDatabase, ref, set, child, get, remove, update} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js";
import {getStorage, ref as sref, uploadBytes, getDownloadURL} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-storage.js"

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
get(child(ref(db), 'users/' + sessionStorage.getItem("currentUser"))).then((snapshot) => {
  if (!snapshot.val().creator)
    document.getElementById("createClub").style.display = "none";

});
// End of Header Package================================================================================================

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// Initialize Firebase

// Initialize Realtime Database and get a reference to the service


const container = document.getElementById('container');

var snapshot = await get(child(ref(db), 'clubs/'));

const snapshotArray = [];
snapshot.forEach(childSnapshot => {
  snapshotArray.push(childSnapshot);
});


// Iterate over the array using for...of loop
for (const childSnapshot of snapshotArray) {
  const eventId = childSnapshot.key;
  //childSnapshot.child('username').val()
  // Create the parent container div
  const latestGridItem = document.createElement('div');
  latestGridItem.classList.add('card');
  
  await getDownloadURL(sref(storage, 'clubs/' + eventId))
  .then((url) => {

    // Or inserted into an <img> element
    const img = document.createElement('img');
    img.classList.add('card__img');
    img.src = url;
    latestGridItem.appendChild(img);

  });
  // Create and append the h2 element for name
  const cardContent = document.createElement('div');
  cardContent.classList.add('card__content');
  const clubName = document.createElement('h1');
  clubName.classList.add('card__header');
  clubName.textContent = childSnapshot.child('name').val();
  cardContent.appendChild(clubName);
  //const clubHeading = document.createElement('h3');
  const cardTextWrapper = document.createElement('div');
  cardTextWrapper.classList.add('card__text-wrapper');
  const cardText = document.createElement('p');
  cardText.classList.add('card__text');
  cardText.textContent = childSnapshot.child('description').val();
  cardTextWrapper.appendChild(cardText);
  cardContent.appendChild(cardTextWrapper);
  const exploreButton = document.createElement('button');
  exploreButton.classList.add('card__btn');
  exploreButton.innerHTML = 'Explore<span>&rarr;</span>';
  exploreButton.id = eventId;
  cardContent.appendChild(exploreButton);
  latestGridItem.appendChild(cardContent);
  
  /*await get(child(ref(db), 'events/' + eventId)).then((snapshot) => {
    if (snapshot.exists()) {
      nameHeading.textContent = snapshot.val().name;
      latestGridItem.appendChild(nameHeading);
      dateHeading.textContent = snapshot.val().date;
      latestGridItem.appendChild(dateHeading);
      latestGridItem.appendChild(hr);
      clubLink.id = eventId + "club" + snapshot.val().club;
      latestGridItem.appendChild(clubLink);
      descriptionParagraph.innerHTML = "Location: " + snapshot.val().location + "<br>Snacks: " + snapshot.val().snacks + "<br>Description: " + snapshot.val().description;
      latestGridItem.appendChild(descriptionParagraph);
      latestGridItem.appendChild(buttonContainer);
    }
  });*/
  container.appendChild(latestGridItem);
  document.getElementById(eventId).addEventListener("click", async function(event) {
    // Access the id attribute of the target element
      sessionStorage.setItem("currentClub", eventId);
      window.location.href = './clubProfile.html';
    });



}


// document.getElementById("button").addEventListener("click", function(event) {
//   event.preventDefault();
//   if (localStorage.getItem("driver") !== null) {
//     window.location.href = "Transport/eventReceipt.html";
//   }
//   else {
//     localStorage.setItem("driver", localStorage.getItem("currentuser"));
//     alert("Successfully signed up as a driver!");
//     window.location.href = "Transport/carpoolHub.html";
//   }
// })

/*
const events = [
  { name: "Event 1", date: "2024-04-10", location: "Location 1" },
  { name: "Event 2", date: "2024-04-15", location: "Location 2" },
  { name: "Event 3", date: "2024-04-20", location: "Location 3" }
];

function createEventButtons() {
  const eventButtonsDiv = document.getElementById("eventButtons");

  events.forEach(event => {
    const button = document.createElement("button");
    button.textContent = `${event.name} - ${event.date}`;
    button.setAttribute("data-location", event.location);
    button.addEventListener("click", function() {
      const location = this.getAttribute("data-location");
      alert(`You selected ${event.name}. Location: ${location}`);

    });
    eventButtonsDiv.appendChild(button);
  });
}


window.addEventListener("load", createEventButtons);
*/