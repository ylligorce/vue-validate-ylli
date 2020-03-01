import Vue from 'vue'
import App from './InputComponent'
import VueValidateYlli from '../index'

Vue.config.productionTip = false;

Vue.use(VueValidateYlli);

new Vue({
    render: h => h(App),
}).$mount('#app');