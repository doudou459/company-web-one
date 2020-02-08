import Vue from 'vue';
import Router from 'vue-router';
import indexweb from "./views/indexweb.vue";
import business from "./views/business.vue";
import casedemo from "./views/case.vue";
import contact from "./views/contact.vue";



Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/indexweb',
      name: 'indexweb',
      component: indexweb
    },
    {
      path: '/business',
      name: 'business',
      component: business
    },
    {
      path:'/case',
      name:'case',
      component:casedemo
    },
    {
      path:'/contact',
      name:"contact",
      component:contact
    }
  ]
})
