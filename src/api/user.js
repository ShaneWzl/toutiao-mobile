import request from '@/utils/request.js'

//js文件要用store.js里的数据需要引入
import store from '@/store/index.js'

export const login = data => {
    return request({
        method:'POST',
        url:'/v1_0/authorizations',
        data
    })
}

export const sendSms = (mobile) => {
    return request({
        method:'GET',
        url:`/v1_0/sms/codes/${mobile}`,
    
    })
}



//用户获取自己信息
export const getUserInfo = () => {
    return request({
        method:'GET',
        url:'/v1_0/user'

    })
}


//获取频道列表
export const getUserChannels = () => {
    return request({
        method:'GET',
        url:'/v1_0/user/channels'
    })
}



//获取文章
export const getArticles = (params) => {
    return request({
        method:'GET',
        url:'/v1_0/articles',
        params
    })
}


//获取所有的频道列表
export const getAllChannels = () => {
    return request({
        method:'GET',
        url:'/v1_0/channels'
    })
}