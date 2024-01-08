class Ball {
  width;
  height;
  element;

  constructor(width, height, domId) {
    this.width = width;
    this.height = height;
    this.domId = domId;
    this.element = document.getElementById(domId);
  }

  /**
   * Set width of ball
   * @param {string} width in pixels
   */
  setWidth(width) {
    this.width = width;
    this.element.style.width = width;
  }

  /**
   * Height of the ball
   * @param {string} height in pixels/%/other
   */
  setHeight(height) {
    this.height = height;
    this.element.style.height = width;
  }
}
