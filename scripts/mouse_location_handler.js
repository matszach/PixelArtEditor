
// holds current mouse up/down state as a variable
let mouseDown;

document.body.onmousedown = function() { 
  mouseDown = true;
}

document.body.ontouchstart = function(){
  mouseDown = true;
}

document.body.onmouseup = function() {
  mouseDown = false;
}

document.body.ontouchend = function(){
  mouseDown = false;
}

// holds mouse curreny location as variables
let mouseX, mouseY;

document.body.onmousemove = function(){
  mouseX = event.clientX;
  mouseY = event.clientY;
}

document.body.ontouchmove = function(){
  mouseX = event.clientX;
  mouseY = event.clientY;
}

// returns mouse position in canvas
function getMousePositionInCanvas(){
  cvs_rect = cvs.getBoundingClientRect();
  return [mouseX - cvs_rect.left, mouseY - cvs_rect.top];
}

function isMouseInCanvas(){
  mouse_position = getMousePositionInCanvas();
  return mouse_position[0] >= 0 && 
  mouse_position[0] <= canvas_size &&
  mouse_position[1] >= 0 &&
  mouse_position[1] <= canvas_size;
}

    