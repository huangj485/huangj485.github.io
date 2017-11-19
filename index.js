var c=document.getElementById("Canvas");
var ctx=c.getContext("2d");
var gravity = 1/750
var mousePos;
var math = require('mathjs')
//document.addEventListener("click", function(){
//  console.log("fuck")
//});
var mouseDown;
var mouseDownBoolean = false
document.body.onmousedown = function() { 
  //console.log("mouse down")
  mouseDown = mousePos
  mouseDownBoolean = true
}
document.body.onmouseup = function() {
  //console.log("mouse up")
  mouseUp = mousePos
  changeDirect()
  mouseDownBoolean = false
}
function changeDirect(){
  var dx = mouseDown.x - mouseUp.x
  var dy = mouseDown.y - mouseUp.y
  var vec = new vector(dx * 4, dy * 4, allVectors.allVectors[0].xValue, allVectors.allVectors[0].yValue)
  allVectors.allVectors[0].combine(vec)
}
function getMousePos(canvas, evt) {
  var rect = Canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}
Canvas.addEventListener('mousemove', function(evt) {
  mousePos = getMousePos(Canvas, evt);
  
  //console.log(mousePos)
}, false);

class Obstacles{
  constructor(ix, fx, funk){
    this.funk = funk
    this.ix = ix
    this.fx = fx
  }
  renew(){
    for (var i = 0; i < this.fx-this.ix; i++)
    {
      makeRect(i+this.ix, Canvas.height - math.eval(this.funk.replace("x", String(i))), 1, 1, "#B22222")
    }
  }
}

class vectorlist{
  constructor(){
    this.allVectors = []
    this.long = 0
    console.log("vectorlist successfully made")
  }
  appendVector(vector){
    this.allVectors.push(vector)
    this.long += 1
  }
  nextPhase()
  {
    for (var i=0; i < this.long; i++){
      this.allVectors[i].nextPhase()
    }
  }
}
class vector{
  constructor(speedx, speedy, xValue, yValue){ //direction
    this.speed = Math.sqrt(speedx^2+speedy^2)
    this.speedx = speedx / 750
    this.speedy = speedy / 750
    //this.speedx = speed * Math.cos(direction)
    //this.speedy = speedy * Math.sin(direction)
    //this.direction = direction
    this.xValue = xValue
    this.yValue = yValue
  }
  combine(vec){
    this.speedx = this.speedx + vec.speedx
    this.speedy = this.speedy + vec.speedy
    //this.direction = atan(this.speedy/this.speedx)
    this.calculateSpeed
  }
  nextPhase(){
    makeTransparentCircle(this.xValue, this.yValue, 12, "rgba(255, 255, 255, 0.25")
    this.xValue += this.speedx
    if ((this.xValue > Canvas.width)||(this.xValue < 0)){
      this.speedx = (-1)*this.speedx
    }
    this.yValue += this.speedy
    if ((this.yValue > Canvas.height)||(this.yValue < 0)){
      this.speedy = (-1)*this.speedy
    }
    this.speedy += gravity
    makeCircle(this.xValue, this.yValue, 4, "black")
    this.calculateSpeed()
  }
  calculateSpeed(){
    this.speed = Math.sqrt(this.speedx^2 + this.speedy^2)
  }
}

function makeRect(x, y, width, height, color)
{
  ctx.fillStyle = color
  ctx.rect(x, y, width, height);
  ctx.stroke();
  ctx.fill()
}
function makeCircle(x,y,r,color) { 
  ctx.fillStyle = color
  ctx.beginPath();
  ctx.arc(x,y,r,0,2*Math.PI);
  ctx.fill();
}
function makeTransparentCircle(x,y,r,color){
  ctx.fillStyle = color
  ctx.beginPath();
  ctx.arc(x,y,r,0,2*Math.PI)
  ctx.fill();
}
function makeLine(ix, iy, fx, fy){
  ctx.beginPath()
  ctx.moveTo(ix, iy)
  ctx.lineTo(fx, fy)
  ctx.stroke()
}

function nextPhase(){
  allVectors.nextPhase()
  if (mouseDownBoolean){
      makeLine(allVectors.allVectors[0].xValue, allVectors.allVectors[0].yValue, allVectors.allVectors[0].xValue + (allVectors.allVectors[0].xValue - mousePos.x), allVectors.allVectors[0].yValue + (allVectors.allVectors[0].yValue - mousePos.y))
  }

}
Obstakles = []
Obstacle1 = new Obstacles(0, 100, "x")
Obstacle2 = new Obstacles(200, 500, "x^2")
Obstakles.push(Obstacle1)
Obstakles.push(Obstacle2)
allVectors = new vectorlist()
test = new vector(650, 1, 0,0)
allVectors.appendVector(test)
setInterval(nextPhase, .0000000000000000001);
