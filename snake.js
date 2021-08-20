const cvs = document.getElementById('gameCanvas');
const ctx = cvs.getContext('2d');
// Box Width
const bw = cvs.width;
// Box Height
const bh = cvs.height;
// Padding
const p = 10;


let keys = [];

let rightPressed;
let leftPressed;
let upPressed;
let downPressed;


document.addEventListener('keydown', keyDownHandler, false);


function keyDownHandler(e) {
  if(e.key == "Right" || e.key == "ArrowRight") {
      rightPressed = true;
      leftPressed = false;
      upPressed = false;
      downPressed = false;
  }
  else if(e.key == "Left" || e.key == "ArrowLeft") {
    rightPressed = false;
      leftPressed = true;
      upPressed = false;
      downPressed = false;
  } else if(e.key == "Up" || e.key =="ArrowUp") {
    rightPressed = false;
    leftPressed = false;
    upPressed = true;
    downPressed = false;
} else if(e.key == "Down" || e.key =="ArrowDown") {
  rightPressed = false;
  leftPressed = false;
  upPressed = false;
  downPressed = true;
 }
 e.preventDefault();
}
 

function getRandomWidth() {
  return Math.floor(Math.random() * 500 / 25) * 25;
}
function getRandomHeight() {
  return Math.floor(Math.random() * 400 / 25) * 25;
}



let food = {
  x : getRandomWidth(),
  y : getRandomHeight(),
  w : 24,
  h : 24,
  color : "red"
}

let slime = {
  x : cvs.width / 2,
  y : cvs.height / 2,
  w : 24,
  h : 24,
  color : "blue",
  speed : 4
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


function draw(){
  drawRect(canvas.x, canvas.y, canvas.w, canvas.h, canvas.color);
  ctx.lineWidth = 1;
  ctx.strokeStyle = "black";
  for (let x = 0; x < bw; x += 25){
    for(let y = 0; y < bh; y += 25){
      ctx.strokeRect(x, y, cvs.height, cvs.width);
    }
  }
 
  
  // Food
  drawRect(food.x, food.y, food.w, food.h, food.color);
  // Rimuru
  drawRect(slime.x, slime.y, slime.w, slime.h, slime.color);
 }


 // game movements / updates
function update(){
  // Slime Movement
if(rightPressed && slime.x < cvs.width-slime.w) {
    
  
}
else if(leftPressed && slime.x > 0) {
    slime.x -= 5;
}
else if(upPressed && slime.y < cvs.height-slime.h) {
  slime.y -= 5;
}
else if(downPressed && slime.y > 0) {
  slime.y += 5;
 } 
}



function game(){
 draw();
 update();

}
const framesPerSecond = 50;
setInterval(game, 1000/framesPerSecond);

