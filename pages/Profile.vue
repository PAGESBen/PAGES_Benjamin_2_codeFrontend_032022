<template>
    <Profile
        :profile='profileLogged'
        owner
    />
</template>

<script>
import {mapState} from 'vuex'

export default {
    name : 'myProfile', 

    computed : {
        ...mapState(['profileLogged'])
    },

    mounted() {
        const userId = this.$store.state.user.userId
        this.$store.dispatch('getUserProfile', userId)
    }
}
</script>