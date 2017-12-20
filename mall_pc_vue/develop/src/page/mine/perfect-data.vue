<template>
  <div name="perfect-data">


    <div class="basic-line">
      <Breadcrumb class="bread-box">
        <BreadcrumbItem href="/">积分商城</BreadcrumbItem>
        <BreadcrumbItem class="default-none">个人信息</BreadcrumbItem>
      </Breadcrumb>

      <div class="personal-box">
          <p class="personal-header">个人信息</p>

        <dl>
          <dt><label>*</label>学历</dt>
          <dd>
            <Select class="select-w160" v-model="model1">
              <Option v-for="item in xueli" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </dd>
        </dl>
        <dl>
          <dt><label>*</label>出生日期</dt>
          <dd><DatePicker class="select-w160" type="date" placeholder="选择日期"></DatePicker></dd>
        </dl>
        <dl>
          <dt><label>*</label>婚姻状况</dt>
          <dd>
            <Select class="select-w160" v-model="model1">
              <Option v-for="item in xueli" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </dd>
        </dl>
        <dl>
          <dt>专业</dt>
          <dd><Input class="input-w480" v-model="value" placeholder="请输入..."></Input></dd>
        </dl>
        <dl>
          <dt>毕业院校</dt>
          <dd><Input class="input-w480" v-model="value" placeholder="请输入..."></Input></dd>
        </dl>
        <dl>
          <dt><label>*</label>所在地区</dt>
          <dd><Cascader :data="data" v-model="value1"></Cascader></dd>
        </dl>
        <dl>
          <dt>详细地址</dt>
          <dd><Input class="input-w480" v-model="value" placeholder="请输入..."></Input></dd>
        </dl>
        <dl>
          <dt></dt>
          <dd class="mark">带*为必填项</dd>
        </dl>
        <span class="sub-btn">保存个人信息</span>
      </div>

    </div>


  </div>
</template>
<script>
  export default {
    name: 'perfect-data',
    data () {
      return {
         model1: '',
         xueli: [
           {
             value: 'boshihou',
             label: '博士后'
           },
           {
             value: 'benke',
             label: '本科'
           },
           {
             value: 'dazhuan',
             label: '大专'
           }
         ],
        value1: [],
        data: [{
          value: 'beijing',
          label: '北京',
          children: [
            {
              value: 'gugong',
              label: '故宫'
            },
            {
              value: 'tiantan',
              label: '天坛'
            },
            {
              value: 'wangfujing',
              label: '王府井'
            }
          ]
        }, {
          value: 'jiangsu',
          label: '江苏',
          children: [
            {
              value: 'nanjing',
              label: '南京',
              children: [
                {
                  value: 'fuzimiao',
                  label: '夫子庙',
                }
              ]
            },
            {
              value: 'suzhou',
              label: '苏州',
              children: [
                {
                  value: 'zhuozhengyuan',
                  label: '拙政园',
                },
                {
                  value: 'shizilin',
                  label: '狮子林',
                }
              ]
            }
          ],
        }]
      }
    }
  }
</script>
<style scoped>
  .sub-btn{
    display: block;
    width: 168px;
    height: 36px;
    line-height: 36px;
    text-align: center;
    margin-left: 540px;
    font-size: 14px;
    color: #FFFFFF;
    cursor: pointer;
    background: #FFC156;
    -webkit-border-radius: 2px;
    -moz-border-radius: 2px;
    border-radius: 2px;
  }
  .mark{
    margin-top: -30px;
    font-size: 14px;
    color: #EE3B2B;
  }
  .input-w480{ width: 480px;height: 36px;}
  .select-w160{ width: 160px;}
  .personal-box dt label{
    color: #F74E3B;
  }
  .personal-box dl{ margin-bottom: 20px}
  .personal-box dl dt{
    width: 180px;
    font-size: 14px;
    color: #2A2A2A;
    line-height: 20px;
    text-align: right;
  }
  .personal-box dl dt, .personal-box dl dd, .personal-box dt label{
    display: inline-block;
    vertical-align: middle;
  }
  .personal-header{
    margin-top: 30px;
    margin-left: 27px;
    font-size: 18px;
    color: #333333;
  }
  .personal-box{
    height: 800px;
    background-color: #fff;
    overflow: hidden;
  }
</style>
