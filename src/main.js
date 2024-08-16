import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import Cookie from 'js-cookie'

Vue.use(ElementUI)
Vue.config.productionTip = false

//全局路由守卫
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  if (to.name === 'Login' && token) {
      next({ path: '/' }); // 用户已登录且试图访问登录页面时，跳转到首页
  } else if (to.name !== 'Login' && !token) {
      next({ path: '/login' }); // 用户未登录且试图访问非登录页面时，跳转到登录页面
  } else {
      next(); // 正常导航
  }
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
