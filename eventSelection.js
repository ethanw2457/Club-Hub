import {initializeApp} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import {getDatabase, ref, set, child, get, remove, update} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js";
import {getStorage, ref as sref, uploadBytes, getDownloadURL} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-storage.js"

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
// Initialize Realtime Database and get a reference to the service
const db = getDatabase(app);
const storage = getStorage(app);


var snapshot = await get(child(ref(db), 'events/'));
snapshot.forEach((childSnapshot) => {
  const eventId = childSnapshot.key;
  childSnapshot.child('username').val()
  // Create the parent container div
  const latestGridItem = document.createElement('div');
  latestGridItem.id = eventId;
  latestGridItem.classList.add('latest-grid-item');
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
      await get(child(ref(db), 'events/' + id)).then((snapshot) => {
        // Get the current array data from the snapshot
        const currentArray = snapshot.val().carpoolers || [];

        // Iterate through the array items
        currentArray.push(sessionStorage.getItem("currentUser"));

        // Set the modified array back to the database
        update(ref(db, "events/" + id), {
          carpoolers: currentArray
        });

        });
    }
    window.location.href = '/Transport/eventReceipt.html?event=' + id;
  });
  
  // Create and append the image element
  const img = document.createElement('img');
  img.src = 'https://source.unsplash.com/collection/887284/1600x900';
  latestGridItem.appendChild(img);
  
  // Create and append the h2 element for name
  const nameHeading = document.createElement('h2');
  nameHeading.id = 'name';
  nameHeading.textContent = 'Lorem ipsum dolor sit amet';
  latestGridItem.appendChild(nameHeading);
  
  // Create and append the h3 element for date
  const dateHeading = document.createElement('h3');
  dateHeading.id = 'date';
  dateHeading.textContent = '4/1/2024';
  latestGridItem.appendChild(dateHeading);
  
  // Create and append the hr element
  const hr = document.createElement('hr');
  latestGridItem.appendChild(hr);
  
  // Create and append the p element for description
  const descriptionParagraph = document.createElement('p');
  descriptionParagraph.id = 'description';
  descriptionParagraph.innerHTML = `Description of Event:<br> 
                                    Event Location:<br> 
                                    Organized by:<br>
                                    Driver: No`;
  latestGridItem.appendChild(descriptionParagraph);
  
  // Create a span element to contain the buttons
  const buttonContainer = document.createElement('span');
  
  // Create and append the first button and its link
  const firstButtonLink = document.createElement('a');
  firstButtonLink.href = 'Organizations/eventReceipt.html';
  const firstButton = document.createElement('button');
  firstButton.textContent = 'Select';
  firstButtonLink.appendChild(firstButton);
  buttonContainer.appendChild(firstButtonLink);
  
  // Create and append the second button and its link
  const secondButtonLink = document.createElement('a');
  secondButtonLink.href = 'Organizations/eventReceipt.html';
  const secondButton = document.createElement('button');
  secondButton.textContent = 'Select';
  secondButtonLink.appendChild(secondButton);
  buttonContainer.appendChild(secondButtonLink);
  
  latestGridItem.appendChild(buttonContainer);
});

const container = document.getElementById('container');
container.appendChild(newItem);
document.getElementById("button").addEventListener("click", function(event) {
  event.preventDefault();
  if (localStorage.getItem("driver") !== null) {
    window.location.href = "Transport/eventReceipt.html";
  }
  else {
    localStorage.setItem("driver", localStorage.getItem("currentuser"));
    alert("Successfully signed up as a driver!");
    window.location.href = "Transport/carpoolHub.html";
  }
})

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