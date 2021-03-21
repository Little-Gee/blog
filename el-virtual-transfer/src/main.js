import Vue from 'vue';
import App from './App.vue';
import { RecycleScroller } from 'vue-virtual-scroller';
import { Button, Transfer } from 'element-ui';
import ElVirtualTransfer from '@/components/transfer';
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css';

Vue.config.productionTip = false;

Vue.component('RecycleScroller', RecycleScroller);
Vue.use(Button);
Vue.use(Transfer);
Vue.use(ElVirtualTransfer);

new Vue({
    render: h => h(App)
}).$mount('#app');
