<template>
    <div>
        <b-container fluid id="min-viewport-height" class="m-0 p-0 bg-light">
            <div>  
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

#min-viewport-height {
  min-height: 100vh;
}

</style>