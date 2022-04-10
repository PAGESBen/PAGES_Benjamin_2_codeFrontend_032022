<template>
    <div>
        <b-list-group flush>
            <b-list-group-item v-for="comment in comments" :key="comment.id">
                <div class="d-flex w-100 flex-column mb-2">
                    <nuxt-link :to="'/profile/' + comment.userId">
                        <b-img fluid :src="comment.userImg" class='profilImage border-1 border-primary' thumbnail alt="'Image profile de ' + post.firstname + ' ' + post.lastname "></b-img>
                        <span>{{comment.firstname}} + {{comment.lastname}}</span>
                    </nuxt-link>
                    <small class="m-1">Posté le ...</small>
                </div>
                <div>
                    <p>{{comment.messageText}}</p>

                    <b-embed v-if="comment.mediaType == 'video'"
                        type="iframe"
                        aspect="16by9"
                        :src="comment.mediaURL"
                        allowfullscreen
                    ></b-embed>

                    <!-- Comment gerer la partie alt -->
                    <b-card-img
                        v-if="comment.mediaType == 'image'"
                        align="center"
                        :src="comment.mediaURL" 
                        img-alt="comment illustration"
                        img-top 
                    />

                </div>

                <div>
                    <b-icon class="hover-animation pl-1" :icon="comment.mylikes ? 'hand-thumbs-up-fill' : 'hand-thumbs-up'" variant="primary" font-scale="1.5"></b-icon>
                </div>

            </b-list-group-item>
        </b-list-group>

        <div v-if="commentsCount != commentsLoaded" class="w-100 d-flex justify-content-end m-2">
            <b-button size="sm" @click="nextPage()">Afficher plus de commentaires</b-button>
        </div>
    </div>
</template>

<script>
export default {
    name : 'commentsList',
    data : function () {
        return {
            mylikes : false,
            commentsCount : 0,
            comments : [],
            page : 1

        }
    },

    computed : {
        commentsLoaded () {return this.comments.length}
    },

    async mounted() {
        try {
            let res = await this.$axios.get('/post/' + this.$route.params.postId + '/comment/1/10')
            this.comments = res.data.comments
            this.commentsCount = res.data.commentsCount
        } catch(e) {
            console.log(e)
        }
    }, 

    methods : {
        nextPage : async function () {
            try {
                this.page += 1
                let res = await this.$axios.get('/post/' + this.$route.params.postId + '/comment/' + this.page +'/10')
                console.log(res)
                this.comments = this.comments.concat(res.data.comments)
                console.log(this.comments)
            } catch(e) {
                console.log(e)
            }
        }
    }

}
</script>

<style>

    .profilImage{
        height: 30px;
        width: 30px
    }

    .hover-animation:hover {
        -webkit-transform: scale(1.2);
        -moz-transform: scale(1.2);
        -o-transform: scale(1.2);
        -ms-transform: scale(1.2);
        transform: scale(1.2);
        cursor: pointer
    }
</style>