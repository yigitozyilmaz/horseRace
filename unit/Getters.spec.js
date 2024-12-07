import store from "@/store";

describe("Vuex Store Getters", () => {
    it("gets horses", () => {
        const horses = store.getters.horses;
        expect(horses).toEqual(store.state.horses);
    });

    it("gets schedule", () => {
        const schedule = store.getters.schedule;
        expect(schedule).toEqual(store.state.schedule);
    });

    it("gets current round", () => {
        const currentRound = store.getters.currentRound;
        expect(currentRound).toBe(store.state.currentRound);
    });

    it("gets isPaused", () => {
        const isPaused = store.getters.isPaused;
        expect(isPaused).toBe(store.state.isPaused);
    });
});
