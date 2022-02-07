/** @format */
import {
  incrementCustomProperty,
  getCustomProperty,
  setCustomProperty,
} from "./updateCustomProperty.js";

class CactusView {
  _SPEED = 0.05;
  _CACTUS_INTERVAL_MIN = 500;
  _CACTUS_INTERVAL_MAX = 2000;
  _worldElem = document.querySelector("[data-world]");
  _nextCactusTime;

  setupCactus() {
    this._nextCactusTime = this._CACTUS_INTERVAL_MIN;
    document.querySelectorAll("[data-cactus]").forEach((cactus) => {
      cactus.remove();
    });
  }

  updateCactus(delta, speedScale) {
    document.querySelectorAll("[data-cactus]").forEach((cactus) => {
      incrementCustomProperty(
        cactus,
        "--left",
        delta * speedScale * this._SPEED * -1
      );
      if (getCustomProperty(cactus, "--left") <= -100) {
        cactus.remove();
      }
    });

    if (this._nextCactusTime <= 0) {
      this._createCactus();
      this._nextCactusTime =
        this._randomNumberBetween(
          this._CACTUS_INTERVAL_MIN,
          this._CACTUS_INTERVAL_MAX
        ) / speedScale;
    }

    this._nextCactusTime -= delta;
  }

  _createCactus() {
    const cactus = document.createElement("img");
    cactus.dataset.cactus = true;
    cactus.src = "imgs/cactus.png";
    cactus.classList.add("cactus");
    setCustomProperty(cactus, "--left", 100);
    this._worldElem.append(cactus);
  }

  _randomNumberBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  getCactusRects() {
    const cactuses = [...document.querySelectorAll("[data-cactus]")];
    return cactuses.map((cactus) => cactus.getBoundingClientRect());
  }
}

export default new CactusView();
