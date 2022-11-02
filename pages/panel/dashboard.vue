<template>
  <div>
    <h1 class="mb-1">سلام {{ name }}!</h1>


    <v-card style="border-radius:8px" class="inner-card">

      <v-row>
        <v-col cols="12" sm="6" v-html="$auth.user.dashboard_msg">


        </v-col>
        <v-col cols="12" sm="6">
          <img style="float:left" src="/assets/illu/dashboard.png">
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>
<script>
export default {

  metaInfo: {
    title: "داشبورد"
  },
  data() {
    return {
      name: this.$auth.user.name,
    };
  },




  name: "dashboard",
  transitions: "home",
};
</script>
