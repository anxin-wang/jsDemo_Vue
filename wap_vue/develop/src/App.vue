<template>
  <div id="app">
    <heads v-bind:message="RouteName"></heads>
    <template v-if="RouteName.ShowMenu == 1">
      <template v-if="RouteName.ShowHead == 1">
        <div class="pb65 pt45"><router-view></router-view></div>
      </template>
      <template v-else>
        <div class="pb55" v-if="RouteName.ShowMenu == 1"><router-view></router-view></div>
        <template v-else><router-view></router-view></template>
      </template>
    </template>
    <template v-else>
      <div class="pt45" v-if="RouteName.ShowHead == 1"><router-view></router-view></div>
      <template v-else><router-view></router-view></template>
    </template>

    <keep-alive>
      <menus v-bind:message="RouteName"></menus>
    </keep-alive>
    <!--<loading v-bind:show="showLoading"></loading>-->
  </div>
</template>

<script>
    import menus from './components/Menu.vue'
    import heads from './components/Header.vue'
    import loading from './components/loading'
    export default {
        data () {
            return {
                RouteName: '',
            }
        },
        components: { menus, heads,loading },
        mounted () {
            this.RouteName = this.$route.meta
            //console.log(this.$store.state.infoLoading)
        },
        computed: {
            /*showLoading () {
                return this.$store.state.infoLoading;
            }*/
        },
        watch: {
            $route (to) {
                this.RouteName = to.meta
                document.title = this.RouteName.Title
            }
        },
        methods:{
        }
    }
</script>
