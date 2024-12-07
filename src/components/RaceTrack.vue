<template>
  <div class="race-track">
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
    <h2>{{ currentRoundInfo }}</h2>
  </div>
</template>

<script>
import horseIcon from "../assets/horse.png";
import { mapGetters, mapMutations } from "vuex";

export default {
  computed: {
    ...mapGetters(["isPaused"]),
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
    console.log("Mounted: isPaused is:", this.isPaused);
    this.manualCheck();
  },

  watch: {
    isPaused(newValue) {
      console.log("isPaused updated to:", newValue);
      if (!newValue) {
        console.log("Starting the race...");
        this.startMovement();
      } else {
        console.log("Pausing the race...");
        clearInterval(this.movementInterval);
      }
    },
  },

  methods: {
    manualCheck() {
      console.log("Manual check: isPaused is:", this.$store.getters.isPaused);
    },
    startRace() {
      if (!this.isPaused) {
        // Hareketi başlat
        this.startMovement();
      } else {
        // Hareketi duraklat
        clearInterval(this.movementInterval);
      }
    },
    startMovement() {
      console.log("startMovement called.");
      console.log("Current Participants:", this.currentParticipants);
      console.log("Current Distance:", this.currentDistance);

      this.movementInterval = setInterval(() => {
        console.log("Updating progress...");
        this.currentParticipants.forEach((horse) => {
          const progressIncrement = Math.random() * 10;
          horse.progress = Math.min(
            horse.progress + progressIncrement,
            this.currentDistance
          );
          console.log(`${horse.name} progress: ${horse.progress}`);
        });

        const raceFinished = this.currentParticipants.every(
          (horse) => horse.progress >= this.currentDistance
        );

        if (raceFinished) {
          console.log("Race finished!");
          clearInterval(this.movementInterval);
          this.movementInterval = null;
          this.updateResults();
        }
      }, 100);
    },

    startMovement() {
      console.log("startMovement called.");
      this.movementInterval = setInterval(() => {
        this.currentParticipants.forEach((horse) => {
          if (!horse.finishedAt) {
            // Eğer at bitiş yapmadıysa ilerlesin
            const progressIncrement = Math.random() * 10;
            horse.progress = Math.min(
              horse.progress + progressIncrement,
              this.currentDistance
            );

            if (horse.progress >= this.currentDistance) {
              horse.finishedAt = Date.now(); // Bitiş zamanını kaydet
              console.log(`${horse.name} finished at: ${horse.finishedAt}`);
            }
          }
        });

        const raceFinished = this.currentParticipants.every(
          (horse) => horse.progress >= this.currentDistance
        );

        if (raceFinished) {
          console.log("Race finished!");
          clearInterval(this.movementInterval);
          this.movementInterval = null;
          this.updateResults();
        }
      }, 100);
    },
    updateResults() {
      // Bitiş zamanına göre sıralama yapıyoruz
      const sortedParticipants = [...this.currentParticipants].sort(
        (a, b) => (a.finishedAt || Infinity) - (b.finishedAt || Infinity)
      );

      // Sonuçları store'a kaydet
      this.$store.commit("updateResults", {
        round: this.$store.getters.currentRound + 1,
        participants: sortedParticipants.map((horse, index) => ({
          position: index + 1,
          name: horse.name,
        })),
      });

      console.log("Race finished! Winners updated to results.");

      // Yarış bittikten sonra isPaused durumunu tersine çevir
      this.$store.commit("togglePause");

      // Bir sonraki tura hazırlık için ilerleme sıfırlanır
      this.resetPositions();

      // Eğer bir sonraki tur varsa, currentRound artırılır
      if (
        this.$store.getters.currentRound <
        this.$store.getters.schedule.length - 1
      ) {
        this.$store.commit("incrementRound");
        console.log("Next race is ready to start.");
      } else {
        console.log("All races are complete!");
      }
    },
    resetPositions() {
      // Tüm atların ilerlemesini ve bitiş zamanını sıfırla
      this.currentParticipants.forEach((horse) => {
        horse.progress = 0;
        horse.finishedAt = null;
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
