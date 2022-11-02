export const state = () => ({
    reports: [],
    report: {},

    
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
    setReport(state, report) {
        state.report = report
    },
    
}
