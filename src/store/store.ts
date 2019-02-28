import Vue from 'vue';
import Vuex from 'vuex';
import stocks from '@/data/stocks.ts';

Vue.use(Vuex);

interface State {
  stocks: Array<object> | Array<undefined>,
  funds: number,
  portfolioStocks?: Array<object> | Array<undefined>
}

interface Stock {
  id: string,
  name: string,
  price: number,
  quantity?: number
}

interface Portfolio {
  id: string,
  quantity: number
}

export default new Vuex.Store<State>({
  state: {
    stocks: [],
    funds: 10000,
    portfolioStocks: []
  },
  mutations: {
    SET_STOCKS (state, stocks: Array<object>): void {
      state.stocks = stocks;
    },
    RND_STOCK (state: any) {
      state.stocks.forEach((stock: Stock): void => {
        if (stock.price < 3) {
          stock.price += 10;
        };
        stock.price = Math.round(stock.price * (1 + Math.random() - 0.45));
      });
    },
    BUY_STOCK (state: any, { id, quantity, price }) {
      const record = state.portfolioStocks.find((el: Portfolio) => el.id === id);
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
    SELL_STOCK (state: any, { id, quantity, price }) {
      const record = state.portfolioStocks.find((el: Portfolio) => el.id === id);
      if (record.quantity > quantity) {
        record.quantity -= quantity;
      } else {
        const index = state.portfolioStocks.indexOf(record);
        state.portfolioStocks.splice(index, 1);
      }
      state.funds += price * quantity;
    },
    SET_PORTFOLIO (state, portfolio) {
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
        .then((response: any) => response.json())
        .then((data: any) => {
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
    portfolioStocks: (state: any) => state.portfolioStocks.map((stock: any) => {
      const record = state.stocks.find((el: any) => el.id === stock.id);
      const { id, quantity } = stock;
      const { name, price }: any = record;
      return {
        id: id,
        quantity: quantity,
        name: name,
        price: price
      };
    }),
    funds: state => {
      return state.funds;
    }
  }
});
