<template>
  <div id="app">
    <NavBar />
    <div class="main-content">
      <div class="flex">
        <HorseList />
        <RaceTrack />
        <div class="flex table-container">
          <div class="program-table">
            <h2 class="header-program">Program</h2>
            <ProgramTable
              v-for="(round, index) in program"
              :key="index"
              :data="round.participants"
              :title="`${round.round}st Lap - ${round.distance}m`"
            />
          </div>

          <div class="results-table">
            <h2 class="header-results">Results</h2>
            <ProgramTable
              v-for="(round, index) in formattedResults"
              :key="index"
              :data="round.participants"
              :title="`${round.round}st Lap - ${round.distance}m`"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "./components/NavBar.vue";
import HorseList from "./components/HorseList.vue";
import RaceTrack from "./components/RaceTrack.vue";
import ProgramTable from "./components/ProgramTable.vue";
import { mapGetters } from "vuex";
import "./app.css";
export default {
  components: {
    NavBar,
    HorseList,
    RaceTrack,
    ProgramTable,
  },
  computed: {
    ...mapGetters(["schedule", "results"]),
    program() {
      return Array.isArray(this.schedule) // `schedule` kontrolü
        ? this.schedule.map((round, index) => ({
            round: index + 1,
            distance: round.distance || 0,
            participants:
              Array.isArray(round.participants) && round.participants.length > 0
                ? round.participants.map((participant, i) => ({
                    position: i + 1,
                    name: participant.name || "---",
                  }))
                : Array(10).fill({ position: "---", name: "---" }), // Varsayılan 10 boş katılımcı
          }))
        : [];
    },
    formattedResults() {
      return this.results.map((roundResults, index) => ({
        round: index + 1,
        distance: this.schedule[index]?.distance || 0,
        participants: roundResults.sort((a, b) => a.progress < b.progress),
      }));
    },
  },
};
</script>

<style scoped>
.flex {
  display: flex;
}
</style>
