<template>
  <nav class="navbar navbar-default">
    <div class="container-fluid">
      <div class="navbar-header">
        <router-link
          to="/"
          class="navbar-brand"
        >
          Stock Trader
        </router-link>
      </div>

      <div class="collapse navbar-collapse">
        <ul class="nav navbar-nav">
          <router-link
            to="/portfolio"
            active-class="active"
            tag="li"
          >
            <a>Portfolio</a>
          </router-link>
          <router-link
            to="/stocks"
            active-class="active"
            tag="li"
          >
            <a>Stocks</a>
          </router-link>
        </ul>
        <ul class="nav navbar-nav navbar-right">
          <li>
            <a
              href="#"
              @click="rdnStock"
            >End Day
            </a>
          </li>
          <li
            class="dropdown"
            :class="{open: expand}"
          >
            <a
              @click="expand = !expand"
              href="#"
              class="dropdown-toggle"
              data-toggle="dropdown"
              role="button"
              aria-haspopup="true"
              aria-expanded="false"
            >Save & Load
              <span class="caret" />
            </a>
            <ul class="dropdown-menu">
              <li>
                <a
                  @click="save"
                  href="#"
                >Save
                </a>
              </li>
              <li>
                <a
                  href="#"
                  @click="load"
                >Load
                </a>
              </li>
            </ul>
          </li>
          <li>
            <span class="navbar-text">FUNDS: €{{ funds }}</span>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { mapActions } from 'vuex';

@Component
export default class Header extends Vue {
  expand: boolean = false;

  get funds () {
    return this.$store.getters.funds;
  }

  rdnStock () {
    this.$store.dispatch('randomizeStocks');
  }

  save () {
    const { funds, portfolioStocks, stocks } = this.$store.getters;
    const data = {
      funds,
      portfolioStocks,
      stocks
    };
    this.$http.put('data.json', data);
    this.expand = false;
  }
  load () {
    this.$store.dispatch('loadData');
    this.expand = false;
  }
};
</script>
