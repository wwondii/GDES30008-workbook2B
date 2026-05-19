function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  rectMode(CENTER);
  textSize(60);
  frameRate(10);
}


function draw() {
  background(0, 16);
  //fill(random(105), random(105), random(105));
  //circle(mouseX, mouseY, random(120));
  textSize(20);
  stroke(70);
  strokeWeight(8);
  line(pmouseX, pmouseY, mouseX, mouseY);
 //text("lights,camera,action", mouseX, mouseY);
 line(width/2, height/2, mouseX, mouseY);
}
