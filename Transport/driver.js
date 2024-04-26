
document.getElementById("loginform").addEventListener("submit", function(event) {
  event.preventDefault(); 

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const address = document.getElementById("address").value.trim();

  if (name === "" || email === "" || phone === "" || address === "") {
    alert("Please fill in all fields.");
    return;
  }
  var i = 1;
  while (localStorage.getItem("user" + i) !== null) {
    i++;
  }
  localStorage.setItem("user" + i, name);
  localStorage.setItem("email" + i, email);
  localStorage.setItem("phone" + i, phone);
  localStorage.setItem("address" + i, address);

  localStorage.setItem("status" + i, "driver");

  localStorage.setItem("currentuser", i);

  //document.getElementById("result").innerHTML = localStorage.getItem("user1");

  //localStorage.clear();
  // Assume AJAX call to send login info to server and save in database
  // Redirect to another page after successful login
  window.location.href = "eventSelection.html"; // Redirect to event selection page
});
