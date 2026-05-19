let capture;

function setup() {
  pixelDensity(1);
  createCanvas(windowWidth, windowHeight);
  capture = createCapture(VIDEO);
  capture.size(windowWidth, windowHeight);
  capture.hide();

  window.addEventListener('message', function(e) {
    if (e.data === 'saveCanvas') saveCanvas('photo', 'png');
  });
}

function draw() {
  background(0);
  push();
  translate(width, 0);
  scale(-1, 1);
  image(capture, 0, 0, width, height);
  pop();
  dither();
}

function dither() {
  loadPixels();
  let bayer = [
     0,  8,  2, 10,
    12,  4, 14,  6,
     3, 11,  1,  9,
    15,  7, 13,  5
  ];
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let i = (x + y * width) * 4;
      let bright = (0.299 * pixels[i] + 0.587 * pixels[i+1] + 0.114 * pixels[i+2]) * 1.4;
      bright = min(bright, 255);
      let threshold = (bayer[(x % 4) + (y % 4) * 4] / 16) * 255;
      let val = bright > threshold ? 255 : 0;
      pixels[i] = val; pixels[i+1] = val; pixels[i+2] = val;
    }
  }
  updatePixels();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function keyPressed() {
  if (key == 's') {
    saveCanvas('fileName', 'png');
  }
  if (key == ' ') {
    background(0);
  }
}
