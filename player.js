class Player extends DOMObject {
  points = 0;
  speedPixels = 100;
  element;

  constructor(name, domId, height, width) {
    super(domId, height, width);
    this.name = name;
    this.domId = domId;
    this.height = height;
    this.width = width;
    this.element = document.getElementById(domId);
  }

  /**
   * Display info
   *
   */
  displayPlayerInfo() {
    console.log("Player Data:\n" + "Name: " + this.name);
  }

  /**
   * @returns name of player
   */
  getName() {
    console.log("name", this.name);
    return this.name;
  }

  /**
   * Change player's name
   * @param {string} name name to change to
   */
  setName(name) {
    this.name = name;
  }

  /**
   * Moves player with index up an MOVE_PIXEL_COUNT amount of pixels
   * @param {number} index player index: 0 for player 1 and index 1 for player 2
   * @returns
   */
  moveUp(index) {
    let playerBrick = document.getElementsByClassName("brick")[index];
    const currentPosition = parseInt(window.getComputedStyle(playerBrick).top);

    if (currentPosition <= 0) {
      return;
    }

    if (currentPosition - MOVE_PIXEL_COUNT <= 0) {
      playerBrick.style.top = 0 + "px";
      return;
    }
    // - because in the HTML coordinate system + is downwards and - is upwards
    requestAnimationFrame(() => {
      playerBrick.style.top = currentPosition - MOVE_PIXEL_COUNT + "px";
    });
  }

  /**
   * Moves the player brick element down a number of pixels
   * @param {number} index 0 for player 1 and index 1 for player 2
   * @returns void when movement should be cancelled
   */
  moveDown(index) {
    const playerBrick = document.getElementsByClassName("brick")[index];
    const currentPosition = parseInt(window.getComputedStyle(playerBrick).top);
    const gameCanvas = playerBrick.parentElement; // Assuming the gameCanvas is the direct parent

    if (
      currentPosition + playerBrick.clientHeight + MOVE_PIXEL_COUNT >
      gameCanvas.clientHeight
    ) {
      playerBrick.style.top =
        gameCanvas.clientHeight - playerBrick.clientHeight + "px";
      return;
    }
    // + because in the HTML coordinate system + is downwards and - is upwards
    requestAnimationFrame(() => {
      playerBrick.style.top = currentPosition + MOVE_PIXEL_COUNT + "px";
    });
  }
}
