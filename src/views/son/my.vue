<template>
  <div class="my-container">
    <div class="userinfo" v-if="user">
        <div class="base-info">
                <div class="left">
                  <van-image
                  round
                fit="cover"
                 :src="userInfo.photo"
                 class="avatar"
                />
                <span class="text">{{userInfo.name}}</span>
                </div>

                <div class="right">
                  <van-button type="default" round size="small">编辑资料</van-button>
                </div>
        </div>
        <div class="data-states">
            <div class="data-item">
               <span class="count">{{userInfo.art_count}}</span>
               <span class="text">头条</span>
            </div>
            <div class="data-item">
               <span class="count">{{userInfo.follow_count}}</span>
               <span class="text">关注</span>
            </div>
            <div class="data-item">
               <span class="count">{{userInfo.fans_count}}</span>
               <span class="text">粉丝</span>
            </div>
            <div class="data-item">
               <span class="count">{{userInfo.like_count}}</span>
               <span class="text">获赞</span>
            </div>
        </div>
      </div>
      <div class="header nlogin" v-else>
          <div class="not-login" @click="$router.push('/login')">
            <img src="@/assets/mobile.png" alt="" class="mobile-img">
            <span class="text">登录/注册</span>
          </div>
      </div>

      
      <van-grid :column-num="2" clickable>
        <van-grid-item class="grid-item">
              <i slot="icon" class="iconfont icon-shoucang"></i>
              <span slot="text" class="text">收藏</span>
        </van-grid-item>
        <van-grid-item class="grid-item">
           <i slot="icon" class="iconfont icon-lishi"></i>
              <span slot="text" class="text">历史</span>
        </van-grid-item>
        
      </van-grid>
     
        <van-cell title="消息通知" is-link/>
        <van-cell title="小智同学" is-link class="xiaozhitongxue"/>
        <van-cell title="退出登录" class="logout-btn" v-if="user" @click="onLogout" clickable/>

     
  </div>
</template>

<script>
import{mapState} from 'vuex'
import {getUserInfoAPI} from '@/api/index.js'
export default {
   name:'my',
   data(){
     return{
         userInfo:{}
     }
   },
   created(){
      this.loadUserInfo()
   },
   computed:{
     ...mapState(['user'])
   },
   methods:{
    onLogout(){
       this.$dialog.confirm({
  title: '退出登录',
  message: '确认退出登录嘛？',
})
  .then(() => {
    //确认执行这个
    // on confirm
    this.$store.commit('setUser' , null)
  })
  .catch(() => {
    // 取消执行这个
    // on cancel
    console.log('取消了退出登录')
  });
   },

    //获取用户信息
    async loadUserInfo(){
       try{
         const res = await getUserInfoAPI()
         
         console.log(res)
         this.userInfo = res.data.data
       }catch(err){
          this.$toast('获取用户信息失败')
       }
    }
    }
}
</script>

<style scoped lang="less">
 .my-container{
   .header{
     display: flex;
     justify-content: center;
     align-items: center;
     height: 361px;
     background-color: pink;
     background-image: url('~@/assets/banner.png');
     background-size: cover;
     .not-login {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .mobile-img {
          height: 132px;
          width: 132px;
          margin-bottom: 15px;
        }
        .text {
          font-size: 28px;
          color: #fff;
        }
     }
   }

   .userinfo {
     height: 361px;
     background-image: url('~@/assets/banner.png');
     background-size: cover;
     box-sizing: border-box;
     .base-info {
       display: flex;
       justify-content: space-between;
       align-items: center;
       height: 231px;
     padding: 76px 32px 23px;
       
      //  background-color: pink;
       box-sizing: border-box;
       .left {
         display: flex;
         justify-content: center;
         align-items: center;
         .text {
           color: #fff;
         }
       }
       .avatar {
         border: 4px solid #fff;
         width: 132px;
         height: 132px;
         margin-right: 15px;
       }

     }
     .data-states {
       display: flex;
       height: 130px;
      //  background-color: blue;
       .data-item {
         flex:1;
         display: flex;
         flex-direction: column;
         align-items: center;
         justify-content: center;
         color: #fff;
         .count{
           font-size: 36px;
         }
         .text{
           font-size: 23px;
         }
       }
     }
   }

   .grid-item {
     height: 141px;
     .iconfont {
       font-size: 45px;
     }
     .icon-shoucang {
       color: #eb5253;
     }
     .icon-lishi {
       color: #ff9d1d;
     }
     .text {
       font-size: 28px;
     }
   }

   .logout-btn{
     text-align: center;
     color: #d86262;
   }
   .xiaozhitongxue {
     margin-bottom: 9px;
   }
 }

</style>