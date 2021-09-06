const cvs = document.getElementById('gameCanvas');
const ctx = cvs.getContext('2d');
const snakeX = cvs.width / 2;
const snakeY = cvs.height / 2;
const snakeW = 25;
const snakeH = 25;
let frame = 0;
const frameLimit = 9;
const backgroundWidth = cvs.width;
const backgroundHeight = cvs.height;
let direction = 'null';
let playerScore = 0;
const startScreen = document.querySelector('.startScreen');
const gameOverScreen = document.querySelector('.loseScreen');

document.getElementById('startBtn').addEventListener('click', (e) => {
  startScreen.classList.add('hidden');
});

document.getElementById('newGameBtn').addEventListener('click', (e) => {
  startScreen.classList.add('hidden');
  gameOverScreen.classList.add('hidden');
});

function drawRect(x, y, w, h, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h);
}
function drawMap() {
  drawRect(canvas.x, canvas.y, canvas.w, canvas.h, canvas.color);
  ctx.lineWidth = 1;
  ctx.strokeStyle = 'black';
  for (let x = 0; x < backgroundWidth; x += 25) {
    for (let y = 0; y < backgroundHeight; y += 25) {
      ctx.strokeRect(x, y, cvs.height, cvs.width);
    }
  }
}

let canvas = {
  x: 0,
  y: 0,
  w: cvs.width,
  h: cvs.height,
  color: 'green'
};

let snake = {
  body: [{ x: 250, y: 200 }]
};

let food = {
  x: getRandomWidth(),
  y: getRandomHeight(),
  w: 25,
  h: 25,
  color: '#a5a8ac'
};

function newFood() {
  food = {
    x: getRandomWidth(),
    y: getRandomHeight(),
    w: 25,
    h: 25,
    color: '#a5a8ac'
  };
}

function draw() {
  drawMap();
  drawRect(food.x, food.y, food.w, food.h, food.color);
  createSnake();
}

function game() {
  draw();
  document.querySelector('.playerScore').textContent = playerScore;
  gameReset();
  isFoodEaten();
  requestAnimationFrame(game);
}

function newSnake() {
  let snakePiece = {
    x: snake.body.length - 1,
    y: snake.body.y
  };
  snake.body.push(snakePiece);
}

function createSnake() {
  for (let i = 0; i < snake.body.length; i++) {
    drawRect(snake.body[0].x, snake.body[0].y, snakeW, snakeH, '#00ba00');
  }
  for (let i = 1; i < snake.body.length; i++) {
    drawRect(snake.body[i].x, snake.body[i].y, snakeW, snakeH);
  }
}

function snakeCheck() {
  for (let i = 1; i < snake.body.length; i++) {
    if (
      snake.body[0].x === snake.body[i].x &&
      snake.body[0].y === snake.body[i].y
    ) {
      collision = true;
      return true;
    }
  }
}

const moveSnake = () => {
  const snakeCopy = snake.body.map((snakePart) => Object.assign({}, snakePart));
  for (let i = 1; i < snake.body.length; i++) {
    snake.body[i] = snakeCopy[i - 1];
  }
  switch (direction) {
    case 'left':
      snake.body[0].x -= 25;
      break;
    case 'up':
      snake.body[0].y -= 25;
      break;
    case 'right':
      snake.body[0].x += 25;
      break;
    case 'down':
      snake.body[0].y += 25;
      break;
  }
  for (let i = 1; i < snake.body.length; i++) {
    snake.body[i] = snakeCopy[i - 1];
  }
};

// Controlling Speed Of Slime
function animate() {
  frame++;
  if (frame % frameLimit === 0) {
    moveSnake();
  }
  requestAnimationFrame(animate);
}
animate();

// Score && Start / Lose Screen
const increaseScore = () => {
  playerScore++;
};

const resetPlayer = () => {
  direction = null;
  snake = {
    body: [{ x: 250, y: 200 }]
  };
  playerScore = 0;
  //play = false;
  // collision = false;
};

// Start Game Button

const gameReset = () => {
  if (
    snake.body[0].x > cvs.width ||
    snake.body[0].x < 0 ||
    snake.body[0].y > cvs.height ||
    snake.body[0].y < 0
    //collision
  ) {
    resetPlayer();
    gameOverScreen.classList.remove('hidden');
    //startScreen.classList.add('hidden');
  }
};

// GameOver Screen

//Random Food Respawn Functions
function getRandomWidth() {
  return Math.floor((Math.random() * cvs.width) / 25) * 25;
}
function getRandomHeight() {
  return Math.floor((Math.random() * cvs.height) / 25) * 25;
}

window.addEventListener('keydown', keyMovement, false);

// Movement Functions
const noReverse = (e) => {
  e.preventDefault();
  if (
    (direction == 'left' && e.keyCode == 39) ||
    (direction == 'right' && e.keyCode == 37) ||
    (direction == 'up' && e.keyCode == 40) ||
    (direction == 'down' && e.keyCode == 38)
  ) {
    e.keyCode = '';
  } else {
    switch (e.keyCode) {
      case 37:
        direction = 'left';
        break;
      case 38:
        direction = 'up';
        break;
      case 39:
        direction = 'right';
        break;
      case 40:
        direction = 'down';
        break;
    }
  }
};

function keyMovement(e) {
  noReverse(e);
  createSnake();
}

// Slime Eat Food
const isFoodEaten = () => {
  if (snake.body[0].x === food.x && snake.body[0].y === food.y) {
    food = {
      x: 0,
      y: 0,
      w: 0,
      h: 0,
      color: ''
    };
    increaseScore();
    newSnake();
    setTimeout(() => {
      newFood();
    }, 2000);
  }
};

game();
