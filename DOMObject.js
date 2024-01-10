/**
 * A class that represents a
 */

class DOMObject {
  speedPixels = 100;
  element;
  constructor(domId, height, width) {
    this.domId = domId;
    this.height = height;
    this.width = width;

    document.addEventListener("DOMContentLoaded", () => {
      this.element = document.getElementById(domId);
      console.log(document.getElementById(domId), document, domId);
    });
  }

  /**
   * Set width of player brick
   * @param {string} width in pixels
   */
  setWidth(width) {
    this.width = width;
    this.element.style.width = width;
  }

  /**
   * Height of the player brick
   * @param {string} height in pixels/%/other
   */
  setHeight(height) {
    this.height = height;
    this.element.style.height = width;
  }

  /**
   * Retrieves the current element created
   * @returns dom element
   */
  getDomElement() {
    return this.element;
  }

  /**
   * Set the speed in which the players brick moves up/down
   * @param {number} speed in pixels per brick movement
   */
  setSpeed(speed) {
    this.speed = speed;
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
