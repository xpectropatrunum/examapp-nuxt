<template>

<iframe style="margin-top:10px" frameborder="0" allowfullscreen width="100%" height="600" type="application/pdf" :src="'https://docs.google.com/gview?embedded=true&url=' + url"/>
    
</template>
  
<script>
export default {
    name: 'WebViewer',
    props: {
        url: String
    },
    
}
</script>
  
