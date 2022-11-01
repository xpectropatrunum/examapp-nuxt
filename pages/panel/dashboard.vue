<template>
     <v-card class="inner-card">

      <h1>
        سلام {{$auth.user.name}}!
        </h1>
    </v-card>

</template>
<script>
export default {
  name:"dashboard",
  transitions: "home",
}
</script>