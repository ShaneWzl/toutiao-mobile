module.exports = {
    plugins: {
      'postcss-pxtorem': {
        // rootValue: 37.5,
        //rootValue可以变为一个带return值的函数  每次解析css文件的时候执行
        rootValue(obj){
          
          return obj.file.indexOf('vant') >= 0 ? 37.5 : 75
        },
        propList: ['*'],
      },
    },
  };