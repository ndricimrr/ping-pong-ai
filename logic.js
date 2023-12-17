function moveUp(index) {
  var player1Brick = document.getElementsByClassName("brick")[index];

  console.log("a", player1Brick, typeof player1Brick);
  const currentPosition = parseInt(window.getComputedStyle(player1Brick).top);
  // -100 because in the HTML coordinate system + is downwards and - is upwards
  player1Brick.style.top = currentPosition - 100 + "px";
}

function moveDown(index) {
  var player1Brick = document.getElementsByClassName("brick")[index];

  console.log("a", player1Brick, typeof player1Brick);
  const currentPosition = parseInt(window.getComputedStyle(player1Brick).top);
  // -100 because in the HTML coordinate system + is downwards and - is upwards
  player1Brick.style.top = currentPosition + 100 + "px";
}
