<template>
    <div>
        <!-- <PostCard v-for="post in posts" :key="post.id"
            :post="post" />
     -->

        <!--pagination -->
        <b-row class="my-5">
            <b-col>
               <b-pagination
                    v-model="page"
                    :total-rows="posts.postsCount"
                    :per-page="limit"
                    size="sm"
                    align="center"
                    class="my-5"
                    @change="nextPage"
                    ></b-pagination>
            </b-col>
        </b-row>
    </div>
</template>

<script>
export default {
    data() {
        return {
            posts : {},
            page : 1,
            limit : 20
        }
    }, 

    async mounted() {
        try {
            this.posts = await this.$axios.$get('/post/' + this.page + '/' + this.limit)
            console.log(this.posts)
        } catch (e) {
            console.log(e)
        }
    },

    methods : {
        async nextPage() {
            try {
                this.posts = await this.$axios.$get('/post/' + this.page + '/' + this.limit)
                console.log(this.posts)
            } catch (e) {
                console.log(e)
            }    
        }
    }
}
</script>
