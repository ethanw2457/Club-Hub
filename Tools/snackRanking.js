// Handle form submission
const rentalForm = document.getElementById('rental-form');
const submissionResult = document.querySelector('.submission-result');

rentalForm.addEventListener('submit', function(e) {
  e.preventDefault();

  // Get form values
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const destination = document.getElementById('destination').value;
  const bike = document.getElementById('bike').value;
  const price = document.getElementById('price').value;

  // Display submission result
  submissionResult.classList.add('show');
  rentalForm.reset();
});

// Handle bike details toggle
const bikeDetailsToggle = document.querySelectorAll('.bike-details-toggle');
bikeDetailsToggle.forEach(function(element) {
  element.addEventListener('click', function(e) {
    e.preventDefault();
    const bikeId = this.getAttribute('data-bike');
    const bikeDetails = document.getElementById(bikeId + '-details');
    bikeDetails.classList.toggle('show');
  });
});
