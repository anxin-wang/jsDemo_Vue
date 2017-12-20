<template>
  <div name="rule">

    <div class="basic-line">

      <Breadcrumb class="bread-box">
        <BreadcrumbItem href="/mine">我的积分</BreadcrumbItem>
        <BreadcrumbItem class="default-none">积分规则</BreadcrumbItem>
      </Breadcrumb>

      <div class="rule-box">


        <div id="Mall">
          <div class="wrap">
            <ul>
              <li>
                <div class="clear t">
                  <h3 class="fl mark-bar" style="margin-top: 0;">积分如何获取</h3>
                </div>
                <div class="Rule-Con">
                  <p class="margin-left-16">用户可以通过投资、签到、分享(微信，微信朋友圈，QQ，新浪微博，每个渠道分享只能获得一次积分)、完善资料等即可获取相应积分奖励。</p>
                </div>
              </li>
              <li>
                <div class="clear t">
                  <h3 class="fl mark-bar">积分计算方式</h3>
                </div>
                <div class="Rule-Con">

                  <div>
                    <div class="">
                      <template v-if="BaseScoreRule.base_scale_status != 0 || BaseScoreRule.big_scale_status != 0 || BaseScoreRule.score_rule_repeat_load != 0 ">
                        <div>
                          <p class="margin-left-16">交易积分:客户在本平台投资可以获得相应的交易积分</p>
                          <p class="margin-left-16">
                            交易积分 =
                            <template v-if="BaseScoreRule.base_scale_status != 0">
                              基本积分
                            </template>
                            <template v-if="BaseScoreRule.big_scale_status != 0">
                              <template v-if="BaseScoreRule.base_scale_status != 0">
                                +
                              </template>
                              大额积分
                            </template>
                            <template v-if="BaseScoreRule.score_rule_repeat_load != 0">
                              <template v-if="BaseScoreRule.big_scale_status != 0">
                                +
                              </template>
                              <template v-else-if="BaseScoreRule.base_scale_status != 0">
                                +
                              </template>
                              复投积分
                            </template>
                          </p>
                        </div>
                      </template>
                    </div>
                    <template v-if="BaseScoreRule.base_scale_status != 0">
                      <div>
                        <div>
                          <p class="margin-left-16">基础积分:通过坚果理财平台购买投资产品标的即可获得基础积分</p>
                          <p class="margin-left-16">基础积分 = 投资金额 * (投资天数/<span class="ColorRed" >{{BaseScoreRule.repay_time_c}}</span>)*<span class="ColorRed">{{BaseScoreRule.score_base_scale}}</span></p>
                        </div>
                      </div>
                      <div class="dotted small-font-size margin-left-16">
                        例如：某客户投资{{money}}万{{BaseScoreRule.repay_time_a}}天产品则获得<span class="ColorRed">{{BaseScoreRule.base_score_a_a}}</span>积分，{{money}}万{{BaseScoreRule.repay_time_b}}天产品则获得<span class="ColorRed">{{BaseScoreRule.base_score_b_a}}</span>积分，{{money}}万{{BaseScoreRule.repay_time_c}}天则获得<span class="ColorRed">{{BaseScoreRule.base_score_c_a}}</span>积分。
                      </div>
                    </template>
                    <template v-if="BaseScoreRule.big_scale_status != 0">
                      <div>
                        <h3 class="Nob">大额积分:</h3>
                        <div>
                          <p>客户在坚果理财平台投资超过一定金额可获得大额积分</p>
                          <p>
                            大额积分 = 基础积分*<span class="ColorRed">{{BaseScoreRule.score_big_scale}}</span>%(交易额大于等于<span class="ColorRed">{{BaseScoreRule.score_big_money}}</span>万)
                          </p>
                        </div>
                      </div>
                      <div class="dotted margin-left-16">
                        例如：用户投资<span class="ColorRed">{{money}}</span>万<span class="ColorRed">{{BaseScoreRule.repay_time_a}}</span>天产品获得大额积分为<span class="ColorRed">{{BaseScoreRule.big_score_a_b}}</span>积分，单笔投资低于<span class="ColorRed">{{BaseScoreRule.score_big_money}}</span>万无大额积分。
                      </div>
                    </template>
                    <template v-if="BaseScoreRule.score_rule_repeat_load != 0">
                      <div>
                        <h3 class="Nob mark-bar">复投积分:</h3>
                        <div>
                          <p class="margin-left-16">客户多次投资可获得复投积分</p>
                          <p class="margin-left-16">
                            复投积分计算规则：复投积分=基础积分*额外奖励比例<br />
                            1、复投积分=基本积分*额外奖励比例<br />
                            2、平台第一笔投资不计算复投积分。<br />
                            3、复投积分仅计算不同标的的第一次投资金额。<br />
                          </p>
                          <div class="dotted TableList margin-left-16">
                            <table border="0" width="100%">
                              <tr>
                                <th>交易次数</th>
                                <th>基础积分</th>
                                <th>额外奖励比例</th>
                                <th>复投积分</th>
                              </tr>
                              <tr v-for="item in RepeatLoadRuleList" :key="item.id">
                                <td>第{{item.load_count}}次</td>
                                <td class="ColorRed">{{item.base_score}}</td>
                                <td class="ColorRed">{{item.ratio}}%</td>
                                <td class="ColorRed">{{item.repeat_load_score}}</td>
                              </tr>
                            </table>
                          </div>
                          <p class="margin-left-16">举例如下</p>
                          <p class="pb20 margin-left-16">用户A在本平台投资2个期限都为360天的不同标的，每个标的分两次各投资5万元，用户A将获得积分如下：</p>
                          <div class="dotted TableList margin-left-16">
                            <table border="0" width="100%">
                              <tr>
                                <td rowspan="5">类别</td>
                                <td colspan="2">第一次投资</td>
                                <td colspan="2">第二次投资</td>
                              </tr>
                              <tr>
                                <td colspan="2">A标</td>
                                <td colspan="2">B标</td>
                              </tr>
                              <tr>
                                <td>第一笔投资</td>
                                <td>第二笔投资</td>
                                <td>第一笔投资</td>
                                <td>第二笔投资</td>
                              </tr>
                              <tr>
                                <td>20000</td>
                                <td>30000</td>
                                <td>20000</td>
                                <td>30000</td>
                              </tr>
                              <tr>
                                <td colspan="2">总计：50000</td>
                                <td colspan="2">总计：50000</td>
                              </tr>
                              <tr>
                                <td>基本积分</td>
                                <td colspan="2" class="ColorRed">{{BasicsA}}</td>
                                <td colspan="2" class="ColorRed">{{BasicsB}}</td>
                              </tr>
                              <tr>
                                <td>大额积分</td>
                                <td colspan="2" class="ColorRed">{{MaxMoneyA}}</td>
                                <td colspan="2" class="ColorRed">{{MaxMoneyB}}</td>
                              </tr>
                              <tr>
                                <td>复投积分</td>
                                <td colspan="2" class="ColorRed">0</td>
                                <td colspan="2" class="ColorRed">{{castB}}</td>
                              </tr>
                              <tr>
                                <td>合计</td>
                                <td colspan="4" class="ColorRed">{{Total}}</td>
                              </tr>
                            </table>
                          </div>
                          <p></p>
                          <p class="pb20 margin-left-16">用户B在本平台投资3个期限都为360天的不同标的，每个标的分两次各投资100万元，用户B将获得积分如下：</p>
                          <div class="dotted TableList margin-left-16">
                            <table border="0" width="100%">
                              <tr>
                                <td rowspan="5">类别</td>
                                <td colspan="2">第一次投资</td>
                                <td colspan="2">第二次投资</td>
                                <td colspan="2">第三次投资</td>
                              </tr>
                              <tr>
                                <td colspan="2">A标</td>
                                <td colspan="2">B标</td>
                                <td colspan="2">C标</td>
                              </tr>
                              <tr>
                                <td>第一笔投资</td>
                                <td>第二笔投资</td>
                                <td>第一笔投资</td>
                                <td>第二笔投资</td>
                                <td>第一笔投资</td>
                                <td>第二笔投资</td>
                              </tr>
                              <tr>
                                <td>500000</td>
                                <td>500000</td>
                                <td>500000</td>
                                <td>500000</td>
                                <td>500000</td>
                                <td>500000</td>
                              </tr>
                              <tr>
                                <td colspan="2">总计：1000000</td>
                                <td colspan="2">总计：1000000</td>
                                <td colspan="2">总计：1000000</td>
                              </tr>
                              <tr>
                                <td>基本积分</td>
                                <td colspan="2" class="ColorRed">{{B_BasicsA}}</td>
                                <td colspan="2" class="ColorRed">{{B_BasicsB}}</td>
                                <td colspan="2" class="ColorRed">{{B_BasicsC}}</td>
                              </tr>
                              <tr>
                                <td>大额积分</td>
                                <td colspan="2" class="ColorRed">{{B_MaxMoneyA}}</td>
                                <td colspan="2" class="ColorRed">{{B_MaxMoneyB}}</td>
                                <td colspan="2" class="ColorRed">{{B_MaxMoneyC}}</td>
                              </tr>
                              <tr>
                                <td>复投积分</td>
                                <td colspan="2" class="ColorRed">{{B_castA}}</td>
                                <td colspan="2" class="ColorRed">{{B_castB}}</td>
                                <td colspan="2" class="ColorRed">{{B_castC}}</td>
                              </tr>
                              <tr>
                                <td>合计</td>
                                <td colspan="6" class="ColorRed">{{Total2}}</td>
                              </tr>
                            </table>
                          </div>
                        </div>
                      </div>
                    </template>
                  </div>
                </div>
              </li>
              <li>
                <div class="clear dotted">
                  <ol class="fl">
                    <li class="margin-left-16">投资：</li>
                    <!--<li>投资：</li>-->
                    <li class="margin-left-16">新用户注册：</li>
                    <li class="margin-left-16">签到：</li>
                    <li class="margin-left-16">分享：</li>
                    <li class="margin-left-16">完善资料：</li>
                  </ol>
                  <ol class="fl">
                    <li>
                      <span class="ColorRed">{{BaseScoreRule.rate_score}}</span>
                      积分=<span class="ColorRed">{{BaseScoreRule.rate_money}}</span>元人民币</li>
                    <li><span class="ColorRed">{{BaseScoreRule.score_register}}</span>积分</li>
                    <li><span class="ColorRed">{{BaseScoreRule.score_login}}</span>积分</li>
                    <li><span class="ColorRed">{{BaseScoreRule.score_share}}</span>积分</li>
                    <li><span class="ColorRed">{{BaseScoreRule.score_perfect_date}}</span>积分</li>
                  </ol>
                </div>
              </li>
              <li>
                <div class="clear t">
                  <h3 class="fl mark-bar">如何获取更多积分</h3>
                </div>
                <div class="Rule-Con">
                  <p class="margin-left-16">用户投资大额，周期长的理财产品可以获得大量积分。用户获得的积分永久有效！</p>
                </div>
              </li>
            </ul>
          </div>
        </div>


      </div>

    </div>

  </div>
