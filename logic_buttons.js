var MOVE_PIXEL_COUNT = 50;

var BALL_MOVE_PIXEL_COUNT = 40;

var BALL_MOVE_PIXEL_COUNT_L_R = 40;
var BALL_MOVE_PIXEL_COUNT_U_D = 40;

var shouldFreezeBall = true;

var isAnimating1 = false;
var isAnimating2 = false;

function moveUp(index) {
  var player1Brick = document.getElementsByClassName("brick")[index];
  const currentPosition = parseInt(window.getComputedStyle(player1Brick).top);
  if (boundariesExceeded(currentPosition, "upPlayer2", player1Brick)) {
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

  if (boundariesExceeded(currentPosition, "downPlayer2", player1Brick)) {
    return;
  }
  // -100 because in the HTML coordinate system + is downwards and - is upwards
  requestAnimationFrame(() => {
    player1Brick.style.top = currentPosition + MOVE_PIXEL_COUNT + "px";
  });
}

function boundariesExceeded(currentPosition, direction, brickElement) {
  var gameCanvas = brickElement.parentElement; // Assuming the gameCanvas is the direct parent

  console.log("direction:", direction);
  console.log("currentPosition:", currentPosition);
  console.log("---");

  if (
    direction === "upPlayer2" &&
    currentPosition - MOVE_PIXEL_COUNT * 1.4 < 0
  ) {
    return true;
  }

  if (
    direction === "downPlayer2" &&
    currentPosition + MOVE_PIXEL_COUNT * 1.4 > gameCanvas.clientHeight
  ) {
    return true;
  }

  if (direction === "up" && currentPosition - BALL_MOVE_PIXEL_COUNT < 0) {
    return true;
  }

  if (
    direction === "down" &&
    currentPosition + 2 * BALL_MOVE_PIXEL_COUNT > gameCanvas.clientHeight
  ) {
    return true;
  }

  if (
    direction === "right" &&
    currentPosition + 2 * BALL_MOVE_PIXEL_COUNT > gameCanvas.clientWidth
  ) {
    return true;
  }

  if (direction === "left" && currentPosition - BALL_MOVE_PIXEL_COUNT < 0) {
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
    case "w":
      moveBallUp();
      break;
    case "s":
      moveBallDown();
      break;
    case "a":
      moveBallLeft();
      break;
    case "d":
      moveBallRight();
      break;
    case "g":
      startGame();
      break;
    case "q":
      moveBallDiagonalLeftUp();
      break;
    case "e":
      moveBallDiagonalRightUp();
      break;
    case "z":
      moveBallDiagonalLeftDown();
      break;
    case "c":
      moveBallDiagonalRightDown();
      break;

    case "ArrowDown":
      debouncedMoveDown(1);
      break;
    case "ArrowUp":
      debouncedMoveUp(1);
      break;
    default:
      break;
  }
});

