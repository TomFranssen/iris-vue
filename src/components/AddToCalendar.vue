<template>
    <div>
        <a
            v-bind:href="getGoogleCalendarUrl()"
            target="_blank" rel="nofollow">Add to my calendar</a>
        {{getGoogleCalendarUrl()}}
        {{startDate}}
    </div>
</template>
<script>
export default {
    name: 'AddToCalendar',
    props: [
        'name',
        'description',
        'startDate'
    ],
    methods: {
        encodeURI: (value) => {
            return encodeURIComponent(value)
        },
        getGoogleCalendarUrl: function () {
            return `https://www.google.com/calendar/render?action=TEMPLATE&text=${this.name}&dates=20140127T224000Z/20140320T221500Z&details=${encodeURI(this.description)}&location=Waldorf+Astoria,+301+Park+Ave+,+New+York,+NY+10022&sf=true&output=xml`
        }
    }
}
</script>
