<template>
    <div>

        <h1 class="my-3">Fil d'actualités</h1>

        <b-row>
            <b-col>
                <b-alert :show="alert.show" dismissible :variant="alert.variant" class="w-100 my-2">
                    {{alert.message}}
                </b-alert>
            </b-col>
        </b-row>

        <!--pagination -->
        <b-row v-if="!error">
            <b-col cols="12">
                <PostCard 
                    v-for="post in posts.posts" 
                    :key="post.id"
                    :post="post" feed 
                />
            </b-col>

            <b-col cols="12" class="my-5">
                <div v-if="posts.postsCount != postsLoaded" class="w-100 d-flex justify-content-end m-2">
                    <b-button variant="primary" size="sm" @click="nextPage()">Afficher plus de posts</b-button>
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
            limit : 20,
            error : false,
            alert : {
                show : false,
                variant : '',
                message : ''
            }
        }
    },

    computed : {
        postsLoaded () {return this.posts.posts.length}
    },

    async mounted() {
        try {
            this.posts = await this.$axios.$get('/post/' + this.page + '/' + this.limit)
        } catch (e) {
            this.error = true
            console.log(e)
            this.alert.show = true
            this.alert.variant = 'danger'
            this.alert.message = 'Une erreur est survenue, veuillez réactualiser la page'
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
