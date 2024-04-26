// get CSS Variables
const styles = getComputedStyle(document.documentElement);


// header
const header = document.getElementById("header");
let headerRect = header.getBoundingClientRect();

//Navigation container
const navigationContainer = document.getElementById(
  "navigation-options-container"
);
let navigationContainerRect = navigationContainer.getBoundingClientRect();
let navigationContainerHeight = navigationContainerRect.height;

// Buttons

// Menu Button
const menuButton = document.getElementById("menu-button");
let isMenuDown = false;

// Direction Buttons
const leftButton = document.getElementById("prev");
const rightButton = document.getElementById("next");

let leftButtonClicked = false;
let rightButtonClicked = false;

let leftButtonRect = leftButton.getBoundingClientRect();
let leftButtonCenter = (leftButtonRect.left + leftButtonRect.right) / 2;

let rightButtonRect = rightButton.getBoundingClientRect();
let rightButtonCenter = (rightButton.left + rightButton.right) / 2;

let buttonWidth = rightButtonRect.width;

let imageAndInfoDiv = document.querySelectorAll(".image-and-info"); // helps to get the left center and right bottle colors
// Buttons End

// Background Color
const backgroundPopup = document.getElementById("background-color-popup");

let backgroundColorPopupRect = backgroundPopup.getBoundingClientRect();
let BackgroundColorRectCenter =
  (backgroundColorPopupRect.left + backgroundColorPopupRect.right) / 2;
let backgroundPopupPositionX = rightButton.left;
let backgroundPopupPositionY = rightButton.top + window.pageYOffset;

let backgroundColorList = [];

let currentBackgroundColor = null;
let gsapSetBackgroundColorStyle;

let prevBackgroundColor = null;
let gsapSetprevBackgroundColorStyle;

let nextBackgroundColor = null;
let gsapSetnextBackgroundColorStyle;

// Location of where the circle will popup
let popupCirclePosX = null;
let popupCirclePosY = null;

// Background Color Ends

// ImageDivs and section
let imageContainersSection = document.getElementById(
  "bottle-images-and-info-container"
);
let imageDivs = document.querySelectorAll(".image-and-info");
const imageDivsCount = imageDivs.length;

// appending the first two divs to the end
let clonefirstImage = imageDivs[0].cloneNode(true);
imageContainersSection.append(clonefirstImage);
let clonelastImage = imageDivs[1].cloneNode(true);
imageContainersSection.append(clonelastImage);

function setbackgroundColorList() {
  // background color popup for left (index 0) right(index 2) and current (index 1)
  backgroundColorList = [];
  let getMiddleBottlePositon = Math.ceil((imageDivsCount + 2) / 2);

  imageAndInfoDiv = document.querySelectorAll(".image-and-info");
  for (
    let color = getMiddleBottlePositon - 2;
    color < getMiddleBottlePositon + 1;
    color++
  ) {
    backgroundColorList.push(imageAndInfoDiv[color].getAttribute("data-color"));
  }
}

// GSAP CSS Set Styles

// Is the popup coming from prev button or next button?
function setBackgroundPopupPosition() {
  gsap.set("#background-color-popup", {
    transform: `translate(${popupCirclePosX}px, ${popupCirclePosY}px)`,
  });
}

// Sets the background color Of the current bottle to the popup
function gsapSetBackgroundColor() {
  gsapSetBackgroundColorStyle = styles.getPropertyValue(
    `--${currentBackgroundColor}`
  );

  // background color for the popup when it increases size
  gsap.set("#background-color-popup", {
    backgroundColor: gsapSetBackgroundColorStyle,
  });
}

function gsapSetNextAndPrevBackgroundColor() {
  // Refer to CSS file for better understanding
  prevBackgroundColor = backgroundColorList[0];
  nextBackgroundColor = backgroundColorList[2];

  // Sets the previous bottle background color on the prev button when hovered
  gsap.set("html", {
    "--opacity": 0,
  });

  gsap.to("html", {
    "--prevBackgroundColor": `var(--${prevBackgroundColor})`,
    "--opacity": 1,

    duration: 0.1,
    delay: 1,
  });

  // Sets the next bottle background color on the next button when hovered
  gsap.to("html", {
    "--nextBackgroundColor": `var(--${nextBackgroundColor})`,
    "--opacity": 1,

    duration: 0.1,
    delay: 1,
  });
}

// GSAP CSS Set End

// GSAP Animations
let tl = gsap.timeline();

function setInitialBarPosition() {
  gsap.set("#navigation-options-container", {
    top: `${headerRect.height}px`,
    clipPath: `polygon(0 0, 100% 0%, 100% 0, 0 0)`,
  });
}

setInitialBarPosition();

function menuDownAnimation() {
  if (!isMenuDown) {
    gsap.set("#navigation-options-container", {
      clipPath: `polygon(0 0, 100% 0%, 100% 0, 0 0)`,
    });

    tl.to("#navigation-options-container", {
      clipPath: `polygon(0 0, 100% 0%, 100% 100%, 0% 100%)`,
    });
    isMenuDown = true;
  } else {
    gsap.set("#navigation-options-container", {
      clipPath: `inset(0 0 0 0)`,
    });
    tl.to("#navigation-options-container", {
      clipPath: `inset(0 0 100% 0)`,
    });
    isMenuDown = false;
  }
}

