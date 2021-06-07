<template>
  <div :class="cardClasses" @click="$emit('click', pokemon.id)" tabindex="0">
    <div class="pokemon-card-inner">
      <div class="pokemon-card-front">
        <p>{{ pokemon.name }}</p>
        <img :src="pokemon.sprites.front_default" :alt="`${pokemon.name} card image`" />
      </div>
      <div class="pokemon-card-back">
        <img src="../assets/images/pokemon-ball.png" alt />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PokemonCard",
  props: {
    pokemon: {
      type: Object,
      required: true
    },
    activePokemonId: {
      type: Number,
      required: false,
      default: -1
    }
  },
  computed: {
    cardClasses() {
      return `pokemon-card ${
        this.activePokemonId === this.pokemon.id
          ? "pokemon-card__effect"
          : this.activePokemonId
          ? "pokemon-card__hidden"
          : ""
      }`;
    }
  }
};
</script>

<style scoped>
.pokemon-card {
  box-sizing: border-box;
  height: 300px;
  width: 220px;
  border-radius: 15px;
  margin: 5px 20px;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  opacity: 1;
  transition: top ease 4s, right ease 4s, bottom ease 4s, left ease 4s,
    opacity ease-in-out 4s;
}

.pokemon-card:focus {
  outline: 5px solid hotpink;
  outline-offset: 5px;
}

.pokemon-card:hover {
  box-shadow: 10px 10px 5px #444;
}

.pokemon-card__hidden {
  opacity: 0;
  box-shadow: none;
  outline: none;
}

.pokemon-card-inner {
  width: 100%;
  height: 100%;
  border: 3px #666 solid;
  text-align: center;
  transition: transform 0.8s, all ease 3s;
  transform-style: preserve-3d;
  border-radius: 10px;
}

.pokemon-card__effect .pokemon-card-inner {
  box-sizing: border-box;
  margin: 0;
  box-shadow: none;
  outline: none;
  transform: rotate3d(90, 90, 45, 360deg);
}

.pokemon-card-front,
.pokemon-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}

.pokemon-card-front {
  width: 100%;
  height: 100%;
  background-color: #bbb;
  border-radius: 6px;
}

.pokemon-card-back {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  background: royalblue;
  border-radius: 6px;
  transform: rotateY(180deg);
}

.pokemon-card-back > img {
  width: 100px;
  height: 100px;
}
</style>