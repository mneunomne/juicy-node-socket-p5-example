const socket = io.connect();

var myColor
var myHue

var myId = Math.floor(Math.random() * 10000)

var lastPoint = {}

function setup() {
  createCanvas(displayWidth, displayHeight);
  strokeWeight(5);
  colorMode(HSB, 255, 255, 255, 255)
  myHue = random(255)
}

function draw () {
  background(255, 0, 255, 10)
  for (var i in lastPoint) {
    if (frameCount - lastPoint[i].f > 10) {
     delete lastPoint[i]
    } 
  }
}

function touchMoved() {
  onMouseMove(mouseX, mouseY)
  drawLine(mouseX, mouseY, myHue, myId)
  return false;
}

function drawLine (x, y, hue, id) {
  var c = color(hue, 255, 255)
  stroke(c)
  if (lastPoint[id] !== undefined) {
    line(x, y, lastPoint[id].x, lastPoint[id].y);
  }
  // save last point of the line related to that user
  lastPoint[id] = {x, y, f: frameCount}
}

function onMouseMove(x, y) {
  socket.emit("move", {
    x: x,
    y: y,
    color: myHue,
    id: myId
  });
}

// listen to events coming broadcasted from server 
socket.on("move", (data) => {
  drawLine(data.x, data.y, data.color, data.id)
});