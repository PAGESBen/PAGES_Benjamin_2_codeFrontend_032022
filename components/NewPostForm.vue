<template>
    <b-row>

        <!--En cas de message vide ou d'erreur-->
        <b-col cols="12">
            <b-alert :show="alert.show" dismissible :variant="alert.variant" class="w-100">
                {{alert.message}}
            </b-alert>
        </b-col>

        <b-col>
            <b-form id="postForm" @submit.prevent="onSubmit">
                <b-form-group
                id="post"
                label="Post your message:"
                label-for="post"
                >
                    <b-form-textarea
                    id="post"
                    v-model="form.post.messageText"
                    type="textarea"
                    placeholder="add your comment"
                    
                    ></b-form-textarea>
                </b-form-group>

                <b-form-file
                    v-model="form.file"
                    :state="Boolean(form.file)"
                    placeholder="Choisissez votre fichier à télécharger"
                    drop-placeholder="Choisir le fichier à importer"
                    ></b-form-file>
                    <div class="mt-3">Selected file: {{ form.file ? form.file.name : '' }}</div>

                <b-button block type="submit" variant="primary" class="mt-5">Poster</b-button>
            </b-form>
        </b-col>
    </b-row>
</template>

<script>
    export default {
        name : 'NewPostForm',
        data() {
            return {
                form: {
                    file : null,
                    post : {
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
                    if(!this.form.file && this.form.post.textMessage == "") {
                        return this.validatedForm = false
                    } else {
                        this.validatedForm = true
                    }

                    //données qui vont etre envoyées si il y a un fichier:
                    const data = new FormData()
                    data.append('file', this.form.file)
                    data.append('post', JSON.stringify(this.form.post))
                    
                    const post = !this.form.file ? this.form.post : data
                    console.log(post)
                    console.log(data)

                    await this.$axios.post('/post', post)
                    
                    this.$router.push('/')
                
                } catch (e) {
                    console.log('test')
                    this.alert.show = true
                    this.alert.message = "Une erreur s'est produite ou le post est vide"
                    this.alert.variant = 'danger'
                }
            },
        }
    }
</script>