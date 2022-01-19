<template>
  <ul :class="{'character-list-wrapper': true, 'prefers-3d': perspective === '3D'}">
    <li v-for="item in list" :key="`character-card__${item.name}`">
      <character-card :name="item.name" :character="item"/>
    </li>
  </ul>
</template>

<script>
import { mapGetters } from 'vuex';
import CharacterCardVue from './CharacterCard.vue';
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
.character-list-wrapper {
  list-style: none;
  display: grid;
  grid-template-rows: auto;

  >* {
    transition: all 300ms ease;
  }

  >*+* {
    margin-top: 2rem;
  }

  &.prefers-3d {  
    >* {
      margin-top: 8rem;
    }
  }

}
</style>