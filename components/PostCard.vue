<template>

    <b-card class="p-0 my-2">
        <b-card-header header-bg-variant="white" class="p-1" align-v="center">
            <b-row cols="2">
                <b-col>
                    <b-card-title>
                        <nuxt-link to="/profile/41">
                            <b-img fluid src="../assets/defaultProfile.PNG.png" class='profilImage border-1 border-primary' rounded="circle" height="40px" width="40px" alt="Circle image"></b-img>
                            <span>userName</span>
                        </nuxt-link>
                    </b-card-title>
                </b-col>

                <b-col align-self="end" class="d-flex justify-content-end">
                    <b-button variant="secondary" size='sm' class="m-1">
                        <b-icon icon="pencil-square" variant="light" font-scale="1"></b-icon>
                    </b-button>
                    
                    <b-button variant="danger"  size='sm' class="m-1">
                        <b-icon icon="trash-fill" variant="light" font-scale="1"></b-icon>
                    </b-button>
                </b-col>
            </b-row>


            <b-row class="m-0 p-1">
                <b-card-sub-title sub-title-text-variant='muted small'>Created 3min ago</b-card-sub-title>
            </b-row>
        </b-card-header>

        <b-card-body class="p-2">
            <b-embed
                type="iframe"
                aspect="16by9"
                src="https://codingyaar.com/wp-content/uploads/video-in-bootstrap-card.mp4"
                allowfullscreen
            ></b-embed>

            <b-card-img align="center" src="https://placekitten.com/1000/300" img-alt="Card image" img-top />
            <b-card-text>message</b-card-text>
        </b-card-body>

        <b-card-footer footer-bg-variant="white">
            <b-row cols="2">
                <b-col>
                    <b-icon :icon="liked ? 'hand-thumbs-up-fill' : 'hand-thumbs-up'" variant="primary" font-scale="1.5"></b-icon>
                </b-col>
                <b-col class="text-right">
                    <span>Commentaires </span>
                    <b-badge href="#" variant="secondary">15</b-badge>
                </b-col>

            </b-row>
        </b-card-footer>
    
    </b-card>


    

</template>

<script>
export default {
    name: 'postCard',
    data: function () {
        return {
            liked : false
        }
    }, 

    props :{
        post : Object
    }
}
</script>

<style>
    .profilImage{
        height: 50px;
        width: 50px
    }
</style>