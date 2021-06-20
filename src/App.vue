<template>
  <div id="app">
    <h1>Pokedex</h1>
    <button @click.prevent="getNextPokemon">next</button>
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
    this.$store.dispatch("fetchPokemon", 5);
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
    },
    getNextPokemon() {
      this.lastId++;
      this.$store.dispatch("fetchSinglePokemon", this.lastId);
    }
  }
};
</script>

<style scoped>
#app {
  height: 100%;
  width: auto;
  margin: 0 auto;
}

.pokedex-carousel {
  display: flex;
  justify-content: initial;
  overflow-x: scroll;
  padding: 50px 0;
}

.pokedex-carousel__no-overflow {
  overflow: hidden;
  justify-content: center;
}
</style>
