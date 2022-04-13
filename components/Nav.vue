<template>
    <b-nav vertical pills class="text-center my-5">
        <b-nav-item to='/'>
            Accueil
        </b-nav-item>
        <b-nav-item to='/addPost'>
            Poster
        </b-nav-item>
        <b-nav-item to="/profile">
            Mon profil
        </b-nav-item>
    </b-nav>
</template>

<script>
import {mapState} from 'vuex'

export default {
    name: 'navMenu',
    
}
</script>

<style scoped>
    .nuxt-link-exact-active {
        background : black;
        color : white
    }
</style>