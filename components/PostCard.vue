<template>

    <b-card class="p-0 my-2">
        <b-card-header header-bg-variant="white" class="p-1" align-v="center">
            <b-row cols="2">
                <b-col>
                    <b-card-title>
                        <nuxt-link :to="'/profile/' + post.userId">
                            <b-img fluid :src="post.userImg" class='profilImage border-1 border-primary' thumbnail :alt="'Image profile de ' + post.firstname + ' ' + post.lastname "></b-img>
                            <span>{{post.firstname}} {{post.lastname}}</span>
                        </nuxt-link>
                    </b-card-title>
                </b-col>

                <b-col v-if="!feed && post.userId == user.userId || user.admin" align-self="end" class="d-flex justify-content-end">
                    <b-button v-if="post.userId == user.userId" variant="secondary" size='sm' class="m-1">
                        <b-icon icon="pencil-square" variant="light" font-scale="1"></b-icon>
                    </b-button>
                    
                    <b-button v-if="post.userId == user.userId || user.admin" variant="danger" size='sm' class="m-1" @click="deletePost()">
                        <b-icon icon="trash-fill" variant="light" font-scale="1"></b-icon>
                    </b-button>
                </b-col>
            </b-row>


            <b-row class="m-0 p-1">
                <b-card-sub-title sub-title-text-variant='muted small'>Posté le {{postDate}}</b-card-sub-title>
            </b-row>
        </b-card-header>

        <b-card-body class="p-2">

            <b-card-text>{{post.messageText}}</b-card-text>
            
            <b-embed v-if="post.mediaType == 'video'"
                type="iframe"
                aspect="16by9"
                :src="post.mediaURL"
                allowfullscreen
            ></b-embed>

            <!-- Comment gerer la partie alt -->
            <b-card-img
                v-if="post.mediaType == 'image'"
                align="center"
                :src="post.mediaURL" 
                img-alt="post illustration"
                img-top 
            />

        </b-card-body>

        <b-card-footer footer-bg-variant="white">
            <b-row cols="2">
                <b-col>
                    <b-icon class="hover-animation" :icon="post.mylikes ? 'hand-thumbs-up-fill' : 'hand-thumbs-up'" variant="primary" font-scale="1.5"></b-icon>
                </b-col>
                <b-col class="text-right">
                    <nuxt-link :to="'/post/' + post.id">
                        <span>Commentaires </span>
                        <b-badge v-if="post.comments != 0" variant="secondary">{{post.comments}}</b-badge>
                    </nuxt-link>             
                </b-col>

            </b-row>
        </b-card-footer>
    
    </b-card>


    

</template>

<script>
import {mapState} from 'vuex'

export default {
    name: 'postCard',
    data: function () {
        return {
            liked : false, 
        }
    }, 

    props :{
        post : Object,
        feed : Boolean
    }, 

    computed : {
        ...mapState(['user']),
        
        postDate () { 
            return (new Date(this.post.date).toLocaleDateString() + ' à ' + new Date(this.post.date).toLocaleTimeString())
        }
    }, 

    methods : {
        deletePost () {
            this.$emit('delete-post', {id : this.post.id})
        }
    }

}
</script>

<style scoped>
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