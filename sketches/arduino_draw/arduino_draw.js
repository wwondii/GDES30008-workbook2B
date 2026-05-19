let trail = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(245, 240, 225);
}

function draw() {
  background(245, 240, 225, 25);

  trail.push({
    x: mouseX,
    y: mouseY,
    size: random(10, 35),
    col: random([
      [0, 151, 157],    // Arduino teal
      [192, 57, 43],    // Arduino red
      [26, 26, 10]      // dark
    ])
  });

  if (trail.length > 120) {
    trail.shift();
  }

  noStroke();
  for (let i = 0; i < trail.length; i++) {
    let alpha = map(i, 0, trail.length, 0, 200);
    let c = trail[i].col;
    fill(c[0], c[1], c[2], alpha);
    circle(trail[i].x, trail[i].y, trail[i].size);
  }
}
