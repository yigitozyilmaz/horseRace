<template>
  <div class="nav-bar">
    <h2 class="title">Horse Racing</h2>
    <div class="buttons">
      <button @click="generateSchedule" :disabled="programGenerated">
        Generate Program
      </button>
      <button @click="toggleRace" :disabled="!programGenerated">
        {{ isPaused ? "Start" : "Pause" }}
      </button>
    </div>
    <!---<button @click="resetGame">Reset Game</button>
         <button @click="generateHorses">Generate Horse List</button>---->
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
  data() {
    return {
      programGenerated: false,
    };
  },
  computed: {
    ...mapGetters(["isPaused"]),
    buttonLabel() {
      return this.isPaused ? "Start" : "Pause";
    },
  },
  mounted() {
    this.generateHorses();
  },
  methods: {
    ...mapActions(["generateHorses", "generateSchedule"]),
    ...mapMutations(["togglePause", "resetGame"]),
    toggleRace() {
      console.log("Toggle race button clicked.");
      this.togglePause();
    },
    generateSchedule() {
      console.log("Generate Program button clicked.");
      this.programGenerated = true;
      this.$store.dispatch("generateSchedule");
    },
  },
};
</script>

<style scoped>
.nav-bar {
  background: #f08c87;
  padding: 10px;
  display: flex;
  justify-content: space-between; /* Başlık sola, butonlar sağa */
  align-items: center;
  margin-bottom: 40px;
  border: 1px solid black;
}
button {
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  background: #ebebeb;
  color: black;
  font-weight: 900;
  font-size: 18px;
  border-radius: 5px;
  margin-right: 20px;
  margin-left: 20px;
  transition: background-color 0.3s;
}
button:hover {
  background: #4f4f50;
}
button:disabled {
  background-color: #ccc;
  color: #999;
  cursor: not-allowed;
}
.title {
  font-size: 1.5rem; /* Başlık boyutu */
  font-weight: bold; /* Kalın yazı */
  margin: 0; /* Varsayılan dış boşluğu kaldır */
}
</style>
