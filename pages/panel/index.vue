<template>
  <v-card class="inner-card">

    <h1>
      سلام {{ $auth.user.name }}!
    </h1>
  </v-card>

</template>
<script>
export default {

  computed: {
    user() {
      return { ...this.$store.state.user.user };
    },
  },
  name: "index",
  transitions: "home",
}
</script>