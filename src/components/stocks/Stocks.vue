<template>
    <div>
      <Stock
        v-for="(stock, index) in stocks"
        :key="index"
        :id="stock.id"
        :name="stock.name"
        :price="stock.price"
      />
    </div>
</template>

<script>
import Stock from './Stock.vue'

export default {
  data () {
    return {
      stocks: [
        { id: 1, name: 'BMW', price: 110 },
        { id: 2, name: 'Google', price: 140 },
        { id: 3, name: 'BOL', price: 200 },
        { id: 4, name: 'Apple', price: 50 },
        { id: 5, name: 'Twitter', price: 80 },
        { id: 6, name: 'BCE', price: 800 }
      ]
    }
  },
  components: {
    Stock
  }
}
</script>
