<template>
  <div class="home">
    <search-bar/>
  </div>
</template>

<script>
import SearchBarVue from '../components/SearchBar.vue'

export default {
  name: 'Home',
  components: {
    'search-bar': SearchBarVue
  }
}
</script>