<template>
  <div id="app" :class="{'dark-mode': userTheme === 'dark'}">
    <nav-bar/>
    <router-view id="view" class="anim-fade"/>
  </div>
</template>
<script>
import NavBarVue from './components/NavBar.vue';
import { mapGetters, mapActions } from 'vuex';
export default {
  name: 'Main',
  components: {
    'nav-bar': NavBarVue
  },
  computed: {
    ...mapGetters('local', {
      userTheme: 'getUserTheme'
    })
  },
  methods: {
    ...mapActions('api', ['fetchRootKeys'])
  },
  beforeMount() {
    this.fetchRootKeys();
  }
}
</script>

<style lang="scss">

@font-face {
  font-family: 'SF Distant Galaxy';
  src: url('./assets/fonts/SF Distant Galaxy.ttf');
  font-display: swap;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

button {
  background: none;
  border: none;
  cursor: pointer;
}

:root {
  --sw-yellow: #ffe81f;
  --sw-yellow: #f6cf4f;
  --sw-white: #e8e8e8;
  --sw-black: #222222;
  --sw-blue: #0aa4fa;
  --sw-red: #cf1520;
  --sw-brown-100: #cbbda2;
  --sw-brown-400: #753f1f; 

  --sw-font: SF Distant Galaxy, Arial;
  --scroll-size: 12px;
  --max-width: 1920px;
}

body {
  font-family: var(--sw-font);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  //transform: perspective(300px) rotateX(20deg);
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.anim-fade {
  animation: fadeIn 500ms ease-in-out;
}

#app {
  *::-webkit-scrollbar {
    height: var(--scroll-size);
    width: var(--scroll-size);
  }
  *::-webkit-scrollbar-track {
    background-color: transparent;
    border-radius: 50px;
  }

  *::-webkit-scrollbar-thumb {
    background-color: var(--scroll-color);
    border-radius: 50px;
  }

  --nav-height: 10.5rem;
  --nav-border-height: 6px;
  --nav-border: var(--nav-border-height) double var(--text-color);

  min-height: 100vh;
  overflow-x: hidden;

  --text-color: var(--sw-black);
  --bg-color: var(--sw-white);
  --scroll-color: var(--sw-blue);
  
  &.dark-mode {
    --bg-color: var(--sw-black);
    --text-color: var(--sw-yellow);
    --scroll-color: var(--sw-red);
  }

  background-color: var(--bg-color);
  color: var(--text-color);

  display: grid;
  grid-template-rows: calc(var(--nav-height) + var(--nav-border-height)) 1fr;
}

#view {
  max-width: var(--max-width);
  display: flex;
  flex-direction: column;
  --view-padding: 1.75rem;
  padding-top: var(--view-padding);

  @media screen and (min-width: 1921px) {
    min-width: var(--max-width);
    margin-inline: auto;
  }
}


</style>
