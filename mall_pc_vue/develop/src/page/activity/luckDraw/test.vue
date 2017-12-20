<template>
  <div style="background-color:#00bef2;position: relative" ref="mybox">
    <div style="width:200px;height:100px;background-color: #7a0000"><div class="clearfix"></div></div>
    <div style="position: absolute;height:300px;width:200px;background-color: #0A246A;top:0;left:0;">

    </div>

  </div>

</template>

<script>

    export default {
        data() {
            return {}
        },
      mounted () {
        const self = this;
        console.log(this.$refs.mybox.style.cssText)


        this.$refs.mybox.style.height = '1000px';

        this.$nextTick(function(){


          })
      }
    }
</script>

<style scoped>
  .clearfix:after{content:".";display:block;height:0;clear:both;visibility:hidden}

</style>
