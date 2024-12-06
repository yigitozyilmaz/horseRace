import { createApp } from 'vue';
import App from './App.vue';
import store from './store'; // Vuex Store

// PrimeVue Kütüphaneleri ve Stilleri
import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/saga-blue/theme.css'; // Tema
import 'primevue/resources/primevue.min.css'; // Çekirdek CSS
import 'primeicons/primeicons.css'; // PrimeIcons

// PrimeVue Bileşenleri
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

// Uygulama Oluşturma ve PrimeVue Kaydı
const app = createApp(App);
app.use(store);
app.use(PrimeVue);

// PrimeVue Bileşenlerini Global Kayıt Etme
app.component('DataTable', DataTable);
app.component('Column', Column);

// Uygulamayı Başlat
app.mount('#app');
