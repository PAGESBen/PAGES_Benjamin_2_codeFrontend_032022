<template>
    <div>
        <b-container fluid class="min-viewport-height m-0 p-0 bg-light">
            
            <!-- =======si non loged======= -->
            <b-row v-if="user.userId  == '-1'" class="min-viewport-height m-auto" align-content="center" align-h="center">
                <b-col lg="4" class="d-flex justify-content-center align-items-center">
                    <IconAbove />
                </b-col>

                <b-col lg="4" sm="8" class="d-flex justify-content-center align-items-center">
                    <LoginForm/>
                </b-col>
            </b-row>
            
            <!-- ========Si loged========= -->
            <div v-else>  
                <b-container class="bg-dark" fluid>
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
    }
}

</script>


