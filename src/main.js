import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from '@/store';

import "@/assets/scss/layouts/layout_1/compile/bootstrap.scss";
import "@/assets/scss/layouts/layout_1/compile/bootstrap_limitless.scss";
// import "@/assets/scss/layouts/layout_1/compile/layout.scss";

createApp(App).use(router).use(store).mount('#app')
