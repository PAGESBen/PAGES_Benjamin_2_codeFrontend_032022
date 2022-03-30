<template>
    <PostCard/>
</template>

<script>
  export default {
    name: 'IndexPage',
    // mounted(){
    //   this.$nuxt.$axios({
    //     url : '/post/1/2',
    //     method : 'get'
    //   })
    // }

    mounted : function () {
    // console.log(this.$store.state.user.userId)
    if(this.$store.state.user.userId == -1) {
        this.$bvModal.show('logModal')
    }
  }
}

</script>

<style>

</style>