window.addEventListener("keyup", function (event) {
  // return;
  switch (event.key) {
    case "ArrowDown":
      let brick = document.getElementsByClassName("brick")[1];
      console.log(brick, "down");
      let brickParent = brick.parentElement;
      const parentHeight = brickParent.clientHeight;
      const childHeight = brick.clientHeight;

      const cp = parseInt(window.getComputedStyle(brick).top);
      if (boundariesExceeded(cp, "downPlayer2", brick)) {
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
      if (boundariesExceeded(cp1, "upPlayer2", brick1)) {
        requestAnimationFrame(() => {
          brick1.style.top = childHeight1 / 2 + "px";
        });
      }
      break;
  }
});

function moveBallDown() {
  let ball = document.getElementById("ball");
  const currentPosition = parseInt(window.getComputedStyle(ball).top);

  if (boundariesExceeded(currentPosition, "down", ball)) {
    let count = 0;
    const intervalId = setInterval(() => {
      moveBallUp();
      if (count > 40) {
        clearInterval(intervalId);
      }
      count++;
    }, 100);
    return;
  }
  // -100 because in the HTML coordinate system + is downwards and - is upwards
  requestAnimationFrame(() => {
    ball.style.top = currentPosition + BALL_MOVE_PIXEL_COUNT + "px";
  });
}

// KEEP THIS ONE ONLY : BOUNCE UP/DOWN
function moveBallUp() {
  if (shouldFreezeBall) {
    return;
  }
  let ball = document.getElementById("ball");
  const currentPositionTop = parseInt(window.getComputedStyle(ball).top);
  const currentPositionLeft = parseInt(window.getComputedStyle(ball).left);

  if (
    currentPositionTop <= 0 ||
    currentPositionTop >= ball.parentElement.clientHeight - ball.clientHeight
  ) {
    // Reverse the direction when reaching the top or bottom boundary
    BALL_MOVE_PIXEL_COUNT_U_D *= -1;
  }

  let player2 = document.getElementById("player2");
  const player2Top = parseInt(window.getComputedStyle(player2).top);
  const player2Left = parseInt(window.getComputedStyle(player2).left);

  if (
    !(
      currentPositionTop - ball.clientHeight - player2Top >= 0 ||
      player2Top - ball.clientHeight - currentPositionTop >= 0
    ) &&
    currentPositionLeft + ball.clientWidth - player2Left >= 0
  ) {
    player2.style.backgroundColor = "rgba(255, 0, 0, 0.333)";
    BALL_MOVE_PIXEL_COUNT_L_R *= -1;
  } else {
    if (player2.style.backgroundColor !== "black") {
      player2.style.backgroundColor = "black";
    }
  }

  ball.style.top = currentPositionTop - BALL_MOVE_PIXEL_COUNT_U_D + "px";

  requestAnimationFrame(moveBallUp);
}

function freezeRestart() {
  let ball = document.getElementById("ball");
  shouldFreezeBall = true;
  ball.style.top = "50%";
  ball.style.left = "50%";
}

function startGame() {
  shouldFreezeBall = false;
  moveBallDiagonalLeftUp();
}

// KEEP THIS ONE ONLY: BOUNCE LEFT then RIGHT
function moveBallLeft() {
  let ball = document.getElementById("ball");
  const currentPosition = parseInt(window.getComputedStyle(ball).left);
  if (currentPosition <= 0) {
    // Reverse the direction when reaching the top or bottom boundary
    BALL_MOVE_PIXEL_COUNT_L_R *= -1;
  }

  if (currentPosition >= ball.parentElement.clientWidth - ball.clientWidth) {
    alert("YOU lost homie :(");
    freezeRestart();
    return;
  }
  ball.style.left = currentPosition - BALL_MOVE_PIXEL_COUNT_L_R + "px";

  requestAnimationFrame(moveBallLeft);
}

function moveBallDiagonalLeftUp() {
  let ball = document.getElementById("ball");
  const currentPositionTop = parseInt(window.getComputedStyle(ball).top);
  const currentPositionLeft = parseInt(window.getComputedStyle(ball).left);

  let player2 = document.getElementById("player2");
  const player2Top = parseInt(window.getComputedStyle(player2).top);
  const player2Left = parseInt(window.getComputedStyle(player2).left);

  requestAnimationFrame(() => {
    console.log("Ball 1:", currentPositionLeft, ball.clientWidth);
    console.log("Player 1", player2Top, player2Left);
    if (
      Math.abs(currentPositionTop - player2Top) <= 0 &&
      Math.abs(currentPositionTop - player2Top) >= player2.clientHeight &&
      Math.abs(currentPositionLeft + ball.clientWidth - player2Left) <= 0
    ) {
      console.log("Ball:", currentPositionLeft, ball.clientWidth);

      console.log("Player", player2Top, player2Left);
      BALL_MOVE_PIXEL_COUNT_L_R *= -1;
    }
    moveBallUp();
    moveBallLeft();
  });
}

function moveBallUpDown() {
  let ball = document.getElementById("ball");
  const currentPosition = parseInt(window.getComputedStyle(ball).top);
  if (boundariesExceeded(currentPosition, "down", ball)) {
    BALL_MOVE_PIXEL_COUNT *= -1;
  }
  // -100 because in the HTML coordinate system + is downwards and - is upwards
  requestAnimationFrame(() => {
    ball.style.top = currentPosition - BALL_MOVE_PIXEL_COUNT + "px";
  });
}

function moveBallRight() {
  let ball = document.getElementById("ball");
  const currentPosition = parseInt(window.getComputedStyle(ball).left);
  if (boundariesExceeded(currentPosition, "right", ball)) {
    return;
  }
  // -100 because in the HTML coordinate system + is downwards and - is upwards
  requestAnimationFrame(() => {
    ball.style.left = currentPosition + BALL_MOVE_PIXEL_COUNT + "px";
  });
}

function moveBallDiagonalRight() {
  let ball = document.getElementById("ball");
  const currentPosition = parseInt(window.getComputedStyle(ball).left);
  if (boundariesExceeded(currentPosition, "right", ball)) {
    return;
  }
  // -100 because in the HTML coordinate system + is downwards and - is upwards
  requestAnimationFrame(() => {
    ball.style.left = currentPosition + BALL_MOVE_PIXEL_COUNT + "px";
  });
}

function moveBallDiagonalLeftDown() {
  let ball = document.getElementById("ball");
  const currentPositionLeft = parseInt(window.getComputedStyle(ball).left);
  const currentPositionTop = parseInt(window.getComputedStyle(ball).top);

  if (
    boundariesExceeded(currentPositionLeft, "left", ball) ||
    boundariesExceeded(currentPositionTop, "down", ball)
  ) {
    return;
  }
  // -100 because in the HTML coordinate system + is downwards and - is upwards
  requestAnimationFrame(() => {
    ball.style.left = currentPositionLeft - BALL_MOVE_PIXEL_COUNT + "px";
    ball.style.top = currentPositionTop + BALL_MOVE_PIXEL_COUNT + "px";
  });
}

function moveBallDiagonalRightUp() {
  let ball = document.getElementById("ball");
  const currentPositionLeft = parseInt(window.getComputedStyle(ball).left);
  const currentPositionTop = parseInt(window.getComputedStyle(ball).top);

  if (
    boundariesExceeded(currentPositionLeft, "right", ball) ||
    boundariesExceeded(currentPositionTop, "up", ball)
  ) {
    return;
  }
  // -100 because in the HTML coordinate system + is downwards and - is upwards
  requestAnimationFrame(() => {
    ball.style.left = currentPositionLeft + BALL_MOVE_PIXEL_COUNT + "px";
    ball.style.top = currentPositionTop - BALL_MOVE_PIXEL_COUNT + "px";
  });
}

function moveBallDiagonalRightDown() {
  let ball = document.getElementById("ball");
  const currentPositionLeft = parseInt(window.getComputedStyle(ball).left);
  const currentPositionTop = parseInt(window.getComputedStyle(ball).top);

  if (
    boundariesExceeded(currentPositionLeft, "right", ball) ||
    boundariesExceeded(currentPositionTop, "down", ball)
  ) {
    return;
  }
  // -100 because in the HTML coordinate system + is downwards and - is upwards
  requestAnimationFrame(() => {
    ball.style.left = currentPositionLeft + BALL_MOVE_PIXEL_COUNT + "px";
    ball.style.top = currentPositionTop + BALL_MOVE_PIXEL_COUNT + "px";
  });
}
