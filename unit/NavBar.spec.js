import { mount } from '@vue/test-utils';
import NavBar from '@/components/NavBar.vue';

describe('NavBar.vue', () => {
    let mockGenerateSchedule, mockTogglePause;

    beforeEach(() => {
        mockGenerateSchedule = jest.fn();
        mockTogglePause = jest.fn();
    });

    it('renders correctly and enables Generate Program button', () => {
        const wrapper = mount(NavBar, {
            data() {
                return {
                    programGenerated: false,
                };
            },
            computed: {
                isPaused: () => false,
            },
            methods: {
                generateSchedule: mockGenerateSchedule,
                toggleRace: mockTogglePause,
            },
        });

        const generateProgramButton = wrapper.find('button:first-child');
        expect(generateProgramButton.exists()).toBe(true);
        expect(generateProgramButton.attributes('disabled')).toBeUndefined();
    });

    it('calls generateSchedule when Generate Program button is clicked', async () => {
        const wrapper = mount(NavBar, {
            data() {
                return {
                    programGenerated: false,
                };
            },
            computed: {
                isPaused: () => false,
            },
            methods: {
                generateSchedule: mockGenerateSchedule,
            },
        });

        const generateProgramButton = wrapper.find('button:first-child');
        await generateProgramButton.trigger('click');
        expect(mockGenerateSchedule).toHaveBeenCalled();
    });

    it('toggles race state when Start/Pause button is clicked', async () => {
        const wrapper = mount(NavBar, {
            data() {
                return {
                    programGenerated: true,
                };
            },
            computed: {
                isPaused: () => true,
            },
            methods: {
                toggleRace: mockTogglePause,
            },
        });

        const startPauseButton = wrapper.find('button:last-child');
        await startPauseButton.trigger('click');
        expect(mockTogglePause).toHaveBeenCalled();
    });
});
