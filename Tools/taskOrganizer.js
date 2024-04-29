// import {initializeApp} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
// import {getStorage, ref as sref, getDownloadURL} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-storage.js"

// // Header Package=============================================================================================================
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyDjMBUC1EhrOSzzgId-sglmdmJJ4kCyV5Q",
//   authDomain: "club-central-2af6e.firebaseapp.com",
//   databaseURL: "https://club-central-2af6e-default-rtdb.firebaseio.com",
//   projectId: "club-central-2af6e",
//   storageBucket: "club-central-2af6e.appspot.com",
//   messagingSenderId: "578174084496",
//   appId: "1:578174084496:web:13f92682f267332f62ff15",
//   measurementId: "G-FKR7SRZ915"
// };
// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const storage = getStorage(app);


document.getElementById("sign-out").addEventListener('click', signOut);

function signOut() {
  sessionStorage.setItem("currentUser", "");
}
// getDownloadURL(sref(storage, 'users/' + sessionStorage.getItem("currentUser")))
// .then((url) => {

//   // Or inserted into an <img> element
//   const img = document.getElementById('profile-pic');
//   img.setAttribute('src', url);
// });
// End of Header Package========================================================================================
const input1 = document.getElementById('input');
const add = document.getElementById("add");
const UL = document.getElementById('myUL');


function inputValue() {
    return input1.value.length;
}

add.addEventListener("click", function(){
    if (inputValue()> 1){
        const newDiv = document.createElement('div');
        const li = document.createElement('li');
        const doneBtn = document.createElement('button');
        const delBtn = document.createElement('button');
        newDiv.classList.add('item-container')
        UL.append(newDiv);
        li.appendChild(document.createTextNode(input1.value))
        li.classList.add('item')
        doneBtn.classList.add('doneBtn');
        delBtn.classList.add('delBtn');
        doneBtn.innerHTML= '<i class="fa-solid fa-square-check"></i>'
        delBtn.innerHTML= '<i class="fa-solid fa-trash"></i>'
        newDiv.append(li,doneBtn,delBtn);
        doneBtn.addEventListener('click' ,function(){
            li.classList.toggle('done');
        })
        delBtn.addEventListener('click', function(){
            newDiv.remove();
        })
        input1.value = " ";
    }
})

input1.addEventListener('keypress',function(event){
    if( inputValue()> 1 && event.code === 'Enter'){
        const newDiv = document.createElement('div');
        const li = document.createElement('li');
        const doneBtn = document.createElement('button');
        const delBtn = document.createElement('button');
        newDiv.classList.add('item-container')
        UL.append(newDiv);
        li.appendChild(document.createTextNode(input1.value))
        li.classList.add('item')
        doneBtn.classList.add('doneBtn');
        delBtn.classList.add('delBtn');
        doneBtn.innerHTML= '<i class="fa-solid fa-square-check"></i>'
        delBtn.innerHTML= '<i class="fa-solid fa-trash"></i>'
        newDiv.append(li,doneBtn,delBtn);
        doneBtn.addEventListener('click' ,function(){
            li.classList.toggle('done');
        })
        delBtn.addEventListener('click', function(){
            newDiv.remove();
        })
        input1.value = " ";
    }
})

