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
// Focus first input field
document.getElementById('fullName').focus();

// Skill check challenge

function expertCheck() {
    // Get the checkbox
    let checkBoxExpert = document.getElementById('skillExpert');
   let checkBoxNovice = document.getElementById('skillBeginner');
    let skillChallengeFormClass = document.getElementsByClassName('skill-check')[0];

    // If the checkbox is checked, display the output text
    if (checkBoxExpert.checked == true) {
         if (skillChallengeFormClass.classList.contains('skill-check')) {
              skillChallengeFormClass.classList.add('d-block');
          }
    }
  }

function beginnerCheck() {
  // Get the checkbox
  let checkBoxNovice = document.getElementById('skillBeginner');
  let skillChallengeFormClass = document.getElementsByClassName(
    'skill-check',
  )[0];

  // If the checkbox is checked, display the output text
  if (checkBoxNovice.checked == true) {
    if (skillChallengeFormClass.classList.contains('skill-check')) {
      skillChallengeFormClass.classList.remove('d-block');
    }
  }
}

// Form hover focus

document.getElementsByClassName('form-container')[0].onmouseover = function() { mouseOver() };
document.getElementsByClassName('form-container')[0].onmouseout = function() { mouseOut() };

function mouseOver() {
  document.getElementsByClassName('form-container')[0].classList.add('focus-form');
  document.getElementsByTagName('body')[0].classList.add('form-is-focused');
}

function mouseOut() {
  document.getElementsByClassName('form-container')[0].classList.remove('focus-form');
  document.getElementsByTagName('body')[0].classList.remove('form-is-focused');
}