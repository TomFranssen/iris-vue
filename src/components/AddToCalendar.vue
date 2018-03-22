<template>
    <div>
        <a
            v-bind:href="getGoogleCalendarUrl()"
            target="_blank"
            rel="nofollow"
        >
            {{$t('add-to-google-calendar')}}
        </a>
    </div>
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
