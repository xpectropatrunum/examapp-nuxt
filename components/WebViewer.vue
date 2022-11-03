<template>
     <embed :src="url" height="900px" />
</template>
  
<script>
export default {
    name: 'WebViewer',
    props: {
        path: String,
        url: String
    },
    
}
</script>
  
<style>
#webviewer {
    height: 75vh;
}
</style>