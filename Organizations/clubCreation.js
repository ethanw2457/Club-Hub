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
  const description = document.getElementById("description").value.trim().replace(/\n/g, "<br>");
  const instagram = document.getElementById("Instagram").value.trim();
  const googleclassroom = document.getElementById("Google Classroom").value.trim();
  const groupme = document.getElementById("GroupMe").value.trim();
  const imageUploadInput = document.getElementById('photo');


  if (name === "" || email === "" || category === "" || description === "") {
    alert("Please fill in all fields.");
    return;
  }
  if (imageUploadInput.files.length === 0) {
    alert("Please upload a profile picture.");
    return;
  }

  
  let i = 1;
  let done = false;
  while (!done) {
    snapshot = await get(child(ref(db), 'clubs/' + i));
    if (snapshot.exists()) {
      i++;
    } else {
      await set(ref(db, 'clubs/' + i), {
        name: name,
        email: email,
        category: category,
        description: description,
        instagram: instagram,
        googleclassroom: googleclassroom,
        groupme: groupme
      });
      done = true;
    }
  }
  const storageRef = sref(storage, 'clubs/' + i);
  const file = imageUploadInput.files[0];
  // 'file' comes from the Blob or File API
  await uploadBytes(storageRef, file);
  //uploadBytes(storageRef, imageUploadInput.files[0]);
  await get(child(ref(db), 'users/' + id)).then(async (snapshot) => {
    // Get the current array data from the snapshot
    var currentArray = snapshot.val().carpoolers || [];
    // Iterate through the array items
    currentArray.push(sessionStorage.getItem("currentUser"));

    // Set the modified array back to the database
    await update(ref(db, "events/" + id + "/"), {
      carpoolers: currentArray
    });
  });

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