let snake = [0, 1, 2];
const size = 10;
const box = document.getElementById('snake-box');
const playButton = document.getElementById('play-button');
const downButton = document.getElementById('down-button');
const upButton = document.getElementById('up-button');
const leftButton = document.getElementById('left-button');
const rightButton = document.getElementById('right-button');
const score = document.getElementById('score');
const interval = 500;
let accumulator = 1;
let divs;
let idInterval;
let scoreCount = 0;
let foodIndex1;
let foodIndex2;
let foodCounter1 = 20;
let foodCounter2 = 20;
let bestScore = 0;


playButton.addEventListener('click', () => {
  startGame();
});
upButton.addEventListener('click', () => {
  up();
});
downButton.addEventListener('click', down);
leftButton.addEventListener('click', () => {
  left();
});
rightButton.addEventListener('click', () => {
  right();
});

function createBox() {
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      const div = document.createElement('div');
      box.appendChild(div);
    }
  }
}


function drawSnake() {
  divs = document.querySelectorAll('.box div');
  snake.forEach((index) => divs[index].classList.add('snake'));
}

function moveSnake() {
  const tail = snake.shift();
  divs[tail].classList.remove('snake');
  const head = snake[snake.length - 1] + accumulator;
  if (isCollision(head)) {
    alert('game over');
    clearGame();
    return;
  }

  snake.push(head);
  divs[head].classList.add('snake');


  eatFood(tail);
  
}


function randomFood() {
  foodIndex1 = Math.floor(Math.random() * divs.length);
  while (snake.includes(foodIndex1)) {
    foodIndex1 = Math.floor(Math.random() * divs.length);
  }
  divs[foodIndex1].classList.add('food');

  foodIndex2 = Math.floor(Math.random() * divs.length);
  while (snake.includes(foodIndex2) || foodIndex2 === foodIndex1) {
    foodIndex2 = Math.floor(Math.random() * divs.length);
  }
  divs[foodIndex2].classList.add('food');
}

function eatFood(tail) {
  if (snake[snake.length - 1] === foodIndex1) {
    divs[foodIndex1].classList.remove('food');
    snake.unshift(tail);
    divs[tail].classList.add('snake');
    score.innerText = ++scoreCount;
    foodCounter1 = 20;
  }
  if (snake[snake.length - 1] === foodIndex2) {
    divs[foodIndex2].classList.remove('food');
    snake.unshift(tail);
    divs[tail].classList.add('snake');
    score.innerText = ++scoreCount;
    foodCounter2 = 20;
  }

  foodCounter1--;
  foodCounter2--;
  if (foodCounter1 === 0) {
    divs[foodIndex1].classList.remove('food');
    randomFood();
  }
  if (foodCounter2 === 0) {
    divs[foodIndex2].classList.remove('food');
    randomFood();
    
  }
}

function isCollision(index) {
  if (
    index >= size * size
    || index < 0
    || (accumulator === 1 && index % size === 0)
    || (accumulator === -1 && (index + 1) % size === 0)
    || snake.includes(index)
  ) {
    return true;
  }
  return false;
}

function startGame() {
  clearGame();
  idInterval = setInterval(() => {
    moveSnake();
  }, interval);
}

function clearGame() {
  snake = [0, 1, 2];
  box.innerHTML = '';
  accumulator = 1;
  scoreCount = 0;
  score.innerText = scoreCount;
  clearInterval(idInterval);
  createBox();
  drawSnake();
  randomFood();
}

function up() {
  accumulator = -size;
}

function down() {
  accumulator = size;
}

function left() {
  accumulator = -1;
}

function right() {
  accumulator = 1;
}



document.addEventListener('keydown', (event) => {
  switch (event.code) {
    case 'KeyW':
      up();
      break;
    case 'KeyS':
      down();
      break;
    case 'KeyA':
      left();
      break;
    case 'KeyD':
      right();
      break;
  }
});




clearGame();