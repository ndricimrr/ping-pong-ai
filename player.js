class Player extends DOMObject {
  points = 0;
  element;

  constructor(name, domId, height, width) {
    super(domId, height, width);
    this.name = name;
    this.domId = domId;
    this.height = height;
    this.width = width;
    this.element = document.getElementById(domId);
    this.speed = 140;
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
   * Moves player with index up an this.getSpeed() amount of pixels
   * @param {number} index player index: 0 for player 1 and index 1 for player 2
   * @returns
   */
  moveUp(index) {
    let playerBrick = document.getElementsByClassName("brick")[index];
    const currentPosition = parseInt(window.getComputedStyle(playerBrick).top);

    if (currentPosition <= 0) {
      return;
    }

    if (currentPosition - this.getSpeed() <= 0) {
      playerBrick.style.top = 0 + "px";
      return;
    }
    // - because in the HTML coordinate system + is downwards and - is upwards
    requestAnimationFrame(() => {
      playerBrick.style.top = currentPosition - this.getSpeed() + "px";
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
      currentPosition + playerBrick.clientHeight + this.getSpeed() >
      gameCanvas.clientHeight
    ) {
      playerBrick.style.top =
        gameCanvas.clientHeight - playerBrick.clientHeight + "px";
      return;
    }
    // + because in the HTML coordinate system + is downwards and - is upwards
    requestAnimationFrame(() => {
      playerBrick.style.top = currentPosition + this.getSpeed() + "px";
    });
  }
}
