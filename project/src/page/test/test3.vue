<template>
  <div id="wave" class="wave"><span>10%</span></div>
</template>

<script>
  export default {
    name: "test3",
    data() {

      return {
        wave: null
      }
    },
    beforeMount(){
      this.wave = (function () {
        var ctx;
        var waveImage;
        var canvasWidth;
        var canvasHeight;
        var needAnimate = false;

        function init(callback) {
          var wave = document.getElementById('wave');
          var canvas = document.createElement('canvas');
          if (!canvas.getContext) return;
          ctx = canvas.getContext('2d');
          // canvasWidth = wave.offsetWidth;
          canvasWidth = 100;
          // canvasHeight = wave.offsetHeight;
          canvasHeight = 100;
          canvas.setAttribute('width', canvasWidth);
          canvas.setAttribute('height', canvasHeight);
          wave.appendChild(canvas);
          waveImage = new Image();
          waveImage.onload = function () {
            waveImage.onload = null;
            callback();
          }
          waveImage.src = require('../../assets/images/test/wave.png');

        }

        function animate() {
          var waveX = 0;
          var waveY = 0;
          var waveX_min = -203;
          // var waveY_max = canvasHeight * 0.7;
          var waveY_max = 50 + 20;
          var requestAnimationFrame =
            window.requestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (callback) {
              window.setTimeout(callback, 1000 / 60);
            };

          function loop() {
            ctx.clearRect(0, 0, canvasWidth, canvasHeight);
            if (!needAnimate) return;
            if (waveY < waveY_max) waveY += 1.5;
            if (waveX < waveX_min) waveX = 0; else waveX -= 3;

            ctx.globalCompositeOperation = 'source-over';
            ctx.beginPath();
            console.log(canvasWidth,canvasHeight);
            ctx.arc(canvasWidth / 2, canvasHeight / 2, canvasHeight / 2, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.fill();

            ctx.globalCompositeOperation = 'source-in';
            // ctx.drawImage(waveImage, waveX, canvasHeight - waveY);
            ctx.drawImage(waveImage, waveX, canvasHeight - waveY);

            requestAnimationFrame(loop);
          }

          loop();
        }

        function start() {
          if (!ctx) return init(start);
          needAnimate = true;
          setTimeout(function () {
            if (needAnimate) animate();
          }, 500);
        }

        function stop() {
          needAnimate = false;
        }

        return {start: start, stop: stop};
      }());
    },
    mounted() {
      this.wave.start();
    }
  }
</script>

<style scoped>

  .wave {
    width: 100px;
    height: 100px;
    overflow: hidden;
    border-radius: 50%;
    background: rgba(255, 203, 103, .6);
    margin: 100px auto;
    position: relative;
    text-align: center;
    display: table-cell;
    vertical-align: middle;
  }

  .wave span {
    display: inline-block;
    color: #fff;
    font-size: 20px;
    position: relative;
    z-index: 2;
  }

  .wave canvas {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;
  }

</style>
