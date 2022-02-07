/** @format */

import { WORLD_WIDTH, WORLD_HEIGHT, SPEED_SCALE_INCREASE } from "./config.js";
import ground from "./ground.js";
import dino from "./dino.js";
import cactus from "./cactus.js";

const worldElem = document.querySelector("[data-world]");

const scoreElem = document.querySelector("[data-score]");
const startScreenElem = document.querySelector("[data-start-screen]");
let lastTime;
let speedScale;
let score;

window.addEventListener("resize", setPixelToWorldScale);
document.addEventListener("keydown", hanleStart, { once: true });

function setPixelToWorldScale() {
  let worldToPixeScale;
  if (window.innerWidth / window.innerHeight < WORLD_WIDTH / WORLD_HEIGHT)
    worldToPixeScale = window.innerWidth / WORLD_WIDTH;
  else worldToPixeScale = window.innerHeight / WORLD_HEIGHT;

  worldElem.style.width = `${WORLD_WIDTH * worldToPixeScale}px`;
  worldElem.style.height = `${WORLD_HEIGHT * worldToPixeScale}px`;
}

function update(time) {
  if (lastTime === null) {
    lastTime = time;
    window.requestAnimationFrame(update);
    return;
  }
  const delta = time - lastTime;
  ground.updateGround(delta, speedScale);
  dino.updateDino(delta, speedScale);
  cactus.updateCactus(delta, speedScale);
  updateSpeedScale(delta);
  updateScore(delta);
  if (checkLose()) return handleLose();
  lastTime = time;
  window.requestAnimationFrame(update);
}

function updateSpeedScale(delta) {
  speedScale += delta * SPEED_SCALE_INCREASE;
}

function updateScore(delta) {
  score += delta * 0.01;
  scoreElem.textContent = Math.floor(score);
}

function checkLose() {
  const dinoRect = dino.getDinoRect();
  return cactus.getCactusRects().some((rect) => isCollition(rect, dinoRect));
}

function isCollition(rect1, rect2) {
  return (
    rect1.left < rect2.right &&
    rect1.top < rect2.bottom &&
    rect1.right > rect2.left &&
    rect1.bottom > rect2.top
  );
}

function hanleStart() {
  lastTime = null;
  score = 0;
  speedScale = 1;
  cactus.setupCactus();
  startScreenElem.classList.add("hide");
  window.requestAnimationFrame(update);
}

function handleLose() {
  dino.setDinoLose();
  setTimeout(() => {
    document.addEventListener("keydown", hanleStart, { once: true });
    startScreenElem.classList.remove("hide");
  }, 100);
}

setPixelToWorldScale();
