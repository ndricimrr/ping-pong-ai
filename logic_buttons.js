var MOVE_PIXEL_COUNT = 100;
var isAnimating1 = false;
var isAnimating2 = false;

function moveUp(index) {
  var player1Brick = document.getElementsByClassName("brick")[index];
  const currentPosition = parseInt(window.getComputedStyle(player1Brick).top);
  if (boundariesExceeded(currentPosition, false, player1Brick)) {
    return;
  }
  // -100 because in the HTML coordinate system + is downwards and - is upwards
  requestAnimationFrame(() => {
    player1Brick.style.top = currentPosition - MOVE_PIXEL_COUNT + "px";
  });
}

function moveDown(index) {
  var player1Brick = document.getElementsByClassName("brick")[index];
  const currentPosition = parseInt(window.getComputedStyle(player1Brick).top);

  if (boundariesExceeded(currentPosition, true, player1Brick)) {
    return;
  }
  // -100 because in the HTML coordinate system + is downwards and - is upwards
  requestAnimationFrame(() => {
    player1Brick.style.top = currentPosition + MOVE_PIXEL_COUNT + "px";
  });
}

function boundariesExceeded(currentPosition, down, brickElement) {
  var gameCanvas = brickElement.parentElement; // Assuming the gameCanvas is the direct parent

  if (!down && currentPosition - 20 - MOVE_PIXEL_COUNT < 0) {
    return true;
  }

  if (
    down &&
    Math.abs(currentPosition + 20 + MOVE_PIXEL_COUNT) > gameCanvas.clientHeight
  ) {
    return true;
  }

  return false;
}

// when out of boundary below viewport height, push him back up
function bounceBackUp() {}

function debounce(func, delay) {
  let timeoutId;
  return function () {
    if (!timeoutId) {
      func.apply(this, arguments);
      timeoutId = setTimeout(() => {
        timeoutId = null;
      }, delay);
    }
  };
}

// Debounce the moveDown function to prevent rapid calls
// var debouncedMoveDown = debounce(moveDown, 100);
// var debouncedMoveUp = debounce(moveUp, 100);

var debouncedMoveDown = moveDown;
var debouncedMoveUp = moveUp;

window.addEventListener("keydown", function (event) {
  switch (event.key) {
    case "ArrowDown":
      debouncedMoveDown(1);
      break;
    case "ArrowUp":
      debouncedMoveUp(1);
      break;
  }
});

window.addEventListener("keyup", function (event) {
  switch (event.key) {
    case "ArrowDown":
      let brick = document.getElementsByClassName("brick")[1];
      console.log(brick, "down");
      let brickParent = brick.parentElement;
      const parentHeight = brickParent.clientHeight;
      const childHeight = brick.clientHeight;

      const cp = parseInt(window.getComputedStyle(brick).top);
      if (boundariesExceeded(cp, true, brick)) {
        requestAnimationFrame(() => {
          brick.style.top = `${parentHeight - childHeight / 2}px`;
        });
      }
      break;
    case "ArrowUp":
      let brick1 = document.getElementsByClassName("brick")[1];
      console.log(brick1, "up");

      let brickParent1 = brick1.parentElement;
      const parentHeight1 = brickParent1.clientHeight;
      const childHeight1 = brick1.clientHeight;

      const cp1 = parseInt(window.getComputedStyle(brick1).top);
      if (boundariesExceeded(cp1, false, brick1)) {
        requestAnimationFrame(() => {
          brick1.style.top = childHeight1 / 2 + "px";
        });
      }
      break;
  }
});
