var MOVE_PIXEL_COUNT = 100;

function moveUp(index) {
  var player1Brick = document.getElementsByClassName("brick")[index];

  console.log("a", player1Brick, typeof player1Brick);
  const currentPosition = parseInt(window.getComputedStyle(player1Brick).top);
  console.log(currentPosition);
  if (boundariesExceeded(currentPosition, false)) {
    return;
  }
  // -100 because in the HTML coordinate system + is downwards and - is upwards
  player1Brick.style.top = currentPosition - MOVE_PIXEL_COUNT + "px";
}

function moveDown(index) {
  var player1Brick = document.getElementsByClassName("brick")[index];
  console.log("a", player1Brick, typeof player1Brick);
  const currentPosition = parseInt(window.getComputedStyle(player1Brick).top);

  if (boundariesExceeded(currentPosition, true)) {
    return;
  }
  console.log(currentPosition);
  // -100 because in the HTML coordinate system + is downwards and - is upwards
  player1Brick.style.top = currentPosition + MOVE_PIXEL_COUNT + "px";
}

function boundariesExceeded(currentPosition, down) {
  // if ()
  if (!down && currentPosition - 2 * MOVE_PIXEL_COUNT < 0) {
    return true;
  }

  if (
    down &&
    Math.abs(currentPosition + 2 * MOVE_PIXEL_COUNT) > window.innerHeight
  ) {
    return true;
  }

  return false;
}
