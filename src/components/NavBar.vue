<template>
  <div class="nav-bar">
    <button @click="generateHorses">Generate Horse List</button>
    <button @click="generateSchedule">Generate Program</button>
    <button @click="toggleRace">{{ isPaused ? "Start" : "Pause" }}</button>
    <button @click="resetGame">Reset Game</button>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
  computed: {
    ...mapGetters(["isPaused"]),
  },
  methods: {
    ...mapActions(["generateHorses", "generateSchedule"]),
    ...mapMutations(["togglePause", "resetGame"]),
    toggleRace() {
      this.togglePause();
    },
  },
};
</script>

<style scoped>
.nav-bar {
  background: #f8d7da;
  padding: 10px;
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
  border-radius: 8px;
}
button {
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  background: #007bff;
  color: white;
  border-radius: 5px;
  transition: background-color 0.3s;
}
button:hover {
  background: #0056b3;
}
</style>
