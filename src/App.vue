<template>
  <div class="container">
    <Header />
    <div class="row">
      <div class="col-xs-12">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import Header from './Header.vue';

export default {
  components: {
    Header
  },
  created () {
    this.$store.dispatch('initStocks');
  }
};
</script>

<style>
body {
    padding: 30px;
}
</style>
