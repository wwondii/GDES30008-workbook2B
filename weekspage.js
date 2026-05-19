//The javascript code relevant to draggable elements was made largely in reference to https://unim-ajl.github.io/Workbook/ . 

//JS below are all sourced and referenced from https://unim-ajl.github.io/Workbook/ 
dragElement(document.getElementById("week1"));
dragElement(document.getElementById("week2"));
dragElement(document.getElementById("week3"));
dragElement(document.getElementById("week4"));
dragElement(document.getElementById("week5"));
dragElement(document.getElementById("week6"));
dragElement(document.getElementById("week7"));
dragElement(document.getElementById("week8"));
dragElement(document.getElementById("week9"));
dragElement(document.getElementById("research"));
dragElement(document.getElementById("gif1"));
dragElement(document.getElementById("gif2"));
dragElement(document.getElementById("gif3"));

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  elmnt.onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }

// adjustment made here to block single clicks on links - only double click opens
  var links = elmnt.querySelectorAll('a');
  links.forEach(function(link) {
    link.addEventListener('click', function(e) {
      e.preventDefault();
    });
  });

  elmnt.ondblclick = function() {
    var link = elmnt.querySelector('a');
    if (link) window.open(link.href, '_blank');
  }


  // adjustment made here for a custom cursor to only trigger over anchors (Received Assistance from Claude AI)
const cursorImg = document.getElementById('cursor-img');

['week1','week2','week3','week4','week5','week6','week7','week8','week9','research'].forEach(function(id) {
  const el = document.getElementById(id);
  el.addEventListener('mouseenter', function() {
    cursorImg.style.display = 'block';
  });
  el.addEventListener('mouseleave', function() {
    cursorImg.style.display = 'none';
  });
});

document.addEventListener('mousemove', function(e) {
  cursorImg.style.left = (e.clientX + 12) + 'px';
  cursorImg.style.top  = (e.clientY + 12) + 'px';
});

const hoverPreview = document.getElementById('hover-preview');

['gif1', 'gif2', 'gif3'].forEach(function(id) {
  const el = document.getElementById(id);

  el.addEventListener('mousedown', function() {
    hoverPreview.src = 'images/hiddenimage.png';
    hoverPreview.style.display = 'block';
  });

  el.addEventListener('mouseup', function() {
    hoverPreview.style.display = 'none';
    hoverPreview.src = '';
  });
});


// play sound on page load
window.addEventListener('load', function() {
  const sound = new Audio('sounds/enter.mp3');
  sound.volume = 0.5;  // 0 to 1
  sound.play().catch(function() {
    // browser blocked autoplay — play on first interaction instead
    document.addEventListener('click', function() {
      sound.play();
    }, { once: true });
  });
});


// play sound when interacting with gifs
const gifSound = new Audio('sound/windows-error.mp3');

['gif1', 'gif2', 'gif3'].forEach(function(id) {
  document.getElementById(id).addEventListener('mousedown', function() {
    gifSound.currentTime = 0; // rewind so it plays every time
    gifSound.volume = 0.2;
    gifSound.play();
  });
});


}