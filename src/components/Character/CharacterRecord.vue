<template>
  <div class="character-record">
    <h3>The Character</h3>
    <div class="record-wrapper">
      <div class="two-columns section">
        <section description="Origins">
          <h6>Name: {{character.name}}</h6>
          <div class="two-columns">
            <h6>Gender: {{character.gender}}</h6>
            <h6>Species: {{species}}</h6>
          </div>
          <div class="two-columns">
            <h6>Home: {{homeworld}}</h6>
            <h6>Birth: {{character.birth_year}}</h6>
          </div>
        </section>
        <section description="Traits">
          <div class="two-columns">
            <h6>Height: {{character.height}}</h6>
            <h6>Mass: {{character.mass}}</h6>
          </div>
          <div class="two-columns">
            <h6>Skin: {{character.skin_color}}</h6>
            <h6>Eyes: {{character.eye_color}}</h6>
          </div>
          <div class="two-columns">
            <h6>Hair: {{character.hair_color}}</h6>
          </div>
        </section>
      </div>
      <section class="container-section" description="Achievements">
        <section description="Films">
          <ul>
            <li v-for="f in character.films" :key="`film__item__${f.title}`">{{f.title}}</li>
          </ul>
        </section>
        <section description="Vehicles">
          <ul>
            <li v-for="v in character.vehicles" :key="`vehicle__item__${v.name}`">{{v.name}}</li>
          </ul>
        </section>
        <section description="Starships">
          <ul>
            <li v-for="s in character.starships" :key="`starship__item__${s.name}`">{{s.name}}</li>
          </ul>
        </section>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CharacterRecord',
  props: {
    character: {
      default() { return {} }
    }
  },
  computed: {
    species() {
      let species = this.character.species.map(i => i.name).join(', ').trim();
      return species === '' ? '?' : species;
    },
    homeworld() {
      return this.character.homeworld.name;
    }
  }
}
</script>

<style lang="scss">
.character-record {
  display: flex;
  flex-direction: column;
  --spacing: 1.5rem;
  margin-inline: var(--spacing);
  margin-bottom: var(--spacing);

  >*+* {
    margin-top: var(--spacing);
  }

  .record-wrapper {
    display: flex;
    flex-direction: column;
    
    >*+* {
      margin-top: var(--spacing);
    }
  }

  section {
    border: 4px double var(--text-color);
    border-radius: 6px;
    padding: var(--spacing);
    position: relative;

    &::after {
      content: attr(description);
      position: absolute;
      background-color: var(--bg-color);
      left: var(--spacing);
      bottom: 100%;
      transform: translateY(50%);

      line-height: 1.5rem;
      @media screen and (min-width: 801px) {
        font-size: 1.5rem;
        line-height: 2.25rem;
      }
    }
  }

  h3 {
    font-weight: 400;
    text-align: center;
    font-size: 1.25rem;
    line-height: 2rem;;

    @media screen and (min-width: 801px) {
      font-size: 1.75rem;
      line-height: 2.25rem;
    }
  }

  h6, li {
    font-weight: 200;
    font-size: .875rem;
    line-height: 1.25rem;
    
    @media screen and (min-width: 801px) {
      font-size: 1.25rem;
      line-height: 1.75rem;
    }
  }
}

.container-section {
  display: flex;

  @media screen and (max-width: 800px) {
    flex-direction: column;
  }

  >* {
    flex-basis: 100%  ;
    margin: var(--spacing);
  }
}

.two-columns {
  display: flex;
  flex-direction: column;
  @media screen and (min-width: 801px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
  }

  &.section {
    gap: 1.5rem;
  }
}
</style>