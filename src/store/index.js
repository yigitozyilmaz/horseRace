import { createStore } from 'vuex';

const store = createStore({
    state: {
        horses: [],
        schedule: Array(6).fill(null).map(() =>
            Array(10).fill({ position: "---", name: "---" })
        ),
        results: Array(6).fill(null).map(() =>
            Array(10).fill({ position: "---", name: "---" })
        ),
        currentRound: 0,
        isPaused: true, // Start/Pause durumu
    },
    mutations: {
        togglePause(state) {
            state.isPaused = !state.isPaused;
            console.log("Pause toggled. isPaused:", state.isPaused);
        },
        setHorses(state, horses) {
            state.horses = horses;
        },
        setSchedule(state, schedule) {
            state.schedule = schedule;
            state.currentRound = 0; // Her program oluşturulduğunda round sıfırlanır
        },
        updateResults(state, { round, participants }) {
            // Kazananları belirtilen tura göre sonuç tablosuna ekler
            console.log(`Updating results for round ${round}...`);
            state.results[round - 1] = participants;
        },
        incrementRound(state) {
            if (state.currentRound < state.schedule.length - 1) {
                state.currentRound++;
            } else {
                console.warn("Tüm roundlar tamamlandı.");
            }
        },
        updateProgress(state) {
            state.schedule[state.currentRound].participants.forEach((horse) => {
                // İlerlemeyi rastgele bir hızda artırıyoruz
                horse.progress += Math.floor(Math.random() * 10) + 1;

                // Yarışın mesafesini aşarsa durdur
                if (horse.progress > state.schedule[state.currentRound].distance) {
                    horse.progress = state.schedule[state.currentRound].distance;
                }
            });
        },
        resetGame(state) {
            state.horses = [];
            state.schedule = [];
            state.results = Array(6).fill(null).map(() => Array(10).fill("---"));
            state.currentRound = 0;
            state.isPaused = true;
        },
    },
    actions: {
        generateHorses({ commit }) {
            const horses = Array.from({ length: 20 }, (_, i) => ({
                id: i + 1,
                name: `Horse ${i + 1}`,
                condition: Math.floor(Math.random() * 100),
                progress: 0,
                color: `hsl(${Math.random() * 360}, 70%, 50%)`,
            }));
            commit("setHorses", horses);
        },
        generateSchedule({ commit, state }) {
            const distances = [1200, 1400, 1600, 1800, 2000, 2200];
            const schedule = distances.map((distance, i) => ({
                round: i + 1,
                distance,
                participants: state.horses
                    .slice()
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .slice(0, 10),
            }));
            commit('setSchedule', schedule);
        },
        saveResult({ commit }, participants) {
            participants.forEach((horse, index) => {
                commit("updateResult", {
                    round: this.state.currentRound + 1,
                    position: index + 1,
                    name: horse.name,
                });
            });
        },
    },
    getters: {
        horses: (state) => state.horses,
        schedule: (state) => state.schedule,
        results: (state) => state.results,
        currentRound: (state) => state.currentRound,
        isPaused: (state) => state.isPaused,
    },
});

export default store;
