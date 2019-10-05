import Vue from 'vue'
import Router from 'vue-router'
import Container from '@/components/web/Container'

Vue.use(Router)

export default new Router({
  routes: [

    {
      path: '/',
      name: 'Container',
      component: Container,
      children: [
        {
          path: '/home',
          name: 'home',
          meta: {},
          component: () => import('../components/web/Home'),
        },
        {
          path: '/book',
          name: 'book',
          meta: {},
          component: () => import('../components/web/Book'),
        },
        {
          path: '/login',
          name: 'login',
          meta: {},
          component: () => import('../components/web/Login'),
        },
        {
          path: '/register',
          name: 'register',
          meta: {},
          component: () => import('../components/web/Register'),
        },

        {
          path: '/personalCenter',
          name: 'personalCenter',
          meta: {},
          component: () => import('../components/web/PersonalCenter'),
        },
      ]
    },

    {
      path: '/home',
      name: 'home',
      meta: {},
      component: () => import('../components/web/Home'),
    },


    {
      path: '/admin',
      name: 'admin',
      meta: {},
      component: () => import('../components/admin/AdminContainer'),
      children: [
        {
          path: '/admin/hotelUser',
          name: 'hotelUser',
          meta: {},
          component: () => import('../components/admin/hotelUser'),

        },
        {
          path: '/admin/hotelRoomType',
          name: 'hotelRoomType',
          meta: {},
          component: () => import('../components/admin/hotelRoomType'),
        },
        {
          path: '/admin/hotelRoom',
          name: 'hotelRoom',
          meta: {},
          component: () => import('../components/admin/hotelRoom'),
        },
        {
          path: '/admin/hotelOrder',
          name: 'hotelOrder',
          meta: {},
          component: () => import('../components/admin/hotelOrder'),
        },
        {
          path: '/admin/hotelComment',
          name: 'hotelComment',
          meta: {},
          component: () => import('../components/admin/hotelComment'),
        },
        {
          path: '/admin/hotelAdministrator',
          name: 'hotelAdministrator',
          meta: {},
          component: () => import('../components/admin/hotelAdministrator'),
        },
        {
          path: '/admin/checkInPerson',
          name: 'checkInPerson',
          meta: {},
          component: () => import('../components/admin/checkInPerson'),
        },
      ]
    },


  ]
})
