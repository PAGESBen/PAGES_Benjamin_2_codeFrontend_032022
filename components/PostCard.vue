<template>
    <div>
        <!--Alerte liée à la modification des posts-->
        <b-alert :show="alert.show" dismissible :variant="alert.variant" class="w-100">
            {{alert.message}}
        </b-alert>

        <!--Post : -->
        <article>
            <b-card class="p-0 my-2">
                <b-card-header header-bg-variant="white" class="p-1" align-v="center">
                    <b-row>
                        <b-col cols="10">
                            <div class="mb-2">
                                <nuxt-link :to="'/profile/' + post.userId">
                                    <b-img fluid :src="post.userImg" class='profilImage border-1 border-secondary' thumbnail :alt="'Image profile de ' + post.firstname + ' ' + post.lastname"></b-img>
                                    <span class="h6 text-primary">{{post.firstname}} {{post.lastname}}</span>
                                </nuxt-link>
                            </div>
                        </b-col>

                        <b-col cols="2" v-if="!feed && (post.userId == user.userId || user.admin)" align-self="end" class="d-flex justify-content-end">
                            <b-dropdown size="sm" right id="postNav" text="options" variant="outline-primary" class="m-2">
                                <b-dropdown-item v-if="!feed && post.userId == user.userId" @click="modifyPost"> Modifier le post </b-dropdown-item>
                                <b-dropdown-item v-if="!feed && (post.userId == user.userId || user.admin)" @click="deletePost"> Supprimer le post </b-dropdown-item>
                            </b-dropdown>
                        </b-col>
                    </b-row>

                    <b-row class="m-0 p-1">
                        <span class='small'>Posté le {{postDate}}</span>
                    </b-row>
                </b-card-header>


                <b-card-body class="p-2 position-relative">

                    <!-- <nuxt-link v-if="feed" :to="'/post/'+ post.id" class="position-absolute coverBody postActiveLink" aria-label="Lien vers la page du post"></nuxt-link> -->

                    <b-card-text v-if="!modify" class="text-primary bg-light">{{post.messageText}}</b-card-text>

                    <div v-else>
                        <label for="postMessage">modifier ou ajouter un message</label>
                        <b-form-textarea
                            id="postMessage"
                            v-model="form.post.messageText"
                            type="textarea"
                            class="my-2"
                            :placeholder="post.messageText == '' ? 'Ajouter un message' : ''"
                        ></b-form-textarea>
                    </div>

                    <div v-if="!form.post.removeImg">
                        <div class="position-relative">
                            <b-embed 
                                v-if="post.mediaType == 'video'"
                                type="iframe"
                                aspect="16by9"
                                :src="post.mediaURL"
                                allowfullscreen
                                :title="'Vidéo liée au post de '  + post.firstname + ' ' + post.lastname"
                            ></b-embed>

                            <b-card-img
                                v-if="post.mediaType == 'image' || post.mediaType == 'gif'"
                                align="center"
                                :src="post.mediaURL" 
                                :alt="'Image liée au post de ' + post.firstname + ' ' + post.lastname + ' du ' + postDate"
                                :title="'Image liée au post de ' + post.firstname + ' ' + post.lastname + ' du ' + postDate"
                                img-top
                            />
                            <div class="position-absolute close-button">
                                <b-button aria-label="Supprimer le media" size="sm" variant="danger" class=" m-1 text-light font-weight-bold" v-if="modify && post.mediaType != null" @click="form.post.removeImg = true"> X </b-button>
                            </div>
                        </div>
                    </div>

                    <div v-if="(modify && post.mediaType == null) || (modify && form.post.removeImg)">
                        <b-form-file
                            v-model="form.file"
                            placeholder="Ajouter un image / gif / vidéo"
                            drop-placeholder="Choisir le fichier à importer"
                        ></b-form-file>
                    </div>

                    <div v-if="modify" class="d-flex justify-content-end">
                        <b-button size="sm" class="m-2 font-weight-bold text-primary" variant="success" @click="updatePost">Valider</b-button>
                        <b-button size="sm" class="m-2" variant="danger" @click="cancelUpdate">Annuler</b-button>
                    </div> 
                </b-card-body>

                <b-card-footer footer-bg-variant="white" class="border-0 pt-3">
                    <b-row >
                        <b-col cols="2">
                            <b-icon 
                                tabindex="0" 
                                class="hover-animation" 
                                role="checkbox"
                                aria-label="Ajouter ou supprimer un like"
                                :aria-checked="post.mylikes == 1 ? true : false" 
                                :icon="post.mylikes == 1 ? 'heart-fill' : 'heart'" 
                                variant="danger" 
                                font-scale="1.5" 
                                @click="updateLike" 
                                @keyup.space="updateLike" 
                                @keyup.enter="updateLike"
                            ></b-icon>
                        </b-col>
                        <b-col cols="10" class="text-right">
                            <nuxt-link v-if="feed" :to="'/post/' + post.id" :aria-label="'Détail du post du ' + postDate">
                                <span>Voir le post et les commentaires </span>
                                <b-badge v-if="post.comments != 0" variant="danger">{{post.comments}}</b-badge>
                            </nuxt-link>             
                        </b-col>

                    </b-row>
                </b-card-footer>
            
            </b-card>
        </article>
    </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
    name: 'postCard',

    data: function () {
        return {
            like : 0,
            modify : false,
            form : {
                file : null,
                post : {
                    messageText :'',
                    removeImg : false
                }
            },
            alert : {
                show : false, 
                message : "", 
                variant : "success"
            }
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
        }, 

        async updateLike () {
            try {
                this.alert.show = false

                this.like = this.post.mylikes == 0 ? this.like = 1 : this.like = 0
                await this.$axios.post('/post/' + this.post.id + '/like', {like : this.like})
                this.post.mylikes = this.like
            } catch (e) {
                this.alert.show = true
                this.alert.variant = 'danger'
                this.alert.message = 'Une erreur s\'est produite, veuillez réessayer ultérieurement'
                console.log(e)
            }
        }, 

        modifyPost() {
            this.modify = true
            this.form.file = null
            this.form.post.messageText = this.post.messageText
            this.form.post.removeImg = false
        }, 

        cancelUpdate() {
            this.modify = false
            this.form.post.removeImg = false
        }, 

        async updatePost() {
            try {
                this.alert.show = false
                const data = new FormData()
                data.append('file', this.form.file)
                data.append('post', JSON.stringify(this.form.post))
                
                const post = !this.form.file ? this.form.post : data

                await this.$axios.put('/post/' + this.post.id, post)

                this.modify = false
                this.$emit('refreh-post')
                this.alert.show = true
                this.alert.variant = 'success'
                this.alert.message = 'Post mis à jour avec succès'

                this.form.post.removeImg = false

            } catch (e) {
                console.log(e)

                this.alert.show = true
                this.alert.variant = 'danger'
                this.alert.message = 'Impossible de mettre à jour un post vide'
            }
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

.close-button {
    top:10px;
    right: 10px;
    background: white;
    border-radius: 2px;
}

.postActiveLink, .postDesableLink {
    color : black;
}

.postActiveLink:hover, .postActiveLink:active  {
    text-decoration: none;
    color: black;
}

.postActiveLink:active {
    border : 1px grey solid;
}

.coverBody {
    top : 0;
    bottom : 0;
    right : 0; 
    left : 0;
    z-index: 1
}
</style>