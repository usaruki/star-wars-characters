<template>
  <section class="character-view" :key="`render_character__${character.name}`">
    <template v-if="character === ''">
      <h2>Oops!</h2>
      <p>We tried so hard and got so far, but the character <ins>{{characterQuery}}</ins> appears to not exist <del>yet</del>.</p>
    </template>
    <character-record v-else-if="character.name" :character="character"/>
  </section>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import CharacterRecordVue from '../components/Character/CharacterRecord.vue';

export default {
  name: 'Character',
  components: {
    'character-record': CharacterRecordVue
  },
  computed: {
    ...mapGetters('characters', {
      results: 'getResults',
      character: 'getViewingCharacter'
    }),
    characterQuery() {
      return this.$route.params.character ?? '';
    }
  },
  watch: {
    character(val) {
      if (val.name === this.characterQuery) return;
      if (val.name) {
        this.$router.replace(`/character/${val.name}`);
      }
    }
  },
  methods: {
    ...mapMutations('characters', [
      'setViewingCharacter'
    ]),
    ...mapActions('characters', [
      'fetchCharacterData',
      'findFirstCharacter'
    ])
  },
  mounted() {
    this.setViewingCharacter({});
    let query = this.characterQuery.toLowerCase();
    let index = this.results.findIndex(c => {
      let name = c.name.toLowerCase();
      return name.includes(query);
    });
    if (index > -1) {
      this.fetchCharacterData(this.results[index]);
    } else {
      this.findFirstCharacter(query);
    }
  }
}
</script> 

<style lang="scss">
.character-view {
  h2 {
    text-align: center;
    font-weight: 600;
    font-size: 2rem;
    line-height: 4.5rem;
    
    @media screen and (min-width: 801px) {
      font-size: 2.75rem;
      line-height: 6.5rem;
    }
  }

  p {
    text-align: center;
    font-weight: 400;
    font-size: 1.125rem;
    line-height: 1.5rem;
    margin-inline: 4rem;

    @media screen and (min-width: 801px) {
      font-size: 1.75rem;
      line-height: 2.5rem; 
      margin-inline: 12rem;
    }
  }
}
</style>
