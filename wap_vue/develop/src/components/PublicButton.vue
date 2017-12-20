<template>
  <div class="UserLoginSubmit">
    <div>{{ message.Text }}</div>
  </div>
</template>

<script>
export default {
  props: ['message'],
  data () {
    return {
      time: 0
    }
  },
  methods: {
  },
  computed: {
  }
}
</script>

<style scoped>
.UserLoginSubmit{
  padding:0px 10px;
  margin-top:20px;
}
.UserLoginSubmit div{
  width:100%;
  text-align:center;
  line-height:35px;
  background:#F3C783;
  color:white;
  border:none;
  font-size:15px;
  border-radius:45px;
}
</style>
