<template>
        <b-row>
        <!--En cas de message vide ou d'erreur-->
        <b-col cols="12">
            <b-alert :show="alert.show" dismissible :variant="alert.variant" class="w-100">
                {{alert.message}}
            </b-alert>
        </b-col>

        <b-col>
            <b-form id="commentForm" @submit.prevent="onSubmit">
                <b-form-group
                label="Ecrivez votre commentaire"
                label-for="comment"
                >
                    <b-form-textarea
                    id="comment"
                    v-model="form.comment.messageText"
                    type="textarea"
                    ></b-form-textarea>
                </b-form-group>

                <b-form-file
                    v-model="form.file"
                    accept=".jpg, .jpeg, .png, .gif, .mp4, .avi, .mpeg, .bmp"
                    placeholder="Ajouter une image, un gif ou une vidéo"
                    drop-placeholder="Choisir le fichier à importer"
                    ></b-form-file>

                <b-button block type="submit" variant="primary" class="mt-5">Ajouter le commentaire</b-button>
            </b-form>
        </b-col>
    </b-row>
</template>

<script>
export default {
    name : 'commentForm',
        data() {
            return {
                form: {
                    file : null,
                    comment : {
                        messageText: ''
                    }
                },
                validatedForm : false, 
                alert : {
                    show : false, 
                    message : "", 
                    variant : "success"
                }
            }
        },

        methods: {
            async onSubmit() {
                try {
                    this.alert.show = false             
                    // Sécurité pour empecher l'envoi de messages vides : 
                    if(!this.form.file && this.form.comment.textMessage == "") {
                        return this.validatedForm = false
                    } else {
                        this.validatedForm = true
                    }

                    //données qui vont etre envoyées si il y a un fichier:
                    const data = new FormData()
                    data.append('file', this.form.file)
                    data.append('comment', JSON.stringify(this.form.comment))
                    
                    const comment = !this.form.file ? this.form.comment : data

                    await this.$axios.post('/post/' + this.$route.params.postId + '/comment', comment)

                    this.form.file = null
                    this.form.comment.messageText = ''

                    this.alert.show = true
                    this.alert.message = "Commentaire posté avec succès"
                    this.alert.variant = 'success'

                    this.$emit('refresh-comments')
                
                } catch (e) {
                    this.alert.show = true
                    this.alert.message = "Une erreur s'est produite ou le commentaire est vide"
                    this.alert.variant = 'danger'
                }
            },
        }
    }
</script>