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
// $(document).ready(function () {
//   $("#resp-menu").click(function () {
//     $(".menu").show();
//     $(".biz_header_overlay").show();
//     $(".menu_close").show();
//   });
//   $(".menu_close").click(function () {
//     $(".menu").hide();
//     $(".biz_header_overlay").hide();
//   });
//   $(".biz_header_overlay").click(function () {
//     $(".menu").hide();
//     $(".menu_close").hide();
//     $(".biz_header_overlay").hide();
//   });
// });

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

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// Initialize Firebase

// Initialize Realtime Database and get a reference to the service


const container = document.getElementById('container');

var snapshot = await get(child(ref(db), 'events/'));
snapshot.forEach(async (childSnapshot) => {
  const eventId = childSnapshot.key;
  childSnapshot.child('username').val()
  // Create the parent container div
  const latestGridItem = document.createElement('div');
  latestGridItem.classList.add('latest-grid-item');

  await getDownloadURL(sref(storage, 'events/' + eventId))
  .then((url) => {

    // Or inserted into an <img> element
    const img = document.createElement('img');
    img.src = url;
    latestGridItem.appendChild(img);

  });
  // Create and append the h2 element for name
  const nameHeading = document.createElement('h2');
  //const clubHeading = document.createElement('h3');
  const dateHeading = document.createElement('h3');
  const hr = document.createElement('hr');
  const descriptionParagraph = document.createElement('p');
  const buttonContainer = document.createElement('span');
  buttonContainer.id = eventId;
  const firstButton = document.createElement('button');
  firstButton.textContent = "Drive";
  firstButton.id = "driver" + eventId;
  const secondButton = document.createElement('button');
  secondButton.textContent = "Carpool";
  secondButton.id = "carpool" + eventId;
  buttonContainer.appendChild(firstButton);
  buttonContainer.appendChild(secondButton);

  await get(child(ref(db), 'events/' + eventId)).then((snapshot) => {
    if (snapshot.exists()) {
      nameHeading.textContent = snapshot.val().name;
      latestGridItem.appendChild(nameHeading);
      dateHeading.textContent = snapshot.val().date;
      latestGridItem.appendChild(dateHeading);
      latestGridItem.appendChild(hr);
      descriptionParagraph.innerHTML = snapshot.val().description.replace(/\n/g, "<br>");
      latestGridItem.appendChild(descriptionParagraph);
      latestGridItem.appendChild(buttonContainer);
    }
  });
  container.appendChild(latestGridItem);
  document.getElementById(eventId).addEventListener("click", async function(event) {
    // Access the id attribute of the target element
    const id = event.target.id.charAt(event.target.id.length - 1).toString();
    if (event.target.id.includes("driver")) {
      const driver = await get(child(ref(db), 'events/' + id + '/driver'));
      if (driver.exists() && driver.val() != "") {
        alert("There is already a driver for this event.");
        return;
      }
      else {
        await update(ref(db, 'events/' + id), {
          driver: sessionStorage.getItem("currentUser")
        });
      }
    }
    else {
      
      await get(child(ref(db), 'events/' + id)).then(async (snapshot) => {
        // Get the current array data from the snapshot
        var currentArray = snapshot.val().carpoolers || [];
        // Iterate through the array items
        currentArray.push(sessionStorage.getItem("currentUser"));

        // Set the modified array back to the database
        await update(ref(db, "events/" + id + "/"), {
          carpoolers: currentArray
        });
      });
      
    }
    window.location.href = '/Transport/eventReceipt.html?event=' + id;
  });

});


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