<template>
  <div class="FinancingSchool_content" v-html="schoolContent">
    {{schoolContent}}
  </div>
</template>

<script>
export default {
  name: 'UcInvest',
  data () {
    return {
        schoolContent:window.storeWithExpiration.get('school')
    }
  },
  mounted(){
  }
}
</script>
<style>
img{width:100%}
</style>
<style scoped>
.FinancingSchool_content{
  padding-bottom: 10px;
}

</style>
