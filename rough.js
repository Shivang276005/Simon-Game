let level = 3;
let computerMove = [];
for (let i = 0; i < level; i++) {
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
}
function flash(){
  index = 1;
  let intervalId = setInterval(() => {
    
    if (index > level) {
      clearInterval(intervalId);    
    }
  }, 1000);
}