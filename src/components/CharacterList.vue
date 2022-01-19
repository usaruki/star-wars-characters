<template>
  <ul :class="{'page-wrapper': true, 'prefers-3d': perspective === '3D'}">
    <li class="page-item" v-for="item in list" :key="`character-card__${item.name}`">
      <character-card :name="item.name" :character="item"/>
    </li>
  </ul>
</template>

<script>
import { mapGetters } from 'vuex';
import CharacterCardVue from './CharacterCard.vue'
export default {
  name: 'CharacterList',
  components: {
    'character-card': CharacterCardVue
  },
  computed: {
    ...mapGetters('local', { perspective: 'getUserMode' }),
  },
  props: {
    list: {
      default() { return [] }
    }
  }
}
</script>

<style lang="scss">
.page-wrapper {
  list-style: none;
  display: grid;
  grid-template-rows: auto;

  >*+* {
    margin-top: 2rem;
  }

  &.prefers-3d {  
    >* {
      margin-top: 8rem;
    }
  }

}

.page-item {
  display: flex;
  height: max-content;
}
</style>