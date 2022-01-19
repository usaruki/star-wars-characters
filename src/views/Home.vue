<template>
  <div class="home-view">
    <search-bar/>
  </div>
</template>

<script>
import SearchBarVue from '../components/Results/SearchBar.vue'

export default {
  name: 'Home',
  components: {
    'search-bar': SearchBarVue
  }
}
</script>