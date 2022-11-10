
<template>
  <div tabindex="-1" role="group" style="outline: none">
    <div class="c--auth-box">
      <div class="c--auth-box-header">
        <div class="c--auth-box-header-svg"></div>
      </div>
      <div class="auth--body" dir="ltr">
        <div class="auth--logo-box">

          <p class="
              ac--text
              text--align__center
              text--weight__regular
              text--size__regular
              logo-box--slang morabba
            " dir="auto" auto-dir="auto">
            دکترشو
          </p>
        </div>
        <div :class="error || success? '':'op-0'" >
          <v-alert rtl border="left" dense elevation="1" :type="error ? 'error':'success'">{{ error ? error:success }}</v-alert>
        </div>
      
        <p class="
            ac--text
            text--align__center
            text--weight__regular
            text--size__normal
            sign-in--hint
          " dir="auto" auto-dir="auto">
          {{ login_msg }}
        </p>
        <div class="sign-in--phone-box">
        
          

          <v-otp-input @finish="signIn" reverse v-model="code" v-if="action == 1 && stage == 1" length="4"
            type="number">
          </v-otp-input>
          <div v-if="action == 1 && stage == 1" class="text-center mt-2 code-resend" @click="resendCode">
            {{ code_resend }}
          </div>

          <v-text-field @keyup.13="signIn" reverse class="centered-input" v-if="stage == 0" filled rounded solo dense
            v-model="phone" :rules="[
              () => !!phone || 'این فیلد الزامی است',
              () => !!validPhone || 'شماره موبایل صحیح نمی باشد',
            ]" required label="09123456789" prepend-inner-icon="mdi-phone"></v-text-field>

          <v-text-field @keyup.13="signIn" reverse v-if="action == 0 && stage == 1" class="centered-input" filled
            rounded solo dense v-model="password" name="password" :rules="[() => !!password || 'این فیلد الزامی است']"
            :type="show1 ? 'text' : 'password'" @click:append="show1 = !show1" required label="کلمه عبور"
            prepend-inner-icon="mdi-cursor-text"></v-text-field>

          <v-text-field @keyup.13="signIn" reverse v-if="action == 1 && stage == 2" filled rounded solo dense
            v-model="name" :rules="[() => !!name || 'این فیلد الزامی است']" required label="نام شما"
            class="centered-input" prepend-inner-icon="mdi-account">
          </v-text-field>

          <v-text-field @keyup.13="signIn" reverse v-if="action == 1 && stage == 2" class="centered-input" filled
            rounded solo dense v-model="password" name="password" :rules="[
              () => !!password || 'این فیلد الزامی است',
              () => !!validPassword || 'رمز عبور حداقل 6 رقمی باشد',
            ]" :type="show1 ? 'text' : 'password'" @click:append="show1 = !show1" required label="کلمه عبور"
            prepend-inner-icon="mdi-cursor-text"></v-text-field>

          <v-text-field @keyup.13="signIn" reverse v-if="action == 1 && stage == 2" class="centered-input" filled
            rounded solo dense v-model="confirm_password" name="confirm_password" :rules="[
              () =>
                !!(confirm_password == password) ||
                'رمز عبور با تکرار آن مطابقت ندارد',
            ]" :type="show2 ? 'text' : 'password'" @click:prepend="show2 = !show2" required label="تکرار کلمه عبور"
            prepend-inner-icon="mdi-cursor-text"></v-text-field>



        </div>



        <div style="display: flex;justify-content: center;width:100%;height:200px">
          <img style="object-fit: cover;" src="/assets/illu/login.png">
        </div>
        <v-btn v-if="stage == 0" rounded depressed style="margin-top: auto" :loading="loading"
          :disabled="!validPhone || loading" color="primary" @click="signIn">
          ادامه
        </v-btn>
        <v-btn v-if="stage == 1 && action == 1" rounded depressed style="margin-top: auto" :loading="loading"
          :disabled="!validCode || loading" color="primary" @click="signIn">
          بعدی
        </v-btn>
        <v-btn v-if="stage == 2 && action == 1" rounded depressed style="margin-top: auto" :loading="loading"
          :disabled="!validFinal || loading" color="primary" @click="signIn">
          تکمیل ثبت نام
        </v-btn>
        <v-btn v-if="stage == 1 && action == 0" rounded depressed style="margin-top: auto" :loading="loading"
          :disabled="!validLogin || loading" color="primary" @click="signIn">
          ورود
        </v-btn>

      </div>
    </div>
    <div class="footer-cp">
        طراحی و توسعه توسط
        <a target="_blank" href="https://sourcearena.ir">سورس آرنا</a> 
      </div>

    </div>
