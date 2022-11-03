<template>

<object width="100%" height="600" type="application/pdf" :data="url ">
    <p>خطا! pdf را در new tab باز کنید</p>
</object>
    
</template>
  
<script>
export default {
    name: 'WebViewer',
    props: {
        url: String
    },
    
}
</script>
  
