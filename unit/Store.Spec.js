import store from "@/store";

describe("Vuex Store", () => {
    it("has an initial state", () => {
        expect(store.state.horses).toEqual([]);
        expect(store.state.schedule).toHaveLength(6);
        expect(store.state.schedule[0]).toHaveLength(10);
        expect(store.state.results).toHaveLength(6);
        expect(store.state.results[0]).toHaveLength(10);
        expect(store.state.currentRound).toBe(0);
        expect(store.state.isPaused).toBe(true);
    });
});
