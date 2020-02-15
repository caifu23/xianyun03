export const state = () => {
    return {
        // 机票搜索历史
        history: []
    }
}

export const mutations = {
    // 添加搜索历史
    addFlightsHistory(state, val) {
        state.history.push(val)
    }
}