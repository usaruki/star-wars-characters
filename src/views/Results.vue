<template>
  <div class="results" >
    <search-bar :urlQuery="$route.params.query"/>
    <paginator :pageCount="pageCount" :currentPage="page" :urlQuery="urlQuery">
      <character-list :list="results"/>
    </paginator>
  </div>
</template>

<script>
import SearchBarVue from '../components/SearchBar.vue'
import PaginatorVue from '../components/Paginator.vue'
import CharacterListVue from '../components/CharacterList.vue'
import { mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  name: 'Results',
  components: {
    'search-bar': SearchBarVue,
    'paginator': PaginatorVue,
    'character-list': CharacterListVue
  },
  computed: {
    ...mapGetters('characters', {
      results: 'getResults',
      pageCount: 'getEstimatedPageCount',
      page: 'getViewingPage'
    }),
    urlQuery() {
      return this.$route.params.query ?? '';
    },
    urlPage() {
      return this.$route.params.page ?? 1;
    }
  },
  watch: {
    urlQuery() {
      this.loadPage();
    },
    urlPage() {
      this.loadPage();
    }
  },
  methods: {
    ...mapMutations('characters', [
      'setViewingPage'
    ]),
    ...mapActions('characters', [
      'searchCharacters'
    ]),
    loadPage() {
      this.setViewingPage(this.urlPage);
      this.searchCharacters(this.urlQuery);
    }
  },
  mounted() {
    this.loadPage();
  }
}
</script>

<style lang="scss">

.results {
  height: calc(100vh - var(--nav-height) - var(--nav-border-height));
}
</style>