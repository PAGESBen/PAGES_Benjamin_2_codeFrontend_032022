<template>
    <b-navbar align-h='center' class= "w-100 d-flex justify-content-between" type="dark" variant="primary" aria-labelledby="mainPage">
            <b-navbar-brand>
                <div id="mainPage">
                    <nuxt-link to='/' >
                        <IconLeftWhite/>
                    </nuxt-link>
                </div>
            </b-navbar-brand>

            <b-navbar-nav>
                <b-nav-item @click="logout()">Logout</b-nav-item>
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

