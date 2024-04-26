const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener('click', () =>{
    container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener('click', () =>{
    container.classList.remove("sign-up-mode");
});


// the below is not used but for reference
document.getElementById("signupform").addEventListener("submit", function(event) {
  event.preventDefault();

  const name = document.getElementById("signupname").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("signuppassword").value.trim();
  const address = document.getElementById("address").value.trim();

  if (name === "" || email === "" || password === "" || address === "") {
    alert("Please fill in all fields.");
    return;
  }
  var i = 1;
  while (localStorage.getItem("user" + i) !== null) {
    i++;
  }
  localStorage.setItem("user" + i, name);
  localStorage.setItem("email" + i, email);
  localStorage.setItem("address" + i, address);
  localStorage.setItem("password" + i, password);

  localStorage.setItem("status" + i, "carpooler");

  localStorage.setItem("currentuser", i);

  //document.getElementById("result").innerHTML = localStorage.getItem("user1");

  //localStorage.clear();
  // Assume AJAX call to send login info to server and save in database
  // Redirect to another page after successful login
  window.location.href = "clubCentral.html"; // Redirect to event selection page
});

document.getElementById("signinform").addEventListener("submit", function(event) {
  event.preventDefault(); 

  const name = document.getElementById("signinname").value.trim();
  const password = document.getElementById("signinpassword").value.trim();

  if (name === "" || password === "") {
    alert("Please fill in all fields.");
    return;
  }
  var i = 1;
  while (localStorage.getItem("user" + i) !== null && localStorage.getItem("user"+i) != name) {
    i++;
  }
  if (localStorage.getItem("user" + i) === null) {
    alert("Invalid username or password.");
    return;
  }
  else if (localStorage.getItem("password" + i) != password) {
    alert("Invalid username or password.");
    return;
  }
  else {
    localStorage.setItem("currentuser", i);
    window.location.href = "clubCentral.html";

    //document.getElementById("result").innerHTML = localStorage.getItem("user1");

    //localStorage.clear();
    // Assume AJAX call to send login info to server and save in database
    // Redirect to another page after successful login
    //window.location.href = "/result.html?driver=" + name; // Redirect to event selection page
  }

});