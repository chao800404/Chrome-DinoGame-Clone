/** @format */

import {
  getCustomProperty,
  setCustomProperty,
  incrementCustomProperty,
} from "./updateCustomProperty.js";
import { SPEED } from "./config.js";

class GroundView {
  constructor() {
    this.setupGround();
  }
  _groundElems = document.querySelectorAll("[data-ground]");

  setupGround() {
    setCustomProperty(this._groundElems[0], "--left", 0);
    this._groundElems[1].style = "left:300%";
  }

  updateGround(delta, speedScale) {
    this._groundElems.forEach((ground) => {
      incrementCustomProperty(
        ground,
        "--left",
        delta * speedScale * SPEED * -1
      );
      if (getCustomProperty(ground, "--left") <= -100)
        incrementCustomProperty(ground, "--left", 100);
    });
  }
}

export default new GroundView();