</template>
<script>
  import '../../../../../public/css/public.css'
  import myUtil from '../../util/prots'
  export default {
    name: 'rule',
    data () {
      return {
        BaseScoreRule:[],
        RepeatLoadRule:[],
        RepeatLoadRuleList:[],
        RepeatLoadRule2:[],
        Total:"",
        Total2:"",
        /*基础积分 投资金额(Tolmon)  投资天数(DalTime)*/
        BasicsData:{Tolmon:50000,DalTime:360},
        /*基础积分*/
        BasicsA:"",
        BasicsB:"",
        /*大额积分*/
        MaxMoneyA:"",
        MaxMoneyB:"",
        /*复投积分*/
        castA:"",
        castB:"",

        /*基础积分 投资金额(Tolmon)  投资天数(DalTime)*/
        BasicsDataB:{Tolmon:1000000,DalTime:360},
        /*基础积分*/
        B_BasicsA:"",
        B_BasicsB:"",
        B_BasicsC:"",
        /*大额积分*/
        B_MaxMoneyA:"",
        B_MaxMoneyB:"",
        B_MaxMoneyC:"",
        /*复投积分*/
        B_castA:"",
        B_castB:"",
        B_castC:"",
        money:"100"
      }
    },
    mounted:function() {
      this.info()
      myUtil.iframeResize();//调整父页面iframe的高度
      parent.document.body.scrollTop = 0;
      parent.document.documentElement.scrollTop = 0;
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    },
    methods:{
      info:function() {
        var _that = this
        var Url = '/mapi2/index.php?'
        var formData = new FormData();
        _that.$http.get(Url,{params:{
          act: 'uc_score_rule',
          money:_that.money,
          r_type: '1'
        }}).then(function(response){
          var response = response.data
          console.log(response)
          _that.BaseScoreRule = response.base_score_rule
          _that.RepeatLoadRuleList = response.repeat_load_rule;
          _that.RepeatLoadRule = response.repeat_load_rule[0]
          _that.RepeatLoadRule2 = response.repeat_load_rule[1]
          /*repeat_load_score*/
          _that.Basics(response)
          _that.B_Basics(response)
        });
      },
      /*1.基础积分计算*/
      Basics:function(response){

        /*基础积分 = 投资金额 * 投资天数 / 360天 * 基础积分比例 */
        var _that = this

        var scale = response.base_score_rule.score_base_scale

        var BasicsInregral = _that.BasicsData.Tolmon * _that.BasicsData.DalTime / 360 * scale

        _that.BasicsA = BasicsInregral

        _that.BasicsB = BasicsInregral

        /*大额积分 = 基础积分 * 大额获取比例(score_big_scale)  大额设置值(score_big_money)*/
        var maxVal = response.base_score_rule.score_big_money+'0000'

        if(_that.BasicsData.Tolmon >= maxVal){

          var money = response.base_score_rule.score_big_scale / 100

          _that.MaxMoneyA = _that.BasicsA * money

          _that.MaxMoneyB = _that.BasicsB * money

        }else{

          _that.MaxMoneyA = '0'

          _that.MaxMoneyB = '0'

        }
        /*复投积分 = 基础积分 * 额外奖励比例(repeat_load_rule[0].ratio)*/
        var cast1 = response.repeat_load_rule[1]

        if(cast1 != undefined){

          var cast1 = cast1.ratio

        }else{

          var cast1 = 0

        }
        _that.castA = 0 //复投积分 第一笔投资不计算复投积分

        var scale = response.base_score_rule.score_base_scale

        var BasicsInregral = 20000 * _that.BasicsData.DalTime / 360 * scale

        _that.castB = BasicsInregral * cast1 / 100

        /*合计*/
        _that.Total = Number(_that.BasicsA)+

          Number(_that.BasicsB)+

          Number(_that.MaxMoneyA)+

          Number(_that.MaxMoneyB)+

          Number(_that.castA)+

          Number(_that.castB)

      },
      B_Basics:function(response){

        /*基础积分 = 投资金额 * 投资天数 / 360天 * 基础积分比例 */
        var _that = this

        var scale = response.base_score_rule.score_base_scale

        var BasicsInregral = _that.BasicsDataB.Tolmon * _that.BasicsDataB.DalTime / 360 * scale

        _that.B_BasicsA = BasicsInregral

        _that.B_BasicsB = BasicsInregral

        _that.B_BasicsC = BasicsInregral

        /*大额积分 = 基础积分 * 大额获取比例(score_big_scale)  大额设置值(score_big_money)*/
        var maxVal = response.base_score_rule.score_big_money+'0000'

        if(_that.BasicsDataB.Tolmon >= maxVal){

          var money = response.base_score_rule.score_big_scale / 100

          _that.B_MaxMoneyA = _that.B_BasicsA * money

          _that.B_MaxMoneyB = _that.B_BasicsB * money

          _that.B_MaxMoneyC = _that.B_BasicsC * money

        }else{

          _that.B_MaxMoneyA = '0'

          _that.B_MaxMoneyB = '0'

          _that.B_MaxMoneyC = '0'

        }
        /*复投积分 = 基础积分 * 额外奖励比例(repeat_load_rule[0].ratio)*/

        var cast1 = response.repeat_load_rule[1]

        if(cast1 != undefined){

          var cast1 = cast1.ratio

        }else{

          var cast1 = 0

        }

        var cast2 = response.repeat_load_rule[2]

        if(cast2 != undefined){

          var cast2 = cast2.ratio

        }else{

          var cast2 = cast1

        }
        _that.B_castA = 0 //复投积分 第一笔投资不计算复投积分

        var scale = response.base_score_rule.score_base_scale

        var BasicsInregral = 500000 * _that.BasicsData.DalTime / 360 * scale

        _that.B_castB = BasicsInregral * cast1 / 100

        _that.B_castC = BasicsInregral * cast2 / 100

        /*合计*/
        _that.Total2 =
          Number(_that.B_BasicsA)+

          Number(_that.B_BasicsB)+

          Number(_that.B_BasicsC)+

          Number(_that.B_MaxMoneyA)+

          Number(_that.B_MaxMoneyB)+

          Number(_that.B_MaxMoneyC)+

          Number(_that.B_castA)+

          Number(_that.B_castB)+

          Number(_that.B_castC)


      },
      formatNum:function(str){
        var newStr = "";
        var count = 0;
        if(str.indexOf(".")==-1){
          for(var i=str.length-1;i>=0;i--){
            if(count % 3 == 0 && count != 0){
              newStr = str.charAt(i) + "," + newStr;
            }else{
              newStr = str.charAt(i) + newStr;
            }
            count++;
          }
          str = newStr + ".00"; //自动补小数点后两位
          console.log(str)
        }
        else
        {
          for(var i = str.indexOf(".")-1;i>=0;i--){
            if(count % 3 == 0 && count != 0){
              newStr = str.charAt(i) + "," + newStr; //碰到3的倍数则加上“,”号
            }else{
              newStr = str.charAt(i) + newStr; //逐个字符相接起来
            }
            count++;
          }
          str = newStr + (str + "00").substr((str + "00").indexOf("."),3);
          console.log(str)
        }
      }
    }
  }
