<template>
  <div id="app">
    <h1>Pokedex</h1>
    <section :class="`pokedex-carousel ${activePokemonId ? 'pokedex-carousel__no-overflow' : ''}`">
      <PokemonCard
        :id="'p' + pokemon.id"
        v-for="pokemon in pokemonArr"
        :key="pokemon.id"
        :pokemon="pokemon"
        :activePokemonId="activePokemonId"
        @click="togglePokemonEffect(pokemon.id)"
      />
    </section>
  </div>
</template>

<script>
import PokemonCard from "@/components/PokemonCard.vue";

export default {
  name: "App",
  components: {
    PokemonCard
  },
  data() {
    return {
      activePokemonId: null,
      lastId: 5
    };
  },
  beforeCreate() {
    this.$store.dispatch("fetchPokemon", 20);
  },
  computed: {
    pokemonArr() {
      return this.$store.state.pokemon.sort((a, b) => a.id - b.id);
    }
  },
  methods: {
    togglePokemonEffect(id) {
      const { activePokemonId } = this;
      if (!activePokemonId) {
        this.activePokemonId = id;
      } else if (activePokemonId === id) {
        this.activePokemonId = null;
      }
    }
  }
};
</script>

<style scoped>
#app {
  box-sizing: border-box;
  height: 100%;
  width: 80vw;
  margin: 0 auto;
  overflow-wrap: normal;
}

.pokedex-carousel {
  display: flex;
  flex-wrap: wrap;
  justify-content: initial;
  overflow-x: none;
  padding: 50px 0;
}

.pokedex-carousel__no-overflow {
  overflow: hidden;
  justify-content: center;
}
</style>
