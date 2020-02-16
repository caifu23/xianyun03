export const state = () => {
    return {
        // 机票搜索历史
        history: [],
        infoData: {}, //机票数据 
    }
}

export const mutations = {
    // 添加搜索历史
    addFlightsHistory(state, val) {
        // 限制存储历史记录 5条，最新的在前面
        // 方法一：
        // if(state.history.length >= 5) {
        //     state.history.pop()
        // }
        // state.history.unshift(val)
        // 方法二：通过数组length来截取，限制长度
        state.history.unshift(val)
        state.history.length = 5
    },
    // 添加订单数据
    setInfoData(state, data) {
        state.infoData = data
    }
}