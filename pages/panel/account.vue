<template>
  <div>
    <v-card class="inner-card">

      <h1>
        حساب کاربری
      </h1>

      <v-row class="mt-4">

        <v-col cols="12" sm="6" md="4">
          <v-text-field @keyup.13="updateAccount" :rules="[
            () => !!name || 'این فیلد الزامی است',
            () => name.search('^[\u0600-\u06FF\uFB8A\u067E\u0686\u06AF\u200C\u200F ]+$') == 0 || 'نام خود را به فارسی وارد کنید',
          ]" label="نام و نام خانوادگی" outlined reverse dense v-model="name"></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" sm="6" md="4">
          <template>
            <v-file-input @change="getFile" v-model="file" :rules="[
              () => !file || file.size < (6 * 1024 * 1024) || 'حجم تصویر باید کمتر از 6 مگابایت باشد',
            ]" accept="image/png, image/jpeg,  image/jpg" reverse placeholder="یک تصویر انتخاب کنید ..."
              prepend-icon="mdi-camera" label="تصویر پروفایل"></v-file-input>
          </template>


        </v-col>
        <v-col cols="12" sm="6" md="4">
          <v-img v-if="uploaded" style="border-radius:50%" height="140" :src="uploaded" width="140"></v-img>
        </v-col>


      </v-row>
      <v-row>
        <v-btn class="ma-2" :loading="loading"
          :disabled="loading || !name || name.search('^[\u0600-\u06FF\uFB8A\u067E\u0686\u06AF\u200C\u200F ]+$') == -1"
          color="info" @click="updateAccount">
          ثبت
          <template v-slot:loader>
            <span class="custom-loader">
              <v-icon light>mdi-cached</v-icon>
            </span>
          </template>
        </v-btn>
      </v-row>
    </v-card>

    <div class="mt-5">
      <img style="float:left" src="/assets/illu/settings.png">
    </div>
  </div>



</template>
<script>
export default {
  data() {
    return {
      uploaded: "",
      file: "",
      loading: false,
      name: this.$auth.user.name,

    }
  }
  ,
  methods: {
    getBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });
    },
    async getFile(file) {



      try {
        this.uploaded = await this.getBase64(file);
        let formData = new FormData();
        formData.append('file', file);
        var upload = await this.$axios.post("users/change-image", formData, {
          headers: {
            'Content-Type': "multipart/form-data; charset=utf-8; boundary=" + Math.random().toString().substr(2)
          }
        }).then(res => res.data)
        if (upload.success) {

          this.$auth.fetchUser()
          this.$toast.success("تصویر با موفقیت آپلود شد");

        } else {
          this.$toast.error(upload.msg);
        }
      } catch (er) {
        // this.$toast.error("خطایی در آپلود تصویر رخ داد لطفا بعدا تلاش کنید.");
      }


    },
    async updateAccount() {
      this.loading = true
      try {
        var req = await this.$axios.post(`users/update`, { name: this.name }).then(res => res.data);
        if (req.success) {
          this.$auth.fetchUser()
          this.$toast.success("اطلاعات با موفقیت بروزرسانی شد");

        } else {
          this.$toast.error(req.msg);
        }
      } catch (er) {

        this.$toast.error("خطایی رخ داد لطفا بعدا تلاش کنید.");

      }


      this.loading = false

    },

  },

  name: "account",
  transitions: "home",
}
</script>
<style>
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}

@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }

  to {
    transform: rotate(360deg);
  }
}

@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }

  to {
    transform: rotate(360deg);
  }
}

@-o-keyframes loader {
  from {
    transform: rotate(0);
  }

  to {
    transform: rotate(360deg);
  }
}

@keyframes loader {
  from {
    transform: rotate(0);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>
