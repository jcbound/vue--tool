import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home.vue'
import Test from '@/components/test.vue'
import Login from '@/page/login.vue'
import tree from '@/components/tree.vue'
import table from '@/page/table.vue'
import form from '@/page/form.vue'
import formceshi from '@/page/formceshi.vue'
import jiandan from '@/page/jiandanceshi.vue'
import table01 from '@/page/table01.vue'
import table02 from '@/page/table02.vue'
import table03 from '@/page/table03.vue'
import form4 from '@/page/form4.vue'
Vue.use(Router)

export default new Router({
  mode: '',
  base: process.env.BASE_URL,
  routes: [{
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
            import(/* webpackChunkName: "about" */ './views/About.vue')
  },
  {
    path: '/test',
    name: 'test',
    component: Test
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      keepAlive: true
    }
  }, {
    path: '/tree',
    name: 'tree',
    component: tree
  }, {
    path: '/table',
    name: 'table',
    component: table
  }, {
    path: '/form',
    name: 'form',
    component: form
  }, {
    path: '/formceshi',
    name: 'formceshi',
    component: formceshi
  }, {
    path: '/jiandanceshi',
    name: 'jiandan',
    component: jiandan
  }, {
    path: '/jiandanceshi/:id',
    component: Test
  }, {
    path: '/table01',
    name: 'tableAdd',
    component: table01
  }, {
    path: '/table02',
    name: 'tableAdd',
    component: table02
  }, {
    path: '/table03',
    name: 'profile',
    component: table03

  }, {
    path: '/form4',
    name: 'profile',
    component: form4
  },
  {
    path: '/routeceshi:id',
    component: () =>
            import('@/page/routeceshi.vue'),

    children: [{
      path: 'ceshi01',
      component: () =>
                import('@/page/routeceshifile/ceshi01.vue')
    },
    {
      path: 'ceshi02',
      component: () =>
                import('@/page/routeceshifile/ceshi02.vue')
    },
    {
      path: 'ceshi03',
      component: () =>
                import('@/page/routeceshifile/ceshi03.vue')

    }

    ]

  }, {
    path: '/form5',
    component: () =>
            import('@/page/form5.vue')
  }, {
    path: '/newWindows',
    component: () =>
            import('@/page/newWindows.vue')
  }, {
    path: '/routeNav',
    component: () =>
            import('@/page/routeNav.vue')
  }

  ]
})
