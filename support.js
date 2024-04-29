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