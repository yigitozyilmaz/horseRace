import { createStore } from 'vuex';

const store = createStore({
    state: {
        horses: [],
        schedule: [],
        results: Array(6).fill(null).map(() =>
            Array(10).fill({ position: "---", name: "---" })
        ),
        currentRound: 0,
        isPaused: true, // Start/Pause durumu
    },
    mutations: {
        togglePause(state) {
            state.isPaused = !state.isPaused;
        },
        updateResult(state, { round, position, name }) {
            state.results[round - 1][position - 1] = name;
        },
        setHorses(state, horses) {
            state.horses = horses;
            state.schedule = [];
            state.results = Array(6).fill(null).map(() => Array(10).fill("---"));
            state.currentRound = 0; // Yarış sıfırlanır
        },
        setSchedule(state, schedule) {
            state.schedule = schedule;
            state.currentRound = 0; // Her program oluşturulduğunda round sıfırlanır
        },
        updateResult(state, { round, position, name }) {
            if (state.results[round - 1]) {
                state.results[round - 1][position - 1] = name;
            }
        },
        incrementRound(state) {
            if (state.currentRound < state.schedule.length - 1) {
                state.currentRound++;
            } else {
                console.warn("Tüm roundlar tamamlandı.");
            }
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
                color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
                condition: Math.floor(Math.random() * 100) + 1,
                progress: 0, // Varsayılan değer
            }));
            commit('setHorses', horses);
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
