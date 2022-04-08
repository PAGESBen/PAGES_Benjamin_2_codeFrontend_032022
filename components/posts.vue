<template>
    <div>
        <PostCard v-for="post in posts" :key="post.id"
            :post="post" />
    </div>
</template>

<script>
export default {
    data() {
        return {
            posts : []
        }
    }, 

    async mounted() {
        try {
            this.posts = await this.$axios.$get('/post/' + 1 + '/' + 10)
            console.log(this.posts)
        } catch (e) {
            console.log(e)
        }
    }
}
</script>
