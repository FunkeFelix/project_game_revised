document.getElementById("timer").innerHTML = 00 + ":" + 30;
startTimer();

function startTimer() {
  let presentTime = document.getElementById("timer").innerHTML;
  let timeArray = presentTime.split(/[:]+/);
  let m = timeArray[0];
  let s = checkSecond(timeArray[1] - 1);
  if (s == 59) {
    m = m - 1;
  }
  if (m < 0) {
    moveResult();
  }

  document.getElementById("timer").innerHTML = m + ":" + s;
  setTimeout(startTimer, 1000);
}

function checkSecond(sec) {
  if (sec < 10 && sec >= 0) {
    sec = "0" + sec;
  }
  if (sec < 0) {
    sec = "59";
  }
  return sec;
}
function playSound() {
  let sounds = new Audio();
  sounds.src = "../Sounds/10 Guage Shotgun-SoundBible.com-74120584.wav";
  sounds.play();
}

window.addEventListener("click", function () {
  playSound();
});

let points = 0;
let shots = 0;
let iterations = 0;

let speedMode = "normal"; // easy|normal|fast|insane
let jaegerMode = "driver";

const btnDriver = document.querySelector(
  "#aside > div.btn-jaeger > button:nth-child(2)"
);
const btnBartender = document.querySelector(
  "#aside > div.btn-jaeger > button:nth-child(3)"
);
const btnAlcoholic = document.querySelector(
  "#aside > div.btn-jaeger > button:nth-child(4)"
);

const btnEasy = document.querySelector(
  "#aside > div.btn-diff > button:nth-child(2)"
);
const btnMedium = document.querySelector(
  "#aside > div.btn-diff > button:nth-child(3)"
);
const btnHard = document.querySelector(
  "#aside > div.btn-diff > button:nth-child(4)"
);

const allBtnsDiff = [btnEasy, btnMedium, btnHard];
const allBtnsJaeg = [btnDriver, btnBartender, btnAlcoholic];

btnEasy.addEventListener("click", function () {
  speedMode = "easy";
  allBtnsDiff.forEach((btn) => btn.classList.remove("active"));
  btnEasy.classList.add("active");
  console.log("easyworks", speedMode);
});

btnMedium.addEventListener("click", function () {
  speedMode = "medium";
  allBtnsDiff.forEach((btn) => btn.classList.remove("active"));
  btnMedium.classList.add("active");
  console.log("mediumworks", speedMode);
});

btnHard.addEventListener("click", function () {
  speedMode = "insane";
  allBtnsDiff.forEach((btn) => btn.classList.remove("active"));
  btnHard.classList.add("active");
});

btnDriver.addEventListener("click", function () {
  jaegerMode = "driver";
  allBtnsJaeg.forEach((btn) => btn.classList.remove("active"));
  btnDriver.classList.add("active");
});

btnBartender.addEventListener("click", function () {
  jaegerMode = "bartender";
  allBtnsJaeg.forEach((btn) => btn.classList.remove("active"));
  btnBartender.classList.add("active");
});

btnAlcoholic.addEventListener("click", function () {
  jaegerMode = "alcoholic";
  allBtnsJaeg.forEach((btn) => btn.classList.remove("active"));
  btnAlcoholic.classList.add("active");
});

const gameField = document.querySelector("#gameField");

function addElement() {
  const newElement = document.createElement("div");
  newElement.classList.add("target");
  iterations += 1;
  const isJaeger = Math.random() > getJaeger();

  if (isJaeger) {
    newElement.classList.add("jaegermeister");
  } else {
    newElement.classList.add("moorhuhn");
  }

  const topCords = randomNumber(650);
  const leftCords = randomNumber(1000);
  newElement.style.top = `${topCords}px`;
  newElement.style.left = `${leftCords}px`;

  gameField.appendChild(newElement);
  handleCleanup(newElement);

  setTimeout(addElement, getConfig().speed);
}

function getConfig() {
  let speed;
  let timeLeft;

  if (speedMode === "easy") {
    speed = Math.max(3000 - iterations * 30, 1900);
    timeLeft = 1500;
  } else if (speedMode === "normal") {
    speed = Math.max(1900 - iterations * 30, 1200);
    timeLeft = 1000;
  } else if (speedMode === "medium") {
    speed = Math.max(1500 - iterations * 30, 1000);
    timeLeft = 1000;
  } else if (speedMode === "insane") {
    speed = Math.max(1200 - iterations * 30, 650);
    timeLeft = 800;
  }

  return { speed: speed, timeLeft: timeLeft };
}

function getJaeger() {
  if (jaegerMode === "driver") return 0.8;
  else if (jaegerMode === "bartender") return 0.5;
  else if (jaegerMode === "alcoholic") return 0.2;
}

function randomNumber(x) {
  return Math.floor(Math.random() * (x - 10) + 10);
}

function handleCleanup(element) {
  let removed = false;
  element.addEventListener("click", function () {
    if (element.classList.contains("moorhuhn")) {
      points += 10;
    }

    gameField.removeChild(element);
    removed = true;
  });

  setInterval(function () {
    document.querySelector(
      "body > div.heading > section.points > span"
    ).innerText = points;
    document.querySelector("#shots > span").innerText = shots;
  }, 100);

  setTimeout(function () {
    if (!removed && element.classList.contains("moorhuhn")) {
      gameField.removeChild(element);
    } else if (!removed && element.classList.contains("jaegermeister")) {
      gameField.removeChild(element);
      shots += 1;
    }
  }, getConfig().timeLeft);
}

function moveResult() {
  localStorage.setItem("shots", shots);
  localStorage.setItem("points", points);
  window.location = "/result.html";
}

addElement();
