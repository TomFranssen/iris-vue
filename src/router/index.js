import Vue from 'vue'
import Router from 'vue-router'
import PublicBattles from '@/components/publicBattles'
import AddEvent from '@/components/AddEvent'
import Events from '@/components/Events'
import EventDetails from '@/components/EventDetails'
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
            path: '/event/:id',
            name: 'Event details',
            component: EventDetails,
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
