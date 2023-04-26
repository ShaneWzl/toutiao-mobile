<template>
  <div class="layout-container">
      <router-view/>
      <!-- 底部导航栏 -->
      <van-tabbar route class="layout-tabbar">
                <van-tabbar-item replace to="/shouye">
                    <i slot="icon" class="iconfont icon-shouye"></i>
                    <span class="text">首页</span>
                </van-tabbar-item>
                <van-tabbar-item repalce to="/wenda">
                    <i slot="icon" class="iconfont icon-wenda"></i>
                    <span class="text">问答</span>
                </van-tabbar-item>
                <van-tabbar-item replace to="/shipin">
                    <i slot="icon" class="iconfont icon-shipin"></i>
                    <span class="text">视频</span>
                </van-tabbar-item>
                <van-tabbar-item replace to="/my">
                    <i slot="icon" class="iconfont icon-wode"></i>
                    <span class="text">{{$store.state.user? '我的':'未登录'}}</span>
                </van-tabbar-item>
        </van-tabbar>
  </div>
</template>

<script>
export default {
  name:'layoutIndex',
  data(){
      return{
         
      }
  }
}
</script>

<style scoped lang="less">
.layout-container {
    .layout-tabbar{
        .iconfont {
             font-size: 40px;
        }
        .text {
            font-size: 20px;
        }
    }
}

</style>