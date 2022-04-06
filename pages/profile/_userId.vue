<template>
    <Profile
        :profile="profile"
        :owner="owner"
    />
</template>

<script>

export default {

    name : 'profile',
    data : function () {
        return {
            profile : {
                firstname : '',
                lastname : '',
                email : '',
                imageURL : '',
                position : '',
                id:''
            }, 
            owner : false
        }
    },

    async mounted() {
        const userId = this.$route.params.userId

        console.log(userId)

        this.profile = await this.$store.dispatch('getUserProfile', userId)

        console.log(this.profile)

        if(this.profile.id == this.$store.state.user.userId) {
            this.owner = true
        }
    }
}
</script>