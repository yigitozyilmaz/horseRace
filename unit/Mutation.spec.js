import store from "@/store";

describe("Vuex Store Mutations", () => {
    it("toggles pause state", () => {
        expect(store.state.isPaused).toBe(true);
        store.commit("togglePause");
        expect(store.state.isPaused).toBe(false);
    });

    it("sets horses", () => {
        const horses = [{ id: 1, name: "Horse 1" }];
        store.commit("setHorses", horses);
        expect(store.state.horses).toEqual(horses);
    });

    it("sets schedule", () => {
        const schedule = [{ round: 1, distance: 1200, participants: [] }];
        store.commit("setSchedule", schedule);
        expect(store.state.schedule).toEqual(schedule);
        expect(store.state.currentRound).toBe(0);
    });

    it("increments the round", () => {
        store.commit("setSchedule", Array(6).fill(null).map((_, i) => ({ round: i + 1 })));
        expect(store.state.currentRound).toBe(0);
        store.commit("incrementRound");
        expect(store.state.currentRound).toBe(1);
    });

    it("resets the game", () => {
        store.commit("resetGame");
        expect(store.state.horses).toEqual([]);
        expect(store.state.schedule).toEqual([]);
        expect(store.state.results).toHaveLength(6);
        expect(store.state.results[0][0]).toBe("---");
        expect(store.state.currentRound).toBe(0);
        expect(store.state.isPaused).toBe(true);
    });
});
