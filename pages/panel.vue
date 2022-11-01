<template>


  <v-app>

      <v-navigation-drawer class="primary" height="-webkit-fill-available"
        style="border-top-right-radius: 0; border-bottom-right-radius: 0" dark absolute right expand-on-hover
        v-model="drawer" :mini-variant.sync="mini" permanent>
        <v-list-item class="px-2">
          <v-list-item-title v-if="!mini" class="text-right">{{
              $auth.user.name
          }}</v-list-item-title>
          <v-list-item-avatar>
            <v-img :src="$auth.user.image"></v-img>
          </v-list-item-avatar>
          <!-- <v-btn icon @click.stop="mini = !mini">
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn> -->
        </v-list-item>

        <v-divider></v-divider>

        <v-list dense>
          <v-list-item :to="item.link" :nuxt="true" v-for="item in items" :key="item.title" link>
            <v-list-item-content v-if="!mini">
              <v-list-item-title class="text-right">{{
                  item.title
              }}</v-list-item-title>
            </v-list-item-content>
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-list>
        <template v-slot:append>
          <v-list dense>
            <v-list-item @click="logout" link>
              <v-list-item-content v-if="!mini">
                <v-list-item-title class="text-right">خروج</v-list-item-title>
              </v-list-item-content>
              <v-list-item-icon>
                <v-icon>mdi-logout</v-icon>
              </v-list-item-icon>
            </v-list-item>
          </v-list>
        </template>
      </v-navigation-drawer>


  
      <div class="header bg-gray">
      <div class="pl-2">
        <a  v-if="false" data-v-e4424248="" class="switch-theme">
          <svg v-if="!$vuetify.theme.dark" @click="$vuetify.theme.dark = true" data-v-e4424248="" height="28.812" viewBox="0 0 27.337 28.812"
            width="27.337" xmlns="http://www.w3.org/2000/svg" class="moon uk-svg">
            <path data-v-e4424248=""
              d="M6598.5,989.758a13.5,13.5,0,0,1-2.254-26.812,12.437,12.437,0,0,0,14.093,19.806A13.511,13.511,0,0,1,6598.5,989.758Z"
              fill="none" id="Moon" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              transform="translate(-6584 -961.947)"></path>
          </svg>
          <svg v-else @click="$vuetify.theme.dark = false" data-v-e4424248="" fill="none" height="24" viewBox="0 0 24 24" width="24"
            xmlns="http://www.w3.org/2000/svg" class="sun uk-svg">
            <path data-v-e4424248=""
              d="M15.25 12C15.25 13.7949 13.7949 15.25 12 15.25C10.2051 15.25 8.75 13.7949 8.75 12C8.75 10.2051 10.2051 8.75 12 8.75C13.7949 8.75 15.25 10.2051 15.25 12Z"
              stroke="#141414" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path>
            <path data-v-e4424248="" d="M12 2.75V4.25" stroke="#141414" stroke-linecap="round" stroke-linejoin="round"
              stroke-width="1.5"></path>
            <path data-v-e4424248="" d="M17.2501 6.75L16.0659 7.93417" stroke="#141414" stroke-linecap="round"
              stroke-linejoin="round" stroke-width="1.5"></path>
            <path data-v-e4424248="" d="M21.25 12.0001L19.75 12.0001" stroke="#141414" stroke-linecap="round"
              stroke-linejoin="round" stroke-width="1.5"></path>
            <path data-v-e4424248="" d="M17.2501 17.2501L16.0659 16.066" stroke="#141414" stroke-linecap="round"
              stroke-linejoin="round" stroke-width="1.5"></path>
            <path data-v-e4424248="" d="M12 19.75V21.25" stroke="#141414" stroke-linecap="round" stroke-linejoin="round"
              stroke-width="1.5"></path>
            <path data-v-e4424248="" d="M7.93414 16.0659L6.75 17.25" stroke="#141414" stroke-linecap="round"
              stroke-linejoin="round" stroke-width="1.5"></path>
            <path data-v-e4424248="" d="M4.25 12.0001L2.75 12.0001" stroke="#141414" stroke-linecap="round"
              stroke-linejoin="round" stroke-width="1.5"></path>
            <path data-v-e4424248="" d="M7.93402 7.93423L6.74988 6.75003" stroke="#141414" stroke-linecap="round"
              stroke-linejoin="round" stroke-width="1.5"></path>
          </svg></a>
      

      </div>
      <div class="title-header"> دکترشو</div>
      
  
      <div>
      </div>
      

    </div>
   

    <v-main class="bg-gray">

      <v-container >

        <nuxt-child />
      </v-container>
    </v-main>


  </v-app>




</template>
<script>
export default {
  loading: {
    color: "blue",
    height: "5px",
  },
  middleware: ["authenticated"],

  name: "Dashboard",

  data() {
    return {
      drawer: true,
      items: [
        {
          title: "داشبورد",
          icon: "mdi-view-dashboard",
          link: "/panel/dashboard",
        },
        { title: "آزمون های من", icon: "mdi-book", link: "/panel/exams" },
        { title: "حساب کاربری", icon: "mdi-account", link: "/panel/account" },
      ],
      mini: true,
    };
  },
  methods: {
    async logout() {
      var logout = await this.$auth.logout();
      setTimeout(() => {
        this.$router.push("/");
      }, 2000);
    },
  },
};
</script>
<style>
.header {

  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 57px;
  border-bottom: 1px #cdcdcd solid;
}

.header .title-header {
  font-family: morabba;
  font-size: 22px;
  font-weight: 900;

}

.inner-card {
  padding: 1rem 3rem 3rem 2rem;
}

.container {
  direction: rtl;
  text-align: right;
  margin-top: 50px;
  padding-right: 70px;
  padding-bottom: 50px;
}

@media screen and (max-width: 600px) {
  .inner-card {
    padding: 1rem 1rem 1rem 1.5rem;
  }

  .container {

    margin-top: 20px;


  }
}

.bg-gray {
  background-color: #f5f5f5;

}
.v-list.v-sheet.v-list--dense{
  padding-top:0
}
h1 {
  font-size: 25px;
  font-family: morabba;
  font-weight: 800;
  line-height: 1.7;
  margin-top: 13px;
}
</style>
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
