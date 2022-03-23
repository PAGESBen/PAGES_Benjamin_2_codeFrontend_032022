<template>
    <b-row>
        <b-col>
            <b-form @submit="onSubmit">
                <b-form-group
                id="post"
                label="Post your message:"
                label-for="post"
                >
                    <b-form-textarea
                    id="post"
                    v-model="form.post.textMessage"
                    type="textarea"
                    placeholder="add your comment"
                    required
                    ></b-form-textarea>
                </b-form-group>

                <b-form-file
                    v-model="file"
                    :state="Boolean(file)"
                    placeholder="Choisissez votre fichier à télécharger"
                    drop-placeholder="Choisir le fichier à importer"
                    ></b-form-file>
                    <div class="mt-3">Selected file: {{ file ? file.name : '' }}</div>

                <b-button type="submit" variant="primary">Post</b-button>
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
                        textMessage: ''
                    }
                },
            }
        },
        methods: {
            onSubmit(event) {
                event.preventDefault()
                console.log(JSON.stringify(this.form))
            },
        }
    }
</script>