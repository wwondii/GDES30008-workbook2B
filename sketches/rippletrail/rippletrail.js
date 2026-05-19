let trail = [];
let ripples = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(236, 242, 236);
}

function draw() {
  background(236, 242, 236, 25);

  // Trail circles
  trail.push({
    x: mouseX,
    y: mouseY,
    size: random(10, 35),
    r: random(80, 140),
    g: random(130, 180),
    b: random(90, 140),
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

  // Ripples
  for (let i = ripples.length - 1; i >= 0; i--) {
    let r = ripples[i];
    noFill();
    stroke(74, 110, 80, r.alpha);
    strokeWeight(1.5);
    circle(r.x, r.y, r.size);
    r.size += 4;
    r.alpha -= 4;
    if (r.alpha <= 0) {
      ripples.splice(i, 1);
    }
  }
}
