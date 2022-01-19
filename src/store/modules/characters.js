import axios from "axios";

axios.defaults.baseURL = 'https://swapi.dev/api/'

export default {
  namespaced: true,
  state: {
    estimatedPageCount: 1,
    results: [],
    viewingPage: 1,
    viewingCharacter: {}
  },
  getters: {
    getResults(state) {
      return state.results;
    },
    getResultsCount(state) {
      return state.results.length;
    },
    getEstimatedPageCount(state) {
      return state.estimatedPageCount;
    },
    getViewingPage(state) {
      return state.viewingPage;
    },
    getViewingCharacter(state) {
      return state.viewingCharacter;
    }
  },
  mutations: {
    setViewingPage(state, payload) {
      state.viewingPage = payload;
    },
    setResults(state, payload) {
      state.estimatedPageCount = Math.ceil(payload.count / 10);
      state.results = payload.results;
    },
    setViewingCharacter(state, payload) {
      state.viewingCharacter = payload;
    }
  },
  actions: {
    searchCharacters(context, query) {
      let page = context.getters.getViewingPage;
      axios.get(`/people/?search=${query}&page=${page}`).then(res => {
        if ([200,201].includes(res.status)) {
          context.commit('setResults', res.data);
        }
      }).catch(err => {
        console.log(err);
        context.commit('setViewingPage', 1);
        context.dispatch('searchCharacters', query);
      })
    },
    findFirstCharacter(context, query) {
      if (query === '') {
        context.commit('setViewingCharacter', '');
        return;
      }
      axios.get(`/people/?search=${query}`).then(res => {
        if ([200,201].includes(res.status)) {
          if (res.data.count > 0) {
            let first = res.data.results[0];
            context.dispatch('fetchCharacterData', first);
          } else {
            context.commit('setViewingCharacter', '');
          }
        }
      }).catch(err => {
        console.log(err);
      })
    },
    fetchCharacterData(context, character) {
      let keys = context.rootGetters['api/getRootKeys'];
      let characterData = {};
      let requests = [];
      Object.keys(character).forEach(k => {
        if (keys.includes(k)) {
          characterData[k] = [];
          character[k].forEach(url => {
            let req = axios.get(url); 
            req.then(res => {
              if ([200,201].includes(res.status)) {
                characterData[k].push(res.data);
              }
            })
            requests.push(req);
          })
        } else if(k === 'homeworld') {
          let req = axios.get(character[k]);
          req.then(res => {
            if ([200,201].includes(res.status)) {
              characterData[k] = res.data;
            }
          })
          requests.push(req);
        } else {
          characterData[k] = character[k];
        }
      })
      axios.all(requests).then(() => {
        context.commit('setViewingCharacter', characterData);
      })
    }
  },
}