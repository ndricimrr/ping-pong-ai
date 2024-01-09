/**
 * A class that represents a
 */

class DOMObject {
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
}
