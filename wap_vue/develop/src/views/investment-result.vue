<template>
  <div class="investment-result">
    <div class="section1"></div>
    <div class="section2">
      <div class="square-half">
        <p v-if="state != 1">投资失败,{{ msg }},请点击重试!</p>
        <p v-if="state == 1">恭喜您,投资成功!</p>
        <router-link class="review" v-if="state != 1" :to="{ path: '/dealsItemsInfo/' + id}">重新投资</router-link>
        <router-link class="see-investment" to="/uc_invest">
          查看我的投资
        </router-link>
      </div>
      <div class="square">
        <!-- 错icon -->
        <i class="ivu-icon ivu-icon-close"  v-if="state != 1"></i>
        <!--/. 错icon -->
        <!-- 对icon -->
        <i class="ivu-icon ivu-icon-checkmark" v-if="state == 1"></i>
        <!--/. 对icon -->
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'investmentResult',
    data () {
      return {
        id: 0,
        state: 0,
        msg: ''
      }
    },
    mounted () {
      this.$nextTick(function(){
          this.info();
      })
    },
    methods: {
      info () {
        let MSG = storeWithExpiration.get('MSG')
        let obj = JSON.parse(MSG);
        this.state = obj.state;
        this.msg = obj.msg;
        this.id = obj.id;
      }
    }
  }
</script>
<style scoped>
.see-investment{
  display: block;
  height: 30px;
  line-height: 30px;
  width: 30%;
  margin: 0 auto;
  position: fixed;
  left: 35%;
  bottom: 50px;
}
.square{
  width: 80px;
  height: 80px;
  line-height: 80px;
  text-align: center;
  font-size: 40px;
  color: #f4ad31;
  background-color: white;
  position: absolute;
  top: 35px;
  left: 50%;
  margin: 0 0 -40px -37.5px;
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  border-radius: 50%;
  -webkit-box-shadow: -2px 0 5px #f1f1f1,0 0 0 rgba(0,0,0,0.2),0 2px 5px rgba(0,0,0,0.2),0 0 0 #f1f1f1;
  -moz-box-shadow: -2px 0 5px #f1f1f1,0 0 0 rgba(0,0,0,0.2),0 2px 5px rgba(0,0,0,0.2),0 0 0 #f1f1f1;
  -ms-box-shadow: -2px 0 5px #f1f1f1,0 0 0 rgba(0,0,0,0.2),0 2px 5px rgba(0,0,0,0.2),0 0 0 #f1f1f1;
  -o-box-shadow: -2px 0 5px #f1f1f1,0 0 0 rgba(0,0,0,0.2),0 2px 5px rgba(0,0,0,0.2),0 0 0 #f1f1f1;
  box-shadow: -2px 0 5px #f1f1f1,0 0 0 rgba(0,0,0,0.2),0 2px 5px rgba(0,0,0,0.2),0 0 0 #f1f1f1;
}
.square-half{
  width: 600px;
  height: 600px;
  text-align: center;
  background-color: white;
  position: relative;
  top: -85px;
  left: -90px;
  border-radius: 50%;
  overflow: hidden;
}
.square-half p{
  color: #f4ad31;
  margin-top: 70px;
  margin-bottom: 50px;
  font-size: 14.5px;
}
.review{
  display: block;
  background-color: #f4ad31;
  height: 40px;
  line-height: 40px;
  width: 50%;
  margin: 0 auto;
  font-size: 14.5px;
  color: white;
  -webkit-border-radius: 20px;
  -moz-border-radius: 20px;
  border-radius: 20px;
}
.section2{
  width: 100%;
  height: 100%;
  background-color: #fff;
}
.section1{
  width: 100%;
  height: 160px;
  background-color: #f4ad31;
}
.investment-result{
  font-family: "微软雅黑体";
  background-color: #F5F5F5;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 45px;
  left: 0;
  overflow: hidden;
  padding-bottom: 45px;
}
  @media screen and (min-width: 320px) and (max-width: 374px){
    .square-half{ left: -112px;}
    .square-half div{ width: 45%;margin: 0 0 0 158px;}
  }
</style>
