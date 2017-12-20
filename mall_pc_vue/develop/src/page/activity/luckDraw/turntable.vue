<template>
  <div class="turntable-box">
    <div class="turntable-bg">
      <img src="../../../assets/images/turntable-bg.png" alt="turntable"/>
      <div class="rotate">
        <img id="rotate" src="../../../assets/images/turntable.png" alt="turntable"/>
      </div>
      <div class="pointer"  @click.stop="pointer">
        <img src="../../../assets/images/turntable-pointer.png" alt="pointer"/>
      </div>
    </div>
  </div>
</template>

<script>
  import { scoreLottery,uc_lottery } from '../../../service/getData'
  import '../../../assets/js/awardRotate'

  export default {
    data() {
      return {
        activityInfo: '',
        bRotate: false,
        isLuck: true,
        turntable: [],
        insideRadius: [
          {level: 9, code: 340},
          {level: 1, code: 20},
          {level: 5, code: 60},
          {level: 3, code: 100},
          {level: 8, code: 140},
          {level: 2, code: 180},
          {level: 6, code: 220},
          {level: 7, code: 260},
          {level: 4, code: 300},
          {level: 9, code: 340},
        ]
      }
    },
    mounted () {
        this.getScoreLottery()
    },
    methods: {
        getScoreLottery(){
//          let user_name = '15221355211'
//          let user_pwd = "123456"
          scoreLottery("score_lottery_activity").then(res => {
            this.activityInfo = res;
            this.turntable = res.goods;
            this.$emit('activityRule', res);
          })
        },
        pointer(){
          let act_id = this.activityInfo.activity.id
          let self = this;
          if(this.isLuck == true){
            uc_lottery("uc_lottery",act_id).then(res => {
                this.$emit('pointerInfo', res)
                //获取随机数(奖品个数范围内)
                var goods_id = res.lag_id
                if(goods_id != undefined){
                  this.isLuck = false
                  let dj = this.insideRadius
                  for(var i =0;i<dj.length;i++){
                    if(res.level == dj[i].level){
                      var item = dj[i].level
                      var angless = dj[i].code
                    }
                  }
                  self.rotateFn(item,angless, this.turntable[item-1]);
                }
              });
            }
          },


        rotateFn(item,angless, txt){
          let _that = this
          //旋转转盘 item:奖品位置; txt：提示语;
          var angles = item * (360 / _that.turntable.length) - (360 / (_that.turntable.length*2));
          if(angles<270){
            angles = 270 - angles;
          }else{
            angles = 360 - angles + 270;
          }
          $('#rotate').stopRotate();

          $('#rotate').rotate({

            angle:0,

            animateTo:angless+1800,

            duration:3000,

            callback:function (){
              let info = {
                name:txt.good_name,
                id:txt.good_id
              }
              _that.$emit('callbackInfo', info)
              _that.isLuck = true
              _that.bRotate = !_that.bRotate;

            }

          })
        },

        rnd(n, m){
          return Math.floor(Math.random()*(m-n+1)+n)
        },

    }
  }


</script>

<style scoped lang="less">
  @import "../../../assets/css/public.less";

  .turntable-box {
    width: 70%;
    margin: 10px auto;
    .turntable-bg {
      position: relative;
      width: 100%;
      img {
        width: 100%;
      }
      .rotate {
        width: 70%;
        position: absolute;
        left: 50%;
        top: 50%;
        -webkit-transform: translate(-53%, -56%)  rotate(340deg);
        -moz-transform: translate(-53%, -56%)  rotate(340deg);
        transform: translate(-53%, -56%)  rotate(260deg);
        img {
          width: 100%;
        }
      }
      .pointer {
        width: 29%;
        position: absolute;
        left: 50%;
        top: 48%;
        -webkit-transform: translate(-58%, -62%);
        -moz-transform: translate(-58%, -62%);
        transform: translate(-58%, -62%);
        img {
          width: 100%;
        }
      }
    }
  }

</style>
