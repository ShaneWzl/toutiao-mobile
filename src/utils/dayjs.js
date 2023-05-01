import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import Vue from 'vue'

import 'dayjs/locale/zh-cn'
dayjs.locale('zh-cn')
dayjs.extend(relativeTime)


//获取当前最新时间的简介格式

// const time = dayjs().format('YYYY-MM-DD')
// console.log(time)


//定义一个全局过滤器
Vue.filter("filterTime", value=>{
//     距离现在的相对时间 .fromNow(withoutSuffix?: boolean)
// 返回 string 距离现在的相对时间

// #距离 X 的相对时间 .from(compared: Dayjs, withoutSuffix?: boolean)
// 返回 string 距离 X 的相对时间
return dayjs().to(dayjs(value)) // xx前
 
// #到现在的相对时间 .toNow(withoutSuffix?: boolean)
// 返回 string 到现在的相对时间

// #到 X 的相对时间 .to(compared: Dayjs, withoutSuffix?: boolean)
// 返回 string 到 X 的相对时间

})