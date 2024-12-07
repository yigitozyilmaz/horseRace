import { mount } from '@vue/test-utils';
import HorseList from '@/components/HorseList.vue';
import PrimeVue from 'primevue/config';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

describe('HorseList.vue', () => {
    it('renders the horse list correctly', () => {
        const wrapper = mount(HorseList, {
            global: {
                plugins: [PrimeVue],
                components: {
                    DataTable,
                    Column,
                },
            },
            computed: {
                horses: () => [
                    { name: 'Horse 1', condition: 'Good', color: '#FF0000' },
                    { name: 'Horse 2', condition: 'Excellent', color: '#00FF00' },
                ],
            },
        });

        expect(wrapper.find('h2').text()).toContain('Horse List');
        expect(wrapper.findAll('tr').length).toBe(3); // 2 veri + başlık satırı
    });
});
