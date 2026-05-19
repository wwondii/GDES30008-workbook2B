let capture;
let res = 8; // smaller = more detailed
let chars = ['@', '#', 'W', 'M', 'B', 'D', 'O', 'Q', 'S', '%', '?', '*', '+', ';', ':', ',', '.', ' '];

function setup() {
  createCanvas(windowWidth, windowHeight);
  capture = createCapture(VIDEO);
  capture.size(width / res, height / res);
  capture.hide();
  textFont('Courier New');
  textSize(res);
  textAlign(LEFT, TOP);
}

function draw() {
  background(0);
  capture.loadPixels();

  for (let y = 0; y < capture.height; y++) {
    for (let x = 0; x < capture.width; x++) {
      let idx = (y * capture.width + x) * 4;
      let r = capture.pixels[idx];
      let g = capture.pixels[idx + 1];
      let b = capture.pixels[idx + 2];

      // boost contrast before mapping
      let bright = (r * 0.299 + g * 0.587 + b * 0.114);
      bright = constrain((bright - 128) * 1.8 + 128, 0, 255);

      let charIdx = floor(map(bright, 0, 255, chars.length - 1, 0));
      fill(255);
      noStroke();
      text(chars[charIdx], x * res, y * res);
    }
  }
}
