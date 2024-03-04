let pace = 1000;
let game_order = [];
let user_input = [];
let levels = 1;
let times = 0;
let count = 0;
let highscore = document.getElementById("high-score");

let StartScore = 0;
let play = document.getElementById("play");

let red = document.querySelector('[data-tile="red"]');
let blue = document.querySelector('[data-tile="blue"]');
let green = document.querySelector('[data-tile="green"]');
let yellow = document.querySelector('[data-tile="yellow"]');

let colors = [red, blue, green, yellow];

play.onclick = function () {
  startgame();
};
red.onclick = function () {
  button_input(this);
};
blue.onclick = function () {
  button_input(this);
};
green.onclick = function () {
  button_input(this);
};
yellow.onclick = function () {
  button_input(this);
};


window.onload = function () {
  if (sessionStorage.getItem("highscore") == null) {
    count = 0;
    return;
  }
  document.getElementById("high-score").textContent =
    sessionStorage.getItem("highscore");
};
function startgame() {
  red.parentNode.classList.remove("unclickable");
  play.classList.add("inactive");
  continue_game();
}
function continue_game() {
  times = 0;
  for (let i = 0; i < levels; i++) {
    let random = Math.floor(Math.random() * 3);
    game_order.push(colors[random]);
  }
  displayColor();
}

function displayColor() {
  let t = setInterval(
    function () {
      game_order[times].classList.remove("inactive")
      setTimeout(() => {
        game_order[times].classList.add("inactive");
        times++;
        if (times == levels) {
            clearInterval(t);
          }
      }, pace);
      
    },
    pace * 1.5,
  );
}

function button_input(choice) {
  user_input.push(choice);
  count += 1;
  if (count == levels) {
    input_check(user_input);
  }
}
function input_check() {
  let lose = false;
  for (let i = 0; i < levels; i++) {
    if (user_input[i] != game_order[i]) {
      lose = true;
      break;
    }
  }
  if (!lose) {
    user_input = [];
    count = 0;
    levels++;
    StartScore++;
    document.getElementById("level").textContent = StartScore;
    if (StartScore == 12) {
      stop();
    }
    if (parseInt(highscore.textContent) < StartScore) {
      highscore.textContent = StartScore;
    }
    continue_game();
  } else {
    stop();
  }
}
function stop() {
  user_input = [];
  game_order = [];
  count = 0;
  levels = 1;
  times = 0;
  StartScore = 0;
  play.classList.remove("inactive");
  document.getElementById("level").textContent = StartScore;
  red.parentNode.classList.add("unclickable");
  sessionStorage.setItem("highscore", highscore.textContent);
}

