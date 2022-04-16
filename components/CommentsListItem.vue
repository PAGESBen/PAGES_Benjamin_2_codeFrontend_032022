<template>
    <b-list-group-item>
        <b-row>
            <b-col >
                <b-alert :show="alert.show" dismissible :variant="alert.variant" class="w-100">
                    {{alert.message}}
                </b-alert>
            </b-col>
        </b-row>
        <b-row>
            <b-col cols="10">
                <div class="d-flex w-100 flex-column mb-2">
                    <nuxt-link :to="'/profile/' + comment.userId">
                        <b-img fluid :src="comment.userImg" class='profilImage border-1 border-secondary' thumbnail alt="'Image profile de ' + post.firstname + ' ' + post.lastname "></b-img>
                        <span class="text-primary">{{comment.firstname}} {{comment.lastname}}</span>
                    </nuxt-link>
                    <small class="m-1">Posté le {{commentDate(comment)}}</small>
                </div>
            </b-col>

            <b-col cols="2" v-if="comment.userId == user.userId || user.admin" align-self="end" class="d-flex justify-content-end">
                <b-dropdown size="sm" text="options" right :id="'commentNav' + comment.id" variant="outline-primary" class="m-2">
                    <b-dropdown-item v-if="comment.userId == user.userId" @click="modifyForm"> Modifier</b-dropdown-item>
                    <b-dropdown-item v-if="comment.userId == user.userId || user.admin" @click="deleteComment"> Supprimer</b-dropdown-item>
                </b-dropdown>
            </b-col>
        </b-row>
        <div class="mb-3">
            <p v-if="!modify">{{comment.messageText}}</p>

            <b-form-textarea
                v-else
                v-model="form.comment.messageText"
                type="textarea"
                class="my-2"
                :placeholder="comment.messageText == '' ? 'Ajouter un message' : ''"
            ></b-form-textarea>

            <div v-if="!form.comment.removeImg" class="position-relative">

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
                    :alt="'illustration du commentaire de ' + comment.firstname + ' ' + comment.lastname"
                    img-top 
                />

                <b-button size="sm" variant="danger" class="position-absolute close-button" v-if="modify && comment.mediaType != null" @click="form.comment.removeImg = true"> x </b-button>
            </div>

            <div v-if="(modify && comment.mediaType == null) || (modify && form.comment.removeImg)">
                <b-form-file
                    v-model="form.file"
                    placeholder="Ajouter un image / gif / vidéo"
                    drop-placeholder="Choisir le fichier à importer"
                ></b-form-file>
            </div>

            <div v-if="modify" class="d-flex justify-content-end">
                <b-button size="sm" class="m-2" variant="success" @click="updateComment">Valider</b-button>
                <b-button size="sm" class="m-2" variant="danger" @click="modifyForm">Annuler</b-button>
            </div> 

        </div>

        <div>
            <b-icon 
                tabindex="0"
                class="hover-animation pl-1"
                role="checkbox"
                :aria-checked="comment.mylikes == 1 ? true : false"
                :icon="comment.mylikes ? 'heart-fill' : 'heart'" 
                variant="secondary" 
                font-scale="1.5" 
                @click="updateLike"
                @keyup.space="updateLike"
                @keyup.enter="updateLike"
            ></b-icon>
        </div>

    </b-list-group-item>
</template>

<script>
import {mapState} from 'vuex'

export default {
    name : 'commentsListItem',
    data : function () {
        return {
            like : 0,
            modify : false,
            form : {
                file : null,
                comment : {
                    messageText : '',
                    removeImg : false
                }
            }, 
            alert : {
                show : false,
                variant : '',
                message : ''
            }
        }
    },

    props : {
        comment : Object
    },

    computed : {
        ...mapState(['user'])
    },

    methods : {
        commentDate : function (comment) { 
            return (new Date(comment.date).toLocaleDateString() + ' à ' + new Date(comment.date).toLocaleTimeString())
        }, 
        
        async updateLike () {
            try {
                this.like = this.comment.mylikes == 0 ? this.like = 1 : this.like = 0
                console.log('/post/comment/' + this.comment.id + '/like')
                await this.$axios.post('/post/comment/' + this.comment.id + '/like', {like : this.like})
                this.comment.mylikes = this.like
            } catch (e) {
                console.log(e)
            }
        },

        modifyForm () {
            this.form.file = null
            this.form.comment.messageText = this.comment.messageText
            this.modify = !this.modify
            this.form.comment.removeImg = false
        },

        async updateComment () {
            try {
                this.alert.show = false

                const data = new FormData()
                data.append('file', this.form.file)
                data.append('comment', JSON.stringify(this.form.comment)) 

                const comment = !this.form.file ? this.form.comment : data

                await this.$axios.put('/post/comment/' + this.comment.id, comment)

                this.modify = false

                this.alert.show = true
                this.alert.variant = 'success'
                this.alert.message = 'Commentaire modifié !'
                this.$emit('refresh-comments')

                this.form.comment.removeImg = false

            } catch (e) {
                this.alert.show = true
                this.alert.variant = 'danger'
                this.alert.message = 'Modification impossible !'
                console.log(e)
            }
        }, 

        async deleteComment() {
            try {
                await this.$axios.delete('/post/comment/'+this.comment.id)
                console.log('=====Commentaire supprimé======')
                this.$emit('refresh-comments')
            } catch(e) {
                this.alert.show = true
                this.alert.variant = 'danger'
                this.alert.message = 'Supression impossible !'
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

    .close-button {
        top:10px;
        right: 10px;
    }
</style>