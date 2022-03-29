<template>
    <b-modal 
        id="logModal"
        no-close-on-esc
        no-close-on-backdrop
        hide-header-close
        centered
        hide-footer
    >
        <template #modal-title>
            <h2 v-if="mode == 'login'">Se connecter</h2>
            <h2 v-if="mode == 'register'">Créer un compte</h2>
        </template>

        <b-form>
            <b-row>    
                <b-col md="6" v-if="mode == 'register'">

                    <b-form-group
                    id="firstname"
                    label="Prénom"
                    label-for="firstname"
                    >
                        <b-form-input
                        id="firstname"
                        v-model="form.firstname"
                        type="text"
                        placeholder="Jeremy"
                        required
                        ></b-form-input>
                    </b-form-group>

                </b-col>

                <b-col md='6' v-if="mode == 'register'">
                
                    <b-form-group
                    id="lastname"
                    label="Nom"
                    label-for="lastname"
                    >
                        <b-form-input
                        id="lastname"
                        v-model="form.lastname"
                        type="text"
                        placeholder="Zunino"
                        required
                        ></b-form-input>
                    </b-form-group>

                </b-col>
                
                <b-col cols="12" v-if="mode == 'register'">

                    <b-form-group
                    id="position"
                    label="Poste"
                    label-for="position"
                    >
                        <b-form-input
                        id="position"
                        v-model="form.position"
                        type="text"
                        placeholder="Développeur Web"
                        required
                        ></b-form-input>
                    </b-form-group>                
                </b-col>

                <b-col cols="12" class="my-3">
                    <b-form-group
                    id="email"
                    label="Adresse email"
                    label-for="email"
                    >
                        <b-form-input
                        id="email"
                        v-model="form.email"
                        type="email"
                        placeholder="jzunino@groupomania.com"
                        required
                        ></b-form-input>
                    </b-form-group>

                    <b-form-group
                    id="password"
                    label="Mot de passe"
                    label-for="password"
                    >
                        <b-form-input
                        id="password"
                        v-model="form.password"
                        type="password"
                        placeholder="Entrez votre mot de passe"
                        required
                        ></b-form-input>
                    </b-form-group>

                    <small class="text-danger" v-if="mode == 'login' && status == 'login_error'">Adresse mail ou mot de passe invalide</small>
                    <small class="text-danger" v-if="mode == 'register'&& status == 'create_error'">Une erreur s'est produite</small>

                </b-col>
                
                <b-col cols="12" class="text-right border-top pt-3">
                    <b-button v-if="mode == 'login'" :class="{'disabled' : !validatedFields}"  type="submit" variant="primary" @click="login()">
                        <span v-if="status == 'loading'">Connexion en cours...</span>
                        <span v-else>Connexion</span>
                    </b-button>
                    <b-button v-if="mode == 'register'" :class="{'disabled' : !validatedFields}" type="submit" variant="primary" @click="register()">S'enregistrer</b-button>

                    <b-link href="#" v-if="mode == 'login'" class="pl-2" @click="switchToRegister()">Je n'ai pas encore de compte</b-link>
                    <b-link href="#" v-if="mode == 'register'" class="pl-2" @click="switchToLogin()">J'ai déjà un compte</b-link>
                </b-col>
                
            </b-row>
        </b-form>
    </b-modal>
</template>

<script>
    import {mapState} from 'vuex'

    export default {
        name : 'LoginForm',
        data() {
            return {
                mode: 'login',
                form: {
                    firstname: '',
                    lastname: '',
                    email: '',
                    password:'',
                    position: '',
                },
            }
        },
        computed : {
            
            validatedFields : function() { //Ici on conditionne la class desable sur le bouton de l'envoi du formulaire par une fonction de validation
                if(this.mode === 'register') {
                    if (this.form.firstname !== '' && this.form.lastname !== '' && this.form.email !== '' && this.form.password !== '' && this.form.position !== '') {
                        return true
                    } else {
                        return false
                    }
                } else {
                      if (this.form.email !== '' && this.form.password !== '') {
                        return true
                    } else {
                        return false
                    }
                }
            }, 
            
            ...mapState(['status', 'user'])

        },
        methods: {
            switchToLogin : function () { // changement de formulaire pour le formulaire 'login' 
                this.mode = 'login';
            },
            switchToRegister : function () { // changement de formulaire pour le formulaire 'register'
                this.mode = 'register';
            }, 
            login : function() {
                event.preventDefault()
                this.$store.dispatch('login', {
                    email: this.form.email,
                    password : this.form.password
                }).then(function(res) {
                    console.log('=========connecté==========')
                },
                function(err) {
                    console.log(err)
                })
            },
            register : function() {
                event.preventDefault()
                this.$store.dispatch('register', {
                    ...this.form
                }).then(function(res) {
                    // console.log(res)
                }, function (err) {
                    console.log(err)
                })
            }
        }
    }
</script>