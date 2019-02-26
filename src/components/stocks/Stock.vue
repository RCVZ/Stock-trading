<template>
  <div class="col-sm-6 col-md-4">
    <div class="panel panel-success">
      <div class="panel-heading">
        <h3 class="panel-title">
          {{ stock.name }}
          <small>(Price: {{ stock.price }})</small>
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
            @click="submit"
            class="btn btn-success"
            :disabled="availableFunds || quantity <= 0 || !Number.isInteger(quantity)"
          >
            Buy
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['stock'],
  data () {
    return {
      quantity: 0
    };
  },
  computed: {
    funds () {
      return this.$store.getters.funds;
    },
    availableFunds () {
      return this.quantity * this.stock.price > this.funds;
    }
  },
  methods: {
    submit () {
      const order = {
        id: this.stock.id,
        quantity: this.quantity,
        price: this.stock.price
      };
      this.quantity = 0;
      this.$store.dispatch('buyStock', order);
    }
  }
};
</script>
