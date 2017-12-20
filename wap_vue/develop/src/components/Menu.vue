<template>
  <div class="MenuBottom" v-if="message.ShowMenu == 1">
    <ul class="dispalyfiex">
      <li class="flex1" v-for="item in MenuInfo">
        <router-link :to="item.url">
          <template v-if="RouteName.path == item.url">
          <img :src="item.Rimg" alt="">
          </template>
          <template v-else>
            <img :src="item.img" alt="">
          </template>
          <p>{{ item.name }}</p>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ['message'],
  data () {
    return {
      MenuInfo: '',
      RouteName: '',
      Route_z: ''
    }
  },
  mounted () {
    this.RouteName = this.$route
    this.MenuInfo = [
      {
        name: '首页',
        img: require('../assets/images/Menu/Index_1@1.5x.png'),
        Rimg: require('../assets/images/Menu/Index_2@1.5x.png'),
        url: '/'
      },
      {
        name: '投资',
        img: require('../assets/images/Menu/deals_1@1.5x.png'),
        Rimg: require('../assets/images/Menu/deals_2@1.5x.png'),
        url: '/deals'
      },
      /*{
          name: '理财师',
          img: require('../assets/images/Menu/licai_1@1.5x.png'),
          Rimg: require('../assets/images/Menu/licai_2@1.5x.png'),
          url: '/financial'
      },*/
      {
        name: '发现',
        img: require('../assets/images/Menu/find_1@1.5x.png'),
        Rimg: require('../assets/images/Menu/find_2@1.5x.png'),
        url: '/find'
      },
      {
        name: '我的',
        img: require('../assets/images/Menu/my_1@1.5x.png'),
        Rimg: require('../assets/images/Menu/my_2@1.5x.png'),
        url: '/uc_center'
      }
    ]
    this.Route_z = ['/', '/deal', '/find', '/uc_center']
  },
  watch: {
    $route (to) {
      this.RouteName = to
    }
  }
}
</script>

<style scoped>
.MenuBottom{
  width:100%;
  min-height:40px;
  background:#F7F7F7;
  text-align:center;
  border-top:1px solid white;
  position:fixed;
  bottom:0px;
  left:0px;
  z-index: inherit;
}
.MenuBottom ul li{
  padding:5px 0px 0px 0px;
}
.MenuBottom ul li a{
  display:block;
}
.MenuBottom ul li a img{
  width:20%
}
.MenuBottom ul li a p{
  margin-top:3px;
}
.router-link-exact-active{
  color: #f4ac31;
}
</style>
