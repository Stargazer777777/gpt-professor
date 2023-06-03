import { createApp } from 'vue';

import App from './App.vue';
import router from './router';
import store from '@/stores/index';
import '@/http/index';

import './assets/main.css';
import 'element-plus/dist/index.css';

import VMDEditor from '@/vMarkdown/index';

const app = createApp(App);

app.use(store);
app.use(router);
app.use(VMDEditor);

app.mount('#app');
