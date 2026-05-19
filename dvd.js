//code generated and referenced from Claude AI:

const dvdPage = document.title;

const dvd = document.getElementById('dvd');
let link = '#';

if (dvdPage === 'Week 6') {
  dvd.src = 'images/dvd_week6.png';
  link = 'week7.html';
} else if (dvdPage === 'Week 7') {
  dvd.src = 'images/dvd_week7.png';
  link = 'week8.html';
} else if (dvdPage === 'Week 8') {
  dvd.src = 'images/dvd_week8.png';
  link = 'week9.html';
} else if (dvdPage === 'Week 9') {
  dvd.src = 'images/dvd_week9.png';
  link = 'research.html';
} else if (dvdPage === 'Week 5') {
  dvd.src = 'images/dvd_week5.png';
  link = 'week6.html';
} else if (dvdPage === 'Week 4') {
  dvd.src = 'images/dvd_week4.png';
  link = 'week5.html';
} 


let x = 100, y = 100;
let vx = 0.08, vy = 0.08; // speed as % of screen per frame
let lastTime = null;
let started = false;

dvd.addEventListener('click', function() {
  window.open(link, '_blank');
});

function animate(timestamp) {
  if (!lastTime) lastTime = timestamp;
  const delta = timestamp - lastTime;
  lastTime = timestamp;

  const speed = 1.0; // pixels per ms
  x += vx * delta * speed;
  y += vy * delta * speed;

  const w = 200;
  const h = 200;

  if (x + w > window.innerWidth) { x = window.innerWidth - w; vx *= -1; }
  if (x < 0) { x = 0; vx *= -1; }
  if (y + h > window.innerHeight) { y = window.innerHeight - h; vy *= -1; }
  if (y < 0) { y = 0; vy *= -1; }

  dvd.style.left = x + 'px';
  dvd.style.top = y + 'px';

  requestAnimationFrame(animate);
}

function startAnimate() {
  if (started) return;
  started = true;
  requestAnimationFrame(animate);
}

dvd.onload = function() { startAnimate(); }
if (dvd.complete) { startAnimate(); }