</script>
<style> body{  font-size: 16px!important; }</style>
<style scoped>
  table{
    width: 96.5%;
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .ColorRed{
    color: #F9655A!important;
  }
  table tr th, table tr td{
    font-weight: normal;
    line-height: 30px;
    text-align: center;
  }
  .dotted tr th, .dotted tr td{
    border: 1px solid #dcdcdc;
  }
  table{
    border-collapse: collapse;
  }
  div[name='rule']{ width: 100%;}
  .margin-left-16{
    margin-left: 16px;
  }
  .ruleTit{
    font-size:18px;
    font-weight:600;
    line-height:30px;
    position:relative;
    padding-left:20px;
    margin:20px 0px;
  }
  .ruleTit:before{
    content:"";
    width:2px;
    height:100%;
    background:red;
    position:absolute;
    left:0px;
    top:0px;
  }
#Mall{
  font-family: PingFangSC-Light;
  font-size: 14px;
  color: #666666;
  line-height: 22.65px;
}
.small-font-size{
  font-family: PingFangSC-Light;
  font-size: 16px;
  color: #bcbcbc;
  line-height: 22.65px;
}
.small{
  font-family: PingFangSC-Light;
  font-size: 12px!important;
  color: #3F3F3F;
  line-height: 22.65px;
}
.rule-box-item-3{
  font-size: 14px;
  color: #666666;
  line-height: 27px;
}
  .rule-box-item-2{
    font-family: PingFangSC-Light;
    font-size: 14px;
    color: #666666;
    line-height: 22.65px;
  }
.rule-box-item-1{
  font-size: 14px;
  color: #666666;
}
.rule-box{ overflow: hidden;padding-bottom: 50px;}
.rule-box ul{
  margin-left: 26px;
  margin-top: 34px;
}
.mark-bar:before{
  content: '';
  position: absolute;
  top: 3px;
  left: 0;
  width: 4px;
  height: 20px;
  background: #FFC156;
  -webkit-border-radius: 100px;
  -moz-border-radius: 100px;
  border-radius: 100px;
}
.mark-bar{
  font-size: 18px;
  font-weight: 600;
  color: #333333;
  padding-left: 15px;
  margin-bottom: 17px;
  position: relative;
  margin-top: 50px;
}
.rule-box{
  min-height: 572px;
  height: auto;
  background-color: #fff;
}




</style>
