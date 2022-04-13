<template>
    <Profile/>
</template>

<script>
export default {
    name : 'myProfile',

    beforeMount() {
        this.$store.commit('ACTIVE_NAV', 'profile')
    }
}
</script>