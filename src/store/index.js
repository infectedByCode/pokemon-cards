import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    pokemon: []
  },
  mutations: {
    UPDATE_POKEMON(state, pokemonArray) {
      state.pokemon = pokemonArray;
    }
  },
  actions: {
    updatePokemon({ commit }, pokemonArray) {
      commit('UPDATE_POKEMON', pokemonArray);
    },
    fetchPokemon({ dispatch }, numberOfPokemon) {
      fetch(`https://pokeapi.co/api/v2/pokemon?limit=${numberOfPokemon}`)
        .then((response) => response.json())
        .then((data) => {
          dispatch('updatePokemon', data.results);
        });
    }
  }
});
