const cvs = document.getElementById('gameCanvas');
const ctx = cvs.getContext('2d');
let slimeX = cvs.width/2;
let slimeY = cvs.height/2;
let slimeW = 25;
let slimeH = 25;
let frame = 0;
let frameLimit = 9;
const bw = cvs.width;
const bh = cvs.height;
const p = 10;

let direction = 'null';

window.addEventListener("keydown", keyMovement, false);
  
function keyMovement(e) {
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
            // down key pressed
            break;  
    } 
    createSlime();  
}   

function reverseSlime(){
  if(slime.body[1].x > slime.body[0].x) {
    
  }
}

// Slime Movement
function moveSlime(){
  const slimeCopy = slime.body.map(slimePart => Object.assign({}, slimePart))
  reverseSlime();
  
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


// Slime Eat Food
function rectsColliding(){
  if(slime.body[0].x > food.x + food.w ||
    slime.body[0].x + slime.body[0].w < food.x ||
    slime.body[0].y > food.y + food.h ||
    slime.body[0].y + slime.body[0].h < food.y) {
      food = {
           x : 0,
           y : 0,
           w : 0,
           h : 0,
           color : ""
         };
         setTimeout(newFood, 2500);
    } 
}

 
// Random respawn functions
function getRandomWidth() {
  return Math.floor(Math.random() * cvs.width / 25) * 25;
}
function getRandomHeight() {
  return Math.floor(Math.random() * cvs.height / 25) * 25;
}

function newFood(){
  food = {
   x : getRandomWidth(),
   y : getRandomHeight(),
   w : 25,
   h : 25,
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

const slime = { 
  body: [
 {x:250, y:200},
 {x:225, y:200},
 {x:200, y:200},
 {x:175, y:200}
]};



 let canvas = {
  x : 0,
  y : 0,
  w : cvs.width,
  h : cvs.height,
  color : "green"
};

// Basic rules to move in links
// Head always moves in current direction
// loop through other body parts so rest move to where head use to be
// What data should do
// Set variables to DIRECTION on arrow click
// Before move snake, create copy of body
// 




function createSlime(){
  for(let i = 0; i < slime.body.length; i++){
    drawRect(slime.body[0].x, slime.body[0].y, slimeW, slimeH, 'blue');
  }
  drawRect(slime.body[1].x, slime.body[1].y, slimeW, slimeH, 'white');
  drawRect(slime.body[2].x, slime.body[2].y, slimeW, slimeH, 'orange');
  drawRect(slime.body[3].x, slime.body[3].y, slimeW, slimeH, 'black');
}




function drawRect(x,y,w,h,color){
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h);
}
function drawMap(){
  drawRect(canvas.x, canvas.y, canvas.w, canvas.h, canvas.color);
  ctx.lineWidth = 1;
  ctx.strokeStyle = "green";
  for (let x = 0; x < bw; x += 25){
    for(let y = 0; y < bh; y += 25){
      ctx.strokeRect(x, y, cvs.height, cvs.width);
    }
  }
}


function draw(){
  drawMap();
  // Food
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
//  rectsColliding();
requestAnimationFrame(game);
}
game();


// Function that stops movement if snake body is there
// check for snake[1] and > or < x or y
