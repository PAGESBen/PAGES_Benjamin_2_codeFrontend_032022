<template>
    <b-navbar align-h='center' class= "w-100 d-flex justify-content-between" type="dark" variant="dark" >
        
        <b-navbar-brand>
            <nuxt-link to='/' >
                <IconLeftWhite/>
            </nuxt-link>
        </b-navbar-brand>

        <b-navbar-nav>
            <b-nav-item href="#" @click="logout()">Logout</b-nav-item>
        </b-navbar-nav>

    </b-navbar>    
</template>

<script>


export default {
    methods : {
        logout : function () {
            this.$store.commit('LOGOUT_USER')
        }
    }
}
</script>
