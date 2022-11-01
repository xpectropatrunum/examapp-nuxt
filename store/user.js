export const state = () => ({
    user: {}
})
export const getters = {
    getUser: (state) => {
        return state.user
    }
}

export const mutations = {
    setUser(state, user) {
        state.user = user
    },
}
