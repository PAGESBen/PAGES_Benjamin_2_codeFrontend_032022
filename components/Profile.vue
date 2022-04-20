<template>
    <div>

        <b-row>
            <b-col>
                <h1 class="h2 my-2">Détail du profil</h1>
            </b-col>
        </b-row>

        <b-row v-if="!error" class="mb-3 py-5 icon-background">
            <b-col cols='6' class="d-flex flex-column justify-content-center align-items-center">

                <!--Affichage de l'image-->
                <div class="profil-img-container d-flex justify-content-center">
                    <b-img :src="profile.imageURL" thumbnail class="profile-img" alt="Profile Image"></b-img>        
                </div>
                
                <!--Formulaire changement d'image de profil-->
                <div v-if="modify && form.file == null" class="change-profile-img">
                    <label for="change-profile-img-input">
                        <b-icon icon="upload" variant="dark" font-scale="1"></b-icon>
                        <span class="small hover-underline">Changer d'image</span>
                    </label>
                    <b-form-file plain accept=".jpg, .jpeg, .png" id="change-profile-img-input" v-model="form.file"></b-form-file>
                </div>
                <span class="small text-danger hover-underline bg-light" v-if="modify && form.file != null" @click="form.file = null">
                    <b-icon icon="x-circle" class="text-dark" variant="danger" font-scale="1"></b-icon>
                    Annuler changement
                </span>

                <!-- bouton modifier réservé au propriétaire de la fiche -->
                <b-button block v-if="owner && !modify" variant="primary" class="m-2 button-width" @click="modifyForm()">Modifier</b-button>

                <!-- Bouton supprimer réservé aux administrateurs ou au propriétaire -->
                <b-button block v-if="!modify && (owner || this.$store.state.user.admin)" variant="danger" class="m-2 button-width" @click="$bvModal.show('cancelConfirmation')">Supprimer</b-button>
                <!--Modale de sécurité pour la suppression de compte-->
                <b-modal  aria-label="Avertissement" hide-header id="cancelConfirmation" hide-footer>
                    <div class="modal-header mb-3">
                        <h2 class="h4 m-1"> ATTENTION </h2>
                    </div>
                    <div class="d-block text-center text-danger">
                        Attention cette action supprimera DEFINITIVEMENT votre profil utilisateur ainsi que l'ensemble de ses posts et commentaires.
                    </div>
                    <div class="m-2">
                        <b-button class="mt-3" block variant="danger" @click="deleteUserProfile">
                            <span v-if="!loading">Supprimer le profil</span>
                            <span v-else>
                                <b-spinner small></b-spinner>
                            </span>
                        </b-button>
                        <b-button block class="mt-3" variant="dark" @click="$bvModal.hide('cancelConfirmation')">Annuler</b-button>
                    </div>
                </b-modal>
            </b-col>
        </b-row>

        <b-row v-if="!modify" class="py-3 border-bottom">
            <b-alert :show="alert.show" dismissible :variant="alert.variant" class="w-100">
                {{alert.message}}
            </b-alert>

            <b-list-group v-if="!error" class="w-100">

                <b-list-group-item class="d-flex justify-content-between align-items-center">
                    <span>Prénom :</span>
                    <span>{{profile.firstname}}</span>
                </b-list-group-item>

                <b-list-group-item class="d-flex justify-content-between align-items-center">
                    <span>Nom :</span>
                    <span>{{profile.lastname}}</span>
                </b-list-group-item>

                <b-list-group-item class="d-flex justify-content-between align-items-center">
                    <span>Poste :</span>
                    <span>{{profile.position}}</span>
                </b-list-group-item>

                <b-list-group-item class="d-flex justify-content-between align-items-center">
                    <span>contact :</span>
                    <span>{{profile.email}}</span>
                </b-list-group-item>

            </b-list-group>
        </b-row>

        <!--Formulaire de modification du profil-->
        <b-row v-if="modify" class="pt-3 border-bottom w-100 m-0 p-0">

            <b-form class="w-100">
                <b-row cols="2" class="w-100 bg-white border rounded mx-0 mb-1 p-2">
                    <b-col class="d-flex align-items-center">
                        <label class="m-0" for="firstname">Prénom : </label>
                    </b-col>
                    <b-col>
                        <b-form-input
                            id="firstname"
                            class="mb-1 mr-sm-1 mb-sm-0"
                            v-model="form.user.firstname"
                        ></b-form-input>
                    </b-col>
                </b-row>

                <b-row cols="2" class="w-100 bg-white border rounded mx-0 mb-1 p-2">
                    <b-col class="d-flex align-items-center">
                        <label class="m-0" for="lastname">Nom :</label>
                    </b-col>
                    <b-col>
                        <b-form-input
                            id="lastname"
                            class="mb-1 mr-sm-1 mb-sm-0"
                            v-model="form.user.lastname"
                        ></b-form-input>
                    </b-col>
                </b-row>

                <b-row cols="2" class="w-100 bg-white border rounded mx-0 mb-1 p-2">
                    <b-col class="d-flex align-items-center">
                        <label class="m-0" for="position">Poste :</label>
                    </b-col>
                    <b-col>
                        <b-form-input
                            id="position"
                            class="mb-1 mr-sm-1 mb-sm-0"
                            v-model="form.user.position"
                        ></b-form-input>
                    </b-col>
                </b-row>

                <b-row cols="2" class="w-100 bg-white border rounded mx-0 mb-1 p-2">
                    <b-col class="d-flex align-items-center">
                        <label class="m-0" for="mail">Adresse mail :</label>
                    </b-col>
                    <b-col>
                        <b-form-input
                            id="mail"
                            class="mb-1 mr-sm-1 mb-sm-0"
                            v-model="form.user.email"
                        ></b-form-input>
                    </b-col>
                </b-row>

                <b-row class="py-3 w-100 m-0 p-0">
                    <b-button variant="primary" class="m-2" @click.prevent="modifyUserProfile()">
                        <span v-if="!loading">modifier</span>
                        <span v-else>
                            <b-spinner small></b-spinner>
                        </span>
                        </b-button>

                        <b-button variant="danger" class="m-2" @click.prevent="cancelUpdate()">
                            annuler
                        </b-button>
                </b-row>
            </b-form>

        </b-row>

    </div>
 
