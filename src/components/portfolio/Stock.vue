<template>
  <div class="col-sm-6 col-md-4">
    <div class="panel panel-primary">
      <div class="panel-heading">
        <h3 class="panel-title">
          {{ stock.name }}
          <small>(Price: {{ stock.price }} | {{ stock.quantity }})</small>
        </h3>
      </div>
      <div class="panel-body">
        <div class="pull-left">
          <input
            type="number"
            class="form-control"
            placeholder="Quantity"
            v-model.number="quantity"
          >
        </div>
        <div class="pull-right">
          <button
            @click="sell"
            class="btn btn-success"
            :disabled="quantity <= 0 || !Number.isInteger(quantity) || availableQuantity"
          >
            Sell
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  props: ['stock'],
  data () {
    return {
      quantity: 0
    };
  },
  computed: {
    funds () {
      return this.$store.getters.funds < this.stock.price;
    },
    availableQuantity () {
      return this.quantity > this.stock.quantity;
    }
  },
  methods: {
    ...mapActions([
      'sellStock'
    ]),
    sell () {
      const order = {
        id: this.stock.id,
        price: this.stock.price,
        quantity: this.stock.quantity
      };
      this.quantity = 0;
      this.sellStock(order);
    }
  }
};
</script>
