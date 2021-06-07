<template>
  <div id="app">
    <h1>Pokedex</h1>
    <section class="pokedex-carousel">
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
.pokedex-carousel {
  display: flex;
  overflow-x: hidden;
  padding: 100px 0;
  min-height: 800px;
}
</style>
