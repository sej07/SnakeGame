// JavaScript
let inputDir = { x: 0, y: 0 };
const foodSound = new Audio('food.mp3');
const gameOver = new Audio('gameover.mp3');
const moveSound = new Audio('move.mp3');
const musicSound = new Audio('bg.mp3');
let speed = 5;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [{ x: 13, y: 15 }];
let food = { x: 10, y: 11 };

// Game functions
function main(ctime) {
  window.requestAnimationFrame(main);
  if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
    return;
  }
  lastPaintTime = ctime;
  gameEngine();
}

function isCollide(snake) {
    //if it bumps into itself 
    for(let i=1;i<snake.length;i++){
        if (snake[i].x===snake[0].x &&snake[i].y===snake[0].y) {
            return true;
        }
    }
    //bumps into walls
    if((snake[0].x>=18 || snake[0].x<=0 )||(snake[0].y>=18||snake[0].y<=0)){
            return true;
        }
  return false; // No collision
}

function gameEngine() {
  // Game over condition
  if (isCollide(snakeArr)) {
    gameOver.play();
    musicSound.pause();
    inputDir = { x: 0, y: 0 };
    alert('Game Over...Press any key to play again!');
    snakeArr = [{ x: 13, y: 15 }];
    musicSound.play();
    score = 0;
  }

  // If food is eaten, increment score and regenerate food
  if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
    foodSound.play();
    score= score+1;
    scoreBox.innerHTML="Score: "+score;
    snakeArr.unshift({
      x: snakeArr[0].x + inputDir.x,
      y: snakeArr[0].y + inputDir.y,
    });
    let a = 2;
    let b = 16;
    food = {
      x: Math.round(a + (b - a) * Math.random()),
      y: Math.round(a + (b - a) * Math.random()),
    };
  }

  // Moving the snake
  const lastElement = { ...snakeArr[snakeArr.length - 1] };
  for (let i = snakeArr.length - 2; i >= 0; i--) {
    snakeArr[i + 1] = { ...snakeArr[i] };
  }
  snakeArr[0].x += inputDir.x;
  snakeArr[0].y += inputDir.y;

  // Display the snake and food
  const board = document.getElementById('board');
  board.innerHTML = '';
  snakeArr.forEach((e, i) => {
    snakeElement = document.createElement('div');
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;

    if (i === 0) {
      snakeElement.classList.add('head');
    } else {
      snakeElement.classList.add('snake');
    }

    board.appendChild(snakeElement);
  });

  foodElement = document.createElement('div');
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add('food');
  board.appendChild(foodElement);
}

// Main logic

window.requestAnimationFrame(main);
window.addEventListener('keydown', (e) => {
  if (inputDir.x === 0 && inputDir.y === 0) {
    musicSound.play();
  }
  moveSound.play();
  switch (e.key) {
    case 'ArrowUp':
      inputDir.x = 0;
      inputDir.y = -1;
      break;
    case 'ArrowDown':
      inputDir.x = 0;
      inputDir.y = 1;
      break;
    case 'ArrowLeft':
      inputDir.x = -1;
      inputDir.y = 0;
      break;
    case 'ArrowRight':
      inputDir.x = 1;
      inputDir.y = 0;
      break;
  }
});
