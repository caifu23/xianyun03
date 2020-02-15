export const state = () => {
    return {
        // 机票搜索历史
        history: []
    }
}

export const mutations = {
    // 添加搜索历史
    addFlightsHistory(state, val) {
        // 限制存储历史记录 5条，最新的在前面
        if(state.history.length >= 5) {
            state.history.pop()
        }
        state.history.unshift(val)
    }
}