</template>
<script>
export default {
  transition: {
    afterLeave(el) { },
  },
  loading: {
    color: 'blue',
    height: '5px'
  },
  name: "Login",
  data() {
    return {
      login_msg: "شماره تلفن همراه خود را وارد کنید",
      stage: 0,
      show2: false,
      show1: false,
      action: 0,
      code: "",
      phone: "",
      loading: false,
      code_resend: "ارسال کد",
      remain: 60,
      error: "",
      name: "",
      success: "",
      password: "",
      confirm_password: "",
    };
  },

  
  methods: {
    refresh() {
      this.$nuxt.refresh();
    },
    async resendCode() {
      this.error = "";
      this.success = "";
      if (this.remain != 61) {
        return 0;
      }
      try {
        var resend = await this.$axios
          .post("register/resend-code", { phone: this.phone })
          .then((res) => res.data);

        if (resend.success == 0) {
          this.error = resend.msg;
        } else {
          this.success = "کد ارسال شد";

          var timer = setInterval(() => {
            this.remain--;
            this.code_resend =
              "ارسال مجدد کد در 00:" +
              (this.remain < 10 ? `0${this.remain}` : this.remain);
            if (this.remain == 0) {
              clearInterval(timer);
              this.code_resend = "ارسال مجدد کد";
              this.remain = 61;
            }
          }, 1000);
        }

        //this.error = (check.action);
      } catch (e) {
        console.log(e);
        this.error = "خطایی رخ داده لطفا بعدا تلاش کنید";
      }
    },
    async signIn() {
      this.error = "";
      this.success = "";

      if (this.stage == 0) {
        if (!this.validPhone || this.loading) {
          return 0;
        }
        this.loading = true;

        try {

          var check = await this.$axios
            .get("login/check?phone=" + this.phone)
            .then((res) => res.data);

          this.action = check.action;
          if (check.success == 0) {
            this.error = check.msg;
          } else {
            this.stage = 1;

            if (this.action == 1) {
              var timer = setInterval(() => {
                this.remain--;
                this.code_resend =
                  "ارسال مجدد کد در 00:" +
                  (this.remain < 10 ? `0${this.remain}` : this.remain);
                if (this.remain == 0) {
                  clearInterval(timer);
                  this.code_resend = "ارسال مجدد کد";
                  this.remain = 61;
                }
              }, 1000);

              this.login_msg = "کد ارسال شده را وارد نمایید";
              this.success = "کد به " + this.phone + " ارسال شد";
            } else {
              this.login_msg = "رمز عبور خود را وارد کنید";
            }
          }



          //this.error = (check.action);
        } catch (e) {
          console.log(e);
          this.error = "خطایی رخ داده لطفا بعدا تلاش کنید";
        }
      }
      //login
      else if (this.stage == 1 && this.action == 0) {
        if (!this.validLogin || this.loading) {
          return 0;
        }
        this.loading = true;

        try {

          var login = await this.$auth
            .loginWith("laravelJWT", {
              data: {
                phone: this.phone,
                password: this.password,
              },
            })
            .then((res) => res.data);
          if (login.success) {
            this.success = "در حال ورود ...";
            this.stage = 2;
            setTimeout(() => { this.$router.push("/panel/dashboard") }, 2000)

          } else {
            this.success = login.msg;
          }

          //this.error = (check.action);
        } catch (e) {
          console.log(e);
          this.error = "اطلاعات نادرست است";
        }
      }
      //register => to verify code
      else if (this.stage == 1 && this.action == 1) {
        if (!this.validCode || this.loading) {
          return 0;
        }
        this.loading = true;

        try {
          var verify = await this.$axios
            .post("register/verify-code", {
              phone: this.phone,
              code: this.code,
            })
            .then((res) => res.data);

          if (!verify.success) {
            this.error = verify.msg;
          } else {
            this.stage = 2;
            this.login_msg = "نام خود را به همراه رمزعبور جدید وارد نمایید";
          }

          //this.error = (check.action);
        } catch (e) {
          console.log(e);
          this.error = "خطایی رخ داده لطفا بعدا تلاش کنید";
        }
      }
      //register => finish
      else if (this.stage == 2 && this.action == 1) {
        if (!this.validFinal || this.loading) {
          return 0;
        }
        this.loading = true;

        try {
          var finish = await this.$axios
            .post("register/finish", {
              phone: this.phone,
              code: this.code,
              name: this.name,
              password: this.password,
              confirm_password: this.confirm_password,
            })
            .then((res) => res.data);

          if (finish.success) {
            this.stage = 3;
            this.login_msg = "اتمام ثبت نام";
            this.success = finish.msg;
            this.$auth.setUserToken(finish.token, finish.token);
            setTimeout(() => { this.$router.push("/panel") }, 2000)

          } else {
            this.success = finish.msg;
          }

          //this.error = (check.action);
        } catch (e) {
          console.log(e);
          this.error = "خطایی رخ داده لطفا بعدا تلاش کنید";
        }
      }

      this.loading = false;
    },
  },

  computed: {
    validPhone() {
      if (this.phone.length == 11 && this.phone.startsWith("09")) {
        return true;
      }
      return false;
    },
    validCode() {
      if (this.code.length == 4) {
        return true;
      }
      return false;
    },
    validPassword() {
      if (this.password.length >= 6) {
        return true;
      }
      return false;
    },
    validLogin() {
      if (this.password) {
        return true;
      }
      return false;
    },

    validFinal() {
      if (
        this.password.length == this.confirm_password.length &&
        this.name &&
        this.validPassword
      ) {
        return true;
      }
      return false;
    },
  },
  fetchOnServer: true,
};
</script>
<style>
.v-text-field.centered-input input {
  text-align: center!important;
}
.footer-cp{
  width: 100%;
    color: black;
    z-index: 1000;
    position: fixed;
    bottom: 5px;
    text-align: center;
}
.code-resend {
  font-weight: 600;
  cursor: pointer;
}
.op-0{
  opacity: 0;
}
</style>
<style lang="scss">
.v-text-field.centered-input .v-label {
  left: 50% !important;
  transform: translateX(-50%);
  text-align: center;

  &.v-label--active {
    transform: translateY(-18px) scale(0.75) translateX(-50%);
  }
}
</style>