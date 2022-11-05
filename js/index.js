//Variables
let inputDir = { x: 0, y: 0 };

//music for games
let foodSound = new Audio('music/food.mp3');
let gameOverSound = new Audio('music/gameover.mp3');
let moveSound = new Audio('music/move.mp3');
let musicSound = new Audio('music/music.mp3');

let score = 0;
let speed = 5;
let lastPaintTime = 0;

let food = { x: 10, y: 6 };
let snakeArr = [{ x: 13, y: 15 }];

//Game functions
function main(ctime) {
  //Game loop
  window.requestAnimationFrame(main);
  if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
    // controlling fps
    return;
  }
  lastPaintTime = ctime;

  gameEngine();
}

function isCollid(snakeArr) {
  for (let i = 1; i < snakeArr.length; i++) {
    if (snakeArr[0].x == snakeArr[i].x && snakeArr[0].y == snakeArr[i].y) {
      return true;
    }
    if (
      snakeArr[0].x > 18 ||
      snakeArr[0].x <= 0 ||
      snakeArr[0].y > 18 ||
      snakeArr[0].y <= 0
    ) {
      return true;
    }
  }
  return false;
}

function gameEngine() {
  musicSound.play();
  document.getElementById('sc').innerHTML = 'Score : ' + score;
  //updating the snake variable

  //colliding
  if (isCollid(snakeArr)) {
    gameOverSound.play();
    musicSound.pause();
    inputDir = { x: 0, y: 0 }; // restart inputDir
    alert('Game over ,press any key to play again');
    snakeArr = [{ x: 13, y: 15 }]; // restart snake array
    //game again started
    musicSound.play();
    score = 0;
  }

  //if you eaten the food inc score and regenerate food again
  if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
    //when eaten increase size
    foodSound.play();
    snakeArr.unshift({
      x: snakeArr[0].x + inputDir.x,
      y: snakeArr[0].y + inputDir.y,
    });
    let a = 2;
    let b = 16;
    // create new food
    food = {
      x: 2 + Math.round(a + (b - a) * Math.random()),
      y: 2 + Math.round(a + (b - a) * Math.random()),
    };
    score++;
  }

  //moving the snake
  for (let i = snakeArr.length - 2; i >= 0; i--) {
    snakeArr[i + 1] = { ...snakeArr[i] }; //destructure
  }

  snakeArr[0].x += inputDir.x;
  snakeArr[0].y += inputDir.y;

  //render the snake and food
  //render snake
  board.innerHTML = '';
  snakeArr.forEach((e, index) => {
    snakeElement = document.createElement('div');
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;
    if (index === 0) snakeElement.classList.add('head');
    else snakeElement.classList.add('snake');
    board.appendChild(snakeElement);
  });

  //render food
  FoodElement = document.createElement('div');
  FoodElement.style.gridRowStart = food.y;
  FoodElement.style.gridColumnStart = food.x;
  FoodElement.classList.add('food');
  board.appendChild(FoodElement);
}

//Main logic starts here
window.requestAnimationFrame(main);

window.addEventListener('keydown', (e) => {
  inputDir = { x: 0, y: 1 }; //start Game
  moveSound.play();

  switch (e.key) {
    case 'ArrowUp':
      inputDir.x = 0;
      inputDir.y = -1;
      console.log('ArrowUp');
      break;
    case 'ArrowDown':
      inputDir.x = 0;
      inputDir.y = 1;
      console.log('ArrowDown');
      break;
    case 'ArrowLeft':
      inputDir.x = -1;
      inputDir.y = 0;
      console.log('ArrowLeft');
      break;
    case 'ArrowRight':
      inputDir.x = 1;
      inputDir.y = 0;
      console.log('ArrowRight');
      break;
    default:
      break;
  }
});
