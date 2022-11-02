export default async function ({ $axios, store, redirect, route }) {

  try {

    var startedExam = await $axios.get("exams/get/" + route.params.id).then(res => res.data)
    if (startedExam.success == 1 && startedExam.ready == 1 && startedExam.data?.resumable == 1 && startedExam.data?.session.ends_in - new Date().getTime() / 1000 > 0) {
    } else {
      return redirect('/panel/exams')
    }
    store.commit("exam/setExam", startedExam.data)
  } catch (err) {
    return redirect('/panel/exams')
  }

}