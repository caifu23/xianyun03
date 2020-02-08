export const state = () => {
    return {
        // 用户数据
        userInfo: {}
    }
}

export const mutations = {
    // 保存用户信息
    setUserInfo(state, data) {  
        state.userInfo = data
    }
}

export const actions = {
    
}