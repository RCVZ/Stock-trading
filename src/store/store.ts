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
    'SET_STOCKS' (state, stocks) {
      state.stocks = stocks;
    },
    'RND_STOCK' (state) {
      state.stocks.forEach(stock => {
        if (stock.price < 3) {
          stock.price += 10;
        };
        stock.price = Math.round(stock.price * (1 + Math.random() - 0.45));
      });
    },
    'BUY_STOCK' (state, { id, quantity, price }) {
      const record = state.portfolioStocks.find(el => el.id === id);
      if (record) {
        record.quantity += quantity;
      } else {
        state.portfolioStocks.push({
          id: id,
          quantity: quantity
        });
      }
      state.funds -= price * quantity;
    },
    'SELL_STOCK' (state, { id, quantity, price }) {
      const record = state.portfolioStocks.find(el => el.id === id);
      if (record.quantity > quantity) {
        record.quantity -= quantity;
      } else {
        const index = state.portfolioStocks.indexOf(record);
        state.portfolioStocks.splice(index, 1);
      }
      state.funds += price * quantity;
    },
    'SET_PORTFOLIO' (state, portfolio) {
      state.funds = portfolio.funds;
      state.portfolioStocks = portfolio.portfolioStocks ? portfolio.portfolioStocks : [];
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
    },
    loadData: ({ commit }) => {
      Vue.http.get('data.json')
        .then(response => response.json())
        .then(data => {
          if (data) {
            const stocks = data.stocks;
            const funds = data.funds;
            const portfolioStocks = data.portfolioStocks;

            const portfolio = {
              portfolioStocks,
              funds
            };

            commit('SET_STOCKS', stocks);
            commit('SET_PORTFOLIO', portfolio);
          }
        });
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
