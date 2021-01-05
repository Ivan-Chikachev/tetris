window.onload = onGame();
function onGame () {
  let tetris = [];
  let tetrisField = document.querySelector("#tetris-field");
  let scoreField = document.querySelector(".youscore");
  let timer;
  let score = 0;
  let flag; // проверка когда запускать след блок

  // заполняем массив
  function init() {
    let x = 9;
    let y = 15;
    for (let i = 0; i < y; i++) {
      tetris[i] = [];
      for (let k = 0; k < x; k++) {
        tetris[i][k] = 0;
      }
    }
  }

  // игровое поле
  function draw() {
    let out = "";
    for (let i = 0; i < tetris.length; i++) {
      for (let k = 0; k < tetris[i].length; k++) {
        if (tetris[i][k] == 0) {
          out += '<div class="white"></div>';
        } else if (tetris[i][k] == 1 || tetris[i][k] == 11) {
          out += '<div class="blue"></div>';
        } else if (tetris[i][k] == 2 || tetris[i][k] == 12) {
          out += '<div class="red"></div>';
        } else if (tetris[i][k] == 3 || tetris[i][k] == 13) {
          out += '<div class="green"></div>';
        } else if (tetris[i][k] == 4 || tetris[i][k] == 14) {
          out += '<div class="aqua"></div>';
        } else if (tetris[i][k] == 5 || tetris[i][k] == 15) {
          out += '<div class="agnia"></div>';
        }
      }
    }
    tetrisField.innerHTML = out;
    scoreField.innerHTML = score;
  }

  //рисуем игровой блок
  function ball() {
    function randomInteger(min, max) {
      // случайное число от min до (max+1)
      let rand = min + Math.random() * (max + 1 - min);
      return Math.floor(rand);
    }
    tetris[0][0] = randomInteger(0, 5);
  }

  // движение шарика вниз

  function run() {
    timer = setTimeout(function () {
      if (finish()) return false;
      draw();

      flag = true;
      for (let i = tetris.length - 1; i >= 0; i--) {
        for (let k = 0; k < tetris[i].length; k++) {
          if (tetris[i][k] < 10) {
            if (tetris[i][k] != 0) {
              if (i == tetris.length - 1) {
                tetris[i][k] = tetris[i][k] + 10;
              } else if (tetris[i + 1][k] == 0) {
                tetris[i + 1][k] = tetris[i][k];
                tetris[i][k] = 0;
                flag = false;
              }
            }
          }
        }
      }
      checkLine();

      if (flag) ball();
      run();
    }, 200);
  }

  function tetrisRight() {
    for (let i = tetris.length - 1; i >= 0; i--) {
      for (let k = tetris[i].length; k >= 0; k--) {
        if (tetris[i][k] < 10) {
          if (tetris[i][k] != 0 && tetris[i][k + 1] == 0) {
            if (
              tetris[i][k] != 0 &&
              tetris[i + 1][k] == 0 &&
              tetris[i][k + 1] == 0
            ) {
              tetris[i][k + 1] = tetris[i][k];
              tetris[i][k] = 0;
            }
          }
        }
      }
    }
    draw();
  }

  function tetrisLeft() {
    for (let i = tetris.length - 1; i >= 0; i--) {
      for (let k = 0; k < tetris[i].length; k++) {
        if (tetris[i][k] < 10) {
          if (tetris[i][k] != 0 && tetris[i][k - 1] == 0) {
            if (
              tetris[i][k] != 0 &&
              tetris[i][k - 1] == 0 &&
              tetris[i + 1][k] == 0
            ) {
              tetris[i][k - 1] = tetris[i][k];
              tetris[i][k] = 0;
            }
          }
        }
      }
    }
    draw();
  }

  function checkLine() {
    for (let i = tetris.length - 1; i >= 0; i--) {
      for (let k = 0; k < tetris[i].length; k++) {
        if (
          tetris[i][k] > 1 &&
          tetris[i][k + 1] != undefined &&
          tetris[i][k + 2] != undefined
        ) {
          if (
            tetris[i][k] == tetris[i][k + 1] &&
            tetris[i][k] == tetris[i][k + 2]
          ) {
            tetris[i][k] = 0;
            tetris[i][k + 1] = 0;
            tetris[i][k + 2] = 0;
            score += 30;
            for (let m = i; m >= 0; m--) {
              if (tetris[m][k] > 10) tetris[m][k] = tetris[m][k] - 10;
              if (tetris[m][k + 1] > 10) tetris[m][k + 1] = tetris[m][k] - 10;
              if (tetris[m][k + 2] > 10) tetris[m][k + 2] = tetris[m][k] - 10;
            }
          }
        }
      }
    }
  }

  function finish() {
    let stop = false;
    for (let i = tetris.length - 1; i >= 0; i--) {
      for (let k = 0; k < tetris[i].length; k++) {
        stop = true;
        for (let j = 0; j < tetris.length; j++) {
          if (tetris[j][k] == 0) {
            stop = false;
            break;
          }
        }
        if (stop) {
          clearTimeout(timer);
          alert("Конец игры!");
          break;
        }
      }
      if (stop) break;
    }
    return stop;
  }

  document.querySelector(".on_game").onclick = function () {
    init();
    draw();
    ball();
    run();
    score = 0;
  };
  init();
  draw();
  ball();

  document.onkeydown = function (event) {
    switch (event.code) {
      case "ArrowRight":
        tetrisRight();
        break;
      case "ArrowLeft":
        tetrisLeft();
        break;
    }
  };
 
};