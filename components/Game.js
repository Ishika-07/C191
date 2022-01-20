AFRAME.registerComponent("game-play", {
  schema: {
    elementId: { type: "string", default: "#ring1" },    
  },
  update: function () {
    this.isCollided(this.data.elementId);
  },

  init: function () {
    var duration = 120;
    const timerEl = document.querySelector("#timer");
    this.startTimer(duration, timerEl);
  },

  startTimer: function (duration, timerEl) {
    var minutes;
    var seconds;

    // 1 sec = 1000 milisec
    var timer = setInterval(countDown, 1000);

    function countDown() {
      if (duration >= 0) {
        minutes = parseInt(duration / 60);
        seconds = parseInt(duration % 60);

        if (minutes < 10) {
          minutes = "0" + minutes;
        }
        if (seconds < 10) {
          seconds = "0" + seconds;
        }

        timerEl.setAttribute("text", {
          value: minutes + ":" + seconds,
        });

        duration -= 1;
      } 
      else {
        //clearInterval(timer);
        this.gameOver()       
      }
    }
  },
  isCollided: function (elemntId) {
    const element = document.querySelector(elemntId);
    element.addEventListener("collide", (e) => {
      if (elemntId.includes("#ring")) {
        element.setAttribute("visible", false);
        this.updateScore();
        this.updateTarget();

      } else {
        this.gameOver();
      }
    });
  },
  updateScore: function(){
    const score = document.querySelector("#score");
    const score_count = score.getAttribute("text").value;

    var current_score  = parseInt(score_count);
    current_score += 50;

    score.setAttribute("text", {
      value: current_score
    })
  },
  updateTarget: function(){
    const target = document.querySelector("#target");
    const target_count = target.getAttribute("text").value;

    var target_score  = parseInt(target_count);
    target_score -= 1;

    target.setAttribute("text", {
      value: target_score
    })
  },
  gameOver: function(){
    const plane = document.querySelector("#plane_model");
    plane.setAttribute("dynamic-body",{mass:1});
    const game_over = document.querySelector("#game_over");
    game_over.setAttribute("visible",true)
  }
});
