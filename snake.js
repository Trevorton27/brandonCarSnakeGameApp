const cvs = document.getElementById('snake');
const ctx = cvs.getContext('2d');
let slimeHeight = 15;
let slimeWidth = 15;
let slimeX = (cvs.width-slimeWidth)/2;
let slimeY = (cvs.height-slimeHeight)/2;
let rightPressed;
let leftPressed;
let upPressed;
let downPressed;

document.addEventListener('keydown', keyDownHandler, false);

// Switch to key code eventually
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
}

function gameOver(){
  if(slime.x + slime.w > cvs.width || slime.x <= 0) {
   slime.x = cvs.width/2;
   slime.y = cvs.height/2;
   rightPressed = false;
   leftPressed = false;
   upPressed = false;
   downPressed = false;

  } else if (slime.y >= cvs.height || slime.y < 0) {
     slime.x = cvs.width/2;
     slime.y = cvs.height/2;
     rightPressed = false;
     leftPressed = false;
     upPressed = false;
     downPressed = false;
  } 
}

function drawRect(x,y,w,h,color){
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h);
}

function drawCircle(x,y,r,color){
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x,y,r,0,Math.PI*2,false);
  ctx.closePath();
  ctx.fill();
}

function newFood(){
  food = {
   x : Math.floor(Math.random() * cvs.width),
   y : Math.floor(Math.random() * cvs.height),
   w : 13,
   h : 13,
   color : "brown"
 };
}


let newSlime;
function slimeSize() {
    newSlime = {
      x : slimeX + 5,
      y : slimeY + 5,
      w : slimeWidth + 5,
      h : slimeHeight + 5,
      color : "blue"
    }

}

function rectsColliding(){
  if(slime.x > food.x + food.w ||
    slime.x + slime.w < food.x ||
    slime.y > food.y + food.h ||
    slime.y + slime.h < food.y) {
    } else {
       food = {
        x : 0,
        y : 0,
        w : 0,
        h : 0,
        color : ""
      };
      slimeSize();
      setTimeout(newFood, 2500);
    }
}


let slime = {
  x : slimeX,
  y : slimeY,
  w : slimeWidth,
  h : slimeHeight,
  color : "blue"
}
 
let food = {
  x : 180,
  y : 240,
  w : 13,
  h : 13,
  color : "brown"
};

function draw(){
  drawRect(0, 0, cvs.width, cvs.height, "green");
  // Food
  drawRect(food.x, food.y, food.w, food.h, food.color);
  // Rimuru
  drawRect(slime.x, slime.y, slime.w, slime.h, slime.color);
  // New slime
  // drawRect(newSlime.x, newSlime.y, newSlime.w, newSlime.h, newSlime.color);
}

// game movements / updates
function update(){
  // Slime Movement
  if(rightPressed && slime.x < cvs.width-slime.w) {
    slime.x += 4;
}
else if(leftPressed && slime.x > 0) {
    slime.x -= 4;
}
else if(upPressed && slimeY < cvs.height-slime.h) {
  slime.y -= 4;
}
else if(downPressed && slime.y > 0) {
  slime.y += 4;
 } 
}

function game(){
  update();
  draw();
  gameOver();
  rectsColliding();
}
const framesPerSecond = 50;
setInterval(game, 1000/framesPerSecond);


