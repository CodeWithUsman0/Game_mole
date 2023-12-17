// Selecting all the elements from the DOM
const holes = document.querySelectorAll(".hole");
const scoreBoard = document.querySelector(".score");
const moles = document.querySelectorAll(".mole");
const startBtn = document.querySelector(".start-btn");
const levels = document.querySelector(".levels");
const game = document.querySelector(".game");

let lastHole;
let timeUp = false;
let score = 0;

// Function to get the selected radio button value
function difficultyLevel() {
  const ele = document.getElementsByName("level");
  for (let i = 0; i < ele.length; i++) {
    if (ele[i].checked) {
      return ele[i].id;
    }
  }
}

// Function to get a random time between min and max
function randomTime(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

// Function to get a random hole
function randomHole(holes) {
  const idx = Math.floor(Math.random() * holes.length);
  const hole = holes[idx];
  if (hole === lastHole) {
    return randomHole(holes);
  }
  lastHole = hole;
  return hole;
}

// Function to make the mole appear and disappear
function peep(show, hide) {
  const time = randomTime(show, hide);
  const hole = randomHole(holes);
  hole.classList.add("up");
  setTimeout(() => {
    hole.classList.remove("up");
    if (!timeUp) {
      peep(show, hide);
    }
  }, time);
}

// Function to start the game
function startGame() {
  let show, hide;
  const difficulty = difficultyLevel();
  if (difficulty === "easy") {
    show = 500;
    hide = 1500;
  } else if (difficulty === "medium") {
    show = 200;
    hide = 1000;
  } else {
    show = 100;
    hide = 800;
  }

  // hiding start button during game running
  scoreBoard.textContent = 0;
  timeUp = false;
  startBtn.innerHTML = "running..";
  startBtn.disabled = true;
  levels.style.visibility = "hidden";
  score = 0;

  // Starting button after the game finish
  peep(show, hide);
  setTimeout(() => {
    timeUp = true;
    startBtn.innerHTML = "start!";
    startBtn.disabled = false;
    levels.style.visibility = "visible";
  }, 15000);
}

// Function to update the score on clicking the mole
function hitTheMole(e) {
  if (!e.isTrusted) {
    return;
  }
  score++;
  this.parentNode.classList.remove("up");
  scoreBoard.textContent = score;
}

// Adding the click event listener to all the moles
moles.forEach((mole) => mole.addEventListener("click", hitTheMole));
