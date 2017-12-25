<template>
  <header id="head-top">
    <slot name="logo"></slot>
    <slot name="search"></slot>
    <section class="head-goback" v-if="goBack" @click="$router.go(-1)">
      返回
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
        <polyline points="12,18 4,9 12,0" style="fill:none;stroke:rgb(255,255,255);stroke-width:2"/>
      </svg>
    </section>
    <section class="head-title ellipsis" v-if="headTitle">
      <span class="title-text">{{headTitle}}}</span>
    </section>
    <router-link :to="userInfo?'/profile':'/login'" v-if="signinUp" class="head-login">
      <svg class="user-avatar" v-if="userInfo">
        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#user"></use>
      </svg>
      <span class="login-span" v-else>登录|注册</span>
    </router-link>
    <slot name="edit"></slot>
    <slot name="msite-title"></slot>
    <slot name="changeCity"></slot>
    <slot name="changeLogin"></slot>
  </header>
</template>

<script>
  import {mapState, mapActions} from 'vuex';

  export default {
    props: ['goBack', 'headTitle', 'signinUp'],
    mounted() {
      this.getUserInfo();
    },
    computed: mapState([
      'userInfo'
    ])
    ,
    methods: mapActions([
      'getUserInfo'
    ])


  }
</script>

<style lang="scss" scoped>
  @import '../../assets/style/mixin';

  #head-top {
    background-color: $blue;
    position: fixed;
    z-index: 100;
    left: 0;
    top: 0;
    @include wh(100%, 1.95rem);
  }

  .head-goback {
    left: 0.4rem;
    @include wh(0.6rem, 1rem);
    line-height: 2.2rem;
    margin-left: .4rem;
  }

  .head-login {
    right: 0.55rem;
    @include sc(0.65rem, #fff);
    @include ct;
    .login-span {
      color: #fff;
    }
    .user-avatar {
      fill: #fff;
      @include wh(.8rem, .8rem);
    }
  }

  .title-head {
    @include center;
    width: 50%;
    color: #fff;
    text-align: center;
    .title-text {
      @include sc(0.8rem, #fff);
      text-align: center;
      font-weight: bold;
    }
  }
</style>

