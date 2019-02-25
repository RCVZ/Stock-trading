<template>
  <div>
    <Stock
      v-for="(stock, index) in stocks"
      :key="index"
      :quantity="stock.quantity"
      :name="stock.name"
      :price="stock.price"
    />
  </div>
</template>

<script>
import Stock from './Stock.vue';
import { mapGetters } from 'vuex';

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
