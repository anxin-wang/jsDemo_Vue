<template>
  <div class="loading" :class="[{'hide': show}]">
    <div class="bg-div">
      <div class="bg-loding-box">
        <Icon type="load-c" size="32" class="demo-spin-icon-load"></Icon>
        <div>Loading</div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'loading',
    props: ['show']
  }
</script>
<style scoped>
  .hide{ display: none!important;}
  .bg-loding-box{
    text-align: center;
    color: #fff;
    font-weight: 600;
    position: absolute;
    width: 100%;
    left: 0;
    top: 45%;
  }
  .bg-div{
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999999888;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,.2);
  }
  .demo-spin-icon-load{
    animation: ani-demo-spin 1s linear infinite;
  }
  @keyframes ani-demo-spin {
    from { transform: rotate(0deg);}
    50%  { transform: rotate(180deg);}
    to   { transform: rotate(360deg);}
  }
  .demo-spin-col{
    height: 100px;
    position: relative;
    border: 1px solid #eee;
  }
</style>
