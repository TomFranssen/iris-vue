<template>
    <div class="add-event">
        <b-breadcrumb :items="breadcrumbs"></b-breadcrumb>
        <event-form v-bind:event="event"></event-form>
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
                text: 'Add event',
                active: true
            }],
            event: {
                name: undefined,
                description: '',
                eventDates: [{
                    date: '',
                    availableSpots: '',
                    open: ''
                }],
                gatherTime: {
                    HH: '00',
                    mm: '00'
                },
                startTime: {
                    HH: '00',
                    mm: '00'
                },
                endTime: {
                    HH: '00',
                    mm: '00'
                },
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
                guestsAllowed: undefined,
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
