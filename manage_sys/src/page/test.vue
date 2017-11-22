<template>


  <el-row>
    <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
    <el-col :span="6"><div class="grid-content bg-purple-light"></div></el-col>
    <el-col :span="6"><div class="grid-content bg-purple">dsfdfsds</div></el-col>
    <el-col :span="6"><div class="grid-content bg-purple-light">
      <my-component attr1="我是参数一">
        <div slot="footer">我是插槽。。。。。</div>
        <div slot="header">我是另一个插槽。。。。。</div>
      </my-component>
    </div></el-col>

  </el-row>
</template>

<script>

  import myComponent from './mycomponent'

  export default {

    components: {
      myComponent,
    },

  }

</script>

<style>
  .el-row {
    margin-top:20px;
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
