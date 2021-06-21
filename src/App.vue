<template>
  <main id="app">
    <h1>Pokedex</h1>
    <button @click.prevent="getNextPokemon">next</button>
    <!-- Section for displaying pokemon details -->
    <section class="pokemon-info pokedex">
      <span class="podedex-controls">
        <span>+</span>
        <span class="podedex-controls__buttons">&middot;&middot;</span>
      </span>
      <div class="pokemon-info__card" />
      <div class="pokemon-info__stats">
        <div
          :class="`pokemon-info__stats-display ${currentPokemon.length ? 'pokemon-info__stats-active' : ''}`"
        >
          <div v-if="currentPokemon.length">
            <h3>Name: {{currentPokemon[0].name}}</h3>
            <p>Type: {{currentPokemon[0].types.map(t => t.type.name).join(" / ")}}</p>
            <p>Height: {{currentPokemon[0].height * 10}}cm</p>
            <p>Weight: {{currentPokemon[0].weight / 10}}kg</p>
            <p
              v-for="s in currentPokemon[0].stats"
              :key="s.stat.name"
            >{{`${s.stat.name}: ${s.base_stat}`}}</p>
          </div>
        </div>
      </div>
      <span class="pokedex-handle" />
      <span class="pokedex-handle" />
    </section>
    <!-- Section for pokemon cards -->
    <section :class="`pokedex-carousel ${activePokemonId ? 'pokedex-carousel__no-overflow' : ''}`">
      <PokemonCard
        :id="'p' + pokemon.id"
        v-for="pokemon in pokemonArr"
        :key="pokemon.id"
        :pokemon="pokemon"
        :position="pokemon.id === activePokemonId ? activeCardPosition : null"
        :activePokemonId="activePokemonId"
        @click="togglePokemonEffect(pokemon.id)"
      />
    </section>
  </main>
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
    },
    currentPokemon() {
      return this.pokemonArr.filter(p => p.id === this.activePokemonId);
    },
    activeCardPosition() {
      const active = document.querySelector(".pokemon-info__card");
      const pos = { top: active.offsetHeight + 170, left: 30 };

      return pos;
    }
  },
  methods: {
    togglePokemonEffect(id) {
      const { activePokemonId } = this;
      if (!activePokemonId) {
        this.activePokemonId = id;
      } else if (activePokemonId) {
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
/* info section */
.pokedex {
  background: orangered;
  border-radius: 25px;
}

.podedex-controls {
  position: absolute;
  bottom: 120px;
  font-size: 120px;
  font-weight: 900;
}

.podedex-controls__buttons {
  position: absolute;
  bottom: -50px;
  font-size: 200px;
  color: lightblue;
}

.pokedex-handle {
  background: black;
  width: 40px;
  margin: 0 10px;
  border-radius: 25px;
}

.pokedex-handle:first-of-type {
  margin-left: 20px;
}

.pokedex-handle:last-of-type {
  margin-right: 0;
}

.pokemon-info {
  display: flex;
  padding: 25px;
  height: 400px;
}

.pokemon-info__card {
  position: relative;
  left: 50px;
  height: 300px;
  width: 220px;
}

.pokemon-info__stats {
  background: #cfcfcf;
  width: 100%;
  border-radius: 0 0 0 100px;
  margin-left: 100px;
  padding: 0 0 0 100px;
}

.pokemon-info__stats-display {
  opacity: 0;
  transition: all ease 2s 2s;
}

.pokemon-info__stats-active {
  opacity: 1;
}

/* carousel */
.pokedex-carousel {
  display: flex;
  justify-content: initial;
  padding: 50px 0;
}

.pokedex-carousel__no-overflow {
  overflow: none !important;
}
</style>
