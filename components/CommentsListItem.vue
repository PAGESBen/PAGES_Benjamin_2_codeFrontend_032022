<template>
    <b-list-group-item>
        <div class="d-flex w-100 flex-column mb-2">
            <nuxt-link :to="'/profile/' + comment.userId">
                <b-img fluid :src="comment.userImg" class='profilImage border-1 border-primary' thumbnail alt="'Image profile de ' + post.firstname + ' ' + post.lastname "></b-img>
                <span>{{comment.firstname}} {{comment.lastname}}</span>
            </nuxt-link>
            <small class="m-1">Posté le {{commentDate(comment)}}</small>
        </div>
        <div class="mb-3">
            <p>{{comment.messageText}}</p>

            <b-embed v-if="comment.mediaType == 'video'"
                type="iframe"
                aspect="16by9"
                :src="comment.mediaURL"
                allowfullscreen
            ></b-embed>

            <!-- Comment gerer la partie alt -->
            <b-card-img
                v-if="comment.mediaType == 'image' || comment.mediaType == 'gif' "
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
</template>

<script>
export default {
    name : 'commentsListItem',

    props : {
        comment : Object
    },

    methods : {
        commentDate : function (comment) { 
            return (new Date(comment.date).toLocaleDateString() + ' à ' + new Date(comment.date).toLocaleTimeString())
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