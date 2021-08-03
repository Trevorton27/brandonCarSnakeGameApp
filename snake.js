
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
let x =  10;
let y = 10;
let speedX = 1;
let speedY = 10;
let rimuruHeight = 15;
let rimuruWidth = 15;
let rimuruX = (canvas.width-rimuruWidth)/2;
let rimuruY = (canvas.height-rimuruHeight)/2;

let rightPressed = false;
let leftPressed = false;
let upPressed = false;
let downPressed = false;




document.addEventListener("keydown", keyDownHandler, false);



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
  if(rimuruX + rimuruWidth > canvas.width || rimuruX <= 0) {
   rimuruX = canvas.width/2;
   rimuruY = canvas.height/2;

   rightPressed = false;
   leftPressed = false;
   upPressed = false;
   downPressed = false;

  } else if (rimuruY >= canvas.height || rimuruY < 0) {
     rimuruX = canvas.width/2;
     rimuruY = canvas.height/2;

     rightPressed = false;
     leftPressed = false;
     upPressed = false;
     downPressed = false;
  } 
}

// function collisionDetection(){
//   let rimuruYCenter = rimuruY + (rimuruHeight/2);
//   if(rimuruYCenter < y-35 || rimuruYCenter > y+35) {
//      x = 0;
//      y = 0;
//   }
// }

function drawRimuru(){
  ctx.beginPath();
    ctx.rect(rimuruX, rimuruY, rimuruWidth, rimuruHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function drawMinerals(){
  ctx.beginPath();
  ctx.rect(150, 90, 10, 10);
  ctx.fillStyle = "green";
  ctx.fill();
  ctx.closePath();
}

function draw(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawMinerals();
  drawRimuru();
  gameOver();
  // collisionDetection();
  
  
if(rightPressed && rimuruX < canvas.width-rimuruWidth) {
    rimuruX += 4;
}
else if(leftPressed && rimuruX > 0) {
    rimuruX -= 4;
}
else if(upPressed && rimuruY < canvas.height-rimuruHeight) {
  rimuruY -= 4;
}
else if(downPressed && rimuruY > 0) {
  rimuruY += 4;
}




// x += speedX;
// y += speedY;
requestAnimationFrame(draw);
}
draw();
