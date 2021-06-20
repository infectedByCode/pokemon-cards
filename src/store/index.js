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
    fetchMove({}, url) {
      return fetch(url)
        .then((response) => response.json())
        .then((move) => move);
    },
    fetchSinglePokemon({ dispatch }, pokedexIndex) {
      const hasPokemon =
        this.state.pokemon.filter((p) => p.id === pokedexIndex).length > 0;
      if (!hasPokemon) {
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokedexIndex}`)
          .then((response) => response.json())
          .then(async (rawPokemon) => {
            const pokemon = {
              id: rawPokemon.id,
              name: rawPokemon.name,
              hp:
                rawPokemon.stats.filter((s) => s.stat.name === 'hp')[0]
                  ?.base_stat || '10',
              image: rawPokemon.sprites.front_default,
              moves: []
            };
            for (let i = 0; i < 2; i++) {
              const move = await dispatch(
                'fetchMove',
                rawPokemon.moves[i]?.move?.url
              );
              pokemon.moves.push(move);
            }
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
