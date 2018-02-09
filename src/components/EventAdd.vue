<template>
    <div class="add-event">
        <b-breadcrumb :items="breadcrumbs"></b-breadcrumb>
        <event-form v-bind:event="event" v-bind:edit="false"></event-form>
    </div>
</template>

<script>
import EventForm from './EventForm.vue'

export default {
    components: {
        EventForm
    },
    name: 'EventAdd',
    data () {
        return {
            breadcrumbs: [{
                text: 'Home',
                to: '/'
            }, {
                text: this.$t('events'),
                to: '/events'
            }, {
                text: this.$t('add-event'),
                active: true
            }],
            event: {
                name: undefined,
                description: '',
                eventDates: [{
                    date: '',
                    availableSpots: '',
                    open: '',
                    signedUpUsers: [],
                    cancelledUsers: [],
                    guests: []
                }],
                gatherTime: [{
                    HH: '00',
                    mm: '00'
                }],
                startTime: [{
                    HH: '00',
                    mm: '00'
                }],
                endTime: [{
                    HH: '00',
                    mm: '00'
                }],
                maxSignupDate: undefined,
                eventCoordinator: '',
                street: undefined,
                postcode: undefined,
                houseNumber: undefined,
                city: undefined,
                forumUrl: undefined,
                facebookEvent: undefined,
                websiteUrl: undefined,
                publiclyAccessible: undefined,
                dressingroomAvailable: undefined,
                travelRestitution: undefined,
                parking: undefined,
                parkingRestitution: undefined,
                lunch: undefined,
                drinks: undefined,
                canRegisterGuests: undefined
            }
        }
    }
}
</script>
