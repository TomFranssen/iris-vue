import Vue from 'vue'
import Router from 'vue-router'
import AddEvent from '@/components/AddEvent'
import Events from '@/components/Events'
import EventDetails from '@/components/EventDetails'
import Home from '@/components/Home'
import Profile from '@/components/Profile'
import Users from '@/components/Users'
import UserDetails from '@/components/UserDetails'
import Callback from '@/components/Callback'
import { requireAuth } from '../utils/auth'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home
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
            component: EventDetails
        },
        {
            path: '/users',
            name: 'Users',
            component: Users,
            beforeEnter: requireAuth
        },
        {
            path: '/user/:user_id',
            name: 'User details',
            component: UserDetails
        },
        {
            path: '/callback',
            component: Callback
        }
    ]
})
