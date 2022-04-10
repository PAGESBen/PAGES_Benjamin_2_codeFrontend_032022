<template>
    <div>
        <b-row class="my-3">
            <b-col>
                <PostCard
                    :post="post" 
                />
            </b-col>
        </b-row>

        <b-row>
            <b-col>
                <b-button block v-b-toggle.addComment variant="primary">
                    Ajouter un commentaire <br/>
                    <b-icon icon="arrow-bar-down" variant="light" font-scale="1"></b-icon>
                </b-button>
                <b-collapse id="addComment" class="mt-2">
                    <b-row class="bg-light p-2">
                        <b-col>
                            <!-- <h2 class="h6">Poster un commentaire</h2> -->
                            <CommentForm />
                        </b-col>
                    </b-row>
                </b-collapse>
            </b-col>
        </b-row>

        <b-row class="mt-3 ml-2">
            <b-col cols="1" class="border-right"></b-col>
            <b-col cols="11">
                <h3 class="h6">Commentaires</h3>
                <CommentsList />
            </b-col>
        </b-row>

            
    </div>
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
        } catch (e) {
            console.log(e)
        } 
    }
}

</script>
