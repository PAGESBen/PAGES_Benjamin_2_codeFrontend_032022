<template>
    <div>
        <PostCard v-for="post in posts.posts" :key="post.id"
            :post="post" feed />

        <!--pagination -->
        <b-row class="my-5">
            <b-col>
                <div v-if="posts.postsCount != postsLoaded" class="w-100 d-flex justify-content-end m-2">
                    <b-button variant="secondary" size="sm" @click="nextPage()">Afficher plus de posts</b-button>
                </div>
            </b-col>
        </b-row>
    </div>
</template>

<script>
export default {
    data() {
        return {
            posts : {
                posts : []
            },
            page : 1,
            limit : 20
        }
    },

    computed : {
        postsLoaded () {return this.posts.posts.length}
    },


    async mounted() {
        try {
            this.posts = await this.$axios.$get('/post/' + this.page + '/' + this.limit)
        } catch (e) {
            console.log(e)
        }
    },

    methods : {
        async nextPage() {
            try {
                this.page += 1
                let res = await this.$axios.$get('/post/' + this.page + '/' + this.limit)
                this.posts.posts = this.posts.posts.concat(res.posts)
            } catch (e) {
                console.log(e)
            } 
        }
    }
}
</script>
