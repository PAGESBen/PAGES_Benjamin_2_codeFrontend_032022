<template>
    <div>
        <b-row class="mb-3 py-5 icon-background">
            <b-col cols='6' offset='3'>
                <div class="profil-img-container">
                    <b-img src="https://picsum.photos/1024/400/?image=41" thumbnail class="profile-img" alt="Profile Image"></b-img>        
                </div>
            </b-col>
        </b-row>
        <b-row>
            <b-col class="mx-3s">
                <b-badge v-if="admin" variant="danger">Admin</b-badge>
                <h1 class="w-100">UserName</h1>
                <p>email</p>
                <p>Position</p>
            </b-col>
        </b-row>

        <b-rows>
            Posts
        </b-rows>
    </div>
 
</template>

<script>
    export default {
    name: 'postCard',

    data: function () {
        return {
            admin : true
        }
    }
}
</script>


<style scoped>
    .icon-background {
        background-image: url(../assets/background.svg);
        background-repeat: no-repeat;
        background-size: 500px;
        background-position: bottom left;
    }

    .profil-img-container {
        width: 200px;
        height: 200px;
        border-radius: 100%;
    }

    .profile-img {
        object-fit: cover;
        object-position: center;
        width: 100%;
        min-height: 100%;
    }
</style>