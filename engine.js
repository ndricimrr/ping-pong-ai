var MOVE_PIXEL_COUNT = 95;
var BALL_MOVE_PIXEL_COUNT_L_R = 100;
var BALL_MOVE_PIXEL_COUNT_U_D = BALL_MOVE_PIXEL_COUNT_L_R;
var BALL_MOVE_PIXEL_COUNT = BALL_MOVE_PIXEL_COUNT_L_R;
var shouldFreezeBall = true;
var p1_points = 0;
var p2_points = 0;

let ball = new Ball("ball", 50, 50);
let player1 = new Player("player1", "20%", "1%");
let player2 = new Player("player2", "20%", "1%");

/**
 * Resets freeze boolean and starts ball movement
 */
function startGame() {
  shouldFreezeBall = false;
  ball.moveBallDiagonalLeftUp();
}

// Makes the function accessible for debugging on console
window["stopGame"] = () => {
  endGame();
};

/**
 * Function to stop game and restart ball at center position
 */
function endGame() {
  shouldFreezeBall = true;

  const ball = document.getElementById("ball");
  ball.style.top = 50 + "%";
  ball.style.left = 50 + "%";
  const p1_points_field = document.getElementById("p1-points");
  const p2_points_field = document.getElementById("p2-points");

  if (p1_points > p2_points && p1_points >= 5) {
    alert("P1 WON");
    p1_points = 0;
    p2_points = 0;
  } else if (p2_points > p1_points && p2_points >= 5) {
    alert("P2 WON!");
    p1_points = 0;
    p2_points = 0;
  } else {
    alert("GAME OVER. Click OK to Restart");
  }
  p1_points_field.innerHTML = p1_points;
  p2_points_field.innerHTML = p2_points;
  return;
}

/**
 * Add listeners to start game
 */
window.addEventListener("keydown", function (event) {
  switch (event.key) {
    case "w":
      player1.moveUp(0);
      break;
    case "s":
      player1.moveDown(0);
      break;
    case "g":
      startGame();
      break;
    case "ArrowDown":
      player2.moveDown(1);
      break;
    case "ArrowUp":
      player2.moveUp(1);
      break;
    default:
      break;
  }
});
