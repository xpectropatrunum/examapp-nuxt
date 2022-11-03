<template>
  <div>
    <v-row justify="center">
      <v-dialog persistent right v-model="dialog" max-width="500">
        <v-card style="direction: rtl">
          <v-card-title class="font-bold"> وقت تموم شد </v-card-title>

          <v-card-text>
            امیدوارم آزمون خوبی داده باشی، الان وقت دیدن جوابه!
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="endExams(true)">
              بزن بریم
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

    <v-row justify="center">
      <v-dialog right v-model="dialog1" max-width="500">
        <v-card style="direction: rtl">
          <v-card-title class="font-bold"> هشدار </v-card-title>

          <v-card-text> واقعا میخوای تموم کنی؟ </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="gray darken-1" text @click="dialog1 = false">
              نه هنور
            </v-btn>
            <v-btn color="red darken-1" text @click="endExams(true)">
              آره
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

    <h1 class="mb-1">{{ startedExam.title }}</h1>

    <div class="text-gray mb-4" style="font-size: 14px; color: gray">
      {{ startedExam.description }}
    </div>
    <v-row>
      <v-col cols="12" lg="9" md="8">
        <v-card style="border-radius: 8px" class="inner-card">
          <a :href="startedExam.file" class="mb-2" target="_blank">برای مشاهده سوالات در new tab کلیک کنید</a>
          <WebViewer :url="startedExam.file" />
        </v-card>
      </v-col>
      <v-col cols="12" lg="3" md="4">
        <v-card style="border-radius: 8px" class="inner-booking">
          <div class="justify-space-between d-flex font-14">
            <div>زمان باقی مانده</div>
            <div>{{ timer }}</div>
          </div>
          <div class="justify-space-between d-flex font-14">
            <div>نمره منفی</div>
            <div>{{ startedExam.neg_score ? "دارد" : "ندارد" }}</div>
          </div>

          <div class="option-container" dir="ltr">
            <div class="d-flex justify-space-between mt-2" :v-bind-key="index"
              v-for="(item, index) in Array(parseInt(startedExam.q_number)).fill(0)">
              <div>{{ index + 1 }}</div>
              <div>
                <v-btn-toggle @change="submitAnswer(index + 1)" v-model="answers[index + 1]"
                  style="max-width: fit-content" :color="colors[index + 1] ?? 'green'">
                  <v-btn height="28px" width="37px" style="padding: 0; min-width: 0">
                    1
                  </v-btn>
                  <v-btn height="28px" width="37px" style="padding: 0; min-width: 0">
                    2
                  </v-btn>
                  <v-btn height="28px" width="37px" style="padding: 0; min-width: 0">
                    3
                  </v-btn>
                  <v-btn height="28px" width="37px" style="padding: 0; min-width: 0">
                    4
                  </v-btn>
                </v-btn-toggle>
              </div>
            </div>
          </div>
          <div class="justify-space-between d-flex font-14">
            <v-btn class="m-0 mt-4 col-12" style="padding: 0;color:white" :loading="loading" :disabled="loading"
              color="red darken-2" @click="endExams(false)">
              اتمام
              <template v-slot:loader>
                <span class="custom-loader">
                  <v-icon light>mdi-cached</v-icon>
                </span>
              </template>
            </v-btn>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "exams",
  middleware: ["exam"],
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
    };
  },
  async fetch() {
    try {
      if (!this.startedExam.id) {
        var startedExam = await this.$axios
          .get("exams/get/" + this.$route.params.id)
          .then((res) => res.data);
        this.$store.commit("exam/setExam", startedExam.data);
      }
      this.counter_sec = this.startedExam.remained;

      var obj = { ...this.startedExam.session.answers };
      for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
          obj[key] -= 1;
        }
      }

      this.$store.commit("exam/setAnswer", obj);
    } catch (er) {
      console.log(er);
      this.$toast.error("خطایی رخ داد لطفا بعدا تلاش کنید");
    }
    console.log(this.startedExam);
  },
  mounted() {
    setInterval(() => {
      if (this.counter_sec > 0) {
        this.counter_sec--;
        if (this.counter_sec < 3600) {
          this.timer = new Date(this.counter_sec * 1000)
            .toISOString()
            .slice(14, 19);
        } else {
          this.timer = new Date(this.counter_sec * 1000)
            .toISOString()
            .slice(11, 19);
        }
      } else {
        this.dialog = true;
      }
    }, 1000);
  },
  methods: {
    async endExams(permitted = false) {
      if (!permitted) {
        this.dialog1 = true;
      } else {
        this.dialog1 = false;
        try {
          this.loading = true;
          var end = await this.$axios
            .post(`exams/${this.startedExam.id}/finish`)
            .then(res => res.data);
          if (end.success) {
            window.location.href = "/panel/exam-results"
          } else {
            this.$toast.error("خطایی رخ داد لطفا دوباره تلاش کنید");
          }
        } catch (err) {
          this.$toast.error("خطایی رخ داد لطفا دوباره تلاش کنید");
        }
        this.loading = false;
      }
    },
    async submitAnswer(index) {

      try {
        var request = await this.$axios
          .post(
            `exams/${this.startedExam.id}/submit-answer`,
            {
              q: index,
              a: this.answers[index] + 1,
            },
            { progress: false }
          )
          .then((res) => res.data);
        if (request.success) {
          this.colors[index] = "green";
        } else {
          this.$toast.error("دوباره تلاش کنید");
          this.colors[index] = "red";
        }
      } catch (err) {
        this.$toast.error("دوباره تلاش کنید");
        this.colors[index] = "red";
      }
    },
  },
  computed: {
    exams() {
      return [...this.$store.state.exam.exams];
    },
    startedExam() {
      return { ...this.$store.state.exam.startedExam };
    },
    answers() {
      return { ...this.$store.state.exam.answers };
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
</style>