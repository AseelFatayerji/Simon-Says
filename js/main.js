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
  continue_game();
}
function continue_game() {
  for (let i = 0; i < levels; i++) {
    let random = Math.floor(Math.random() * 4);
    game_order.push(colors[random]);
    setTimeout(
      () => {
        game_order[i].classList.remove("inactive");
        console.log(game_order[i]);
        setTimeout(
          (i) => {
            game_order[i].classList.add("inactive");
            return;
          },
          pace / 2,
          i
        );
      },
      pace,
      i
    );
  }
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
      let win = document.createElement("div");
      win.style.position = "fixed";
      win.style.top = "400px";
      win.style.fontFamily = "Poppins";
      win.style.backgroundColor = " #6f7cf5";
      win.style.border = "10px solid white";
      win.style.borderRadius = "10px";
      win.style.marginLeft = "420px";
      win.style.padding = "10px";
      win.id = "winner";
      win.innerHTML = '<h1> YOU WIN!!!! </h1>';
      document.body.appendChild(win);
      setTimeout(() => {
       document.getElementById("winner").remove(); 
       stop();        
      }, 5000);
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
  count = 0;
  levels = 1;
  StartScore = 0;
  document.getElementById("level").textContent = StartScore;
  red.parentNode.classList.add("unclickable");
  sessionStorage.setItem("highscore", highscore.textContent);
}

let pace = 1000;
let game_order = [];
let user_input = [];
let levels = 1;
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
