<template>
<!-- title="单元格" value="内容" label="描述信息"  -->
  <van-cell class="article-item">
      <div slot="title" class="title van-multi-ellipsis--l2">{{article.title}}</div>
      <div slot="label" class="label">
        <div class="left-img" v-if="article.cover.type == 3">
          <van-image
          class="img2"
          v-for="(item,index) in article.cover.images"
              fit="cover"
              :src="item"
              :key="index"
            />
        </div>
        <div class="text">
          <span>{{article.aut_name}}</span>
        <span>评论数:{{article.comm_count}}</span>
        <span>{{article.pubdate | filterTime}}</span>
        </div>
      </div>

      <div slot="default" v-if="article.cover.type == 1" class="right-img">
           <van-image
           class="img"
              fit="cover"
              :src="article.cover.images[0]"
            />
      </div>
  </van-cell>
</template>

<script>
export default {
   props:{
     article:{
       type:Object,
       required:true
     }
   }
}
</script>

<style scoped lang="less">
.article-item{
  .van-cell__value{
    padding-left: 25px;
    flex:unset;
    width: 200px;
  }

  .van-cell__title {
    flex: 1;
  }

  .left-img {
    display: flex;
       .img2 {
         height: 150px;
         flex: 1;
         &:not(:last-child){
           margin-right: 5px;
         }
         padding: 20px 0px;
       }
  }

  .right-img{
    .img{
      height:180px
    }
  }

  .text{
    span{
      padding-right: 25px;
    }
  }
}

</style>