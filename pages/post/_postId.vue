<template>
    <PostCard
        :post="post" 
    />
</template>

<script>

export default {
        name : 'postPage', 

    data : function () {
        return {
            post : []
        }
    },

    async mounted() {
        try {
            this.post = await this.$axios.$get('/post/' + this.$route.params.postId)
            console.log(this.post[0])
        } catch (e) {
            console.log(e)
        } 
    }
}

</script>
