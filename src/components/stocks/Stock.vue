<template>
  <div class="col-sm-6 col-md-4">
    <div class="panel panel-success">
      <div class="panel-heading">
        <h3 class="panel-title">
          {{ name }}
          <small>(Price: {{ price }})</small>
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
            :disabled="quantity <= 0 || !Number.isInteger(quantity)"
          >Buy</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['id', 'name', 'price'],
  data () {
    return {
      quantity: 0
    }
  },
  methods: {
    submit () {
      const data = {
        id: this.id,
        name: this.name,
        price: this.price
      }
      console.log(data)
      this.quantity = 0
    }
  }
}
</script>
