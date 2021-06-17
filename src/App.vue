<template>
  <div id="app">
    <h1>Pokedex</h1>
    <section :class="`pokedex-carousel ${activePokemonId ? 'pokedex-carousel__no-overflow' : ''}`">
      <PokemonCard
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
      activePokemonId: null
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
    }
  }
};
</script>

<style scoped>
#app {
  box-sizing: border-box;
  max-width: 400px;
  height: 100%;
  overflow: hidden;
}

.pokedex-carousel {
  display: flex;
  justify-content: center;
  overflow-x: auto;
  padding: 50px 0;
}

.pokedex-carousel__no-overflow {
  overflow: hidden;
}
</style>
