$(document).ready(function() {
  var x = 10;
  var triangle;
  const BUG_RAD = 40;
  const TRI_DIMEN = 50;
  canvas = $("#canvas");
  var ctx = canvas.get(0).getContext("2d");
  $(window).resize(resizeCanvas);

  function resizeCanvas() {
    canvas.attr("width", $(window).get(0).innerWidth);
    canvas.attr("height", $(window).get(0).innerHeight);
    triangle = {
      lowerleftx : canvas.width() / 2 - TRI_DIMEN,
      lowerlefty : canvas.height() / 2 + TRI_DIMEN,
      lowerrightx : canvas.width() / 2 + TRI_DIMEN,
      lowerrighty : canvas.height() / 2 + TRI_DIMEN,
      topx : canvas.width() / 2,
      topy : canvas.height() / 2 - TRI_DIMEN,
      fillStyle : 'yellow'
    };
  };

  resizeCanvas();

  function detectBugInTriangle(bug) {
    return (bug.x - bug.radius >= triangle.lowerleftx && bug.x - bug.radius <= triangle.lowerrightx && bug.y - bug.radius <= triangle.lowerlefty && bug.y >= triangle.topy);
  }

  function drawTriangle() {
    ctx.fillStyle = triangle.fillStyle;
    ctx.beginPath();
    ctx.moveTo(triangle.lowerleftx, triangle.lowerlefty);
    ctx.lineTo(triangle.lowerrightx, triangle.lowerrighty);
    ctx.lineTo(triangle.topx, triangle.topy);
    ctx.closePath();
    ctx.fill();
  }

  var animObjects = [];

  animObjects.push(new drawBugFast(ctx, 60, 70, BUG_RAD, 'red', 200, 0.5));
  animObjects.push(new drawBugRandom(ctx, 50, 250, BUG_RAD, 'blue', 10, 4));
  animObjects.push(new drawBugSin(ctx, 0, 500, BUG_RAD, 'black', 1, 0, 1));

  $("#canvas").mousedown(onClickDown);

  loop();

  function loop() {
    ctx.clearRect(0, 0, canvas.width(), canvas.height());
    ctx.strokeRect(0, 0, canvas.width(), canvas.height());
    drawTriangle();
    if (animObjects.length < 1) {
      alert("Winner! You squashed all of them!");
      return;
    }
    for(var i = 0, ao; ao = animObjects[i]; i++) {
        ao.update();
        if (detectBugInTriangle(ao)) {
          alert ("You lost to some bugs.");
          return;
        }
    }
    requestAnimationFrame(loop);
  }

  function onClickDown(e) {
    var bug;
    var bugToDelete = -1;
    for (var i = 0; i < animObjects.length; i++) {
      bug = animObjects[i];
      var x = e.offsetX;
      var y = e.offsetY;
      if (x <= bug.x + bug.radius && x >= bug.x - bug.radius && y <= bug.y + bug.radius && y >= bug.y - bug.radius) {
              bugToDelete = i;
            }
    }
    if (bugToDelete >= 0)
      animObjects.splice(bugToDelete, 1);
  }
});

function drawBugFast(ctx, x, y, r, color, stepX, stepY) {
		var shadowCtx = this;
    this.x = x;
    this.y = y;
    this.radius = r;
    this.color = color;
    this.stepX = stepX;
    this.stepY = stepY;
    this.update = function() {

        shadowCtx.x += shadowCtx.stepX;
        shadowCtx.y += shadowCtx.stepY;
        if (shadowCtx.x < 0 || shadowCtx.x > ctx.canvas.width) {
        	shadowCtx.stepX = -shadowCtx.stepX;
          if (shadowCtx.stepX >= 15) {
            shadowCtx.stepX -= 15;
            shadowCtx.x = 0;
          }
          if(Math.abs(shadowCtx.stepX) < 5) {
              shadowCtx.stepX = 5;
          }
        }
        if (shadowCtx.y < 0 || shadowCtx.y > ctx.canvas.height) {
           shadowCtx.stepY = -shadowCtx.stepY;
        }
        render();
    }
    function render() {
        ctx.beginPath();
        ctx.arc(shadowCtx.x, shadowCtx.y, shadowCtx.radius, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fillStyle = shadowCtx.color;
        ctx.fill();
    }
    return this;
}

function drawBugSin(ctx, x, y, r, color, stepX, stepY, cnt) {
		var shadowCtx = this;
    this.x = x;
    this.y = y;
    this.radius = r;
    this.color = color;
    this.stepX = stepX;
    this.stepY = stepY;
    this.cnt = cnt;
    this.update = function() {
        var adj = this.cnt % 200 / (2 * Math.PI);
        shadowCtx.x += shadowCtx.stepX;
        shadowCtx.y = Math.sin(adj) * 50 + 200;
        this.cnt++;
        if (shadowCtx.x < 0 || shadowCtx.x > ctx.canvas.width) {
        	shadowCtx.stepX = -shadowCtx.stepX;
        }
        if (shadowCtx.y < 0 || shadowCtx.y > ctx.canvas.height) {
           shadowCtx.stepY = -shadowCtx.stepY;
        }
        render();
    }
    function render() {
        ctx.beginPath();
        ctx.arc(shadowCtx.x, shadowCtx.y, shadowCtx.radius, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fillStyle = shadowCtx.color;
        ctx.fill();
    }
    return this;
}

var rand;

function drawBugRandom(ctx, x, y, r, color, stepX, stepY) {

    var shadowCtx = this;
    this.x = x;
    this.y = y;
    this.radius = r;
    this.color = color;
    this.stepX = stepX;
    this.stepY = stepY;

    this.update = function() {
      rand  = Math.floor(Math.random() * 100) + 1;
      shadowCtx.x += shadowCtx.stepX;
      shadowCtx.y += shadowCtx.stepY;
      
      if (rand <= 20 && shadowCtx.x > 20
            && shadowCtx.x < ctx.canvas.width - 20) {
        shadowCtx.stepX = -shadowCtx.stepX;
      }

      if (shadowCtx.x < 0 || shadowCtx.x > ctx.canvas.width) {
        shadowCtx.stepX = -shadowCtx.stepX;
      }
      if (shadowCtx.y < 0 || shadowCtx.y > ctx.canvas.height) {
         shadowCtx.stepY = -shadowCtx.stepY;
      }
      render();
    }

    function render() {
        ctx.beginPath();
        ctx.arc(shadowCtx.x, shadowCtx.y, shadowCtx.radius, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fillStyle = shadowCtx.color;
        ctx.fill();
    }
    return this;
}
