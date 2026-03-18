let level = 0;
let count = 0;
let score = 0;
let computerMove = [];
let playerMove = [];
let intervalId;
let gameOn = false;

let startBtnElement = document.getElementById('startBtn');
let resetBtnElement = document.getElementById('resetBtn');

let greenElement = document.getElementById('green');
let redElement = document.getElementById('red');
let blueElement = document.getElementById('blue');
let yellowElement = document.getElementById('yellow');

startBtnElement.addEventListener('click',()=>{
  gameOn = true;
  generateMove();
  playerMove = [];
});
resetBtnElement.addEventListener('click',()=>{
  level = 0;
  count = 0;
  score = 0;
  computerMove = [];
  playerMove = [];
  clearInterval(intervalId);
});

function generateMove(){
  let randNum = Math.random();
  if (randNum <= 0.25) {
    computerMove.push('green');
  } else if(randNum > 0.25 && randNum <= 0.5){
    computerMove.push('red');
  } else if(randNum > 0.5 && randNum <= 0.75){
    computerMove.push('yellow');
  } else{
    computerMove.push('blue');
  }
  flashSequence();
}
function flashSequence(){
  intervalId = setInterval(() => { 
    let element = computerMove[count];
    count++;
    if (count >= computerMove.length) {
      clearInterval(intervalId);
    }
    document.getElementById(`${element}`).classList.add('flash');
    setTimeout(() => {
      document.getElementById(`${element}`).classList.remove('flash');
    }, 400);
  }, 1000);
  document.getElementById('level').innerText = (count+1);
  count = 0;
}

// function getPlayerMove(){
  const container = document.querySelector('.game-board');
  const nestedContainer = document.querySelectorAll('.game-board button');
  nestedContainer.forEach(btn => {
    btn.addEventListener('click', (event)=>{
      // console.log('Button clicked : ', event.target.innerText);
      playerMove.push((event.target.innerText).toLowerCase());
    });
  });
// }
function checkResult(){
  let result = (computerMove.length === playerMove.length &&
  computerMove.every((value, index) => value === playerMove[index]));
  if (result) {
    scoreEvalution();
  }else{
    console.log('Koi na try again....');
  }
}
function scoreEvalution(){
  if (level<=5) {
    score+=10;
  } else if(level>5 && level<=15) {
    score+=50;
  }else if(level>15 && level<=25) {
    score+=150;
  }else{
    score+=500;
  }
  document.getElementById('score').innerText = score;
  console.log(score);
}