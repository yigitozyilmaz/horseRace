<template>
  <div id="app">
    <NavBar />
    <div class="main-content">
      <div class="flex">
        <!-- Horse List -->
        <HorseList />
        <!-- Race Track -->
        <RaceTrack />
        <!-- Program ve Results -->
        <div class="flex">
          <!-- Program -->
          <div>
            <h2>Program</h2>
            <ProgramTable
              v-for="(round, index) in program"
              :key="index"
              :data="round.participants"
              :title="`${round.round}st Lap - ${round.distance}m`"
            />
          </div>
          <!-- Results -->
          <div>
            <h2>Results</h2>
            <ResultsTable
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
import ResultsTable from "./components/ResultsTable.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    NavBar,
    HorseList,
    RaceTrack,
    ProgramTable,
    ResultsTable,
  },
  computed: {
    ...mapGetters(["schedule", "results"]),
    program() {
      return Array.isArray(this.schedule) // `schedule` kontrolü
        ? this.schedule.map((round, index) => ({
            round: index + 1,
            distance: round.distance || 0,
            participants: Array.isArray(round.participants) // `participants` kontrolü
              ? round.participants.map((participant, i) => ({
                  position: i + 1,
                  name: participant.name || "---",
                }))
              : [],
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
  gap: 20px;
}
.results-round {
  margin-bottom: 20px;
}
</style>
