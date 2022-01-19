export default {
  namespaced: true,
  state: {
    userTheme: window.localStorage.getItem('user-theme') ?? 'light',
    userMode: window.localStorage.getItem('user-mode') ?? '3D'
  },
  getters: {
    getUserTheme(state) {
      return state.userTheme;
    },
    getUserMode(state) {
      return state.userMode;
    }
  },
  mutations: {
    setUserTheme(state, payload) {
      state.userTheme = payload;
    },
    setUserMode(state, payload) {
      state.userMode = payload;
    }
  },
}