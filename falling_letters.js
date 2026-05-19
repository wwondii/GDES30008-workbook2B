//code generated and referenced from Claude AI: 

let letters = [];
let word = "W0RKB0OK2B & R3SE4RCH!??";
let p5Canvas;

function setup() {
  p5Canvas = createCanvas(windowWidth, windowHeight);
  p5Canvas.position(0, 0);
  p5Canvas.style('position', 'fixed');
  p5Canvas.style('top', '0');
  p5Canvas.style('left', '0');
  p5Canvas.style('z-index', '3');
  p5Canvas.style('pointer-events', 'none');

  textFont('Helvetica');
  textAlign(CENTER, CENTER);

  let fontSize = min(windowWidth / 5, 110);
  let letterW = fontSize * 0.64;
  let totalW = word.length * letterW;
  let startX = (width - totalW) / 2 + letterW / 2;

  for (let i = 0; i < word.length; i++) {
    letters.push(new Letter(
      startX + i * letterW,
      -100,
      word[i],
      fontSize,
      300 + i * 180
    ));
  }

  // attach mouse events directly to the canvas DOM element
  let el = p5Canvas.elt;

  el.addEventListener('mousedown', (e) => {
    let mx = e.clientX;
    let my = e.clientY;
    for (let l of letters) l.tryGrab(mx, my);
  });

  el.addEventListener('mousemove', (e) => {
    let mx = e.clientX;
    let my = e.clientY;
    for (let l of letters) {
      if (l.grabbed) {
        l.vx = mx - l.x;
        l.vy = my - l.y;
        l.x = mx;
        l.y = my;
      }
    }
  });

  el.addEventListener('mouseup', () => {
    for (let l of letters) l.grabbed = false;
  });

  // touch support
  el.addEventListener('touchstart', (e) => {
    e.preventDefault();
    let t = e.touches[0];
    for (let l of letters) l.tryGrab(t.clientX, t.clientY);
  });

  el.addEventListener('touchmove', (e) => {
    e.preventDefault();
    let t = e.touches[0];
    for (let l of letters) {
      if (l.grabbed) {
        l.vx = t.clientX - l.x;
        l.vy = t.clientY - l.y;
        l.x = t.clientX;
        l.y = t.clientY;
      }
    }
  });

  el.addEventListener('touchend', () => {
    for (let l of letters) l.grabbed = false;
  });
}

function draw() {
  clear();
  resolveCollisions();

  let hovering = false;
  for (let l of letters) {
    l.update();
    l.display();
    if (dist(mouseX, mouseY, l.x, l.y) < l.w * 0.8) hovering = true;
  }

  // dynamically toggle pointer-events based on hover
  let el = p5Canvas.elt;
  el.style.pointerEvents = (hovering || letters.some(l => l.grabbed)) ? 'auto' : 'none';
  el.style.cursor = hovering ? 'grab' : 'default';
}

function resolveCollisions() {
  for (let i = 0; i < letters.length; i++) {
    for (let j = i + 1; j < letters.length; j++) {
      let a = letters[i];
      let b = letters[j];
      if (!a.active || !b.active) continue;

      let dx = b.x - a.x;
      let dy = b.y - a.y;
      let d = sqrt(dx * dx + dy * dy);
      let minDist = (a.w + b.w) / 2;

      if (d < minDist && d > 0) {
        let nx = dx / d;
        let ny = dy / d;
        let overlap = minDist - d;

        if (!a.grabbed) { a.x -= nx * overlap / 2; a.y -= ny * overlap / 2; }
        if (!b.grabbed) { b.x += nx * overlap / 2; b.y += ny * overlap / 2; }

        let dvx = b.vx - a.vx;
        let dvy = b.vy - a.vy;
        let dot = dvx * nx + dvy * ny;

        if (dot < 0) {
          let impulse = (1 + 0.4) * dot / 2;
          if (!a.grabbed) { a.vx += impulse * nx; a.vy += impulse * ny; }
          if (!b.grabbed) { b.vx -= impulse * nx; b.vy -= impulse * ny; }
        }
      }
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

class Letter {
  constructor(x, y, char, fontSize, dropDelay) {
    this.x = x;
    this.y = y;
    this.char = char;
    this.fontSize = fontSize;
    this.w = fontSize * 0.55;
    this.h = fontSize * 0.85;
    this.vx = 0;
    this.vy = 0;
    this.angle = 0;
    this.angularVel = 0;
    this.grabbed = false;
    this.active = false;
    this.dropDelay = dropDelay;
  }

  update() {
    if (!this.active && millis() > this.dropDelay) {
      this.active = true;
      this.vx = random(-1.5, 1.5);
      this.angularVel = random(-0.04, 0.04);
    }

    if (!this.active || this.grabbed) return;

    this.vy += 0.18;
    this.x += this.vx;
    this.y += this.vy;
    this.angle += this.angularVel;

    if (this.y + this.h / 2 > height) {
      this.y = height - this.h / 2;
      this.vy *= -0.45;
      this.vx *= 0.85;
      this.angularVel *= 0.7;
      if (abs(this.vy) < 0.5) this.vy = 0;
    }
    if (this.y - this.h / 2 < 0) { this.y = this.h / 2; this.vy *= -0.45; }
    if (this.x + this.w / 2 > width) { this.x = width - this.w / 2; this.vx *= -0.55; }
    if (this.x - this.w / 2 < 0) { this.x = this.w / 2; this.vx *= -0.55; }

    this.vx *= 0.995;
    this.angularVel *= 0.985;
  }

  display() {
    push();
    translate(this.x, this.y);
    rotate(this.angle);
    fill('#FFFFFF');
    noStroke();
    textSize(this.fontSize);
    text(this.char, 0, 0);
    pop();
  }

  tryGrab(mx, my) {
    if (dist(mx, my, this.x, this.y) < this.w * 0.8) {
      this.grabbed = true;
      this.vx = 0;
      this.vy = 0;
    }
  }
}