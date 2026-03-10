let level = 0;
let count = 0;
let computerMove = [];
let playerMove = [];
let intervalId;

let startBtnElement = document.getElementById('startBtn');
let resetBtnElement = document.getElementById('resetBtn');

let greenElement = document.getElementById('green');
let redElement = document.getElementById('red');
let blueElement = document.getElementById('blue');
let yellowElement = document.getElementById('yellow');

startBtnElement.addEventListener('click',()=>{
  generateMove();
  playerMove = [];
});
resetBtnElement.addEventListener('click',()=>{
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

function getPlayerMove(){
  greenElement.addEventListener('click',()=>{
    playerMove.push('green');    
    console.log(playerMove);
  });
  redElement.addEventListener('click',()=>{
    playerMove.push('red');    
    console.log(playerMove);
  });
  yellowElement.addEventListener('click',()=>{
    playerMove.push('yellow');    
    console.log(playerMove);
  });
  blueElement.addEventListener('click',()=>{
    playerMove.push('blue');    
    console.log(playerMove);
  });
}