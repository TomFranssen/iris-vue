<template>
    <div>
        <a
            v-bind:href="getGoogleCalendarUrl()"
            target="_blank" 
            rel="nofollow"
        >
            Add to my calendar
        </a>
        <br>
        {{getGoogleCalendarUrl()}}
        <br>
        20140127T224000Z/20140320T221500Z
        <br>
        {{startDate}}
        <br>
        {{endDate}}
        <br>
        {{location}}
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
