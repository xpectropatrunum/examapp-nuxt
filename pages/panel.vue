<template>
  <div id="root">
    <v-card>
      <v-navigation-drawer
        class="danger accent-4"
        height="100vh"
        style="border-top-right-radius: 0; border-bottom-right-radius: 0"
        dark
        absolute
        right
        expand-on-hover
        v-model="drawer"
        :mini-variant.sync="mini"
        permanent
      >
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
          <v-list-item
            :to="item.link"
            :nuxt="true"
            v-for="item in items"
            :key="item.title"
            link
          >
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
    </v-card>

    <div class="container">
      <nuxt-child />
    </div>
  </div>
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
  .container{

  margin-top:20px;


}
}

#root {
  background-color: #f5f5f5;
  min-height: 100vh;
}
h1 {
  font-size: 25px;
  font-family: morabba;
  font-weight: 800;
  line-height: 1.7;
  margin-top: 13px;
}
</style>