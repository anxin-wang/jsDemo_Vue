<template>
  <div>
    <h1>我是第一个组件</h1>
    <span class="msg">{{msg}}</span>
  </div>
</template>


<script>
  export default {
    name: 'First',
    data () {
      return {
        msg: '我是动态数据'
      }
    }
  }
</script>

<style>
  .msg{
    color:red;
  }
</style>
