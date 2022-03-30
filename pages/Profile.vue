<template>
    <Profile/>
</template>

<script>

export default {
    mounted : function () {
        console.log(this.$store.state.user.userId)
    }
}
</script>