<template>
  <label class="search-bar-wrapper" title="Character search">
    <input class="search-bar" type="search" v-model="query" placeholder="Character search" @search="search()">
    <button class="search-button" @click="search()"><search-icon/></button>
  </label>
</template>

<script>
import SearchVue from './icons/Search.vue';
// import { mapActions } from 'vuex';
export default {
  name: 'SearchBar',
  components: {
    'search-icon': SearchVue
  },
  props: {
    urlQuery: {
      default: ''
    }
  },
  data() {
    return {
      query: ''
    }
  },
  methods: {
    // ...mapActions('characters', ['searchCharacters']),
    search() {
      let query = this.$route.params.query ?? ''; 
      if ( query !== this.query) {
        this.$router.push(`/search/${this.query}`);
      }
    }
  },
  mounted() {
    this.query = this.urlQuery;
  }
}
</script>

<style lang="scss">

.search-bar-wrapper {
  border-radius: 32px;
  border: 2px solid var(--text-color);
  width: max-content;
  margin-inline: auto;
  display: flex;
  padding: .25rem 1rem;


  --search-font-size: .875rem;

  @media screen and (min-width: 801px) {
    padding: .5rem  1.25rem;
    --search-font-size: 1.625rem;
  }
  font-size: var(--search-font-size);
  
  .search-button {
    margin-inline: auto;
    margin-left: 2ch;
    width: var(--search-font-size);
  }
}

.search-bar {
  background-color: var(--background-color);
  color: var(--text-color);
  border: none;
  font-family: SF Distant Galaxy, Arial; 
  font-size: inherit;
  width: 13em;

  &:focus {
    outline: none;
  }
}

</style>