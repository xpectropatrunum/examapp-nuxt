export default async function ({ $axios, store, redirect, route }) {

  try {

    var report = await $axios.get("exams/exam-reports/" + route.params.id).then(res => res.data)
    if (report.success == 1) {
    } else {
      return redirect('/panel/exam-results')
    }
    store.commit("report/setReport", report.data)
  } catch (err) {
    return redirect('/panel/exam-results')
  }

}