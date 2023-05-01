<template>
  <div class="article-list">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh"
    :success-text="msg"
    success-duration="1500">
     <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
         @load="onLoad" >
        <ArticleItem v-for="item in list" :key="item.art_id"
        :article="item">
        
        </ArticleItem>
      </van-list>
    </van-pull-refresh>
   
  </div>
</template>

<script>
 import {getArticlesAPI} from '@/api/index.js'
 import ArticleItem from '@/views/components/articleItem.vue'
export default {
   
   props:{
       channel:{
           type:Object,
           required:true
       }
   },
   components:{
     ArticleItem
   },

   data(){
       return{
             list: [],
      loading: false,
      finished: false,
      timestamp:null,
      error:false,
       isLoading: false,
       msg:'刷新成功'
       }
   },
   methods:{
       //页面打开时运行一次onLoad 每加载一次都会运行一次  //加载数据不满一屏 会运行第二次
      async onLoad() {
      // 异步更新数据
      
      try{
        //模拟失败
        // if(Math.random() > 0.5){
        //   JSON.parse('fsfsffs')
        // } 
          const res = await getArticlesAPI({
          channel_id:this.channel.id,
          timestamp:this.timestamp || Date.now()
          
      })
      
      this.finished=false

      
      const result = res.data.data.results
      this.list.push(...result)
      this.loading=false

      if(result.length){

          this.timestamp = res.data.data.pre_timestamp
      } else {
        this.loading=false
          this.finished = true
      }

      } catch(err){
        this.error=true,
        this.loading=false
        return

      }

      
      
      
   },

    //下拉刷新
    async onRefresh(){
      //
      try{
        //模拟失败的情况
        // if(Math.random() > 0.2){
        //   JSON.parse('fsfsffs')
        // } 
          const res = await getArticlesAPI({
          channel_id:this.channel.id,
          timestamp: Date.now()
          
      })
        
        this.list.unshift(...res.data.data.results)
        this.isLoading=false
        this.msg=`刷新了${res.data.data.results.length}条数据`
      }catch(err){
        this.isLoading=false
     this.msg='刷新失败，稍后再试'
      }
    }
}
}
</script>

<style scoped lang="less">
.article-list {
    height: 79vh;
    overflow-y: auto;  
  
}

</style>