</template>

<script>
export default {
    name: 'profile',

    data : function () {
        return {
            profile : {
                id : '',
                firstname: '',
                lastname: '', 
                email : '',
                imageURL : '',
                position : ''
            },
            error : false,
            owner : false, 
            modify : false,
            loading : false, //sert pour le spiner lors de l'execution de modifyUserProfile
            form : {
                file : null,
                user : {
                    firstname : '',
                    lastname : '',
                    position : '',
                    email : ''
                },
            },
            alert : {
                show : false, 
                message : "", 
                variant : "success"
            },
            modalShow: false
        }
    },

    async mounted() {
        try{
            const userId = this.$route.params.userId == undefined ? this.$store.state.user.userId : this.$route.params.userId
            this.profile = await this.$axios.$get('/user/' + userId)
            if(this.profile.id === this.$store.state.user.userId) {
                this.owner = true
            }
        } catch (err) {
            console.log(err)
            this.error = true
            this.alert.show = true
            this.alert.variant = 'danger'
            this.alert.message = 'Une erreur est survenue, veuillez réessayer ulterieurement'
        }
    },

    methods : {
        modifyForm : function () {
            this.form.user = {
                firstname : this.profile.firstname,
                lastname : this.profile.lastname,
                position : this.profile.position,
                email : this.profile.email
            }
            this.modify = true
        },
        
        modifyUserProfile : async function() {
            try {
                this.alert.show = false
                this.loading = true 
                //données qui vont etre envoyées si il y a un fichier:
                const data = new FormData()
                data.append('file', this.form.file)
                data.append('user', JSON.stringify(this.form.user))
                
                const user = !this.form.file ? this.form.user : data
                console.log(user)

                const res = await this.$axios.put('/user/' + this.profile.id, user)

                this.form.file = null
                
                this.profile = res.data
                this.loading = false
                this.modify = false
                this.alert.show = true
                this.alert.message = "Profil mis à jour avec succès"
                console.log('==========Profil mis à jour==========')
            } catch (e) {
                console.log(e)
                this.loading = false
                this.modify = false
                this.alert.show = true
                this.alert.message = "Une erreur s'est produite veuillez rééssayer ulterieurement"
                this.alert.variant = 'danger'
            }
        },

        cancelUpdate : function () {
            this.modify = false
            this.form.file = null
        },

        deleteUserProfile : async function() {
            try{
                this.loading = true
                await this.$axios.delete('/user/' + this.profile.id)
                this.loading = false
                this.$bvModal.hide('cancelConfirmation')
                this.alert.show = true
                this.alert.message = "Ce profil a été supprimé"
                this.alert.variant = 'warning'
                console.log(this.profile.id)
                console.log(this.$store.state.user.iserId)
                if(this.profile.id === this.$store.state.user.userId) {
                    this.$store.commit('LOGOUT_USER')
                }
            } catch (e) {
                this.loading = false
                this.$bvModal.hide('cancelConfirmation')
                this.modify = false
                this.alert.show = true
                this.alert.message = "Une erreur s'est produite veillez rééssayer ulterieurement"
                this.alert.variant = 'danger' 
            }
        }
    }
}
</script>

<style scoped>
.icon-background {
    background-image: url(../assets/background.svg);
    background-repeat: no-repeat;
    background-size: 500px;
    background-position: bottom left;
}

.profil-img-container {
    width: 150px;
    height: 150px;
    border-radius: 100%;
}

.profile-img {
    object-fit: cover;
    object-position: center;
    width: 100%;
    min-height: 100%;
}

.change-profile-img>input {
    display: none;
    cursor: pointer;
}

.change-profile-img>#change-profile-img-input {
cursor: pointer;
}

.hover-underline:hover {
    text-decoration-line: underline;
    cursor: pointer
}

.button-width {
    max-width: 150px;
}
</style>