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
    },
    // 清除用户数据
    cleanUserInfo(state, info) {
        // 判断是否为 浏览器
        if (process.browser) {
            localStorage.removeItem('userInfo')
        }
        state.userInfo = {}
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
            if (res.data && res.data.token) {
                let { data } = res
                // 将当前用户数据存储到store
                store.commit('setUserInfo', data)
            }
            return Promise.resolve(res)
        })
    },
    // 发送验证码
    sendCode(store, data) {
        return this.$axios({
            method: 'POST',
            url: '/captchas',
            data
        })
    }
}