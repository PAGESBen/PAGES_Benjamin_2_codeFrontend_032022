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

    async mounted() { //!jeremy : Faut il un try catch ou une promesse pour gerer les erreurs
        console.log(this.$route.params.userId)
        const userId = this.$store.state.user.userId
        await this.$store.dispatch('getUserProfile', userId)
    }
}
</script>