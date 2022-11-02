<template>
  <div>
   

    <h1 class="mb-1">{{ report.exam.title }}</h1>

    <div class="text-gray mb-4" style="font-size: 14px; color: gray">
      {{ report.exam.description }}
    </div>
    <v-row>
      <v-col cols="12" lg="9" md="8">
        <v-card style="border-radius: 8px" class="inner-card">
          <a :href="report.exam.file" class="mb-2" target="_blank">برای مشاهده سوالات در new tab کلیک کنید</a>
          <!-- <WebViewer :url="report.exam.file" /> -->
        </v-card>
      </v-col>
      <v-col cols="12" lg="3" md="4">
        <v-card style="border-radius: 8px" class="inner-booking">
          <div class="justify-space-between d-flex font-14 color-gray">
            <div>زمان صرف شده</div>
            <div>{{ time }}</div>
          </div>
          <div class="justify-space-between d-flex font-14 color-gray">
            <div> تعداد درست </div>
            <div>{{ report.result.c}}</div>
          </div>
          <div class="justify-space-between d-flex font-14 color-gray">
            <div>تعداد نادرست </div>
            <div>{{ report.result.f }}</div>
          </div>
          <div class="justify-space-between d-flex font-14 color-gray">
            <div>تعداد نزده </div>
            <div>{{ report.result.a - report.result.f -  report.result.c }}</div>
          </div>
          <div class="justify-space-between d-flex font-14 color-gray">
            <div>نمره منفی</div>
            <div>{{ report.exam.neg_score ? "دارد" : "ندارد" }}</div>
          </div>

          <div class="option-container" dir="ltr">
            <div class="d-flex justify-space-between mt-2" :v-bind-key="index"
              v-for="(item, index) in Array(report.exam.q_number).fill(0)">
              <div>{{ index + 1 }}</div>
              <div>
                <v-btn-toggle disabled style="max-width: fit-content">
                  <v-btn :style="
                  getCorrectColor(index, 1) + getWrongColor(index, 1)" disabled height="28px" class="t-btn"
                    width="37px" style="padding: 0; min-width: 0">
                    1
                  </v-btn>
                  <v-btn :style="
                  getCorrectColor(index, 2) + getWrongColor(index, 2)" disabled height="28px" class="t-btn"
                    width="37px" style="padding: 0; min-width: 0">
                    2
                  </v-btn>
                  <v-btn :style="
                  getCorrectColor(index, 3) + getWrongColor(index, 3)" disabled height="28px" class="t-btn"
                    width="37px" style="padding: 0; min-width: 0">
                    3
                  </v-btn>
                  <v-btn :style="
                  getCorrectColor(index, 4) + getWrongColor(index, 4)" disabled height="28px" class="t-btn"
                    width="37px" style="padding: 0; min-width: 0">
                    4
                  </v-btn>
                </v-btn-toggle>
              </div>
            </div>
          </div>

        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "exams",
  middleware: ["exam-result"],
  transitions: "home",
  data() {
    return {
      colors: [],
      selectedExam: -1,
      dialog: false,
      dialog1: false,
      uploaded: "",
      file: "",
      loading: false,
      name: this.$auth.user.name,
      counter_sec: 60,
      timer: "",
      answers: {},
      time: "",
      correct: 'background-color: green !important;color: white !important;',
      correct_alt: 'border: 2px green solid!important;color: green !important;font-weight:600;',
      wrong: 'background-color: rgb(219, 0, 0) !important;color: white !important;',
    };
  },
  async fetch() {
    try {
      if (!this.report) {
        var report = await $axios.get("exams/exam-reports/" + route.params.id).then(res => res.data)

        if (report.success) {
          this.$store.commit("report/setReport", report.data);
        } else {
          this.$router.push("/panle/exam-reports")
        }
      }
    } catch (er) {
      this.$toast.error("خطایی رخ داد لطفا بعدا تلاش کنید");
    }
    this.answers = { ...this.report.exam.session.answers }
    var time = this.report.exam.session.elapsed_time;
    if (time < 3600) {
      this.time = new Date(time * 1000)
        .toISOString()
        .slice(14, 19);
    } else {
      this.time = new Date(time * 1000)
        .toISOString()
        .slice(11, 19);
    }


  },

  methods: {
    getWrongColor(index, num) {
      if (this.answers[index + 1] != this.report.result.keys[index]) {
        if (num == this.answers[index + 1]) {
          return this.wrong;

        }
      }
      return "";
    },
    getCorrectColor(index, num) {
      if (num == this.report.result.keys[index]) {
       
          if (this.answers[index + 1] == null) {
            return this.correct_alt;

          }else{ return this.correct;}
        
      }

      return "";
    }




  },
  computed: {
    report() {
      return { ...this.$store.state.report.report };
    },

  },
};
</script>
<style>
.option-container {
  margin: 5px 0;
  overflow-y: auto;
  max-height: 600px;
}

.inner-booking {
  padding: 1rem;
}

.font-14 {
  font-size: 14px;
}
.color-gray{
  color:#585858
}
</style>
<style lang="scss">
.t-btn {
  cursor: default;

  &:hover {}

}
</style>