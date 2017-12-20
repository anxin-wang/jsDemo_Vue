<template>
  <div class="FinancingSchool">
    <ul class="clear">
      <li v-for="item in List">
        <router-link to="/school_content">
          <img @click.stop="school(item.content)" :src="item.icon" alt="">
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'UcInvest',
  data () {
    return {
        List:[],
        active: [
            {Img: require('../../assets/images/find/licai_1.png'), url: '#'},
            {Img: require('../../assets/images/find/licai_2.png'), url: '#'},
            {Img: require('../../assets/images/find/licai_3.png'), url: '#'},
            {Img: require('../../assets/images/find/licai_4.png'), url: '#'},
        ]
    }
  },
  mounted(){
      this.info()
  },
  methods:{
      info () {
          let Base64 = require('js-base64').Base64;
          let Url = '/mapi2/index.php?&act=classtz';
          let formData = new FormData();
          this.$http.post(Url)
              .then(response => {
                  let res = JSON.parse(Base64.decode(response.data));
                  this.List = res.classtz
              })
      },
      school(val){
          storeWithExpiration.set("school",val,86400000)
      }
  }
}
</script>

<style scoped>
.FinancingSchool{
  padding: 10px;
}
.FinancingSchool ul li{
  width:100%;
  float:left;
  margin-bottom: 10px;
}
.FinancingSchool ul li a{
  display:block;
}
.FinancingSchool ul li img{
  width:100%;
}
</style>
