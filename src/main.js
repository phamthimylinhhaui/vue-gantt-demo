import { createApp } from 'vue'
import App from './App.vue'
import ganttastic from '@infectoone/vue-ganttastic'
import dayjs from 'dayjs';
import 'dayjs/locale/ja';

dayjs.locale('ja');

createApp(App).use(ganttastic).mount('#app')
