<template>
    <div>
        <b-row class="mb-3 py-5 icon-background">
            <b-col cols='6' offset='3'>
                <div class="profil-img-container">
                    <b-img :src="this.$store.state.profileLogged.imageURL" thumbnail class="profile-img" alt="Profile Image"></b-img>        
                </div>
                <div class="change-profile-img">
                    <label for="change-profile-img-input" class="for">
                        <b-icon icon="upload" variant="dark" font-scale="1"></b-icon>
                        <span class="dark small">Changer d'image</span>
                    </label>
                    <input id="change-profile-img-input" type="file">
                </div>
            </b-col>
        </b-row>
        <b-row class="py-3 border-bottom">
            <b-badge v-if="this.$store.state.profileLogged.admin" variant="danger">Admin</b-badge>
            <b-list-group class="w-100">
                <b-list-group-item class="d-flex justify-content-between align-items-center">
                    <span>Prénom :</span>
                    <span>{{this.$store.state.profileLogged.firstname}}</span>
                </b-list-group-item>
                <b-list-group-item class="d-flex justify-content-between align-items-center">
                    <span>Nom :</span>
                    <span>{{this.$store.state.profileLogged.lastname}}</span>
                </b-list-group-item>
                <b-list-group-item class="d-flex justify-content-between align-items-center">
                    <span>Poste :</span>
                    <span>{{this.$store.state.profileLogged.position}}</span>
                </b-list-group-item>
                <b-list-group-item class="d-flex justify-content-between align-items-center">
                    <span>contact :</span>
                    <span>{{this.$store.state.profileLogged.email}}</span>
                </b-list-group-item>
            </b-list-group>
        </b-row>

    </div>
 
</template>

<script>
    import {mapState} from 'vuex'

    export default {
    name: 'postCard',
    data: function () {
        return {
            admin : true
        }
    },
    computed : {
        ...mapState(['profileLogged'])
    },

    mounted() {
        const userId = this.$store.state.user.userId
        this.$store.dispatch('getUserProfile', userId)
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
        width: 200px;
        height: 200px;
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

    .change-profile-img>label {
    cursor: pointer;
    }

</style>