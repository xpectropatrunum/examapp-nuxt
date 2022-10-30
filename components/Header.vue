<template>
  <v-card height="100vh">
      <v-toolbar
      style="border-radius:0"
      color="deep-purple black"
      dark
      flat
      right
      reverse

    >


      <v-toolbar-title>داشبورد</v-toolbar-title>

      <v-spacer></v-spacer>

     

     

     
    </v-toolbar>

    <v-navigation-drawer
      class="deep-purple accent-4"
      dark
      absolute
      right
      v-model="drawer"
      :mini-variant.sync="mini"
      permanent
    >
      <v-list-item class="px-2">
        <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/men/85.jpg"></v-img>
        </v-list-item-avatar>

        <v-list-item-title>{{ $auth.user.name }}</v-list-item-title>

        <v-btn icon @click.stop="mini = !mini">
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item v-for="item in items" :key="item.title" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <template v-slot:append>
        <v-list dense>
          <v-list-item @click="logout" link>
            <v-list-item-icon>
              <v-icon>mdi-cog</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>تنظیمات</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item @click="logout" link>
            <v-list-item-icon>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>خروج</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </template>
    </v-navigation-drawer>
  </v-card>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      drawer: true,
      items: [
        { title: "Home", icon: "mdi-home-city" },
        { title: "My Account", icon: "mdi-account" },
        { title: "Users", icon: "mdi-account-group-outline" },
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
