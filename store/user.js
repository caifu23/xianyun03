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
    // 登录请求
    login(store, data) {
        return this.$axios({
            method: 'POST',
            url: '/accounts/login',
            data
        }).then((res) => {
            console.log(res)
            if(res.data.token) {
                let { data } = res
                // 将当前用户数据存储到store
                store.commit('setUserInfo', data)
            }
        })
    }
}