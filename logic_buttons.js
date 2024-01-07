var MOVE_PIXEL_COUNT = 95;

var BALL_MOVE_PIXEL_COUNT_L_R = 100;
var BALL_MOVE_PIXEL_COUNT_U_D = BALL_MOVE_PIXEL_COUNT_L_R;

var BALL_MOVE_PIXEL_COUNT = BALL_MOVE_PIXEL_COUNT_L_R;

var shouldFreezeBall = true;

/**
 * Moves player with index up an MOVE_PIXEL_COUNT amount of pixels
 * @param {*} index player index
 * @returns
 */
function moveUp(index) {
  let playerBrick = document.getElementsByClassName("brick")[index];
  const currentPosition = parseInt(window.getComputedStyle(playerBrick).top);

  if (currentPosition <= 0) {
    return;
  }

  if (currentPosition - MOVE_PIXEL_COUNT <= 0) {
    playerBrick.style.top = 0 + "px";
    return;
  }
  // }

  // -100 because in the HTML coordinate system + is downwards and - is upwards
  requestAnimationFrame(() => {
    playerBrick.style.top = currentPosition - MOVE_PIXEL_COUNT + "px";
  });
}

function moveDown(index) {
  let playerBrick = document.getElementsByClassName("brick")[index];
  const currentPosition = parseInt(window.getComputedStyle(playerBrick).top);
  var gameCanvas = playerBrick.parentElement; // Assuming the gameCanvas is the direct parent

  // if (
  //   index === 1
  // ) {
  if (
    currentPosition + playerBrick.clientHeight + MOVE_PIXEL_COUNT >
    gameCanvas.clientHeight
  ) {
    playerBrick.style.top =
      gameCanvas.clientHeight - playerBrick.clientHeight + "px";
    return;
  }
  // }

  // +100 because in the HTML coordinate system + is downwards and - is upwards
  requestAnimationFrame(() => {
    playerBrick.style.top = currentPosition + MOVE_PIXEL_COUNT + "px";
  });
}

function boundariesExceeded(currentPosition, direction, brickElement) {
  var gameCanvas = brickElement.parentElement; // Assuming the gameCanvas is the direct parent

  console.log("direction:", direction);
  console.log("currentPosition:", currentPosition);
  console.log("---");

  // Player 2 Boundary check

  // if (
  //   direction === "upPlayer2" &&
  //   currentPosition  <= 0
  // ) {
  //   return true;
  // }

  // if (
  //   direction === "downPlayer2" &&
  //   currentPosition + brickElement.clientHeight > gameCanvas.clientHeight
  // ) {
  //   return true;
  // }

  // Player 1 Boundary check
  if (
    direction === "upPlayer1" &&
    currentPosition - MOVE_PIXEL_COUNT * 1.4 <= 0
  ) {
    return true;
  }

  if (
    direction === "downPlayer1" &&
    currentPosition + brickElement.clientHeight * 1 >= gameCanvas.clientHeight
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

window.addEventListener("keydown", function (event) {
  switch (event.key) {
    case "w":
      moveUp(0);
      break;
    case "s":
      moveDown(0);
      break;
    // case "a":
    //   moveBallLeft();
    //   break;
    // case "d":
    //   moveBallRight();
    //   break;
    case "g":
      startGame();
      break;
    // case "q":
    //   moveBallDiagonalLeftUp();
    //   break;
    // case "e":
    //   moveBallDiagonalRightUp();
    //   break;
    // case "z":
    //   moveBallDiagonalLeftDown();
    //   break;
    // case "c":
    //   moveBallDiagonalRightDown();
    //   break;

    case "ArrowDown":
      moveDown(1);
      break;
    case "ArrowUp":
      moveUp(1);
      break;
    default:
      break;
  }
});

var PAUSE = false;

window["stopGame"] = () => {
  freezeGame();
};

/**
 * Function to stop game and restart ball at center position
 */
function freezeGame() {
  // PAUSE = TRUE;
  shouldFreezeBall = true;
  const ball = document.getElementById("ball");
  ball.style.top = 50 + "%";
  ball.style.left = 50 + "%";
  alert("GAME OVER");
  return;
}

/**
 * Calls itself in a recursive way by using requestAnimationFrame for smooth element movement
 *
 * @returns void if ball should freeze
 */
function moveBallUp() {
  if (shouldFreezeBall) {
    return;
  }
  const ball = document.getElementById("ball");
  const currentPositionTop = parseInt(window.getComputedStyle(ball).top);
  const currentPositionLeft = parseInt(window.getComputedStyle(ball).left);

  // Reverse the direction when reaching the top or bottom boundary
  if (
    currentPositionTop <= 0 ||
    currentPositionTop >= ball.parentElement.clientHeight - ball.clientHeight
  ) {
    BALL_MOVE_PIXEL_COUNT_U_D *= -1;
  }

  const player2 = document.getElementById("player2");
  const player2Top = parseInt(window.getComputedStyle(player2).top);
  const player2Left = parseInt(window.getComputedStyle(player2).left);

  const player1 = document.getElementById("player1");
  const player1Top = parseInt(window.getComputedStyle(player1).top);

  // if ball touches player 2
  if (
    // ball is in between player 2 horizontal plane
    currentPositionTop - player2Top + ball.clientHeight >= 0 &&
    currentPositionTop - player2Top <=
      player2.clientHeight + ball.clientHeight &&
    currentPositionLeft + ball.clientWidth - player2Left >= 0
  ) {
    player2.style.backgroundColor = "blue";
    BALL_MOVE_PIXEL_COUNT_L_R *= -1;
  } else {
    if (player2.style.backgroundColor !== "black") {
      player2.style.backgroundColor = "black";
    }
  }

  // if ball touches player 1
  if (
    // ball is in between player 2 horizontal plane
    currentPositionTop - player1Top + ball.clientHeight >= 0 &&
    currentPositionTop - player1Top <=
      player1.clientHeight + ball.clientHeight &&
    currentPositionLeft - player1.clientWidth <= 0
  ) {
    player1.style.backgroundColor = "green";
    BALL_MOVE_PIXEL_COUNT_L_R *= -1;
  } else {
    if (player1.style.backgroundColor !== "black") {
      player1.style.backgroundColor = "black";
    }
  }

  ball.style.top = currentPositionTop - BALL_MOVE_PIXEL_COUNT_U_D + "px";

  requestAnimationFrame(moveBallUp);
}

// KEEP THIS ONE ONLY: BOUNCE LEFT then RIGHT
function moveBallLeft() {
  let ball = document.getElementById("ball");
  const currentPosition = parseInt(window.getComputedStyle(ball).left);
  if (
    shouldFreezeBall ||
    currentPosition <= 0 ||
    currentPosition + ball.clientHeight >= ball.parentElement.clientWidth
  ) {
    // Reverse the direction when reaching the top or bottom boundary
    freezeGame();
    return;
  }
  ball.style.left = currentPosition - BALL_MOVE_PIXEL_COUNT_L_R + "px";
  requestAnimationFrame(moveBallLeft);
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

// keep this
function moveBallDiagonalLeftUp() {
  requestAnimationFrame(() => {
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
