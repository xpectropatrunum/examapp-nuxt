<template>
  <div id="root">
    

      <pages-login />

    
  </div>



</template>
<script>
export default {
    middleware: ["login"],

  data() {
    return {

    };
  },
  methods: {
    onChange(active) {
      console.log(active);
    }
  }
};
</script>
<style scoped>
.container.center {
  max-width: 400px;
  margin-right: auto;
  margin-top: 20vh;

  margin-left: auto
}

.login-header {
  top: 0;
  width: 100%;
 
  position: absolute;
  height: 30vh;
  background: url(/assets/BG.svg);
   background-color: antiquewhite;
}
</style>
<style>
@import "@/assets/css/style.css";
</style>
