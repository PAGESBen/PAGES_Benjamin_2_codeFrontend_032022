<template>
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
          <GroupomaniaLogo/>
        </b-col>
        <b-col md='9'>
          <PostCard/>
        </b-col>
      </b-row>
    </b-container>
  </div>

</template>

<script>
  export default {
    name: 'IndexPage'
  }
</script>
