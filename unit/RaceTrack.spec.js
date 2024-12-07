import { mount } from '@vue/test-utils';
import { createStore } from 'vuex';
import RaceTrack from '@/components/RaceTrack.vue';

describe('RaceTrack.vue', () => {
    let store;

    beforeEach(() => {
        // Vuex store oluştur
        store = createStore({
            state: {
                schedule: [
                    { round: 1, participants: [{ id: 1, name: 'Horse 1', progress: 0, color: 'blue' }], distance: 1200 },
                ],
                currentRound: 0,
                isPaused: false,
            },
            getters: {
                schedule: (state) => state.schedule,
                currentRound: (state) => state.currentRound,
                isPaused: (state) => state.isPaused,
            },
        });
    });

    it('renders correctly', () => {
        const wrapper = mount(RaceTrack, {
            global: {
                plugins: [store], // Store'u test için bağla
            },
        });

        expect(wrapper.exists()).toBe(true); // Component'in render edildiğini doğrula
        expect(wrapper.find('.race-track').exists()).toBe(true); // `.race-track` sınıfını doğrula
    });

    it('displays correct round info', () => {
        const wrapper = mount(RaceTrack, {
            global: {
                plugins: [store],
            },
        });

        expect(wrapper.find('.table-bottom h2').text()).toContain('1st Lap - 1200m'); // Tur bilgisini doğrula
    });
});
