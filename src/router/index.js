import Vue from 'vue'
import Router from 'vue-router'
import AddEvent from '@/components/AddEvent'
import Events from '@/components/Events'
import EventDetails from '@/components/EventDetails'
import Dashboard from '@/components/Dashboard'
import Profile from '@/components/Profile'
import Callback from '@/components/Callback'
import { requireAuth } from '../utils/auth'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Dashboard',
            component: Dashboard
        },
        {
            path: '/profile',
            name: 'Profile',
            component: Profile
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
            path: '/callback',
            component: Callback
        }
    ]
})
