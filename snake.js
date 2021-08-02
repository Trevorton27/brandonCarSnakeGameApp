
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
let x =  300;
let y = 180;
let speedX = 0;
let speedY = 0;
let rimuruHeight = 15;
let rimuruWidth = 15;
let rimuruX = (canvas.width)/2;
let rimuruY = (canvas.height)/2;





let rightPressed = false;
let leftPressed = false;
let upPressed = false;
let downPressed = false;




document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);


function keyDownHandler(e) {
  if(e.key == "Right" || e.key == "ArrowRight") {
      rightPressed = true;
  }
  else if(e.key == "Left" || e.key == "ArrowLeft") {
      
    leftPressed = true;
  } 
  else if(e.key == "Up" || e.key =="ArrowUp") {
      upPressed = true;
  } 
  else if(e.key == "Down" || e.key =="ArrowDown") {
    downPressed = true;
}
}

function keyUpHandler(e) {
  if(e.key == "Right" || e.key == "ArrowRight") {
      rightPressed = false;
  }
     else if(e.key == "Left" || e.key == "ArrowLeft") {
      leftPressed = false;
  } 
  
  else if(e.key == "Up" || e.key =="ArrowUp") {
    upPressed = false;
  }    
  
  else if(e.key ==  "Down" || e.key =="ArrowDown") {
  downPressed = false;
}
}


function drawRimuru(){
  ctx.beginPath();
    ctx.rect(rimuruX, rimuruY, rimuruWidth, rimuruHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}



function drawMinerals(){
  ctx.beginPath();
  ctx.rect(40, 50, 15, 15);
  ctx.fillStyle = "green";
  ctx.fill();
  ctx.closePath();
}

function draw(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawRimuru();
  drawMinerals();


  if(rightPressed && rimuruX < canvas.width-rimuruWidth) {
    rimuruX += 4;
}
else if(leftPressed && rimuruX > 0) {
    rimuruX -= 4;
}

if(upPressed && rimuruY < canvas.height-rimuruWidth) {
  rimuruY -= 4;
}
else if(leftPressed && rimuruY > 0) {
  rimuruY += 4;
}


x += speedX;
y += speedY;
requestAnimationFrame(draw);
}


draw();