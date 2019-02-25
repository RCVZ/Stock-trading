import Vue from 'vue';
import Vuex from 'vuex';
import stocks from '../data/stocks.js';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    stocks: [],
    funds: 10000,
    portfolioStocks: []
  },
  mutations: {
    SET_STOCKS (state, stocks) {
      state.stocks = stocks;
    },
    RND_STOCK (state) {

    },
    BUY_STOCK (state, { stockId, quantity, stockPrice }) {
      const record = state.portfolioStocks.find(el => el.id === stockId);
      if (record) {
        record.quantity += quantity;
      } else {
        state.portfolioStocks.push({
          id: stockId,
          quantity: quantity
        });
      }
      state.funds -= stockPrice * quantity;
      console.log('test', state.portfolioStocks);
    },
    SELL_STOCK (state, { stockId, quantity, stockPrice }) {
      const record = state.portfolioStocks.find(el => el.id === stockId);
      if (record.quantity > quantity) {
        record.quantity -= quantity;
      } else {
        const index = state.portfolioStocks.indexOf(record);
        state.portfolioStocks.splice(index, 1);
      }
      state.funds += stockPrice * quantity;
    }
  },
  actions: {
    buyStock: ({ commit }, order) => {
      commit('BUY_STOCK', order);
    },
    initStocks: ({ commit }) => {
      commit('SET_STOCKS', stocks);
    },
    randomizeStocks: ({ commit }) => {
      commit('RND_STOCK');
    },
    sellStock: ({ commit }, order) => {
      commit('SELL_STOCK', order);
    }
  },
  getters: {
    stocks: state => {
      return state.stocks;
    },
    portfolioStocks: state => state.portfolioStocks.map(stock => {
      const record = state.stocks.find(el => el.id === stock.id);
      return {
        id: stock.id,
        quantity: stock.quantity,
        name: record.name,
        price: record.price
      };
    }),
    funds: state => {
      return state.funds;
    }
  }
});
