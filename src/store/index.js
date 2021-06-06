import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    pokemon: []
  },
  mutations: {
    UPDATE_POKEMON_ARRAY(state, pokemon) {
      state.pokemon = [...state.pokemon, pokemon];
    }
  },
  actions: {
    updatePokemonArray({ commit }, pokemon) {
      commit('UPDATE_POKEMON_ARRAY', pokemon);
    },
    fetchSinglePokemon({ dispatch }, pokedexIndex) {
      const hasPokemon =
        this.state.pokemon.filter((p) => p.id === pokedexIndex).length > 0;
      if (!hasPokemon) {
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokedexIndex}`)
          .then((response) => response.json())
          .then((pokemon) => {
            dispatch('updatePokemonArray', pokemon);
          });
      }
    },
    fetchPokemon({ dispatch }, numberOfPokemon) {
      // fetches initial pokemon for page render
      const pokemonArray = [];

      for (let i = 1; i <= numberOfPokemon; i++) {
        dispatch('fetchSinglePokemon', i);
      }
    }
  }
});
