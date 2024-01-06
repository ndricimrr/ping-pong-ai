var MOVE_PIXEL_COUNT = 50;


var BALL_MOVE_PIXEL_COUNT_L_R = 80;
var BALL_MOVE_PIXEL_COUNT_U_D = BALL_MOVE_PIXEL_COUNT_L_R;

var BALL_MOVE_PIXEL_COUNT = BALL_MOVE_PIXEL_COUNT_L_R;

var shouldFreezeBall = true;

var isAnimating1 = false;
var isAnimating2 = false;

/**
 * Moves player with index up an MOVE_PIXEL_COUNT amount of pixels
 * @param {*} index player index
 * @returns 
 */
function moveUp(index) {
  let playerBrick = document.getElementsByClassName("brick")[index];
  const currentPosition = parseInt(window.getComputedStyle(playerBrick).top);

  // console.log("direction:", direction);
  console.log("currentPosition:", currentPosition);
  console.log("---");

  // Player 2 Boundary check
 
    if (
      currentPosition <= 0
    ) {
      return;
    }

    if (
      currentPosition - MOVE_PIXEL_COUNT <= 0
    ) {
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
    if (currentPosition + playerBrick.clientHeight + MOVE_PIXEL_COUNT > gameCanvas.clientHeight ) {
      playerBrick.style.top = gameCanvas.clientHeight - playerBrick.clientHeight + "px";
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

window.addEventListener("keyupsadsad", function (event) {
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
    case "w":
      let brick01 = document.getElementsByClassName("brick")[0];
      console.log(brick01, "down");
      let brickParent01 = brick01.parentElement;
      const parentHeight01 = brickParent01.clientHeight;
      const childHeight01 = brick01.clientHeight;

      const cp01 = parseInt(window.getComputedStyle(brick01).top);
      if (boundariesExceeded(cp01, "upPlayer1", brick01)) {
        requestAnimationFrame(() => {
          brick01.style.top = childHeight01 / 2 + "px";

        });
      }
      break;

    case "s":
      let brick02 = document.getElementsByClassName("brick")[0];
      console.log(brick02, "up");

      let brickParent02 = brick02.parentElement;
      const parentHeight02 = brickParent02.clientHeight;
      const childHeight02 = brick02.clientHeight;

      const cp02 = parseInt(window.getComputedStyle(brick02).top);
      if (boundariesExceeded(cp02, "downPlayer1", brick02)) {
        requestAnimationFrame(() => {
          brick02.style.top = `${parentHeight02 - childHeight02 / 2}px`;
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

var PAUSE = false;

  window['stopGame'] = ()=>{
    freezeGame();
  }


  function freezeGame(){
    // PAUSE = TRUE;
    shouldFreezeBall = true;
    const ball = document.getElementById("ball");
    ball.style.top = 50 + "%px"
    ball.style.left = 50 + "%px"
    alert("GAME OVER");
    return;

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

  let player1 = document.getElementById("player1");
  const player1Top = parseInt(window.getComputedStyle(player1).top);
  const player1Left = parseInt(window.getComputedStyle(player1).left);


  // if ball touches player 2
  if (
    // ball is in between player 2 horizontal plane
    ((currentPositionTop - player2Top + ball.clientHeight) >= 0 ) &&
    ((currentPositionTop - player2Top) <= player2.clientHeight + ball.clientHeight) &&
    ( (currentPositionLeft + ball.clientWidth - player2Left ) >= 0)
  ) {
    player2.style.backgroundColor = "blue";
    BALL_MOVE_PIXEL_COUNT_L_R *= -1;
  }
  else {
    if (player2.style.backgroundColor !== "black") {
      player2.style.backgroundColor = "black";
    }
  }



  // if ball touches player 1
  if (
    // ball is in between player 2 horizontal plane
    ((currentPositionTop ) - player1Top >= 0) &&
    ((currentPositionTop - player1Top) <= player1.clientHeight) &&
    ( (currentPositionLeft - player1.clientWidth) <= 0)
  ) {
    player1.style.backgroundColor = "green";
    BALL_MOVE_PIXEL_COUNT_L_R *= -1;
  }
  else {
    if (player1.style.backgroundColor !== "black") {
      player1.style.backgroundColor = "black";
    }
  }


  ball.style.top = currentPositionTop - BALL_MOVE_PIXEL_COUNT_U_D + "px";

  requestAnimationFrame(moveBallUp);
}

// KEEP THIS ONE ONLY: BOUNCE LEFT then RIGHT
function moveBallLeft() {
  if (shouldFreezeBall) {
    return;
  }
  let ball = document.getElementById("ball");
  const currentPosition = parseInt(window.getComputedStyle(ball).left);
  if (currentPosition <= 0) {
    // Reverse the direction when reaching the top or bottom boundary
    freezeGame();

    // BALL_MOVE_PIXEL_COUNT_L_R *= -1;
  }

  if (currentPosition + ball.clientHeight >= ball.parentElement.clientWidth) {
    freezeGame();
    // Reverse the direction when reaching the top or bottom boundary
    // BALL_MOVE_PIXEL_COUNT_L_R *= -1;
  }

  const currentPositionTop = parseInt(window.getComputedStyle(ball).top);


  let player2 = document.getElementById("player2");
  const player2Top = parseInt(window.getComputedStyle(player2).top);
  const player2Left = parseInt(window.getComputedStyle(player2).left);

  let player1 = document.getElementById("player1");
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
