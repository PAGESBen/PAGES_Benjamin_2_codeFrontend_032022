<template>
    <div>
        <b-row no-gutters class="m-auto">
            <h2 v-if="mode == 'login'">Se connecter</h2>
            <h2 v-if="mode == 'register'">Créer un compte</h2>
        </b-row>

        <b-row  class="m-auto">
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
                            <small class="text-danger pb-2" v-if="!validateFields.firstname && fieldAlert">Prenom non valide ! </small>
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
                            <small class="text-danger pb-2" v-if="!validateFields.lastname && fieldAlert">Nom non valide ! </small>
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
                            <small class="text-danger pb-2" v-if="!validateFields.mail && fieldAlert">Adresse mail non valide ! </small> 
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
                            <small class="text-danger pb-2" v-if="!validateFields.password && fieldAlert">Mot de passe non valide ! </small>
                        </b-form-group>

                        <small class="text-danger" v-if="mode == 'login' && status == 'login_error'">Adresse mail ou mot de passe invalide</small>
                        <small class="text-danger" v-if="mode == 'register'&& status == 'create_error'">Il exite déjà un compte utilisant cette adresse mail</small>

                    </b-col>
                    
                    <b-col cols="12" class="border-top pt-3">
                        <b-button block v-if="mode == 'login'" :disabled="activateButton ? false : true"  type="submit" variant="primary" @click.prevent="login()">
                            <span v-if="status == 'loading'">
                                <b-spinner small></b-spinner>
                                Connexion en cours...
                            </span>
                            <span v-else>Connexion</span>
                        </b-button>

                        <b-button block v-if="mode == 'register'" :disabled="activateButton ? false : true" type="submit" variant="primary" @click.prevent="register()">
                            <span>S'enregistrer</span>
                            <span v-if="status == 'loading'">
                                <b-spinner small></b-spinner>
                                Inscription en cours...
                                </span>
                            </b-button>
                    </b-col>
                    <b-col class="text-right pt-2" >
                        <b-link href="#" v-if="mode == 'login'" @click="switchToRegister()">Je n'ai pas encore de compte</b-link>
                        <b-link href="#" v-if="mode == 'register'" @click="switchToLogin()">J'ai déjà un compte</b-link>
                    </b-col>
                    <b-col>
                        <b-button @click="consoleLog()">test computed</b-button>
                    </b-col>
                    
                </b-row>
            </b-form>
        </b-row>
    </div>
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
                fieldAlert : false
            }
        },

        computed : {
            
            activateButton : function() { //Ici on conditionne la class desable sur le bouton de l'envoi du formulaire par une fonction de validation     
                if(this.mode === 'register') {
                    return this.form.firstname !== '' 
                        && this.form.lastname !== '' 
                        && this.form.email !== '' 
                        && this.form.password !== '' 
                        && this.form.position !== ''
                } else {
                    return this.form.email !== '' 
                        && this.form.password !== ''
                }
            }, 

            ...mapState(['status', 'user', 'regex']),

            validateFields : function () {
                return {
                    firstname : this.regex.name.test(this.form.firstname),
                    lastname : this.regex.name.test(this.form.lastname),
                    password : this.regex.name.test(this.form.password), // a changer par la regex password
                    mail : this.regex.mail.test(this.form.email)
                }
            }
            


        },
        methods: {
            switchToLogin : function () { // changement de formulaire pour le formulaire 'login' 
                this.mode = 'login';
            },
            switchToRegister : function () { // changement de formulaire pour le formulaire 'register'
                this.mode = 'register';
            }, 
            login : function () {
                if(!this.validateFields.mail){
                    this.fieldAlert = true
                } else {
                    this.$store.dispatch('login', {
                        email: this.form.email,
                        password : this.form.password
                    }).then((res) => {
                        console.log('========= Connecté =========')
                        this.$router.push('/')
                    },
                    function(err) {
                        console.log(err)
                    })
                }
            },
            register : function() {
                if(this.validateFields.mail && this.validateFields.firstname && this.validateFields.lastname && this.validateFields.password) {
                    this.$store.dispatch('register', {
                        ...this.form
                    }).then((res) => {
                        this.mode = 'login'
                        console.log('========= Nouvel utilisateur créé =========')
                    }, function (err) {
                        console.log(err)
                    })
                } else {
                    this.fieldAlert = true
                }
            }, 

            consoleLog : function () {
                return console.log(this.validateFields)
            }
        }
    }
</script>