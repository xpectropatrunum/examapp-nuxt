export const state = () => ({
    exams: []
})
export const getters = {
    getExams: (state) => {
        return state.exams
    }
}

export const mutations = {
    setExams(state, exams) {
        state.exams = exams
    },
}
