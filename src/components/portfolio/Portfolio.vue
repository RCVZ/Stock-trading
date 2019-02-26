<template>
  <div>
    <Stock
      v-for="(stock, index) in stocks"
      :key="index"
      :stock="stock"
    />
  </div>
</template>

<script>
import Stock from './Stock.vue';

export default {
  computed: {
    stocks () {
      return this.$store.getters.portfolioStocks;
    }
  },
  components: {
    Stock
  }
};
</script>
