const cvs = document.getElementById('gameCanvas');
const ctx = cvs.getContext('2d');
const snakeX = cvs.width/2;
const snakeY = cvs.height/2;
const  snakeW = 25;
const snakeH = 25;
let frame = 0;
const frameLimit = 9;
const bw = cvs.width;
const bh = cvs.height;
const p = 10;
let direction = 'null';
let collision = false;
let playerScore = 0;
let play = false;
const startScreen = document.querySelector('.startScreen');


// Maybe Add Mobile Scaling??

// Redo gameover function
// Potentially learn how to save things to local storage


// Score && Start / Lose Screen
const increaseScore = () => {
  playerScore++;
}

const endGame = () => {
     drawRect(0, 0, cvs.width, cvs.height, "red");
     ctx.font = "30px Arial";
     ctx.fillStyle = "white";
     ctx.textAlign = 'center';
     ctx.fillText("Game Over", 250, 200);
}
endGame();

const resetPlayer = () => {
  direction = null;
  snake = { 
    body: [
   {x:250, y:200},
  ]};
  playerScore = 0;
  play = false;
  collision = false;
}

// Start Game Button
document.getElementById('startBtn').addEventListener('click', (e) => {
   startScreen.classList.add('hidden');
});


const gameReset = () => {
  if(snake.body[0].x > cvs.width || snake.body[0].x < 0 || snake.body[0].y > cvs.height || snake.body[0].y < 0 || collision) {
   resetPlayer();
   startScreen.classList.remove('hidden');
   alert('Game Over');
  } 
}

// Random Food Respawn Functions
function getRandomWidth() {
  return Math.floor(Math.random() * cvs.width / 25) * 25;
}
function getRandomHeight() {
  return Math.floor(Math.random() * cvs.height / 25) * 25;
}

window.addEventListener("keydown", keyMovement, false);

// Movement Functions
const noReverse = (e) => {
    if(direction == 'left' && e.keyCode == 39 || direction == 'right' && e.keyCode == 37 || direction == 'up' && e.keyCode == 40 || direction == 'down' && e.keyCode == 38){
       e.keyCode = '';
    } else {
      switch(e.keyCode) {
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
          direction = "down";
            break;  
  }
    }
    e.preventDefault();
}

 
function keyMovement(e) {
    noReverse(e);
    createSnake();  
}   

const moveSnake = () => {
  const snakeCopy = snake.body.map(snakePart => Object.assign({}, snakePart))
  for(let i = 1; i < snake.body.length; i++){
    snake.body[i] = snakeCopy[i - 1];
  }
  switch(direction){
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
  for(let i = 1; i < snake.body.length; i++){
    snake.body[i] = snakeCopy[i - 1];
   }
}

function createSnake(){
  for(let i = 0; i < snake.body.length; i++){
    drawRect(snake.body[0].x, snake.body[0].y, snakeW, snakeH, 'blue');
  }
  for(let i = 1; i < snake.body.length; i++) {
    drawRect(snake.body[i].x, snake.body[i].y, snakeW, snakeH);
  }
}

function snakeCheck(){
  for(let i = 1; i < snake.body.length; i++) {
    if(snake.body[0].x === snake.body[i].x && snake.body[0].y === snake.body[i].y) {
      collision = true;
      return true;
    } 
  }
};



// Slime Eat Food
const snakeEat = () => {
  if(snake.body[0].x === food.x && snake.body[0].y === food.y) {
        food = {
          x : 0,
          y : 0,
          w : 0,
          h : 0,
          color : ''
        }
        increaseScore();
        newSnake();
        snakeFoodCheck();
    } 
}
const snakeFoodCheck = () => {
  for(let i = 0;i < snake.body.length; i++){
    if(food.x === snake.body[i].x && food.y === snake.body[i].y) {
      newFood();
    } else {
      setTimeout(newFood, 2000);
    }
  }
}
function newFood(){
  food = {
   x : getRandomWidth(),
   y : getRandomHeight(),
   w : 24,
   h : 24,
   color : "red"
 };
}

let food = {
  x : getRandomWidth(),
  y : getRandomHeight(),
  w : 25,
  h : 25,
  color : "red"
}


let snake = { 
body: [
 {x:250, y:200},
]};
 
function newSnake(){
  let snakePiece = {
    x : snake.body.length-1,
    y : snake.body.y
  };
  snake.body.push(snakePiece);
}

 let canvas = {
  x : 0,
  y : 0,
  w : cvs.width,
  h : cvs.height,
  color : "green"
};

function drawRect(x,y,w,h,color){
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h);
}
function drawMap(){
  drawRect(canvas.x, canvas.y, canvas.w, canvas.h, canvas.color);
  ctx.lineWidth = 1;
  ctx.strokeStyle = "black";
  for (let x = 0; x < bw; x += 25){
    for(let y = 0; y < bh; y += 25){
      ctx.strokeRect(x, y, cvs.height, cvs.width);
    }
  }
}

// Controlling Speed Of Slime 
function animate() {
  frame++
  if(frame % frameLimit === 0) {
    moveSnake();
  }
  requestAnimationFrame(animate)
}
animate();


function draw(){
  drawMap();
  drawRect(food.x, food.y, food.w, food.h, food.color);
  createSnake();
 }

function game(){
 draw();
 document.querySelector('.playerScore').innerHTML = playerScore;
 gameReset();
 snakeEat();
 if(snakeCheck()) {
   console.log('Game over');
 }
requestAnimationFrame(game);
}
game();