function gsapToAnimation() {
  if (imageDivsCount % 2 === 1) {
    gsap.to(".image-and-info", {
      translate: `0`,
      duration: 1,
      ease: Power3.easeOut,
    });
  } else {
    gsap.to(".image-and-info", {
      translate: `50%`,
      duration: 1,
      ease: Power3.easeOut,
    });
  }
}

function backgroundColorPosition() {
  setBackgroundPopupPosition();
  gsapSetBackgroundColor();

  tl.to("#background-color-popup", {
    scale: 40,
    duration: 1,
  });

  tl.to("body", {
    backgroundColor: gsapSetBackgroundColorStyle,
  });

  tl.set("#background-color-popup", {
    scale: 1,
    opacity: 1,
    duration: 0,
  });
}

// GSAP Animations End



function nextItem() {
  imageDivs = document.querySelectorAll(".image-and-info");
  let cloneCurrentImage = imageDivs[2].cloneNode(true);
  imageContainersSection.append(cloneCurrentImage);
  gsapToAnimation();
  imageDivs[0].remove();
}

function prevItem() {
  imageDivs = document.querySelectorAll(".image-and-info");

  imageDivs[imageDivsCount + 1].remove(); // Remove the very last node in the new array
  let cloneCurrentImage = imageDivs[imageDivsCount - 1].cloneNode(true);
  imageContainersSection.prepend(cloneCurrentImage);
  gsapToAnimation();
}

// Event Listeners

menuButton.addEventListener("click", () => {
  menuDownAnimation();
});

rightButton.addEventListener("click", () => {
  rightButtonRect = rightButton.getBoundingClientRect();
  buttonWidth = rightButtonRect.width;

  let rightButtonCircleExpanPositionX =
    (rightButtonRect.left + rightButtonRect.right) / 2;
  popupCirclePosX = rightButtonCircleExpanPositionX - buttonWidth / 2;

  let rightButtonCircleExpanPositionY =
    (rightButtonRect.top + rightButtonRect.bottom) / 2;
  popupCirclePosY =
    rightButtonCircleExpanPositionY - buttonWidth / 2 + window.pageYOffset;

  if (imageDivsCount % 2 === 1) {
    gsap.set(".image-and-info", {
      translate: `100%`,
    });
    nextItem();
  } else {
    gsap.set(".image-and-info", {
      translate: `150%`,
    });
    nextItem();
  }

  currentBackgroundColor = backgroundColorList[2];
  backgroundColorPosition();
  setbackgroundColorList();
  gsapSetNextAndPrevBackgroundColor();
});

leftButton.addEventListener("click", () => {
  leftButtonRect = leftButton.getBoundingClientRect();

  buttonWidth = leftButtonRect.width;
  let leftButtonCircleExpanPositionX =
    (leftButtonRect.left + leftButtonRect.right) / 2;
  popupCirclePosX = leftButtonCircleExpanPositionX - buttonWidth / 2;

  let leftButtonCircleExpanPositionY =
    (leftButtonRect.top + leftButtonRect.bottom) / 2;
  popupCirclePosY =
    leftButtonCircleExpanPositionY - buttonWidth / 2 + window.pageYOffset;

  if (imageDivsCount % 2 === 1) {
    gsap.set(".image-and-info", {
      translate: `-100%`,
    });
    prevItem();
  } else {
    gsap.set(".image-and-info", {
      translate: `-50%`,
    });
    prevItem();
  }

  currentBackgroundColor = backgroundColorList[0];
  backgroundColorPosition();
  setbackgroundColorList();
  gsapSetNextAndPrevBackgroundColor();
});

window.addEventListener("load", () => {
  setInitialPositions();
  setbackgroundColorList();
  gsapSetBackgroundColor();

  // initialize the background color in regards to the bottle
  gsap.set("body", {
    backgroundColor: `var(--${backgroundColorList[1]})`,
  });

  gsapSetNextAndPrevBackgroundColor();
});

window.addEventListener("resize", (e) => {
  headerRect = header.getBoundingClientRect();

  gsap.set("#navigation-options-container", {
    top: `${headerRect.height}px`,
  });

  if (window.innerWidth >= 850) {
    gsap.set("#navigation-options-container", {
      clipPath: `polygon(0 0, 100% 0%, 100% 100%, 0% 100%)`,
    });
  } else {
    isMenuDown = false;
    gsap.set("#navigation-options-container", {
      clipPath: `polygon(0 0, 100% 0%, 100% 0, 0 0)`,
    });
  }
});

// Event Listeners End

function setInitialPositions() {
  if (imageDivsCount % 2 === 1) {
    gsap.set(".image-and-info", {
      translate: `0%`,
    });
  } else {
    gsap.set(".image-and-info", {
      translate: `50%`,
    });
  }
}