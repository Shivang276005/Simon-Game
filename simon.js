let gameOn = false;
let colorSequence = [];
let playerMove = [];
let level = 1;
let score = 0;
let acceptingInput = false;

const colors = ["green", "red", "yellow", "blue"];

// DOM ELEMENTS
const startBtn = document.getElementById("startBtn");
const resetBtn = document.getElementById("resetBtn");

const levelElement = document.getElementById("level");
const scoreElement = document.getElementById("score");
const statusElement = document.getElementById("status");

const gameBoard = document.querySelector(".game-board");

const bgMusic = document.getElementById("bgMusic");
const audioBtn = document.getElementById("audioBtn");
const audioIcon = document.getElementById("audioIcon");

const levelCompleteSound = document.getElementById("levelComplete");
const gameOverSound = document.getElementById("gameOver");

// EVENT LISTENERS
startBtn.addEventListener("click", startGame);
resetBtn.addEventListener("click", gameReset);
gameBoard.addEventListener("click", handlePlayerInput);
audioBtn.addEventListener("click", toggleMusic);

// GAME START
function startGame() {
  if (gameOn) return;

  gameOn = true;
  acceptingInput = false;

  colorSequence = [];
  playerMove = [];

  level = 1;
  score = 0;

  levelElement.innerText = level;
  scoreElement.innerText = score;

  renderMsg("Watch the sequence");
  genSequence();
}

// GENERATE NEXT COLOR
function genSequence() {

  const randomColor = colors[Math.floor(Math.random() * colors.length)];

  colorSequence.push(randomColor);

  setTimeout(() => {
    flashSequence();
  }, 500);
}

// SHOW COMPLETE SEQUENCE

function flashSequence() {
    
  acceptingInput = false;
  let index = 0;

  const interval = setInterval(() => {

  if (index < colorSequence.length) {
    flashElement(colorSequence[index]);
    index++;
  } else {

      clearInterval(interval);

      playerMove = [];

      acceptingInput = true;

      renderMsg("Your turn");
  }

}, 800);
}

// FLASH COLOR BUTTON

function flashElement(color) {

    const element = document.getElementById(color);

    if (!element) return;

    element.classList.add("flash");

    setTimeout(() => {
        element.classList.remove("flash");
    }, 400);
}

// HANDLE PLAYER CLICK

function handlePlayerInput(e) {

    if (!gameOn || !acceptingInput) return;

    const color = e.target.dataset.color;

    if (!color) return;

    flashElement(color);

    playerMove.push(color);

    validateInput();
}

// VALIDATE PLAYER MOVE

function validateInput() {

    const currentIndex = playerMove.length - 1;

    if (playerMove[currentIndex] !== colorSequence[currentIndex]) {

        gameOver();
        return;
    }

    if (playerMove.length === colorSequence.length) {

        acceptingInput = false;

        renderMsg("Level Complete");

        if (levelCompleteSound) {
            levelCompleteSound.currentTime = 0;
            levelCompleteSound.play();
        }

        level++;

        updateScore();

        setTimeout(() => {
            genSequence();
        }, 1200);
    }
}

// SCORE CALCULATION

function updateScore() {

    if (level <= 5) {

        score += 10;

    } else if (level <= 15) {

        score += 50;

    } else if (level <= 25) {

        score += 150;

    } else {

        score += 500;
    }

    levelElement.innerText = level;
    scoreElement.innerText = score;
}

// STATUS MESSAGE

function renderMsg(message) {

    statusElement.innerHTML = message;
}

// GAME OVER

function gameOver() {

    gameOn = false;
    acceptingInput = false;

    if (gameOverSound) {
        gameOverSound.currentTime = 0;
        gameOverSound.play();
    }

    renderMsg("Wrong Input - Game Over");

    setTimeout(() => {
        renderMsg("Click Start to Play Again");
    }, 2000);

    colorSequence = [];
    playerMove = [];

    level = 1;
    score = 0;

    levelElement.innerText = level;
    scoreElement.innerText = score;
}

// RESET GAME

function gameReset() {

    gameOn = false;
    acceptingInput = false;

    colorSequence = [];
    playerMove = [];

    level = 1;
    score = 0;

    levelElement.innerText = level;
    scoreElement.innerText = score;

    renderMsg("Click Start to Begin");
}

// BACKGROUND MUSIC

function toggleMusic() {

    if (!bgMusic) return;

    if (bgMusic.paused) {

        bgMusic.play();
        bgMusic.loop = true;

        if (audioIcon) {
            audioIcon.src = "assets/musicOn.png";
        }

    } else {

        bgMusic.pause();

        if (audioIcon) {
            audioIcon.src = "assets/musicOFF.png";
        }
    }
}
