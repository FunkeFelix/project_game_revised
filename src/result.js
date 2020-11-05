const points = localStorage.getItem("points");
const shots = localStorage.getItem("shots");

let pointsEl = document.querySelector(".points");
let shotsEl = document.querySelector(".shots");

pointsEl.innerText = points;
shotsEl.innerText = shots;

let punshLine = document.querySelector(".punshLine");

function punshLineGen(shots) {
  if (shots > 10) {
    punshLine.innerText = "You might want to call an ambulance!";
  } else if (shots < 5 && shots > 3) {
    punshLine.innerText = "You seem to be thirsty!";
  } else if (shots < 3 && shots >= 1) {
    punshLine.innerText = "You are no Fun!";
  } else {
    punshLine.innerText = "You boring Fuck!";
  }
}
punshLineGen(shots);
