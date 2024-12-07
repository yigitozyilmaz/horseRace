import { config } from '@vue/test-utils';
import PrimeVue from 'primevue/config';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

config.global.plugins = [PrimeVue];
config.global.components = {
    DataTable,
    Column,
};
