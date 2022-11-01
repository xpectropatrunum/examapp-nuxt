<template>
    <div>
        <v-row justify="center">

            <v-dialog persistent right v-model="dialog" max-width="500">
                <v-card style="direction:rtl">
                    <v-card-title class="font-bold">
                        وقت تموم شد
                    </v-card-title>

                    <v-card-text>
                        امیدوارم آزمون خوبی داده باشی، الان وقت دیدن جوابه!
                    </v-card-text>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="green darken-1" text @click="redirectToResult()">
                            بزن بریم
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-row>


        <h1 class="mb-1"> {{ startedExam.title }}</h1>

        <div class="text-gray mb-4" style="font-size:14px; color:gray"> {{ startedExam.description }} </div>
        <v-row>

            <v-col cols="12" lg="9" md="8">
                <v-card style="border-radius:8px" class="inner-card">
                    <a :href="startedExam.file" class="mb-2" target="_blank">برای مشاهده سوالات در new tab کلیک کنید</a>
                    <!-- <WebViewer :url="startedExam.file" /> -->
                </v-card>
            </v-col>
            <v-col cols="12" lg="3" md="4">
                <v-card style="border-radius:8px" class="inner-booking">
                    <div class="justify-space-between d-flex font-14">
                        <div>زمان باقی مانده</div>
                        <div> {{ timer }}</div>
                    </div>
                    <div class="justify-space-between d-flex font-14">
                        <div>نمره منفی</div>
                        <div> {{ startedExam.neg_score ? "دارد" : "ندارد" }}</div>
                    </div>

                    <div class="mt-2" :v-bind-key="index" v-for="(item, index) in  Array(startedExam.q_number).fill(0)"
                        dir="ltr">

                        <div class="d-flex justify-space-between">
                            <div> {{ index + 1 }}</div>
                            <div>
                                <v-btn-toggle @change="submitAnswer(index + 1)" v-model="answers[index + 1]"
                                    style="max-width:fit-content" :color="colors[index + 1] ?? 'green'">
                                    <v-btn height="28px" width="37px" style="padding:0;min-width:0">
                                        1
                                    </v-btn>
                                    <v-btn height="28px" width="37px" style="padding:0;min-width:0">
                                        2
                                    </v-btn>
                                    <v-btn height="28px" width="37px" style="padding:0;min-width:0">
                                        3
                                    </v-btn>
                                    <v-btn height="28px" width="37px" style="padding:0;min-width:0">
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
    middleware: ["exam"],
    transitions: "home",
    data() {
        return {
            colors: [],
            selectedExam: -1,
            dialog: false,
            uploaded: "",
            file: "",
            loading: false,
            name: this.$auth.user.name,
            counter_sec: 60,
            timer: "",




        }
    }
    ,
    async fetch() {
        try {
            if (!this.startedExam.id) {
                var startedExam = await this.$axios.get("exams/get/" + this.$route.params.id).then(res => res.data)
                this.$store.commit("exam/setExam", startedExam.data)
            }
            this.counter_sec = this.startedExam.remained

            var obj = {...this.startedExam.session.answers}
            for (var key in obj) {
                if (obj.hasOwnProperty(key)) {
                    obj[key] -= 1;
                }
            }



            this.$store.commit("exam/setAnswer", obj)



        } catch (er) {
            console.log(er)
            this.$toast.error("خطایی رخ داد لطفا بعدا تلاش کنید");
        }
        console.log(this.startedExam)



    },
    watch: {

        timer: {
            handler(value) {


                if (this.counter_sec > 0) {
                    setTimeout(() => {
                        this.counter_sec--;
                        if (this.counter_sec < 3600) {
                            this.timer = new Date(this.counter_sec * 1000).toISOString().slice(14, 19);
                        } else {
                            this.timer = new Date(this.counter_sec * 1000).toISOString().slice(11, 19);
                        }

                    }, 1000);
                } else {
                    this.dialog = true
                }

            },
            immediate: true
        }

    },
    methods: {
        async submitAnswer(index) {
            this.colors[index] = "orange"

            try {
                var request = await this.$axios.post(`exams/${this.startedExam.id}/submit-answer`, {
                    q: index, a: this.answers[index] + 1
                }).then(res => res.data)
                if (request.success) {
                    this.colors[index] = "green"

                } else {
                    this.$toast.error("دوباره تلاش کنید")
                    this.colors[index] = "red"
                }
            } catch (err) {
                this.$toast.error("دوباره تلاش کنید")
                this.colors[index] = "red"
            }





        }

    },
    computed: {
        exams() {
            return [...this.$store.state.exam.exams]
        },
        startedExam() {
            return { ...this.$store.state.exam.startedExam }
        },
        answers() {
            return { ...this.$store.state.exam.answers }
        }

    }

}
</script>
<style>
.inner-booking {
    padding: 1rem;
    overflow-y: auto;
    max-height: 600px;
}

.font-14 {
    font-size: 14px;
}
</style>