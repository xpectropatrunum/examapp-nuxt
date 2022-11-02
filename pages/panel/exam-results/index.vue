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



      <v-col  v-bind:key="item.id" v-for="item in reports" sm="4" md="4" cols="12" class="p-2">
        <v-card style="border-radius:8px;" class="p-0">

          <div class="img">

            <v-img aspect-ratio="1" :src="item.exam.image" class="main-logo grey lighten-2">

              <template v-slot:placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>

                </v-row>
              </template>
            </v-img>

          </div>
          <div class="text text-row">
            <div class="name-choose">
              <div class="name">
                <h3 class="latin-font">آزمون {{ item.exam.title }}</h3>
              </div>
            </div>
            <div class="infos mt-2">

              <div class="item"><span>تعـــــــداد ســوال </span> <span class="">{{ item.exam.q_number }}</span></div>
              <div class="item"><span>تعـــــــداد درست </span> <span class="latin-font color-green">{{ item.result.c
              }}</span></div>
              <div class="item "><span>تعــــداد نادرست </span> <span class="latin-font color-red">{{ item.result.f
              }}</span></div>
              <div class="item "><span>درصـــــــــــــــــــــد</span> <span class="ltr latin-font">{{ item.result.p *
                  100
              }}%</span></div>
              <div class="item"><span>نمــــــره منفـــــی </span> <span class="latin-font">{{ item.exam.neg_score == 1
                  ?
                  "دارد" : "ندارد"
              }}</span></div>
            </div>


            <div class="choose-box ">
              <v-btn v-if="item.resumable" class="m-0  mt-4 col-12" style="padding:0" :loading="loading"
                :disabled="loading" color="success" @click="resumeExam(item.id)">
                ادامه
                
              </v-btn>

              <v-btn v-else class="m-0  mt-4 col-12" style="padding:0" :loading="loading" :disabled="loading"
                color="primary" @click="redirectToReport(item.id)">
                مشاهده جزئیات
                
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
  metaInfo: {
    title: "نتایج آزمون",

  },

  name: "reports",
  transitions: "home",
  data() {
    return {
      selectedExam: -1,
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
        this.$store.commit("report/setReports", exams)
      }

    } catch (er) {
      console.log(er)
      this.$toast.error("خطایی رخ داد لطفا بعدا تلاش کنید");

    }
    this.loaded = true
    this.loading = false



  },
  methods: {

    async redirectToReport(id) {
      this.loading = true
      this.$router.push(`/panel/exam-results/${id}`)
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
