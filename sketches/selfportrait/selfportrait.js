var Colours = [
  [255, 235, 150], 
  [170, 210, 255], 
  [255, 210, 220], 
  [200, 230, 200], 
  [220, 200, 235], 
  [180, 220, 255], 
  [255, 180, 180]  
];

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255, 250, 220);
  noStroke();
  frameRate(20);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  noStroke();
  fill(random(Colours));
  circle(random(width), random(height), random(20, 100));

  let cx = width / 2;
  let cy = height / 2;

  push();
  translate(cx, cy);
  scale(1.2); 
  translate(-cx, -cy);

  fill(240, 240, 240);
  stroke(40, 40, 40);
  strokeWeight(6);
  ellipse(cx, cy, 420, 400);

  noStroke();
  fill(30, 30, 30);
  ellipse(cx - 110, cy - 60, 200, 180);

  fill(30, 30, 30);
  stroke(40, 40, 40);
  strokeWeight(6);
  triangle(cx - 160, cy - 160, cx - 100, cy - 280, cx - 30, cy - 160);

  fill(30, 30, 30);
  triangle(cx + 30, cy - 160, cx + 100, cy - 280, cx + 160, cy - 160);

  noStroke();
  fill(230, 160, 170);
  triangle(cx - 145, cy - 165, cx - 100, cy - 255, cx - 48, cy - 165);
  triangle(cx + 48, cy - 165, cx + 100, cy - 255, cx + 145, cy - 165);

  noFill();
  stroke(40, 40, 40);
  strokeWeight(6);
  ellipse(cx, cy, 420, 400);
  
  noStroke();
  fill(255);
  ellipse(cx - 85, cy - 30, 90, 70);
  ellipse(cx + 85, cy - 30, 90, 70);

  fill(90, 110, 80);
  
  let leftEyeX = cx - 85;
  let leftEyeY = cy - 30;
  
  let rightEyeX = cx + 85;
  let rightEyeY = cy - 30;
  
  let pupilOffset = 10;
  
  let angleL = atan2(mouseY - leftEyeY, mouseX - leftEyeX);
  let pupilLX = leftEyeX + cos(angleL) * pupilOffset;
  let pupilLY = leftEyeY + sin(angleL) * pupilOffset;
  ellipse(pupilLX, pupilLY, 28, 55);
  
  let angleR = atan2(mouseY - rightEyeY, mouseX - rightEyeX);
  let pupilRX = rightEyeX + cos(angleR) * pupilOffset;
  let pupilRY = rightEyeY + sin(angleR) * pupilOffset;
  ellipse(pupilRX, pupilRY, 28, 55);
  
  fill(255, 255, 255, 220);
  ellipse(pupilLX + 6, pupilLY - 8, 14, 14);
  ellipse(pupilRX + 6, pupilRY - 8, 14, 14);

  fill(230, 130, 150);
  noStroke();
  triangle(cx - 18, cy + 30, cx + 18, cy + 30, cx, cy + 52);

  stroke(40, 40, 40);
  strokeWeight(4);
  noFill();
  line(cx, cy + 52, cx, cy + 68);
  arc(cx - 28, cy + 68, 42, 28, 0, PI, OPEN);
  arc(cx + 28, cy + 68, 42, 28, 0, PI, OPEN);

  stroke(40, 40, 40);
  strokeWeight(3);
  line(cx - 30, cy + 40, cx - 180, cy + 20);
  line(cx - 30, cy + 48, cx - 180, cy + 48);
  line(cx - 30, cy + 56, cx - 180, cy + 76);
  line(cx + 30, cy + 40, cx + 180, cy + 20);
  line(cx + 30, cy + 48, cx + 180, cy + 48);
  line(cx + 30, cy + 56, cx + 180, cy + 76);

  pop();
}
