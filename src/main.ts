import { createApp } from 'vue';

import App from './App.vue';
import router from './router';
import store from '@/stores/index';
import '@/http/index';

import './assets/main.css';
import 'element-plus/dist/index.css';

import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import VMDEditor from '@/vMarkdonw/index';

const app = createApp(App);

app.use(store);
app.use(router);
app.use(VMDEditor);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.mount('#app');
