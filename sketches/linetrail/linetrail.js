let trail = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(240, 232, 232);
}

function draw() {
  background(240, 232, 232, 25);

  trail.push({
    x: mouseX,
    y: mouseY,
    size: random(10, 35),
    r: random(140, 210),
    g: random(80, 140),
    b: random(120, 180),
    alpha: 255
  });

  if (trail.length > 120) {
    trail.shift();
  }

  noStroke();
  for (let i = 0; i < trail.length; i++) {
    let alpha = map(i, 0, trail.length, 0, 200);
    fill(trail[i].r, trail[i].g, trail[i].b, alpha);
    circle(trail[i].x, trail[i].y, trail[i].size);
  }
}
