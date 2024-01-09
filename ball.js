class Ball extends DOMObject {

  /**
 * Calls itself in a recursive way by using requestAnimationFrame for smooth element movement
 *
 * @returns void if ball should freeze
 */
 moveBallUp() {
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

  const player1 = document.getElementById("player1");
  const player1Top = parseInt(window.getComputedStyle(player1).top);
  // if ball touches player 1
  if (
    // ball is in between player 1 horizontal plane
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

/**
 * Recursively calls itself by using requestAnimationFrame to smoothly move the ball to the left
 * @returns void when function needs to drop out of recursion
 */
 moveBallLeft() {
  let ball = document.getElementById("ball");
  const currentPosition = parseInt(window.getComputedStyle(ball).left);
  // Freeze the game when reaching the left or right boundary
  if (currentPosition <= 0) {
    p2_points++;
    endGame();
    return;
  }

  if (currentPosition + ball.clientHeight >= ball.parentElement.clientWidth) {
    p1_points++;
    endGame();
    return;
  }
  ball.style.left = currentPosition - BALL_MOVE_PIXEL_COUNT_L_R + "px";
  requestAnimationFrame(moveBallLeft);
}

/**
 * Calls up and left move functions to move the ball in the up-left direction.
 * Uses requestAnimationFrame for smoother movement.
 *
 */
function moveBallDiagonalLeftUp() {
  requestAnimationFrame(() => {
    moveBallUp();
    moveBallLeft();
  });
}
}
