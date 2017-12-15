<template>


  <el-row>
    <el-col :span="6">
      <div class="grid-content bg-purple"></div>
    </el-col>
    <el-col :span="6">
      <div class="grid-content bg-purple-light"></div>
    </el-col>
    <el-col :span="6">
      <div class="grid-content bg-purple">
        <div class="CirclePercent">
          <p><canvas NowRange='70'></canvas></p>
        </div>

      </div>
    </el-col>
    <el-col :span="6">
      <div class="grid-content bg-purple-light">
        <my-component attr1="我是参数一">
          <div slot="footer">我是插槽。。。。。</div>
          <div slot="header">我是另一个插槽。。。。。</div>
        </my-component>
      </div>
    </el-col>

  </el-row>
</template>

<script>

  import myComponent from '../../components/mycomponent'

  export default {

    components: {
      myComponent,
    },
    mounted(){
      $(".CirclePercent p").each(function(key){
        // 定义canvasID
        $(this).children().attr("id","me-skill"+key)
        // 获取canvasID
        var CanvasAttrId = $(this).children().attr("id")
        // 获取进度
        var NowRange = $(this).children().attr("NowRange")
        //边框颜色组
        var canvasBg = ["#F4AC31"];
        if(NowRange <= 50){
          var FontColor = "#F4AC31"
        }else if(NowRange >= 50){
          var FontColor = "#fff"
        }

        var CanvasId = [
          document.getElementById(CanvasAttrId)
        ]

        // 画布属性
        var mW = CanvasId.width = 50;//宽度
        var mH = CanvasId.height = 50;//高度
        var lineWidth = 2;
        //画圆心
        var r = mH / 2; //圆心
        var cR = r - 2*lineWidth;

        //Sin 曲线属性
        var sX = 0;
        var sY = mH/2;
        var axisLength = mW; //轴长
        var waveWidth = 0.055 ; //波浪宽度,数越小越宽
        var waveHeight = 5; //波浪高度,数越大越高
        var speed = 0.09; //波浪速度，数越大速度越快
        var xOffset = 0; //波浪x偏移量

        // 画圈函数
        var IsdrawCircled = false;

        //画sin 曲线函数
        var drawSin = function(xOffset){
          ctx.save();
          var points=[]; //用于存放绘制Sin曲线的点
          ctx.beginPath();
          //封闭路径
          //在整个轴长上取点
          for(var x = sX; x<axisLength; x += 20/axisLength){
            //此处坐标(x,y)的取点，依靠公式 “振幅高*sin(x*振幅宽 + 振幅偏移量)”
            var y = -Math.sin((sX+x) * waveWidth + xOffset);

            var dY = mH * (1 - NowRange/100);
            points.push([x, dY + y * waveHeight]);
            ctx.lineTo(x, dY + y * waveHeight);
          }
          //封闭路径
          ctx.lineTo(axisLength, mH);
          ctx.lineTo(sX, mH);
          ctx.lineTo(points[0][0],points[0][1]);
          ctx.fillStyle = canvasBg[i];
          ctx.fill();
          ctx.restore();
        }
        var insctx = function(){
          //内实心圈
          ctx.beginPath();
          ctx.arc(r,r,20,0,Math.PI*2);
          ctx.fillStyle = canvasBg[i];
        }
        //文字
        var insText = function(){
          ctx.save();
          ctx.fillStyle = FontColor;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.font = "12px Microsoft Yahei";
          ctx.fillText(NowRange + "%", r, r);
          ctx.restore();
        };

        //动画
        var render = function(){
          ctx.clearRect(0, 0, mW, mH);
          drawSin(xOffset);
          insctx();//执行内圆
          insText();//执行文字
          xOffset += speed;
          requestAnimationFrame(render);
        }

        // 循环4个canvas
        for(var i = 0; i<CanvasId.length;i++){
          CanvasId[i].width = mW;
          CanvasId[i].height =mH;
          var ctx=CanvasId[i].getContext("2d");
          ctx.beginPath();
          ctx.arc(r, r, cR+1, 0, Math.PI * 2);
          ctx.strokeStyle = canvasBg[i];
          ctx.lineWidth = lineWidth;
          ctx.stroke();//画空心圆
          ctx.beginPath();
          ctx.arc(r, r, cR, 0, 2 * Math.PI);
          ctx.clip();

          insText(); //执行文字
          drawSin(xOffset);//执行波浪
          render()//执行动画
        }
      })
    }

  }

</script>

<style>
  .el-row {
    margin-top: 20px;
    margin-bottom: 20px;
  }

  .el-row:last-child {
    margin-bottom: 0;
  }

  .el-col {
    border-radius: 4px;
  }

  .bg-purple-dark {
    background: #99a9bf;
  }

  .bg-purple-light {
    background: #e5e9f2;
  }

  .bg-purple {
    background: #d3dce6;
  }

  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }

  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
