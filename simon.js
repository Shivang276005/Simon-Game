let gameOn = false;
let colorSequence = [];
let playerMove = [];
let level = 1;
let score = 0;
let intervalId;

let startBtnElement = document.getElementById('startBtn');
let resetBtnElement = document.getElementById('resetBtn');

let greenElement = document.getElementById('green');
let redElement = document.getElementById('red');
let blueElement = document.getElementById('blue');
let yellowElement = document.getElementById('yellow');

let levelElement = document.getElementById('level');
let scoreElement = document.getElementById('score');


startBtnElement.addEventListener('click',()=>{
  startGame();
});
resetBtnElement.addEventListener('click',()=>{
  gameReset();
});


function startGame(){
  gameOn = true;
  genSequence();

}

function genSequence(){
  let randNum = Math.random();
  if (randNum <= 0.25) {
    colorSequence.push('green');
  } else if(randNum > 0.25 && randNum <= 0.5){
    colorSequence.push('red');
  } else if(randNum > 0.5 && randNum <= 0.75){
    colorSequence.push('yellow');
  } else{
    colorSequence.push('blue');
  }
  flashSequence();
}

function flashSequence(){
  let index = 0;
  const intervalId = setInterval(()=>{
    if (index < colorSequence.length) {
      flashElement(colorSequence[index++]);
    }else{
      clearInterval(intervalId);
    }
  }, 1000);
}

function flashElement(element){
  document.getElementById(`${element}`).classList.add('flash');
  setTimeout(() => {
    document.getElementById(`${element}`).classList.remove('flash');
  }, 400);
}

playerInput();

function playerInput(){
  let input;
  const btnContainer = document.querySelector('.game-board');
  btnContainer.addEventListener('click',(e)=>{
    input = e.target.innerText.toLowerCase();
    playerMove.push(input);
    validateInput();
  });
}

function validateInput(){
  let currentIndex = playerMove.length - 1;

  if (playerMove[currentIndex] === colorSequence[currentIndex]) {
    // renderMsg("Correct");

    if (playerMove.length === colorSequence.length) {
      renderMsg("Level Complete");
      scoreEvalution(level++);
      playerMove = [];
      genSequence();
    }

  } else {
    gameOver();
    playerMove = [];
  }   
}

function scoreEvalution(level){
  if (level<=5) {
    score+=10;
  } else if(level>5 && level<=15) {
    score+=50;
  }else if(level>15 && level<=25) {
    score+=150;
  }else{
    score+=500;
  }
  document.getElementById('level').innerText = level+1;
  document.getElementById('score').innerText = score;
}

function renderMsg(msg){
  document.getElementById('status')
  .innerHTML = msg;
  setTimeout(() => {
    document.getElementById('status')
    .innerHTML = "Keep going...";
  }, 900);
}

function gameOver(){
  document.getElementById('status')
    .innerHTML = "Wrong input - Game Over";
  setTimeout(() => {
    document.getElementById('status')
    .innerHTML = "Click Start to Play Again";
  }, 1500);
}

function gameReset(){
  gameOn = false;
  colorSequence = [];
  playerMove = [];
  level = 1;
  score = 0;
  document.getElementById('level').innerText = level;
  document.getElementById('score').innerText = score;
}

const audio = document.getElementById("bgMusic");
const btn = document.getElementById("audioBtn");
const icon = document.getElementById("audioIcon");

btn.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    icon.src = "assets/musicOn.jpg";
  } else {
    audio.pause();
    icon.src = "assets/musicOFF.jpg";
  }
});