<template>
  <div>
    <v-card class="inner-card">

      <h1>
        آزمون های من
      </h1>

      <div v-if="this.exams == 0" class="d-flex text-gray text-center pb-3 justify-center" style="height:300px">
      <span style="align-self: center;">هیچ آزمونی برای شما تعریف نشده است.</span>
      </div>

      <v-list-item v-for="item in exams" class="px-2">
       

    {{item.title}}
     </v-list-item>



      
    </v-card>
    <div class="mt-5">
      <img style="float:left" src="/assets/illu/exams.png">
    </div>
  </div>

</template>
<script>
export default {
  name: "exams",
  transitions: "home",
  data() {
    return {
      uploaded: "",
      file: "",
      loading: false,
      name: this.$auth.user.name,

    }
  }
  ,
  async fetch() {
    try {

      if (this.exams == 0) {
        var exams = await this.$axios.get("exams/get").then(res => res.data)
        this.$store.commit("exam/setExams", exams)
      }
 

    } catch (er) {
      this.$toast.error("خطایی رخ داد لطفا بعدا تلاش کنید");

    }


  },
  computed: {
    exams() {
      return [...this.$store.state.exam.exams]
    }

  }

}
</script>
<style>
.inner-card{
  min-height: 300px;
}</style>