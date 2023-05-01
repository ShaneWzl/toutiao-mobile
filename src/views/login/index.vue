<template>
  <div class="login-container">
    <!-- 导航栏 -->
      <van-nav-bar class="page-nav-bar" title="登录" >
        <!-- 插槽插入返回叉号 -->
        <i slot="left" @click="$router.back()"><van-icon name="cross" class="iconcross"/></i>
      </van-nav-bar>

      <!-- 登陆表单 -->
      <van-form @submit="onSubmit" ref="loginForm">
        <!-- 手机号 -->
  <van-field 
    v-model="user.mobile"
    name="mobile"
    placeholder="请输入手机号"
    :rules="userFormatRules.mobile"
    type="number"
    maxlength="11"
    
  >

  <!-- 使用插槽来完成图标 -->
      <span slot="left-icon" class="iconfont icon-shouji"></span>
  </van-field>
  <!-- 验证码 -->
  <van-field 
    v-model="user.code"
    type="number"
    name="code"
    placeholder="请输入验证码"
    :rules="userFormatRules.code"
    maxlength="6"
    >
          <span slot="left-icon" class="iconfont icon-yanzhengma"></span>
          <template #button>
            <van-count-down :time="time" format="ss 秒后重试" v-if="isCountDownShow" @finish="isCountDownShow=false" class="countDown"/>

            <van-button size="small" type="default" round id="send-sms-btn" native-type="button"
            @click="onSendsms"
            v-else>
            发送验证码
            </van-button>
          </template>

  </van-field>
  <div class="login-btn-wrap">
    <van-button block type="info" native-type="submit" class="login-btn">登录</van-button>
  </div>
</van-form>
  </div>
</template>

<script>
import {loginAPI , sendSmsAPI} from '@/api/index.js'
export default {
  name:'loginIndex',
  
   data(){
     return{
       user:{
         mobile:'',
         code:''
       },
       userFormatRules:{
         mobile:[
           { required: true, message: '手机号不能为空' },
           {pattern:/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,message:'请输入正确的手机号'}
           ],
        code:[
          { required: true, message: '验证码不能为空' },
          {pattern:/^\d{6}$/,message:'验证码有误'}
          ]
       },
       time:1000 * 60 ,
       isCountDownShow:false
     }
   },

   methods:{
    async onSubmit(){
       //1. 获取表单数据
       const user = this.user
       this.$toast.loading({  //此处表示加载中
                message: '加载中...',
                forbidClick: true,
                //默认duration:2000  持续2s
                duration:0    //durantion为0时一直持续
              });
       //2.表单校验
       //3.提交表单请求登录
       try{
           const res = await loginAPI(user)

           console.log('登陆成功',res)
           this.$toast.success('登陆成功')
           this.$store.commit('setUser',res.data.data)
           //登陆成功后跳转到我的页面
           this.$router.push('/my')
       } catch(err){
         console.log(err)
        //  if(err) {
        //    return this.$toast.fail('手机号或者验证码错误');
        //   }else{
        //    return this.$toast.fail('登陆失败，稍后再试');
        //   }
        }
       //4. 根据请求结果 后续操作
        
     },

    async onSendsms(){
       //1. 校验手机号   任何表单标签在vant里可以通过ref访问到实例  this.$refs.ref属性名
      try{
        await this.$refs.loginForm.validate('mobile')
      } catch(err){
        console.log('验证手机号失败',err)
        return
      }
       //2. 倒计时
       this.isCountDownShow=true
       //3. 发送请求
       try{
           await sendSmsAPI(this.user.mobile)
          this.$toast('发送成功')
       } catch(err) {
            this.isCountDownShow = false
          if(err.response.status == 429) {
            this.$toast('操作频繁，稍后重试')
          } else {
            this.$toast('发送失败')
          }
       }


     }
   }
}
</script>

<style scoped lang="less">
.login-container .iconfont {
  font-size: 37px;
}

#send-sms-btn {
  
  background-color: #ededed;
  width: 160px;
  height: 46px;
  line-height: 46px;
  color: #666!important
}

.login-btn-wrap {
  padding: 53px 33px;
  .login-btn{
    background-color: #6db4fb;
    border: none;
  }
}

.login-container .countDown {
  color:lightblue;
}

.page-nav-bar{
  .iconcross {
    color: #fff;
  }
}




</style>