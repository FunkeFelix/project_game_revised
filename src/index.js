function playSound() {
  let sounds = new Audio();
  sounds.src =
    "../Sounds/audiohub_2019-00176-1802_big-adventures_testversion.mp3";
  sounds.play();
}
// playSound();

let startButton = document.querySelector("body > section > a > button");
startButton.addEventListener("click", function () {
  playSound();
});

var i = 0;
function move() {
  if (i == 0) {
    i = 1;
    var elem = document.getElementById("myBar");
    var width = 10;
    var id = setInterval(frame, 10);
    function frame() {
      if (width >= 100) {
        clearInterval(id);
        i = 0;
      } else {
        width++;
        elem.style.width = width + "%";
        elem.innerHTML = width + "%";
      }
    }
  }
}
move();
