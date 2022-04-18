<template>
    <b-nav vertical pills class="text-center my-5" id="navigation">
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
export default {
    name: 'navMenu'
}
</script>

<style lang="scss" scoped>
.nuxt-link-exact-active {
    background : $primary;
    color : white
}
</style>