<template>
  <div>
    <b-row class="d-flex justify-content-center">
      <b-col>
        <div class="overflow-auto">
          <b-pagination-nav :link-gen="linkGen" :number-of-pages="10" use-router></b-pagination-nav>
        </div>
      </b-col>
    </b-row>

      <Posts/>

    <b-row class="d-flex justify-content-center">
      <b-col>
        <div class="overflow-auto">
          <b-pagination-nav :link-gen="linkGen" :number-of-pages="10" use-router></b-pagination-nav>
        </div>
      </b-col>
    </b-row>
    
  </div>
</template>

<script>
  export default {
    name: 'IndexPage',
}

</script>

<style>

</style>
