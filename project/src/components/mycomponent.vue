<template>
  <div>
    <p>This is the first component!{{ attr1 }}</p>
    <slot name="footer"></slot>
    <slot name="header"></slot>

  </div>

</template>

<script>
  export default {
    data(){
      return{

      }
    },


    props: ['attr1'],


  }
</script>

<style>
  </style>
