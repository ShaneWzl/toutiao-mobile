//本模块是用于封装本地存储方法


export const setItem= (key,value) => {
    //如果是复杂数据类型 则需要JSON转换
    if(typeof value === 'object'){
        value = JSON.stringify(value)
    }
    window.localStorage.setItem(key,value)
}



//取本地存储数据的方法
export const getItem = key => {
   const data =  window.localStorage.getItem(key)

   //使用try...catch   如果是复杂数据类型可以使用jsn.parse   简单数据类型会报错
   try{
       return JSON.parse(data)
   } catch(err) {
       return data
   }
}



//删除本地存储
export const removeItem = key => {
    window.localStorage.removeItem(key)
}