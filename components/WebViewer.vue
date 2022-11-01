<template>
    <div id='webviewer' ref='viewer'></div>
</template>
  
<script>
export default {
    name: 'WebViewer',
    props: {
        path: String,
        url: String
    },
    mounted: function () {
        import('@pdftron/webviewer').then(() => {

         
            WebViewer({
                path: '../../webviewer',
                initialDoc: this.url, 
            }, this.$refs.viewer).then((instance) => {
             
            });
        })
    }
}
</script>
  
<style>
#webviewer {
    height: 75vh;
}
</style>