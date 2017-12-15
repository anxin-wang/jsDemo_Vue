<template>
  <el-container>
      <el-header>
        <div>
          <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
            <el-menu-item index="1">处理中心</el-menu-item>
            <el-submenu index="2">
              <template slot="title">我的工作台</template>
              <el-menu-item index="2-1">选项1</el-menu-item>
              <el-menu-item index="2-2">选项2</el-menu-item>
              <el-menu-item index="2-3">选项3</el-menu-item>
            </el-submenu>
            <el-menu-item index="3"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>
          </el-menu>
        </div>
      </el-header>
      <el-main>

      </el-main>
      <el-footer>Footer</el-footer>
    </el-container>
</template>

<script>
  export default {
    data() {
      return {
        activeIndex: '1'
      };
    },
    mounted(){

    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }


</script>

<style>
  /*.el-row {*/
    /*margin-bottom: 20px;*/
  /*}*/

  /*.el-row:last-child {*/
    /*margin-bottom: 0;*/
  /*}*/

  /*.el-col {*/
    /*border-radius: 4px;*/
  /*}*/

  /*.bg-purple-dark {*/
    /*background: #99a9bf;*/
  /*}*/

  /*.bg-purple {*/
    /*background: #d3dce6;*/
  /*}*/

  /*.bg-purple-light {*/
    /*background: #e5e9f2;*/
  /*}*/

  /*.grid-content {*/
    /*border-radius: 4px;*/
    /*min-height: 36px;*/
  /*}*/

  /*.row-bg {*/
    /*padding: 10px 0;*/
    /*background-color: #f9fafc;*/
  /*}*/
</style>
