import axios from "axios";

axios.defaults.baseURL = 'https://swapi.dev/api/'

export default {
  namespaced: true,
  state: {
    rootKeys: []
  },
  getters: {
    getRootKeys(state) {
      return state.rootKeys;
    }
  },
  mutations: {
    setRootKeys(state, payload) {
      state.rootKeys = payload
    }
  },
  actions: {
    fetchRootKeys(context) {
      axios.get('').then(res => {
        if ([200, 201].includes(res.status)) {
          context.commit('setRootKeys', Object.keys(res.data));
        }
      }).catch(err => {
        console.log(err);
        context.commit('setRootKeys', [
          "people",
          "planets",
          "films",
          "species",
          "vehicles",
          "starships"
        ])
      })
    }
  }
}