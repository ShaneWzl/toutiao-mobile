<template>
  <div id="app">
    
    <router-view/>
    <h1>我是黑马头条</h1>
    <p>
      <i class="iconfont icon-yanzhengma"></i>
    </p>
    <van-button type="primary">主要按钮</van-button>
<van-button type="info">信息按钮</van-button>
<van-button type="default">默认按钮</van-button>
<van-button type="warning">警告按钮</van-button>
<van-button type="danger">危险按钮</van-button>
  </div>
</template>


<script>
export default {
 //最好给每个组件都起名
 name:'App'
}
</script>


<style lang="less">

</style>
