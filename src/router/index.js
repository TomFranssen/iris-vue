import Vue from 'vue'
import Router from 'vue-router'
import PrivateBattles from '@/components/privateBattles'
import PublicBattles from '@/components/publicBattles'
import AddEvent from '@/components/AddEvent'
import Events from '@/components/Events'
import Dashboard from '@/components/Dashboard'
import Callback from '@/components/Callback'
import { requireAuth } from '../utils/auth'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'PublicBattles',
            component: PublicBattles
        },
        {
            path: '/private-battles',
            name: 'PrivateBattles',
            component: PrivateBattles,
            beforeEnter: requireAuth
        },
        {
            path: '/add-event',
            name: 'AddEvent',
            component: AddEvent,
            beforeEnter: requireAuth
        },
        {
            path: '/events',
            name: 'Events',
            component: Events,
            beforeEnter: requireAuth
        },
        {
            path: '/dashboard',
            name: 'Dashboard',
            component: Dashboard,
            beforeEnter: requireAuth
        },
        {
            path: '/callback',
            component: Callback
        }
    ]
})
