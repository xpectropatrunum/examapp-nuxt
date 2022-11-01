export const state = () => ({
    exams: [],
    startedExam: {},
    answers: {},

    
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
    setExam(state, exam) {
        state.startedExam = exam
    },
    setAnswer(state, answers) {
        state.answers = answers
    },
}
