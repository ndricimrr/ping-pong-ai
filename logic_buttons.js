var MOVE_PIXEL_COUNT = 50;

var BALL_MOVE_PIXEL_COUNT = 40;

var BALL_MOVE_PIXEL_COUNT_L_R = 40;
var BALL_MOVE_PIXEL_COUNT_U_D = 40;

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
  console.log(event, event.key);
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
  let ball = document.getElementById("ball");
  const currentPosition = parseInt(window.getComputedStyle(ball).top);
  if (
    currentPosition <= 0 ||
    currentPosition >= ball.parentElement.clientHeight - ball.clientHeight
  ) {
    // Reverse the direction when reaching the top or bottom boundary
    BALL_MOVE_PIXEL_COUNT_U_D *= -1;
  }

  ball.style.top = currentPosition - BALL_MOVE_PIXEL_COUNT_U_D + "px";

  requestAnimationFrame(moveBallUp);
}

// KEEP THIS ONE ONLY: BOUNCE LEFT then RIGHT
function moveBallLeft() {
  let ball = document.getElementById("ball");
  const currentPosition = parseInt(window.getComputedStyle(ball).left);
  if (
    currentPosition <= 0 ||
    currentPosition >= ball.parentElement.clientWidth - ball.clientWidth
  ) {
    // Reverse the direction when reaching the top or bottom boundary
    BALL_MOVE_PIXEL_COUNT_L_R *= -1;
  }

  ball.style.left = currentPosition - BALL_MOVE_PIXEL_COUNT_L_R + "px";

  requestAnimationFrame(moveBallLeft);
}

function moveBallDiagonalLeftUp() {
  let ball = document.getElementById("ball");
  const currentPositionTop = parseInt(window.getComputedStyle(ball).top);
  const currentPositionLeft = parseInt(window.getComputedStyle(ball).left);

  // if (
  //   currentPositionTop <= 0 ||
  //   currentPositionTop >= ball.parentElement.clientHeight - ball.clientHeight
  // ) {
  //   // Reverse the direction when reaching the top or bottom boundary
  //   BALL_MOVE_PIXEL_COUNT *= -1;
  // }

  // if (
  //   currentPositionLeft <= 0 ||
  //   currentPositionLeft >= ball.parentElement.clientWidth - ball.clientWidth
  // ) {
  //   // Reverse the direction when reaching the top or bottom boundary
  //   BALL_MOVE_PIXEL_COUNT *= -1;
  // }

  // ball.style.left = currentPosition - BALL_MOVE_PIXEL_COUNT + "px";

  // ball.style.top = currentPosition - BALL_MOVE_PIXEL_COUNT + "px";

  requestAnimationFrame(() => {
    // TOP Left
    if (currentPositionTop <= 0) {
      BALL_MOVE_PIXEL_COUNT_L_R *= -1;
    }
    // TOP Left
    // else if (
    //   currentPositionTop >=
    //   ball.parentElement.clientHeight - ball.clientHeight
    // ) {
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
