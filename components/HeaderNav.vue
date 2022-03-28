<template>
    <b-navbar align-h='center' class= "w-100 d-flex justify-content-between" type="dark" variant="dark" >
        
        <b-navbar-brand>
            <IconLeftWhite/>
        </b-navbar-brand>

        <b-navbar-nav>
            <b-button @click="$bvModal.show('logModal')" >Se connecter</b-button>
            <b-nav-item href="#">Logout</b-nav-item>
        </b-navbar-nav>

    </b-navbar>    
</template>

