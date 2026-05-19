function setup() {
  createCanvas(windowWidth, windowHeight);
  background(245, 235, 245);
  rectMode(CENTER);
  textSize(60);
  frameRate(50);
}

function draw() {
  background(245, 235, 245, 18);
  
  let r = random(180, 255);
  let g = random(150, 210);
  let b = random(180, 240);
  
  fill(r, g, b);
  stroke(255, 200, 220);
  strokeWeight(8);
  textSize(100);
  text("٩(◕‿◕｡)۶", mouseX, mouseY);
}
