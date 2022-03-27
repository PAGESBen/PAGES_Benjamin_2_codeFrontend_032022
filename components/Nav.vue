<template>
    <b-nav vertical pills class="text-center my-5">
        <b-nav-item to='/' @click="activeNavLink('Accueil')" :active="activeNav === 'Accueil'" >
            Accueil
        </b-nav-item>
        <b-nav-item to='/addPost' @click="activeNavLink('Poster')" :active="activeNav === 'Poster'" >
            Poster
        </b-nav-item>
        <b-nav-item to='/Profile' @click="activeNavLink('Profile')" :active="activeNav === 'Profile'" >
            Mon profil
        </b-nav-item>
    </b-nav>
</template>

<script>
export default {
    name: 'navMenu',
    data() {
        return {
            activeNav : 'Accueil'
        }
    },
    methods : {
        activeNavLink(navItem) {
            return this.activeNav = navItem
        }
    }
}
</script>

<style scoped>

</style>