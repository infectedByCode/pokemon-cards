<template>
  <div
    :class="`pokemon-card ${isActive ? 'pokemon-card__effect' : ''}`"
    @click="$emit('click', pokemon.id)"
  >
    <div class="pokemon-card-inner">
      <div class="pokemon-card-front">
        <p>{{ pokemon.name }}</p>
        <img :src="pokemon.sprites.front_default" :alt="`${pokemon.name} card image`" />
      </div>
      <div class="pokemon-card-back"></div>
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
    isActive: {
      type: Boolean,
      required: true
    }
  }
};
</script>

<style scoped>
.pokemon-card {
  box-sizing: border-box;
  height: 300px;
  width: 220px;
  padding: 5px;
  border: 1px #ccc solid;
  border-radius: 15px;
  margin: 5px 20px;
}

.pokemon-card-inner {
  width: 100%;
  height: 100%;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: 0 0;
  text-align: center;
  transition: transform 0.8s, all ease 2s;
  transform-style: preserve-3d;
  border-radius: 15px;
}

.pokemon-card__effect .pokemon-card-inner {
  position: absolute;
  height: 450px;
  width: 330px;
  margin: 15% auto;
  transform: rotate3d(90, 0, 0, 360deg);
  border: 1px #ccc solid;
  border-radius: 15px;
}

/* Position the front and back side */
.pokemon-card-front,
.pokemon-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden; /* Safari */
  backface-visibility: hidden;
}

/* Style the front side (fallback if image is missing) */
.pokemon-card-front {
  /* background-color: #bbb; */
  color: black;
}

/* Style the back side */
.pokemon-card-back {
  color: white;
  transform: rotateY(180deg);
}
</style>