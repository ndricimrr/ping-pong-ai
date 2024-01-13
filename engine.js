var MOVE_PIXEL_COUNT = 95;
var BALL_MOVE_PIXEL_COUNT_L_R = 100;
var BALL_MOVE_PIXEL_COUNT_U_D = BALL_MOVE_PIXEL_COUNT_L_R;
var BALL_MOVE_PIXEL_COUNT = BALL_MOVE_PIXEL_COUNT_L_R;

var shouldFreezeBall = true;
var p1_points = 0;
var p2_points = 0;

var ball = new Ball("player1", "player2");
var player1 = new Player("Jimmy", "player1", "20%", "1%");
var player2 = new Player("John", "player2", "20%", "1%");

var currentLevel = 0;
var levels = [
  {
    ballSpeed: 100,
  },
  {
    ballSpeed: 150,
  },
  {
    ballSpeed: 200,
  },
  {
    ballSpeed: 250,
  },
  {
    ballSpeed: 300,
  },
];

document.addEventListener("DOMContentLoaded", () => {
  console.log(document.getElementById("p1-name"));
  document.getElementById("p1-name").innerHTML = player1.getName();
  document.getElementById("p2-name").innerHTML = player2.getName();
  document.getElementById("ball-speed").innerHTML = BALL_MOVE_PIXEL_COUNT_L_R;
  document.getElementById("player-speed").innerHTML = player1.getSpeed();
});

/**
 * Resets freeze boolean and starts ball movement
 */
function startGame() {
  shouldFreezeBall = false;
  ball.moveBallDiagonalLeftUp();
  console.log("Start Game");
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

  const p1_points_field = document.getElementById("p1-points");
  const p2_points_field = document.getElementById("p2-points");

  if (p1_points > p2_points && p1_points >= 5) {
    alert(player1.getName() + " WON");
    p1_points = 0;
    p2_points = 0;
  } else if (p2_points > p1_points && p2_points >= 5) {
    alert(player2.getName() + " WON!");
    p1_points = 0;
    p2_points = 0;
  } else {
    alert("GAME OVER. Click OK to Restart");
  }
  p1_points_field.innerHTML = p1_points;
  p2_points_field.innerHTML = p2_points;

  ball.getDomElement().style.top = 50 + "%";
  ball.getDomElement().style.left = 50 + "%";

  ball.setSpeed(levels[currentLevel].ballSpeed);

  currentLevel++;

  document.getElementById("ball-speed").innerHTML = ball.getSpeed();

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

function increaseSpeed() {
  if (BALL_MOVE_PIXEL_COUNT_U_D < 400 && BALL_MOVE_PIXEL_COUNT_L_R < 400) {
    BALL_MOVE_PIXEL_COUNT_U_D += 20;
    BALL_MOVE_PIXEL_COUNT_L_R += 20;
    document.getElementById("ball-speed").innerHTML = BALL_MOVE_PIXEL_COUNT_L_R;
  }
}

function decreaseSpeed() {
  if (BALL_MOVE_PIXEL_COUNT_U_D > 40 && BALL_MOVE_PIXEL_COUNT_L_R > 40) {
    BALL_MOVE_PIXEL_COUNT_U_D -= 20;
    BALL_MOVE_PIXEL_COUNT_L_R -= 20;
    document.getElementById("ball-speed").innerHTML = BALL_MOVE_PIXEL_COUNT_L_R;
  }
}

function increasePlayerSpeed() {
  if (player1.getSpeed() < 400 && player2.getSpeed() < 400) {
    player1.setSpeed(player1.getSpeed() + 20);
    player2.setSpeed(player2.getSpeed() + 20);
    document.getElementById("player-speed").innerHTML = player1.getSpeed();
  }
}

function decreasePlayerSpeed() {
  if (player1.getSpeed() > 40 && player2.getSpeed() > 40) {
    player1.setSpeed(player1.getSpeed() - 20);
    player2.setSpeed(player2.getSpeed() - 20);
    document.getElementById("player-speed").innerHTML = player1.getSpeed();
  }
}
