<template>
  <Posts/>
</template>

<script>
  export default {
    name: 'homePage',

    mounted() {
      this.$store.commit('ACTIVE_NAV', 'homePage')
    }
}

</script>

<style>

</style>
