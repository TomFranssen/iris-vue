<template>
    <a
        v-bind:href="getGoogleCalendarUrl()"
        rel="nofollow"
    >
        <i class="fa fa-calendar" aria-hidden="true"></i>
        {{$t('add-to-google-calendar')}}
    </a>
</template>
<script>
export default {
    name: 'AddToCalendar',
    props: [
        'name',
        'description',
        'startDate',
        'endDate',
        'location'
    ],
    methods: {
        encodeURI: (value) => {
            return encodeURIComponent(value)
        },
        getGoogleCalendarUrl: function () {
            return `https://www.google.com/calendar/render?action=TEMPLATE&text=${this.name}&dates=${this.startDate}/${this.endDate}&details=${encodeURI(this.description)}&location=${encodeURI(this.location)}`
        }
    }
}
</script>
