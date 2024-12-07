import { mount } from '@vue/test-utils';
import ResultsTable from '@/components/ResultsTable.vue';

describe('ResultsTable.vue', () => {
    it('renders the results table correctly', () => {
        const wrapper = mount(ResultsTable, {
            global: {
                plugins: [PrimeVue],
                components: {
                    DataTable,
                    Column,
                },
            },
            props: {
                data: [
                    { position: 1, name: 'Winner 1' },
                    { position: 2, name: 'Winner 2' },
                ],
                title: 'Results Table',
            },
        });

        expect(wrapper.find('h3').text()).toContain('Results Table');
        expect(wrapper.findAll('tr').length).toBe(3); // 2 data rows + header row
    });
});
