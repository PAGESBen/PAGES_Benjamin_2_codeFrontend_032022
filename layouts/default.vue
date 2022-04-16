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
            <b-row v-else-if="user.userId  == '-1'" class="min-viewport-height m-auto" align-content="center" align-h="center">
                <b-col lg="4" class="d-flex justify-content-center align-items-center">
                    <IconAbove />
                </b-col>

                <b-col lg="4" sm="8" class="d-flex justify-content-center align-items-center">
                    <LoginForm/>
                </b-col>
            </b-row>
            
            <!-- ========Si loged========= -->
            <div v-else>  
                <b-container class="bg-primary" fluid>
                    <b-container fluid='lg'>
                        <b-row>
                            <HeaderNav/>
                        </b-row>
                    </b-container>
                </b-container>

                <b-container>
                    <b-row>
                        <b-col md='3'>
                            <Nav/>
                        </b-col>
                        <b-col md='9'>
                            <Nuxt />
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

.teste {
 height: 300px;   
}
</style>

<script>

import {mapState} from 'vuex'

export default {
    data : function () {
        return  {
            dev : "test"
        }
    }, 
    
    computed : {
        ...mapState(['user'])
    },

    mounted() {
        console.log(this.user)
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


