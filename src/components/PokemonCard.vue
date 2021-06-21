<template>
  <div :id="pokemon.id" :class="cardClasses" @click="handleClick" tabindex="0">
    <div class="pokemon-card-inner">
      <div class="pokemon-card-front">
        <section class="pokemon-card-front__title">
          <p>Basic</p>
          <h4 class="pokemon-card-front__name">{{ pokemon.name | nameFormat }}</h4>
          <p>
            <span>HP</span>
            {{pokemon.hp}}
          </p>
        </section>
        <div class="pokemon-card-front__image">
          <img :src="pokemon.image" :alt="`${pokemon.name} card image`" />
        </div>
        <div class="pokemon-card-front__details">
          <div
            v-for="move in pokemon.moves"
            :key="move.id"
            class="pokemon-card-front__details-move"
          >
            <div>
              <p v-for="(cost, i) in energyCost(move.pp)" :key="i" class="energy">&#9733;</p>
            </div>
            <h5>{{move.name | moveFormat}}</h5>
            <span>{{move.power}}</span>
            <p
              class="pokemon-card-front__details-move__desc"
            >{{move.effect_entries[0].short_effect}}</p>
          </div>
        </div>
        <div class="pokemon-card-front__footer"></div>
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
    },
    position: {
      type: Object,
      required: false
    }
  },
  filters: {
    nameFormat(name) {
      return name[0].toUpperCase() + name.slice(1).toLowerCase();
    },
    moveFormat(move) {
      return move
        .split("-")
        .map(m => m[0].toUpperCase() + m.slice(1).toLowerCase())
        .join(" ");
    }
  },
  computed: {
    cardClasses() {
      return `pokemon-card ${
        this.activePokemonId === this.pokemon.id
          ? "pokemon-card__effect"
          : this.activePokemonId
          ? "pokemon-card__inactive"
          : ""
      }`;
    }
  },
  methods: {
    handleClick() {
      if (!this.activePokemonId || this.activePokemonId === this.pokemon.id) {
        this.$emit("click", this.pokemon.id);
        this.toggleActiveCard(this.pokemon.id);
      }
    },
    energyCost(move) {
      return move ? [...Array(parseInt(move / 10)).keys()] : [null];
    },
    toggleActiveCard(id) {
      const activeCard = document.querySelector("#p" + id);

      setTimeout(() => {
        activeCard.style.position = "relative";
        if (this.position) {
          const leftDiff = activeCard.offsetLeft - this.position.left;
          activeCard.style.top = -this.position.top + "px";
          activeCard.style.left = -leftDiff + "px";
        } else {
          activeCard.style.top = "0px";
          activeCard.style.left = "0px";
        }
      }, 1000);
    }
  }
};
</script>

<style scoped>
.energy {
  font-size: 10px;
  display: inline-block;
  height: 12px;
  width: 12px;
  border-radius: 50%;
  margin: 0.5px;
  background: #ddd;
}
/* GENERAL */
.pokemon-card {
  box-sizing: border-box;
  height: 300px;
  min-width: 220px;
  border-radius: 15px;
  margin: 0 -180px 0 0;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  opacity: 1;
  transition: top ease 2s, right ease 2s, bottom ease 2s, left ease 2s,
    opacity ease-in-out 0.5s, margin ease-in-out 1s;
}

.pokemon-card:hover {
  margin: 0 50px 0 0;
  cursor: pointer;
}

.pokemon-card-inner:hover {
  box-shadow: 10px 10px 5px #444;
}

.pokemon-card__inactive {
  opacity: 0;
  box-shadow: none;
  outline: none;
  visibility: hidden;
}

.pokemon-card-inner {
  width: 100%;
  height: 100%;
  border: 3px #666 solid;
  text-align: center;
  transition: all ease 1s, transform 2s;
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
/* FRONT CARD */
.pokemon-card-front {
  width: 100%;
  height: 100%;
  background-color: #bbb;
  border-radius: 6px;
}
.pokemon-card-front img {
  height: 120px;
}

.pokemon-card-front__title {
  display: flex;
  justify-content: start;
  align-items: center;
  height: 18px;
  width: 100%;
  background: #ddd;
  padding: 0 0 1px 0;
  border-radius: 6px 6px 0 0;
}

.pokemon-card-front__title > p:first-of-type {
  font-size: 11px;
  background: hotpink;
  color: #fff;
  border-radius: 6px 0;
  padding: 2px 10px 2px 5px;
  width: 20%;
}

.pokemon-card-front__title > h4 {
  text-align: left;
  margin: 0 0 0 5px;
  width: 40%;
}

.pokemon-card-front__title > p:last-of-type {
  font-size: 14px;
  font-weight: 700;
  text-align: right;
  width: 40%;
  margin: 0 5px 0 0;
}

.pokemon-card-front__title > p:last-of-type > span {
  font-size: 10px;
  margin-right: -5px;
}

.pokemon-card-front__image {
  background: url("../assets/images/background.jpeg");
  background-size: cover;
  background-repeat: no-repeat;
  margin: 8px;
  border-radius: 5px;
}

.pokemon-card-front__details {
  margin: 0 8px;
  display: grid;
}

.pokemon-card-front__details-move {
  display: grid;
  grid-template-columns: 20% 60% 20%;
  align-items: center;
  height: 60px;
}

.pokemon-card-front__details-move > * {
  padding: 2px 0;
  margin: 0;
}

.pokemon-card-front__details-move h5 {
  font-size: 12px;
}

.pokemon-card-front__details-move__desc {
  grid-column: 1/4;
  font-size: 10px;
  text-align: left;
}

/* BACK CARD */
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