document.getElementById("name").innerHTML = localStorage.getItem("event");
document.getElementById("date").innerHTML = localStorage.getItem("eventdate");
document.getElementById("description").innerHTML = "Description of Event: " + localStorage.getItem("eventdesc") + "<br>" + "Event Location: " + localStorage.getItem("eventaddress") + "<br>" + "Driver: " + (localStorage.getItem("driver") !== null ? "Yes" : "No");

document.getElementById("button").addEventListener("click", function(event) {
  event.preventDefault();
  if (localStorage.getItem("driver") !== null) {
    window.location.href = "eventReceipt.html";
  }
  else {
    localStorage.setItem("driver", localStorage.getItem("currentuser"));
    alert("Successfully signed up as a driver!");
    window.location.href = "index.html";
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