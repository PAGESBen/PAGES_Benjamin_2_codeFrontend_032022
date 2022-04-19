<template>
    <div>

        <b-row>
            <b-col>
                <h1 class="h3 my-2">Post et Commentaires</h1>
            </b-col>
        </b-row>

        <b-row>
            <b-col>
                <b-alert :show="alert.show" dismissible :variant="alert.variant" class="w-100 my-2">
                    {{alert.message}}
                </b-alert>
            </b-col>
        </b-row>

        <div v-if="!error">
            <b-row class="my-3">
                <b-col>
                    <b-skeleton-wrapper :loading="loading" aria-label="loading">
                        <template #loading>
                            <b-card>
                                <div class="d-flex my-3 align-items-center">
                                    <b-skeleton type="avatar mr-3"></b-skeleton>
                                    <b-skeleton width="20%"></b-skeleton>
                                </div>
                                <b-skeleton width="85%"></b-skeleton>
                                <b-skeleton width="55%"></b-skeleton>
                                <b-skeleton width="70%"></b-skeleton>
                            </b-card>
                        </template>
                        <PostCard
                            :aria-busy="loading"
                            :post="post"
                            @delete-post="deletePost"
                            @refreh-post="refreshPost"
                        />
                    </b-skeleton-wrapper>
                </b-col>
            </b-row>

            <b-row v-if="!loading">
                <b-col>
                    <b-button block v-b-toggle.addComment variant="primary">
                        Ajouter un commentaire <br/>
                        <b-icon icon="arrow-bar-down" variant="light" font-scale="1"></b-icon>
                    </b-button>
                    <b-collapse id="addComment" class="mt-2">
                        <b-row class="bg-light p-2">
                            <b-col>
                                <CommentForm 
                                    @refresh-comments="refreshComments"
                                />
                            </b-col>
                        </b-row>
                    </b-collapse>
                </b-col>
            </b-row>

            <b-row class="mt-3 ml-2">
                <b-col cols="1" class="border-right"></b-col>

                <b-col cols="11">
                    <div v-if="commentsCount != 0">
                        <h2 class="h6">Commentaires</h2>

                        <b-list-group flush>
                            <CommentsListItem
                                v-for="comment in comments"
                                :key="comment.id"
                                :comment="comment"
                                @refresh-comments="refreshComments"
                            />
                        </b-list-group>

                        <div v-if="commentsCount != commentsLoaded" class="w-100 d-flex justify-content-end m-2">
                            <b-button variant="primary" size="sm" @click="nextPage()">Afficher plus de commentaires</b-button>
                        </div>
                    </div>

                    <div v-else class="text-center">
                        <span class="h6">Aucun commentaire</span>
                    </div>
                </b-col>
            </b-row>
        </div>

    </div>
</template>

<script>
export default {
    name : 'postPage', 

    data : function () {
        return {
            loading : true,
            error : false,
            post : {}, 
            comments : [], 
            commentsCount : 0,
            page : 1,
            alert : {
                show: false,
                variant : '', 
                message : '' 
            }
        }
    },

    computed : {
        commentsLoaded () {return this.comments.length}
    },

    async mounted() {
        try {
            this.post = await this.$axios.$get('/post/' + this.$route.params.postId)
            let res = await this.$axios.get('/post/' + this.$route.params.postId + '/comment/1/10')
            this.loading = false
            this.comments = res.data.comments
            this.commentsCount = res.data.commentsCount
        } catch (e) {
            this.loading = false
            this.error = true
            console.log(e)
            this.alert.show = true
            this.alert.variant = 'danger'
            this.alert.message = 'Une erreur est survenue, veuillez réactualiser la page ou revenir à l\'accueil'
        } 
    },
    
    methods : {
        async deletePost(payload) {
            try {
                this.alert.show =false
                await this.$axios.delete('/post/' + payload.id)
                this.$router.push('/')
            } catch(e) {
                console.log(e)
                this.alert.show = true
                this.alert.variant = 'danger'
                this.alert.message = 'Une erreur est survenue, veuillez réessayer ulterieurement'
            }
        }, 
        
        nextPage : async function () {
            try {
                this.page += 1
                let res = await this.$axios.get('/post/' + this.$route.params.postId + '/comment/' + this.page +'/10')
                console.log(res)
                this.comments = this.comments.concat(res.data.comments)
            } catch(e) {
                console.log(e)
            }
        }, 

        async refreshComments(payload) {
            try {
                this.page = 1
                let res = await this.$axios.get('/post/' + this.$route.params.postId + '/comment/1/10')
                this.comments = res.data.comments
                this.commentsCount = res.data.commentsCount
                console.log(this.comments)           
            } catch(e) {
                console.log(e)
            }
        }, 

        async refreshPost(payload) {
            try {
                this.post = await this.$axios.$get('/post/' + this.$route.params.postId)
                console.log(this.post)
            } catch(e) {
                console.log(e)
            }
        }
    }
}
</script>
