const cvs = document.getElementById('gameCanvas');
const ctx = cvs.getContext('2d');
const slimeX = cvs.width/2;
const slimeY = cvs.height/2;
const slimeW = 25;
const slimeH = 25;
let frame = 0;
const frameLimit = 9;
const bw = cvs.width;
const bh = cvs.height;
const p = 10;
let direction = 'null';
let collision = false;
let playerScore = 0;
let play = false;


window.addEventListener("keydown", startGame, false);

function startGame(e) {
  
}

// Score && Start / Lose Screen
const increaseScore = () => {
  playerScore++;
  console.log(playerScore);
}


// Start Screen
const startScreen = (e) => {
  if(e.keyCode === 13) {
    play = true;
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
    createSlime();  
}   

const moveSlime = () => {
  const slimeCopy = slime.body.map(slimePart => Object.assign({}, slimePart))
  for(let i = 1; i < slime.body.length; i++){
    slime.body[i] = slimeCopy[i - 1];
  }
  switch(direction){
    case 'left':
      slime.body[0].x -= 25;
      break;
    case 'up':
      slime.body[0].y -= 25;
      break;
    case 'right':
      slime.body[0].x += 25;
      break;
    case 'down':
      slime.body[0].y += 25;
      break;
}
  for(let i = 1; i < slime.body.length; i++){
    slime.body[i] = slimeCopy[i - 1];
   }
}

function createSlime(){
  for(let i = 0; i < slime.body.length; i++){
    drawRect(slime.body[0].x, slime.body[0].y, slimeW, slimeH, 'blue');
  }
  for(let i = 1; i < slime.body.length; i++) {
    drawRect(slime.body[i].x, slime.body[i].y, slimeW, slimeH);
  }
}

function slimeCheck(){
  for(let i = 1; i < slime.body.length; i++) {
    if(slime.body[0].x === slime.body[i].x && slime.body[0].y === slime.body[i].y) {
      collision = true;
      console.log("collision!");
      return true;
    } 
  }
};

const gameReset = () => {
  if(slime.body[0].x > cvs.width || slime.body[0].x < 0 || slime.body[0].y > cvs.height || slime.body[0].y < 0 || collision) {
    direction = null;
    slime = { 
      body: [
     {x:250, y:200},
    ]};
    playerScore = 0;
    play = false;
  } 
}

// Slime Eat Food
const slimeEat = () => {
  if(slime.body[0].x === food.x && slime.body[0].y === food.y) {
        food = {
          x : 0,
          y : 0,
          w : 0,
          h : 0,
          color : ''
        }
        increaseScore();
        newSlime();
        slimeFoodCheck();
    } 
}
const slimeFoodCheck = () => {
  for(let i = 0;i < slime.body.length; i++){
    if(food.x === slime.body[i].x && food.y === slime.body[i].y) {
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


let slime = { 
body: [
 {x:250, y:200},
//  {x:225, y:200},
//  {x:200, y:200},
//  {x:175, y:200},
//  {x:150, y:200},
//  {x:125, y:200},
//  {x:100, y:200}
]};
 
function newSlime(){
  let slimePiece = {
    x : slime.body.length-1,
    y : slime.body.y
  };
  slime.body.push(slimePiece);
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
    moveSlime();
  }
  requestAnimationFrame(animate)
}
animate();


function draw(){
  drawMap();
  drawRect(food.x, food.y, food.w, food.h, food.color);
  createSlime();
 }

function game(){
 draw();
 gameReset();
 slimeEat();
 if(slimeCheck()) {
   console.log('Game over');
 }
 startGame();
requestAnimationFrame(game);
}
game();


// Just make it normal snake game, too much work. 
// Redo gameover function
// Figure out Start screen
// Style stuff
// Update Score 
// Potentially learn how to save things to local storage

