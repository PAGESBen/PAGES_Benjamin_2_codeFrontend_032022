<template>
    <div>
        <b-container fluid class="min-viewport-height m-0 p-0">

            <!-- ======= Vérification du localStorage ======= -->
            <b-row v-if="user.userId  == '-2'" class="min-viewport-height m-auto" align-content="center" align-h="center">
                <b-col class="text-center">
                    <Loader />
                </b-col>
            </b-row>

            <!-- ======= si non loged ======= -->
            <main v-else-if="user.userId  == '-1'">
                <b-row class="min-viewport-height m-auto" align-content="center" align-h="center">
                    <b-col lg="4" class="d-flex justify-content-center align-items-center">
                        <IconAbove />
                    </b-col>

                    <b-col lg="4" sm="8" class="d-flex justify-content-center align-items-center">
                        <LoginForm/>
                    </b-col>
                </b-row>
            </main>
            <!-- ========Si loged========= -->
            <div v-else>  
                <header>
                    <b-container class="bg-primary" fluid>
                        <b-container fluid='lg'>
                            <b-row>
                                <HeaderNav/>
                            </b-row>
                        </b-container>
                    </b-container>
                </header>

                <b-container fluid='lg'>
                    <b-row>
                        <b-col md='3'>
                            <nav aria-labelledby="navigation">
                                <Nav/>
                            </nav>
                        </b-col>
                        <b-col md='9'>
                            <main>
                                <Nuxt />
                            </main>
                        </b-col>
                    </b-row>
                </b-container>
            </div>

        </b-container>
    </div>
</template>

<style>
.min-viewport-height {
  min-height: 100vh;
}
</style>

<script>
import {mapState} from 'vuex'

export default {
    head() {
        return {
            title : 'Groupomania Social Hub',
            htmlAttrs : {
                lang: 'fr'
            }
        }
    },
    
    computed : {
        ...mapState(['user'])
    },

    mounted() {
        if(process.client) {
            let stored = localStorage.getItem('user')
            if(stored) {
                this.$store.commit('STORE_USER', JSON.parse(stored))
                this.$axios.setHeader('Authorization', 'Bearer ' + this.user.token) 
            } else {
                let user = {
                    userId : -1, 
                    token : '', 
                    admin : false
                }
                this.$store.commit('STORE_USER', user)
            }
        }
    }
}
</script>


