<template>
  <div class="popup-container">
      <!--  title="单元格" value="内容" label="描述信息"  -->
       <van-cell :border="false">
           <div slot="title" class="title">我的频道</div>
           <div slot="default">
               <van-button plain  round size="mini" class="edit-btn" @click="isShow = !isShow">{{isShow? '完成':'编辑'}}</van-button>
           </div>
       </van-cell>
       <van-grid :column-num="4" :gutter="10">
                <van-grid-item 
                class="grid-item my-grid" 
                v-for="(item,index) in myChannels" 
                :key="index"  
                 >
                 <van-icon  slot="icon" name="clear" v-show="isShow && item.id !== 0"/>
                 <span slot="text" :class="{active:activeNum == index}">{{item.name}}</span>
                </van-grid-item>
        </van-grid>

        <!-- 下方频道推荐 -->
        <van-cell :border="false">
           <div slot="title" class="title">频道推荐</div>
           
       </van-cell>
       <van-grid :column-num="4" :gutter="10">
                <van-grid-item class="grid-item recommend-grid" 
                v-for="(item,index) in recommendChannels" 
                :key="item.id"  
                :text="item.name" 
                icon="plus"
                @click="onAddChannel(index)"/>
        </van-grid>
  </div>
</template>

<script>
import {getAllChannelsAPI} from '@/api/index.js'
export default {
  props:{
      myChannels:{
          type:Array,
          required:true
      },
      activeNum:{
          type:Number,
          required:true
      }
  },

  data(){
   return{
       allChannels:[],
       isShow:false
      
   }
  },

  created(){
      this.loadAllChannels()
  },

  methods:{
     async loadAllChannels(){
        try{
            const res = await getAllChannelsAPI()
        console.log('我是结果',res)
        this.allChannels = res.data.data.channels
       
        } catch(err){
            this.$toast('加载失败')
        }
      },

      onAddChannel(ind){
        const item = this.recommendChannels[ind]
        this.myChannels.push(item)
      }
  },
  computed:{
            recommendChannels(){
                const newChannels = []
                this.allChannels.forEach(item => {
                    const re = this.myChannels.findIndex(obj => obj.id == item.id)
                    if(re < 0) {
                       newChannels.push(item)
                    }
                })
                return newChannels
            }
  }
}
</script>

<style scoped lang="less">
.popup-container {
    .active{
        color: red;
    }
    padding-top: 70px;
    .title{
        padding-top: 10px;
        font-size: 32px;
        color: #333;
    }
    .edit-btn {
        width: 100px;
        height: 40px;
        font-size: 26px;
        color: #f85959;
        border: 1px solid #f85959;
    }

/deep/ .grid-item{
        width: 160px;
        height: 86px;
        .van-grid-item__content{
            background-color: #f4f5f6;
            font-size: 22px;
            color: #222;
        }
    }

/deep/    .my-grid{
        position: relative;
        .van-grid-item__icon-wrapper{
            position: unset;
        }
        i.van-icon-clear{
            position: absolute;
            right: -6px;
            top: -9px;
            font-size: 13px;
            color: grey;
            z-index: 2;
        }
        span{
            margin-top: 0;
        }
    }

 /deep/   .recommend-grid{
       .van-hairline{
           flex-direction: row;
           i{
               font-size: 30px;
               vertical-align: middle;
               margin-right: 5px;

           }
           span{
               font-size: 26px;
               margin-top: 2px;
               white-space:nowrap;
           }
       }
    }

}

</style>