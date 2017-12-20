<template>
  <div class="dealsItems">
    <!-- 产品项 -->
    <div class="pro-list">
      <product-item v-bind:products="products" v-bind:mark="1"></product-item>
    </div>
    <!--/. 产品项 -->
  </div>
</template>
<script>
import ProductItem from '../components/ProductItem'
export default {
  name: 'dealsItems',
  components: { ProductItem },
  mounted () {
    this.$nextTick(function(){
        this.setTitle();
    })
  },
  data () {
    return {
      products: [
        {
          title: '安心加51号',
          days: '150',
          numbers: '4',
          percent: '6.50',
          finishPercent: '63'
        },
        {
          title: '丰雅3号',
          days: '360',
          numbers: '17',
          percent: '8.00',
          finishPercent: '63.78'
        },
        {
          title: '小贷通1号',
          days: '180',
          numbers: '7',
          percent: '86.50',
          finishPercent: '10.00'
        },
        {
          title: '小贷通1号',
          days: '180',
          numbers: '7',
          percent: '86.50',
          finishPercent: '10.00'
        },
        {
          title: '小贷通1号',
          days: '180',
          numbers: '7',
          percent: '86.50',
          finishPercent: '10.00'
        },
        {
          title: '小贷通1号',
          days: '180',
          numbers: '7',
          percent: '86.50',
          finishPercent: '10.00'
        },
        {
          title: '小贷通1号',
          days: '180',
          numbers: '7',
          percent: '86.50',
          finishPercent: '10.00'
        }
      ]
    }
  },
  methods: {
    setTitle () {//设置头部
       let obj = this.$route.matched[1];
       obj.meta.Title = this.$route.params.title;
    }
  }
}
</script>
<style scoped>
.dealsItems{
  background-color: #F5F5F5;
  position: fixed;
  top: 45px;
  left: 0;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  padding-bottom: 100px;
}
.pro-list{ margin: 0 12.5px;}
</style>
