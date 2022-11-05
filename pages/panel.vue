<template>

   <!-- :mini-variant="!device.isMobile ? mini : false" -->
  <v-app light>

    <v-navigation-drawer v-if="!device.isMobile" dark class="primary z-100" height="-webkit-fill-available" expand-on-hover
    :mini-variant.sync="mini"
      style="border-top-right-radius: 0; border-bottom-right-radius: 0" permanent fixed right
      v-model="drawer">
      <v-list-item class="px-2">
        <v-btn v-if="device.isMobile" icon @click.stop="drawer = !drawer">
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
        <v-list-item-title v-if="!device.isMobile ? !mini:true " class="text-right">{{
            $auth.user.name
        }}</v-list-item-title>
        <v-list-item-avatar>
          <v-img :src="$auth.user.image"></v-img>
        </v-list-item-avatar>
        
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item :to="item.link" :nuxt="true" v-for="item in items" :key="item.title" link>
          <v-list-item-content  v-if="!device.isMobile ? !mini:true ">
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
              <v-icon>mdi-logout-variant</v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-list>
      </template>
    </v-navigation-drawer>
    <v-navigation-drawer v-else dark class="primary z-100" height="-webkit-fill-available" 

      style="border-top-right-radius: 0; border-bottom-right-radius: 0"  fixed right
      v-model="drawer">
      <v-list-item class="px-2">
        <v-btn v-if="device.isMobile" icon @click.stop="drawer = !drawer">
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
        <v-list-item-title class="text-right">{{
            $auth.user.name
        }}</v-list-item-title>
        <v-list-item-avatar>
          <v-img :src="$auth.user.image"></v-img>
        </v-list-item-avatar>
        
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item :to="item.link" :nuxt="true" v-for="item in items" :key="item.title" link>
          <v-list-item-content  >
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
            <v-list-item-content >
              <v-list-item-title class="text-right">خروج</v-list-item-title>
            </v-list-item-content>
            <v-list-item-icon>
              <v-icon>mdi-logout-variant</v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-list>
      </template>
    </v-navigation-drawer>


    <div class="header bg-gray">
      <div  :class="$route.name == 'panel-dashboard' ? 'op-0':''" style="margin-right:10px;margin-left:5px">

        <v-app-bar-nav-icon v-if="device.isMobile" @click="$router.go(-1)">
          <v-btn icon >
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
        
        </v-app-bar-nav-icon>

      </div>
      <div class="title-header"> دکترشو</div>


      <div  style="margin-right:10px">
        <v-app-bar-nav-icon v-if="device.isMobile" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      </div>


    </div>


    <v-main class="bg-gray">

      <v-container>

        <nuxt-child />
      </v-container>
    </v-main>


  </v-app>




</template>
<script>
export default {
  title: "پنل کاربری",


  loading: {
    color: "blue",
    height: "5px",
  },
  middleware: ["authenticated"],
  asyncData({ app }) {
    let mobile = app.$mobileDetect.mobile()
    app.store.commit('device/setDevice', {
      isMobile: !mobile ? false : true
    })


  },
  mounted() {
    
    this.drawer = !this.device.isMobile
  },


  name: "Dashboard",

  data() {
    return {
      tiny: false,
      drawer: false,
      items: [
        {
          title: "داشبــــــــــــــــورد",
          icon: "mdi-view-dashboard",
          link: "/panel/dashboard",
        },
        { title: "آزمون های مــن", icon: "mdi-book", link: "/panel/exams" },
        { title: "نتایــــج آزمــــون", icon: "mdi-file-chart", link: "/panel/exam-results" },
        { title: "حســـاب کاربـری", icon: "mdi-account", link: "/panel/account" },
      ],
      mini: true,
    };
  },
  computed: {
    device() {
      return { ...this.$store.state.device.device }
    },

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

