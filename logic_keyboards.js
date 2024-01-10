var MOVE_PIXEL_COUNT = 95;

var BALL_MOVE_PIXEL_COUNT_L_R = 100;
var BALL_MOVE_PIXEL_COUNT_U_D = BALL_MOVE_PIXEL_COUNT_L_R;
var BALL_MOVE_PIXEL_COUNT = BALL_MOVE_PIXEL_COUNT_L_R;
var shouldFreezeBall = true;

var p1_points = 0;
var p2_points = 0;

// /**
//  * Moves player with index up an MOVE_PIXEL_COUNT amount of pixels
//  * @param {number} index player index: 0 for player 1 and index 1 for player 2
//  * @returns
//  */
// function moveUp(index) {
//   let playerBrick = document.getElementsByClassName("brick")[index];
//   const currentPosition = parseInt(window.getComputedStyle(playerBrick).top);

//   if (currentPosition <= 0) {
//     return;
//   }

//   if (currentPosition - MOVE_PIXEL_COUNT <= 0) {
//     playerBrick.style.top = 0 + "px";
//     return;
//   }
//   // - because in the HTML coordinate system + is downwards and - is upwards
//   requestAnimationFrame(() => {
//     playerBrick.style.top = currentPosition - MOVE_PIXEL_COUNT + "px";
//   });
// }

// /**
//  * Moves the player brick element down a number of pixels
//  * @param {number} index 0 for player 1 and index 1 for player 2
//  * @returns void when movement should be cancelled
//  */
// function moveDown(index) {
//   const playerBrick = document.getElementsByClassName("brick")[index];
//   const currentPosition = parseInt(window.getComputedStyle(playerBrick).top);
//   const gameCanvas = playerBrick.parentElement; // Assuming the gameCanvas is the direct parent

//   if (
//     currentPosition + playerBrick.clientHeight + MOVE_PIXEL_COUNT >
//     gameCanvas.clientHeight
//   ) {
//     playerBrick.style.top =
//       gameCanvas.clientHeight - playerBrick.clientHeight + "px";
//     return;
//   }
//   // + because in the HTML coordinate system + is downwards and - is upwards
//   requestAnimationFrame(() => {
//     playerBrick.style.top = currentPosition + MOVE_PIXEL_COUNT + "px";
//   });
// }

// window.addEventListener("keydown", function (event) {
//   switch (event.key) {
//     case "w":
//       moveUp(0);
//       break;
//     case "s":
//       moveDown(0);
//       break;
//     case "g":
//       startGame();
//       break;
//     case "ArrowDown":
//       moveDown(1);
//       break;
//     case "ArrowUp":
//       moveUp(1);
//       break;
//     default:
//       break;
//   }
// });

// /**
//  * Calls itself in a recursive way by using requestAnimationFrame for smooth element movement
//  *
//  * @returns void if ball should freeze
//  */
// function moveBallUp() {
//   if (shouldFreezeBall) {
//     return;
//   }
//   const ball = document.getElementById("ball");
//   const currentPositionTop = parseInt(window.getComputedStyle(ball).top);
//   const currentPositionLeft = parseInt(window.getComputedStyle(ball).left);

//   // Reverse the direction when reaching the top or bottom boundary
//   if (
//     currentPositionTop <= 0 ||
//     currentPositionTop >= ball.parentElement.clientHeight - ball.clientHeight
//   ) {
//     BALL_MOVE_PIXEL_COUNT_U_D *= -1;
//   }

//   const player2 = document.getElementById("player2");
//   const player2Top = parseInt(window.getComputedStyle(player2).top);
//   const player2Left = parseInt(window.getComputedStyle(player2).left);

//   // if ball touches player 2
//   if (
//     // ball is in between player 2 horizontal plane
//     currentPositionTop - player2Top + ball.clientHeight >= 0 &&
//     currentPositionTop - player2Top <=
//       player2.clientHeight + ball.clientHeight &&
//     currentPositionLeft + ball.clientWidth - player2Left >= 0
//   ) {
//     player2.style.backgroundColor = "blue";
//     BALL_MOVE_PIXEL_COUNT_L_R *= -1;
//   } else {
//     if (player2.style.backgroundColor !== "black") {
//       player2.style.backgroundColor = "black";
//     }
//   }

//   const player1 = document.getElementById("player1");
//   const player1Top = parseInt(window.getComputedStyle(player1).top);
//   // if ball touches player 1
//   if (
//     // ball is in between player 1 horizontal plane
//     currentPositionTop - player1Top + ball.clientHeight >= 0 &&
//     currentPositionTop - player1Top <=
//       player1.clientHeight + ball.clientHeight &&
//     currentPositionLeft - player1.clientWidth <= 0
//   ) {
//     player1.style.backgroundColor = "green";
//     BALL_MOVE_PIXEL_COUNT_L_R *= -1;
//   } else {
//     if (player1.style.backgroundColor !== "black") {
//       player1.style.backgroundColor = "black";
//     }
//   }

//   ball.style.top = currentPositionTop - BALL_MOVE_PIXEL_COUNT_U_D + "px";

//   requestAnimationFrame(moveBallUp);
// }

// /**
//  * Recursively calls itself by using requestAnimationFrame to smoothly move the ball to the left
//  * @returns void when function needs to drop out of recursion
//  */
// function moveBallLeft() {
//   let ball = document.getElementById("ball");
//   const currentPosition = parseInt(window.getComputedStyle(ball).left);
//   // Freeze the game when reaching the left or right boundary
//   if (currentPosition <= 0) {
//     p2_points++;
//     endGame();
//     return;
//   }

//   if (currentPosition + ball.clientHeight >= ball.parentElement.clientWidth) {
//     p1_points++;
//     endGame();
//     return;
//   }
//   ball.style.left = currentPosition - BALL_MOVE_PIXEL_COUNT_L_R + "px";
//   requestAnimationFrame(moveBallLeft);
// }

// /**
//  * Calls up and left move functions to move the ball in the up-left direction.
//  * Uses requestAnimationFrame for smoother movement.
//  *
//  */
// function moveBallDiagonalLeftUp() {
//   requestAnimationFrame(() => {
//     moveBallUp();
//     moveBallLeft();
//   });
// }

// /**
//  * Resets freeze boolean and starts ball movement
//  */
// function startGame() {
//   shouldFreezeBall = false;
//   moveBallDiagonalLeftUp();
// }

// // Makes the function accessible for debugging on console
// window["stopGame"] = () => {
//   endGame();
// };

// /**
//  * Function to stop game and restart ball at center position
//  */
// function endGame() {
//   shouldFreezeBall = true;

//   const ball = document.getElementById("ball");
//   ball.style.top = 50 + "%";
//   ball.style.left = 50 + "%";
//   const p1_points_field = document.getElementById("p1-points");
//   const p2_points_field = document.getElementById("p2-points");

//   if (p1_points > p2_points && p1_points >= 5) {
//     alert("P1 WON");
//     p1_points = 0;
//     p2_points = 0;
//   } else if (p2_points > p1_points && p2_points >= 5) {
//     alert("P2 WON!");
//     p1_points = 0;
//     p2_points = 0;
//   } else {
//     alert("GAME OVER. Click OK to Restart");
//   }
//   p1_points_field.innerHTML = p1_points;
//   p2_points_field.innerHTML = p2_points;
//   return;
// }
