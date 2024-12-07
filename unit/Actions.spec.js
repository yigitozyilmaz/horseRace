import store from "@/store";

describe("Vuex Store Actions", () => {
    it("generates horses", () => {
        store.dispatch("generateHorses");
        expect(store.state.horses).toHaveLength(20);
        expect(store.state.horses[0]).toHaveProperty("name");
        expect(store.state.horses[0]).toHaveProperty("condition");
    });

    it("generates schedule", () => {
        store.dispatch("generateHorses"); // Atlar yoksa schedule oluşmaz
        store.dispatch("generateSchedule");
        expect(store.state.schedule).toHaveLength(6);
        expect(store.state.schedule[0].participants).toHaveLength(10);
        expect(store.state.schedule[0]).toHaveProperty("distance");
    });

    it("saves results", () => {
        const participants = [
            { name: "Horse 1", position: 1 },
            { name: "Horse 2", position: 2 },
        ];
        store.dispatch("saveResult", participants);
        expect(store.state.results[0][0].position).toBe("---"); // Dummy değer çünkü test.
    });
});
