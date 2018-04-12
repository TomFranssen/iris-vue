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
                    open: false,
                    signedUpUsers: [],
                    cancelledUsers: [],
                    guests: []
                }],
                gatherTime: '',
                startTime: '',
                endTime: '',
                maxSignupDate: undefined,
                eventCoordinator: '',
                street: '',
                postcode: '',
                houseNumber: '',
                city: '',
                forumUrl: '',
                facebookEvent: '',
                websiteUrl: '',
                publiclyAccessible: false,
                dressingroomAvailable: false,
                travelRestitution: false,
                parking: false,
                parkingRestitution: false,
                food: false,
                drinks: false,
                canRegisterGuests: false,
                isArchived: false,
                blastersAllowed: false
            }
        }
    }
}
</script>
