import Vue from 'vue'
import iView from 'iview';
import App from './App.vue'
import router from './router'
import store from './store'
import ls from 'store2'
import 'iview/dist/styles/iview.css'

Vue.use(iView)
Vue.config.productionTip = false

const app = new Vue({
    router,
    store,
    render: h => h(App)
})

var currTitle = ls.session.get('currTitle')
if (currTitle) window.document.title = currTitle

router.beforeEach((to, from, next) => {
    window.document.title = to.meta.title
    ls.session('currTitle', to.meta.title)
    iView.LoadingBar.start()
    next()
});

router.afterEach(() => {
    // iView.LoadingBar.finish()
    window.scrollTo(0, 0);
});

app.$mount('#app')