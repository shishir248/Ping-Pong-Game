var bats = document.querySelectorAll(".bat");
window.addEventListener("keydown", function (event) {
  var body = document.getElementById("body");

  for (let i = 0; i < bats.length; i++) {
    let playerid = bats[i].getAttribute("id");
    let player = document.getElementById(playerid);
    let left = player.getBoundingClientRect().left;
    let right = player.getBoundingClientRect().right;
    if (event.key === "a" && left > 11) {
      player.style.left = left - 30 + "px";
    } else if (
      event.key === "d" &&
      right < body.getBoundingClientRect().width - 10
    ) {
      player.style.left = left + 30 + "px";
    }
  }
});

class Ball {
  constructor(speed, x, y, angle) {
    this.speed = speed;
    this.x = x;
    this.y = y;
    this.angle = angle;
  }
}

var realball = document.getElementById("ballid");
var ball = new Ball(
  0.1,
  realball.getBoundingClientRect().left,
  realball.getBoundingClientRect().top,
  45
);

var score = 0;
var player1 = document.getElementById("player1");
var player2 = document.getElementById("player2");

var showAlert = function () {
  alert("Game Over!" + " Your Score is: " + score);
  (function () {
    player1.style.left = 42.5 + "%";
    player2.style.left = 42.5 + "%";
    realball.style.top = 45 + "%";
    realball.style.left = 48 + "%";
    ball.y = realball.getBoundingClientRect().top;
    ball.x = realball.getBoundingClientRect().left;
    moveDown(false);
  })();
};

var moveUp = function () {
  var hitWallR = false;
  var hitWallL = false;
  var batX = bats[0].getBoundingClientRect().x;
  var upInterval = setInterval(function () {
    // hitWall = false;
    var batWidth = bats[0].getBoundingClientRect().width;
    realball.style.top = ball.y - 1 + "px";
    ball.y = realball.getBoundingClientRect().top;
    let batCoordinate = batX + batWidth / 2;
    if (ball.x >= window.innerWidth - 20) {
      hitWallR = true;
    }
    if (ball.x <= 1) {
      hitWallL = true;
    } else if (ball.x < batCoordinate && !hitWallL) {
      realball.style.left = ball.x - 0.5 + "px";
    } else if (ball.x > batCoordinate && !hitWallR) {
      realball.style.left = ball.x + 0.5 + "px";
    }
    if (hitWallR) {
      realball.style.left = ball.x - 0.5 + "px";
    }
    if (hitWallL) {
      realball.style.left = ball.x + 0.5 + "px";
    }
    ball.x = realball.getBoundingClientRect().left;

    if (
      bats[0].getBoundingClientRect().y > ball.y - 20 &&
      ball.x >= bats[0].getBoundingClientRect().x &&
      ball.x <=
        bats[0].getBoundingClientRect().x +
          bats[0].getBoundingClientRect().width
    ) {
      score++;
      moveDown(true);
      clearInterval(upInterval);
    }
    if (ball.y <= 0) {
      showAlert();
      clearInterval(upInterval);
      return;
    }
  }, ball.speed);
};

var moveDown = function (cond) {
  var hitWallL = false;
  var hitWallR = false;
  var batX = bats[0].getBoundingClientRect().x;
  let downInterval = setInterval(function () {
    realball.style.top = ball.y + 1 + "px";
    var batWidth = bats[0].getBoundingClientRect().width;
    if (cond) {
      let batCoordinate = batX + batWidth / 2;
      if (ball.x >= window.innerWidth - 20) {
        hitWallR = true;
      }
      if (ball.x <= 1) {
        hitWallL = true;
      }
      if (ball.x < batCoordinate && !hitWallL) {
        realball.style.left = ball.x - 0.5 + "px";
      } else if (ball.x > batCoordinate && !hitWallR) {
        realball.style.left = ball.x + 0.5 + "px";
      }
      if (hitWallR) {
        realball.style.left = ball.x - 0.5 + "px";
      }
      if (hitWallL) {
        realball.style.left = ball.x + 0.5 + "px";
      }
      ball.x = realball.getBoundingClientRect().left;
    }
    ball.y = realball.getBoundingClientRect().top;
    if (
      bats[1].getBoundingClientRect().y < ball.y + 20 &&
      ball.x >= bats[0].getBoundingClientRect().x &&
      ball.x <=
        bats[0].getBoundingClientRect().x +
          bats[0].getBoundingClientRect().width
    ) {
      score++;
      moveUp();
      clearInterval(downInterval);
    }
    if (ball.y >= window.innerHeight) {
      showAlert();
      clearInterval(downInterval);
      return;
    }
  }, ball.speed);
};

moveDown(false);

console.log(window.screen);
