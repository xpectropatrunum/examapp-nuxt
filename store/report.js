export const state = () => ({
    reports: [],

    
})
export const getters = {
    getExams: (state) => {
        return state.reports
    }
}

export const mutations = {
    setReports(state, reports) {
        state.reports = reports
    },
}
