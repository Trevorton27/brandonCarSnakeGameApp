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

// Random Food Respawn Functions
function getRandomWidth() {
  return Math.floor(Math.random() * cvs.width / 25) * 25;
}
function getRandomHeight() {
  return Math.floor(Math.random() * cvs.height / 25) * 25;
}

window.addEventListener("keydown", keyMovement, false);

const noReverse = (e) => {
    if(direction == 'left' && e.keyCode == 39 || direction == 'right' && e.keyCode == 37 || direction == 'up' && e.keyCode == 40 || direction == 'down' && e.keyCode == 38){
       e.keyCode = '';
    } else {
      switch(e.keyCode) {
        case 37:
          // slime[0].x -= 25;
          direction = 'left';
            // left key pressed
            break;
        case 38:
          //  slime[0].y -= 25;
          direction = 'up';
            // up key pressed
            break;
        case 39:
          // slime[0].x += 25;
          direction = 'right';
            // right key pressed
            break;
        case 40:
          // slime[0].y += 25;
          direction = "down";
            // down key presse3
            break;  
  }
    }
}
 
function keyMovement(e) {
    noReverse(e);
    createSlime();  
}   

// Slime Movement
function moveSlime(){
  const slimeCopy = slime.body.map(slimePart => Object.assign({}, slimePart))

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

const slimeCheck = () => {
  for(let i = 3; i < slime.body.length; i++) {
    if(slime.body[0].x === slime.body[i].x && slime.body[0].y === slime.body[i].y) {
      console.log('Body Hit')
      collision = true;
    } else {
      console.log('text');
      return false;
    }
  }
};



function gameReset(){
  if(slime.body[0].x > cvs.width || slime.body[0].x < 0 || slime.body[0].y > cvs.height || slime.body[0].y < 0) {
    direction = null;
    slime.body[0].x = 250;
    slime.body[0].y = 200;
  } else if(slimeCheck == true) {
    direction = null;
    slime.body[0].x = 250;
    slime.body[0].y = 200;
  }
}

function increaseSlime() {
  slime.body 
}

// Slime Eat Food
function slimeEat(){
  if(slime.body[0].x === food.x && slime.body[0].y === food.y) {
      console.log('Collision');
        food = {
          x : 0,
          y : 0,
          w : 0,
          h : 0,
          color : ''
        }
        increaseSlime();
        setTimeout(newFood, 2500);
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
  w : 24,
  h : 24,
  color : "red"
}

let slime = { 
  body: [
 {x:250, y:200},
//  {x:225, y:200},
//  {x:200, y:200},
//  {x:175, y:200},
//  {x:150, y:200},
//  {x:125, y: 200}
]};




 let canvas = {
  x : 0,
  y : 0,
  w : cvs.width,
  h : cvs.height,
  color : "green"
};

function createSlime(){
  for(let i = 0; i < slime.body.length; i++){
    drawRect(slime.body[0].x, slime.body[0].y, slimeW, slimeH, 'blue');
  }
  for(let i = 1; i < slime.body.length; i++) {
    drawRect(slime.body[i].x, slime.body[i].y, slimeW, slimeH);
  }
  // drawRect(slime.body[1].x, slime.body[1].y, slimeW, slimeH, 'white');
  // drawRect(slime.body[2].x, slime.body[2].y, slimeW, slimeH, 'orange');
  // drawRect(slime.body[3].x, slime.body[3].y, slimeW, slimeH, 'black');
  // drawRect(slime.body[4].x, slime.body[4].y, slimeW, slimeH, 'yellow');
  // drawRect(slime.body[5].x, slime.body[5].y, slimeW, slimeH, 'orange');
}

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

function draw(){
  drawMap();
  drawRect(food.x, food.y, food.w, food.h, food.color);
  createSlime();
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



function game(){
 draw();
 gameReset();
 slimeEat()
requestAnimationFrame(game);
}
game();

