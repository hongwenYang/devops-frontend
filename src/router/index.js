import Vue from 'vue';
import VueRouter from 'vue-router';
import AssetList from '@/views/AssetList.vue';
import Login from '@/views/Login.vue';
import Dashboard from '@/views/Dashboard.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/',
        name: 'Dashboard',
        component: Dashboard,
        children: [
            {
                path: 'assets', // http://yourdomain.com/assets
                name: 'Assets',
                component: AssetList
            },
        ]
    },

]

const router = new VueRouter({
    mode: 'history', // 使用 history 模式
    routes // (缩写) 相当于 routes: routes
})

export default router;