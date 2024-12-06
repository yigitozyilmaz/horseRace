<template>
  <div class="race-track">
    <h2>{{ currentRoundInfo }}</h2>
    <div
      v-for="(horse, index) in currentParticipants"
      :key="horse.id"
      class="horse-row"
    >
      <span class="horse-name">{{ horse.name }}</span>
      <div class="progress-container">
        <img
          :src="horseIcon"
          class="horse-icon"
          :style="{
            left: `${(horse.progress / currentDistance) * 100}%`,
            filter: `drop-shadow(0px 0px 10px ${horse.color})`,
          }"
          alt="Horse Icon"
        />
        <div class="finish-line">FINISH</div>
      </div>
    </div>
  </div>
</template>

<script>
import horseIcon from "../assets/horse.png";

export default {
  computed: {
    currentParticipants() {
      return (
        this.$store.getters.schedule[this.$store.getters.currentRound]
          ?.participants || []
      );
    },
    currentDistance() {
      return (
        this.$store.getters.schedule[this.$store.getters.currentRound]
          ?.distance || 1200
      );
    },
    currentRoundInfo() {
      const round =
        this.$store.getters.schedule[this.$store.getters.currentRound]?.round ||
        1;
      return `${round}st Lap - ${this.currentDistance}m`;
    },
  },
  mounted() {
    this.startMovement();
  },
  methods: {
    startRace() {
      if (this.isPaused) {
        this.isPaused = false;
        this.raceInterval = setInterval(() => {
          this.$store.commit("updateProgress"); // Atların ilerlemesini sağlayan bir mutasyon
        }, 100);
      } else {
        this.isPaused = true;
        clearInterval(this.raceInterval);
      }
    },
    resetPositions() {
      this.currentParticipants.forEach((horse) => {
        horse.progress = 0;
      });
    },
  },
  data() {
    return {
      horseIcon,
      movementInterval: null,
    };
  },
  beforeDestroy() {
    clearInterval(this.movementInterval);
  },
};
</script>

<style scoped>
.race-track {
  display: flex;
  flex-direction: column;
  gap: 15px;
  background: #eaeaea;
  padding: 20px;
  border-radius: 10px;
  width: 100%;
}
.horse-row {
  display: flex;
  align-items: center;
  gap: 10px;
  position: relative;
}
.horse-name {
  font-weight: bold;
  width: 80px;
}
.progress-container {
  position: relative;
  flex: 1;
  height: 50px;
  background: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 10px;
  overflow: hidden;
}
.horse-icon {
  position: absolute;
  top: 5px;
  height: 40px;
  transition: left 0.1s linear;
}
.finish-line {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 5px;
  background: red;
}
.progress-bar {
  width: 100%;
  height: 20px; /* Yükseklik isteğe göre değiştirilebilir */
  background-color: #f0f0f0;
  position: relative;
  overflow: hidden;
  border-radius: 10px;
}
img {
  position: absolute;
  height: 20px;
  transition: left 0.3s ease-in-out;
}
</style>
