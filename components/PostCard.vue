<template>

    <b-card class="border-0">
        <b-card-title>
            <b-img fluid src="../assets/defaultProfile.PNG.png" class='profilImage border-1 border-primary' rounded="circle" alt="Circle image"></b-img>
            <span>userName</span>
        </b-card-title>

        <b-card-sub-title sub-title-text-variant='muted'>Created 3min ago</b-card-sub-title>

        <b-card-body>
            <div class="embed-responsive embed-responsive-16by9">
                <video src="https://codingyaar.com/wp-content/uploads/video-in-bootstrap-card.mp4" autoplay loop class="embed-responsive-item" controls> </video>            
            </div>
            <b-card-img align="center" src="https://placekitten.com/1000/300" img-alt="Card image" img-top />
            <b-card-text>{{message}}</b-card-text>
        </b-card-body>

        <b-card-footer>
            <b-row cols="2">
                <div>
                    <span>icon like</span>
                    <span>icon delete</span>
                    <span>icon modifier </span>
                </div>
            </b-row>
        </b-card-footer>
    
        
    
    </b-card>


    

</template>

<script>
export default {
    name: 'postCard'
}
</script>

<style>
    .profilImage{
        height: 50px;
        width: 50px
    }
</style>