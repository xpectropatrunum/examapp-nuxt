<template>
  <div>

   

    <h1 class="mb-1"> نتایج آزمون</h1>
    <div class="text-gray mb-4" style="font-size:14px; color:gray">گزارش مورد نظر را انتخاب و مشاهده نمایید</div>

    <v-card v-if="this.reports == 0 && loaded" style="border-radius:8px;padding:1rem">

      <div class="d-flex text-gray text-center items-center justify-center">
        <span style="align-self: center;">هیچ گزارشی وجود ندارد.</span>
      </div>
    </v-card>

    <v-row>


      <v-col v-if="!loaded && loading" sm="4" md="4" cols="12" class="p-2">
        <v-card style="border-radius:8px;" class="p-0">
          <v-skeleton-loader class="main-logo" type="card-avatar"></v-skeleton-loader>
          <div class="text text-row">
            <div class="name-choose">
              <div class="name">
                <v-skeleton-loader class="latin-font" type="list-item"></v-skeleton-loader>
              </div>
            </div>
            <div class="infos mt-2">
              <v-skeleton-loader type="text@4"></v-skeleton-loader>
            </div>

            <div class="choose-box ">
              <v-skeleton-loader class="m-0  col-12 " style="padding:0;margin-top:22px" type="button">
              </v-skeleton-loader>
            </div>
          </div>

        </v-card>
      </v-col>
      <v-col v-if="!loaded && loading" sm="4" md="4" cols="12" class="p-2">
        <v-card style="border-radius:8px;" class="p-0">
          <v-skeleton-loader class="main-logo" type="card-avatar"></v-skeleton-loader>
          <div class="text text-row">
            <div class="name-choose">
              <div class="name">
                <v-skeleton-loader class="latin-font" type="list-item"></v-skeleton-loader>
              </div>
            </div>
            <div class="infos mt-2">
              <v-skeleton-loader type="text@4"></v-skeleton-loader>
            </div>

            <div class="choose-box ">
              <v-skeleton-loader class="m-0  col-12 " style="padding:0;margin-top:22px" type="button">
              </v-skeleton-loader>
            </div>
          </div>

        </v-card>
      </v-col>
      <v-col v-if="!loaded && loading" sm="4" md="4" cols="12" class="p-2">
        <v-card style="border-radius:8px;" class="p-0">
          <v-skeleton-loader class="main-logo" type="card-avatar"></v-skeleton-loader>
          <div class="text text-row">
            <div class="name-choose">
              <div class="name">
                <v-skeleton-loader class="latin-font" type="list-item"></v-skeleton-loader>
              </div>
            </div>
            <div class="infos mt-2">
              <v-skeleton-loader type="text@4"></v-skeleton-loader>
            </div>

            <div class="choose-box ">
              <v-skeleton-loader class="m-0  col-12 " style="padding:0;margin-top:22px" type="button">
              </v-skeleton-loader>
            </div>
          </div>

        </v-card>
      </v-col>



      <v-col v-for="item in reports" sm="4" md="4" cols="12" class="p-2">
        <v-card style="border-radius:8px;" class="p-0">

          <div class="img"><img :src="item.image" alt="" class="main-logo">
          </div>
          <div class="text text-row">
            <div class="name-choose">
              <div class="name">
                <h3 class="latin-font">آزمون {{ item.title }}</h3>
              </div>
            </div>
            <div class="infos mt-2">
              <div class="item"><span>عنـــــــــوان درس</span> <span class="latin-font">{{ item.type }}</span></div>
              <div class="item"><span>تعــــــــداد سوال </span> <span class="latin-font">{{ item.q_number }}</span>
              </div>
              <div class="item"><span>زمان پاسخگویی</span> <span class="latin-font">{{ item.q_time }} دقیقه</span></div>
              <div class="item"><span>نمــــــره منفـــــی </span> <span class="latin-font">{{ item.neg_score == 1 ?
                  "دارد" : "ندارد"
              }}</span></div>
            </div>


            <div class="choose-box ">
              <v-btn v-if="item.resumable" class="m-0  mt-4 col-12" style="padding:0" :loading="loading"
                :disabled="loading" color="success" @click="resumeExam(item.id)">
                ادامه
                <template v-slot:loader>
                  <span class="custom-loader">
                    <v-icon light>mdi-cached</v-icon>
                  </span>
                </template>
              </v-btn>

              <v-btn v-else class="m-0  mt-4 col-12" style="padding:0" :loading="loading"
                :disabled="loading || resumableExam" color="primary" @click="startExam(item.id)">
                شروع کن
                <template v-slot:loader>
                  <span class="custom-loader">
                    <v-icon light>mdi-cached</v-icon>
                  </span>
                </template>
              </v-btn>


            </div>
          </div>




        </v-card>




      </v-col>


    </v-row>



    <div class="mt-5">
      <img style="float:left" src="/assets/illu/result.png">
    </div>
  </div>

</template>
<script>
export default {
  name: "reports",
  transitions: "home",
  data() {
    return {
      selectedExam: -1,
      dialog: false,
      uploaded: "",
      loaded: false,
      file: "",
      resumableExam: false,
      loading: true,
      name: this.$auth.user.name,

    }
  }
  ,
  async fetch() {
    try {

      if (this.reports == 0) {
        var exams = await this.$axios.get("exams/exam-reports").then(res => res.data.data)
        this.$store.commit("report/setReports", exams.filter(item => item.completed == 0))
      }

    } catch (er) {
      console.log(er)
      this.$toast.error("خطایی رخ داد لطفا بعدا تلاش کنید");

    }
    this.loaded = true
    this.loading = false



  },
  methods: {

    async redirectToReport() {
      this.dialog = false
      this.loading = true
      try {
        var exam = await this.$axios.get(`exams/init/${this.selectedExam}`).then(res => res.data)

        if (exam.success) {
          if (exam.ready) {
            this.$toast.success("در حال تغییر مسیر ...");
            setTimeout(() => { this.$router.push(`/panel/exams/${exam.data.id}`) }, 2000)
          } else {
            this.$toast.error(exam.msg);
            this.loading = false
          }
        } else {
          this.$toast.error(exam.msg);
          this.loading = false
        }

      } catch (err) {
        console.log(err)
        this.loading = false
        this.$toast.error("خطایی رخ داد لطفا بعدا تلاش کنید");

      }




    }
  },
  computed: {
    reports() {
      return [...this.$store.state.report.reports]
    },
    startedExam() {
      return { ...this.$store.state.exam.startedExam }
    }

  }

}
</script>
<style>
.infos .item {
  display: flex;
  justify-content: space-between;
  font-size: 15px;
}

.p-0 {
  padding: 0
}

.p-2 {
  padding: 15px
}

.text-row {
  padding: 7px 15px 15px 15px;


}

.v-skeleton-loader__button.v-skeleton-loader__bone {
  width: 100%;
}

.main-logo {
  border-radius: 8px 8px 0 0;
  width: 100%;
  max-height: 200px;
  -o-object-fit: scale-down;
  object-fit: scale-down;
}
</style>
