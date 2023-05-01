<template>
  <div class="shouye-container">
      <!-- 插入顶部导航栏 -->
      <van-nav-bar class="page-nav-bar" fixed>
        <van-button
        type="info" slot="title" round
        size="small"
        slots="icon"
        class="search_input">
        <van-icon name="search" class="searchIcon"/>
        搜索</van-button>
      </van-nav-bar>


       <!-- swipeable是手指滑动界面切换 但是只在内容部分有效 -->
      <van-tabs class="channel-tabs" v-model="active" animated swipeable>
        <van-tab :title="item.name" 
        v-for="item in channels" 
        :key="item.id">
        <ArticleList :channel="item"></ArticleList>
        </van-tab>
        <!-- 汉堡小图标 -->
        <div slot="nav-right" class="placeholder"></div>
        <div class="humburger-btn" slot="nav-right" @click="show=true">
          <i class="iconfont icon-gengduo"></i>
        </div>

      </van-tabs>
      <!-- 汉堡弹出层 -->
      
        <van-popup v-model="show" 
        position="bottom" 
        :style="{ height: '100%' }"
          closeable
        close-icon-position="top-left">
        <Popup :my-channels="channels" :active-num="active"></Popup>
        </van-popup>
  </div>
</template>

<script>
import {getUserChannelsAPI} from '@/api/index.js'
import ArticleList from '@/views/components/articleList.vue'
import Popup from '@/views/components/popup.vue'
export default {
  name:'shouye',
  data(){
    return{
      value:'',
      active:0,
      channels:[],   //此处是频道数据
      show:false
    }
  },
  components:{
    ArticleList,
    Popup
  },
  created(){
    this.loadChannels()
  },
  methods:{
    showPopup() {
      this.show = true;
    },
    async loadChannels(){
      try{
          const res = await getUserChannelsAPI()
          
          this.channels = res.data.data.channels
      } catch(err) {
       this.$toast('获取列表失败')
      }
    }
  }
}
</script>

<style scoped lang="less">
.shouye-container{
  padding-top: 174px;
  padding-bottom: 100px;
  
  .page-nav-bar{
    
    .search_input{
      background-color: #5babfb;
        width: 555px;
        height: 64px;
        border:none;
        font-size: 28px;
    }
    .searchIcon{
      color: #fff;
      font-size: 32px;
      vertical-align: middle;
    }
  }
  /deep/ .van-nav-bar__title{
  max-width: unset;
}

/deep/ .channel-tabs{
   
  
  
  .van-tabs__wrap{
    position: fixed;
   top: 92px;
   left: 0;
   right: 0;
   z-index: 1;

    height: 82px;
  }
  .van-tab{
    min-width: 200px;
    border-right: 1px solid #edeff3;
    font-size: 30px;
    color: #777;
  }
  .van-tab--active{
    color: #333;
  }

  .van-tabs__line{
    bottom: 8px;
    width: 31px;
    height: 6px;
    background-color: #3296fa;
  }
  .van-tabs__nav{
    padding-bottom: 0;
  }

  .placeholder{
    width: 66px;
    height: 82px;
    flex-shrink: 0;
  }

  .humburger-btn{
    position: fixed;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 66px;
    height: 82px;
    background-color: #fff;
    opacity: 0.902;
    .iconfont {
      font-size: 33px;
    }
    &::before{
      position: absolute;
      left: 0;
      content:"";
      //模拟器看不见 手机看的见
      width: 1px;
      height: 100%;
      background-image: url('~@/assets/gradient-gray-line.png');
      background-size: contain;
    }
  }
}
 
}


</style>