/** @format */

import {
  JUMP_SPEED,
  GRAVITY,
  DINO_FRAME_COUNT,
  FRAME_TIME,
} from "./dinoConfig.js";
import {
  incrementCustomProperty,
  getCustomProperty,
  setCustomProperty,
} from "./updateCustomProperty.js";

class DinoView {
  _dinoElem = document.querySelector("[data-dino]");
  _isJumping;
  _dinoFrame;
  _currentFrameTime;
  _yVelocity;
  constructor() {
    this.setupDino();
  }
  setupDino() {
    this._isJumping = false;
    this._dinoFrame = 0;
    this._currentFrameTime = 0;
    this._yVelocity = 0;
    setCustomProperty(this._dinoElem, "--bottom", 0);
    document.removeEventListener("keydown", this.onJump.bind(this));
    document.addEventListener("keydown", this.onJump.bind(this));
  }

  updateDino(delta, speedScale) {
    this.handleJump(delta);
    this.handleRun(delta, speedScale);
  }

  handleRun(delta, speedScale) {
    if (this._isJumping) {
      this._dinoElem.src = `imgs/dino-stationary.png`;
      return;
    }
    if (this._currentFrameTime >= FRAME_TIME) {
      this._dinoFrame = (this._dinoFrame + 1) % DINO_FRAME_COUNT;
      this._dinoElem.src = `imgs/dino-run-${this._dinoFrame}.png`;
      this._currentFrameTime -= FRAME_TIME;
    }

    this._currentFrameTime += delta * speedScale;
  }

  handleJump(delta) {
    if (!this._isJumping) return;
    incrementCustomProperty(
      this._dinoElem,
      "--bottom",
      this._yVelocity * delta
    );

    if (getCustomProperty(this._dinoElem, "--bottom") <= 0) {
      setCustomProperty(this._dinoElem, "--bottom", 0);
      this._isJumping = false;
    }
    this._yVelocity -= GRAVITY * delta;
  }

  onJump(e) {
    if (e.code !== "Space" || this._isJumping) return;
    this._yVelocity = JUMP_SPEED;
    this._isJumping = true;
  }

  getDinoRect() {
    return this._dinoElem.getBoundingClientRect();
  }

  setDinoLose() {
    this._dinoElem.src = "imgs/dino-lose.png";
  }
}

export default new DinoView();
