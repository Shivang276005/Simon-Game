let level = 5;
let count = 0;
let playerMove = [];
let computerMove = [];
let intervalId;
function generateSequence(){
  intervalId = setInterval(() => {  
    let randNum = Math.random();
    if (randNum <= 1/4) {
      computerMove.push('green');
    } else if(randNum > 1/4 && randNum <= 1/2){
      computerMove.push('red');
    } else if(randNum > 1/2 && randNum <= 3/4){
      computerMove.push('yellow');
    } else{
      computerMove.push('blue');
    }
    count++;
    console.log(count);
    if (count === level) {
      count = 0;
      clearInterval(intervalId);
      console.log(computerMove);
      allowPlayerMove();
    }
  }, 1000);
}

let startBtnElement = document.getElementById('startBtn');
let resetBtnElement = document.getElementById('resetBtn');
startBtnElement.addEventListener('click',()=>{
  generateSequence();
});
resetBtnElement.addEventListener('click',()=>{
  clearInterval(intervalId);
});

function allowPlayerMove(){
  let greenElement = document.getElementById('green');
  let redElement = document.getElementById('red');
  let blueElement = document.getElementById('blue');
  let yellowElement = document.getElementById('yellow');
  greenElement.addEventListener('click',()=>{
    playerMove.push('green');
    console.log(checkMove());
  });
  redElement.addEventListener('click',()=>{
    playerMove.push('red');
    console.log(checkMove());
  });
  blueElement.addEventListener('click',()=>{
    playerMove.push('blue');
    console.log(checkMove());
  });
  yellowElement.addEventListener('click',()=>{
    playerMove.push('yellow');
    console.log(checkMove());
  });
}
function checkMove(){
  return playerMove.every((value, index) => value === computerMove[index]);
}