<template>
  <router-link class="character-card" :title="name" :to="`/character/${name}`">
    <div :class="{'card-content': true, 'prefers-3d': perspective === '3D'}">
      <h3>{{name}}</h3>
    </div>
  </router-link>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'CharacterCard',
  props: {
    name: {
      default: 'R2-D2'
    },
    character: {
      default() { return {} }
    }
  },
  computed: {
    ...mapGetters('local', { perspective: 'getUserMode' }),
  }
}
</script>

<style lang="scss">
  .character-card {
    margin-inline: auto;
    text-decoration: none;
    
    &:hover, &:focus {
      outline: none;
      h3 {
        text-decoration: underline;
      }
    }
  }

  .card-content {

    h3 {
      font-family: var(--sw-font);
      color: var(--text-color);
      font-weight: 400;
      line-height: 2.5rem;
      font-size: 1.75rem;
      text-align: center;

      @media screen and (min-width: 801px) {
        font-size: 2.5rem;
        line-height: 4rem;
      }
    }

    &.prefers-3d {

      h3 {
        line-height: 4.5rem;
        font-size: 2.75rem;

        @media screen and (min-width: 801px) {
          font-size: 4rem;
          line-height: 7rem;
        }
      }
    }
  }
</style>