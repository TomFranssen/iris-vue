import Vue from 'vue'
import Router from 'vue-router'
import EventAdd from '@/components/EventAdd'
import EventEdit from '@/components/EventEdit'
import Events from '@/components/Events'
import EventsArchive from '@/components/EventsArchive'
import EventDetails from '@/components/EventDetails'
import Home from '@/components/Home'
import Profile from '@/components/Profile'
import Users from '@/components/Users'
import Users501st from '@/components/Users501st'
import UserDetails from '@/components/UserDetails'
import Costumes from '@/components/Costumes'
import NotFound from '@/components/NotFound'
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
            component: Profile,
            beforeEnter: requireAuth
        },
        {
            path: '/add-event',
            name: 'EventAdd',
            component: EventAdd,
            beforeEnter: requireAuth

        },
        {
            path: '/events',
            name: 'Events',
            component: Events,
            beforeEnter: requireAuth
        },
        {
            path: '/events-archive',
            name: 'Events Archive',
            component: EventsArchive,
            beforeEnter: requireAuth
        },
        {
            path: '/event/:id',
            name: 'Event details',
            component: EventDetails,
            beforeEnter: requireAuth
        },
        {
            path: '/event/:id/edit',
            name: 'Event edit',
            component: EventEdit,
            beforeEnter: requireAuth
        },
        {
            path: '/users',
            name: 'Users',
            component: Users,
            beforeEnter: requireAuth
        },
        {
            path: '/users-501st',
            name: 'Users 501st',
            component: Users501st,
            beforeEnter: requireAuth
        },
        {
            path: '/user/:user_id',
            name: 'User details',
            component: UserDetails,
            beforeEnter: requireAuth
        },
        {
            path: '/costumes',
            name: 'Costumes',
            component: Costumes,
            beforeEnter: requireAuth
        },
        {
            path: '/callback',
            component: Callback
        },
        {
            path: '/404',
            component: NotFound
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
})
